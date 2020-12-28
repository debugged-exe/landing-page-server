const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(cors())

app.get('/', (req,res) => {
	res.json("This is working.");
})


var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var contactEntry = new Schema({
  name: String,
  email:String,
  message:String,
  date: String,
  time:String
}, {
  collection: 'ContactUs'
});

mongoose.connect("mongodb+srv://Rushabh_Bora:RushabhBora@cluster0.qmrlc.mongodb.net/BoraAutoMobiles?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true});

var Model = mongoose.model('Model', contactEntry);

app.post('/contact', (req,res) => {
	const query = req.body;
	const {name, email, message} = query;
	if(query!==null)
	{
		new Model({
			name:name,
			email:email,
			message:message,
			date: new Date(Date.now()).toLocaleString().split(',')[0],
			time:new Date().toLocaleTimeString()
		  })
		  .save((err,doc)=>{
			if(err){
			  res.json(err)
			}
			else{
			  var mailOptions = {
				from: 'contact.boramobiles@gmail.com',
				to: 'tanmayjagtap27@gmail.com',
				subject: 'New Contact Entry',
				text: 'Name: '+req.body.name+'\nEmail: '+req.body.email+'\nMessage: '+req.body.message
			  };
		
			  transporter.sendMail(mailOptions, function(error, info){
				if (error) {
				  console.log(error);
				} else {
				  console.log('Email sent: ' + info.response);
				}
			  });
		
			  res.status(200).json("Success");
			}
		  })
		res.status(200).json("Success")
	}
	else
	{
		res.status(400).json("Error")
	}
})

app.listen(3001, () => {
	console.log("Server running on port 3001")
})