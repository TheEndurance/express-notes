const Note = require('../models/Notes.js');

const notes = [];

exports.update = exports.create = function(key,title,body){
    return new Promise((resolve,reject)=>{
        notes[key] = new Note(key,title,body);
        resolve(notes[key]);
    });
}

exports.read = function(key){
    return new Promise((resolve,reject)=>{
        if (notes[key]){
            resolve(notes[key]);
        } else {
            reject(`Note with key '${key}' does not exist.`);
        }
    });
}

exports.delete = function(key){
    return new Promise((resolve,reject)=>{
        if (notes[key]){
            delete notes[key];
            resolve();
        } else {
            reject(`Note with key '${key} does not exist.'`);
        }
    });
}

exports.keylist =  function(){
    return new Promise((resolve,reject)=>{
        resolve(Object.keys(notes));
    });
}

exports.count =  function(){
    return new Promise((resolve,reject)=>{
        resolve(notes.length);
    });
}

exports.close = function(){
    return new Promise((resolve,reject)=>{
        resolve();
    });
}