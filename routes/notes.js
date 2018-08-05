const express = require('express');
const Note = require('../models/Notes.js');
const NotesController = require('../controllers/notesController.js');
const router = express.Router();

//get the note
router.get('/notes/:key',NotesController.getNoteById);

//get all notes
router.get('/notes',NotesController.getNotes);

//create note
router.post('/notes',NotesController.createNote);

//update note
router.put('/notes/:key',NotesController.editNote);

//delete
router.delete('/notes/:key',NotesController.deleteNote);


exports.router = router;