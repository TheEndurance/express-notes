const Note = require('../models/Notes.js');
const notes = require('../db/notes.js');


exports.getNoteById = async (req, res, next) => {
    console.log(req.payload);
    if (req.params.key) {
        try {
            const note = await notes.read(req.params.key);
            return res.json(note);
        } catch (e) {
            return res.status(400).send(`Note not found : ${e}`);
        }
    } else {
        return res.status(400).send("Key parameter missing");
    }
}

exports.getNotes = async (req, res, next) => {
    const keyList = await notes.keylist();
    const notesArray = [];
    for (let key of keyList) {
        try {
            notesArray.push(await notes.read(key));
        } catch (e) {
            return res.status(400).send(`Failure to get notes: ${e}`);
        }
    }
    return res.json(notesArray);
}

exports.createNote = async (req, res, next) => {
    try {
        const newNote = await notes.create(req.body.key, req.body.title, req.body.body);
        return res.json(newNote);
    } catch (e) {
        return res.status(400).send(`Failure to create note: ${e}`);
    }
}

exports.deleteNote = async (req, res, next) => {
    if (req.params.key) {
        try {
            await notes.delete(req.params.key);
            return res.status(200).send();
        } catch (e) {
            return res.status(400).send(`Failure to delete note: ${e}`);
        }
    } else {
        return res.status(400).send('Missing key parameter');
    }
}

exports.editNote = async (req, res, next) => {
    try {
        const updatedNote = await notes.update(req.body.key, req.body.title, req.body.body);
        return res.json(updatedNote);
    } catch (e) {
        return res.status(400).send(`Failure to update note ${e}`);
    }
}