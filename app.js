const express = require('express');
const path = require('path'); // core module - no need to download
const bodyParser = require('body-parser');

const app = express();

// Set Static path using middleware
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json 
app.use(bodyParser.json())

// Serve JSON
app.get('/users', (req, res) => {
	let users = [
		{
			first_name: "John",
			last_name: "Doe",
			age: 34,
			gender: "male"
		},
		{
			first_name: "Tom",
			last_name: "Jackson",
			age: 23,
			gender: "male"
		},
		{
			first_name: "Tracy",
			last_name: "Smith",
			age: 38,
			gender: "female"
		},
	];

	res.json(users);
});

// serve PDFs
app.get('/downloads', (req, res) => {
	res.download(path.join(__dirname, '/downloads/pdf.pdf'));
});

// routes
app.get('/about', (req, res) => {
	res.redirect('/about.html');
});

// post form data to our server - no database set up yet
app.post('/subscribe', (req, res) => {
	let name = req.body.name;
	let email = req.body.email;
	console.log(name + ' has subscribed with ' + email);
});

// listen for the server
app.listen(3000, () => {
	console.log('Server started on port 3000');
});