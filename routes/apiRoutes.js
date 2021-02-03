const fs = require('fs');
const notesDb = require("../db/db.json");
// const router = require('express').Router();
const generateUniqueId = require('generate-unique-id');
const id = generateUniqueId({
    length: 8,
    useNumbers: true
})


module.exports = function (app) {

    function addNoteToDb(notes) {
        notes = JSON.stringify(notes);
        console.log(notes);
        fs.writeFileSync("./db/db.json", notes, function (err) {
            if (err) {
                return console.log(`Error: ${err}`);
            }
        });
    }

    app.get('/api/notes', (req, res) => {
        res.json(notesDb);
    });

    app.post('/api/notes', (req, res) => {
        const newNote = req.body;
        notesDb.push(newNote);
        addNoteToDb(notesDb);
        console.log(notesDb);
        res.json(newNote);
    });
   
}
