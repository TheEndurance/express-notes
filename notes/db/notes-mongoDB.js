const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const connectionString = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@db-notes:27017/`;
console.log(process.env.MONGODB_USERNAME);


let client;
const NOTES = 'notes';

async function connectDB() {
    if (!client) client = await MongoClient.connect(connectionString);
    return {
        db: client.db(process.env.MONGODB_DATABASE);
        client: client
    };
}

exports.create = async (key,title,body) =>  {
    const { db, client } = await connectDB();
    const note = new Note(key,title,body);
    await db.collection(NOTES).insertOne({ notekey: key, title, body});
    client.close();
    return note;
}

exports.update = async (key,title,body) => {
    const { db, client } = await connectDB();
    const note = new Note(key,title,body);
    await db.collection(NOTES).updateOne({ notekey: key }, { $set: { title, body} });
    client.close();
    return note;
}

exports.read = async (key) => {
    const { db, client } = await connectDB();
    const doc = await db.collection(NOTES).findOne({notekey:key});
    const note = new Note(doc.notekey,doc.title,doc.body);
    client.close();
    return note;
}

exports.delete = async (key) => {
    const { db, client } = await connectDB();
    await db.collection(NOTES).findOneAndDelete({notekey: key});
    client.close();
}

exports.keylist = async() => {
    const { db, client } = await connectDB();
    let keys = [];
    try {
    const notesCursor = await db.collection(NOTES).find({});
        if (notesCursor) {
            notesCursor.forEach(
                (note) => keys.push(note.notkey),
                (err) => throw new Error(err)
            );
        };
    } catch (e){
        console.error(`${e}`);
    }
    return keys;
};