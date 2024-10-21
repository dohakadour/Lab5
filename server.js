// Import the necessary modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Import body-parser to handle POST request data
const app = express();
const port = 3000;

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to parse URL-encoded data from POST requests
app.use(bodyParser.urlencoded({ extended: true }));


// Serve the index.html file when the /index route is requested
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle the GET request for /name when the form is submitted
app.get('/name', (req, res) => {
    // Extract firstname and lastname from the query parameters
    const firstname = req.query.firstname;
    const lastname = req.query.lastname;

    // Send a greeting response using the submitted names
    res.send(`Hello ${firstname} ${lastname}`);
});

// Basic route to display a welcome message
app.get('/', (req, res) => {
    res.send('Welcome to Data Representation & Querying');
});

// Route that accepts a name parameter and returns a greeting
app.get('/hello/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Hello ${name}`);
});

// Route that accepts both name and surname parameters and returns a greeting
app.get('/hello/:name/:surname', (req, res) => {
    const name = req.params.name;
    const surname = req.params.surname;
    res.send(`Hello ${name} ${surname}`);
});

// Route to return a list of movie objects in JSON format
app.get('/api/movies', (req, res) => {
    const myMovies = [
        {
            "Title": "Avengers: Infinity War",
            "Year": "2018",
            "imdbID": "tt4154756",
            "Type": "movie",
            "Poster": "https://example.com/poster1.jpg"
        },
        {
            "Title": "Captain America: Civil War",
            "Year": "2016",
            "imdbID": "tt3498820",
            "Type": "movie",
            "Poster": "https://example.com/poster2.jpg"
        },
        {
            "Title": "World War Z",
            "Year": "2013",
            "imdbID": "tt0816711",
            "Type": "movie",
            "Poster": "https://example.com/poster3.jpg"
        }
    ];

    res.status(201).json({ myMovies });
});

// Handle the POST request for /name when the form is submitted via POST method
app.post('/name', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    res.send(`Hello ${firstname} ${lastname}`);
});


// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
