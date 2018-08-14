const express = require('express');
const Note = require('../models/Notes.js');
const NotesController = require('../controllers/notesController.js');
const router = express.Router();
const {
    verifyJWT
} = require('../authorization/auth.js');

//get the note
router.get('/notes/:key', verifyJWT, NotesController.getNoteById);

//get all notes
router.get('/notes', verifyJWT, NotesController.getNotes);

//create note
router.post('/notes', verifyJWT, NotesController.createNote);

//update note
router.put('/notes/:key', verifyJWT, NotesController.editNote);

//delete
router.delete('/notes/:key', verifyJWT, NotesController.deleteNote);

exports.router = router;