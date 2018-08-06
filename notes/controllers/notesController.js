const Note = require('../models/Notes.js');
const notes = require('../db/notes.js');


exports.getNoteById = async (req, res, next) => {
    if (req.params.key) {
        const key = await notes.keylist();
        if (key && req.params.key === key) {
            res.send(await notes.read(req.params.key));
        }
    } else {
        res.status(400).send("Note not found");
    }
}

exports.getNotes = async (req, res, next) => {
    const keyList = await notes.keylist();
    const notesArray = [];
    for (let key of keyList) {
        notesArray.push(await notes.read(key));
    }
    res.send(notesArray);

}

exports.createNote = async (req, res, next) => {
    try {
        const newNote = await notes.create(req.body.key, req.body.title, req.body.body);
        res.send(newNote);
    } catch (e){
        res.status(400).send(e.toString());
    }
}

exports.deleteNote = async (req, res, next) => {
    if (req.params.key) {
        const msg = await notes.delete(req.params.key);
        if (!msg) {
            res.status(200).send();
        }
        res.status(400).send(msg);
    }
}

exports.editNote = async (req, res, next) => {
    const updatedNote = await notes.update(req.body.key, req.body.title, req.body.body);
    if (updatedNote instanceof Note) {
        res.send(updatedNote);
    }
    res.status(400).send(updatedNote);
}