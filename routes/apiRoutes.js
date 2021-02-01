const fs = require('fs');
const router = require('express').Router();
const generateUniqueId = require('generate-unique-id');
const id = generateUniqueId({
    length: 8,
    useNumbers: true
})

function addNoteToDb(notes){
    notes = JSON.stringify(notes);
    console.log(notes);
    fs.writeFileSync("../db/db.json", notes, function(err){
        if(err){
            return console.log(`Error: ${err}`);
        }
    });


router.get('/api/notes', (req, res) => {
    const note = fs.readFile('../db/db.json');
    res.json(note);
});
// router.get('/api/notes:note', (req, res) => {
//     const note = req.params.note;
//     console.log(note);
// });

router.post('/api/notes', (req, res) =>{
    const newNote = req.body;
    notes.push(newNote);
    addNoteToDb(note);
    console.log(note);
    res.json(newNote);
})
addNoteToDb(notes)
}



module.exports = router;