'use strict';

module.exports = class Note {
    constructor(key,title,body){
        if (key === undefined) throw new Error('Missing key');
        if (title === undefined) throw new Error ('Missing title');
        if (body === undefined) throw new Error ('Missing body');
        this.key = key;
        this.title = title;
        this.body = body;
    }   
}