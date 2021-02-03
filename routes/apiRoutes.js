const fs = require('fs');
const notesDb = require("../db/db.json");
const generateUniqueId = require('generate-unique-id');



module.exports = function (app) {

    fs.readFile("./db/db.json", 'utf-8', (err, data) => {
        if (err) throw err;

        let parsedNote = JSON.parse(data);


    app.get('/api/notes', (req, res) => {
        res.json(parsedNote);
        res.end();
    })

    app.post('/api/notes', (req, res) => {
        const newNote = req.body;

        const noteId = {
            title: newNote.title,
            text: newNote.text,
            id: generateUniqueId({
                length: 5,
                useNumbers: true,
                useLetters: false
            })
        };

        notesDb.push(noteId);
        addNoteToDb(notesDb);
        console.log(notesDb);
        res.json(notesDb);
        res.end();
    });

    app.get('api/notes/:id', (req, res) => {
        res.json(notesDb[req.params.id]);
        res.end();
    })

    app.delete('api/notes/:id', (req, res) => {
        notesDb.splice(req.params.id, 1);
        addNoteToDb(notesDb);
        res.json(notesDb);
        res.end();
    })
})

function addNoteToDb(notes) {
    notes = JSON.stringify(notes);
    console.log(notes);
    fs.writeFileSync("./db/db.json", notes, function (err) {
        if (err) {
            return console.log(`Error: ${err}`);
        }
    });
}
}
