const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(cors())

app.get('/', (req,res) => {
	res.json("This is working.");
})

app.post('/contact', (req,res) => {
	const query = req.body;
	const {name, email, message} = query;
	if(query!==null)
	{
		console.log("Name: "+name);
		console.log("Email: "+email)
		console.log("Message: "+message);
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