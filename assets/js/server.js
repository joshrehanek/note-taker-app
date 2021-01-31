// Dependencies

const express = require('express');
const path = require('path');
const fs = require('fs');

//Express App setup
const app = express();
const PORT = 3000;

//middleware to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));



app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));