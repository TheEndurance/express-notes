const Note = require('../models/Notes.js');
const notes = await require('../db/notes.js').model();

exports.getNoteById = async (req,res,next)=>{
    if (req.params.key){
        const key = await notes.keylist();
        if (key && req.params.key===key){
            res.send(await notes.read(req.params.key));
        }
    } else {
        res.status(400).send("Note not found");
    }
}

exports.getNotes = async(req,res,next)=>{
    const keyList = await notes.keylist();
}

exports.createNote = async(req,res,next)=>{

}

exports.deleteNote = async(req,res,next)=>{

}

exports.editNote = async(req,res,next)=>{

}