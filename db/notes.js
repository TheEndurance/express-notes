var TheModule;

exports.model = async () => {
    if (TheModule) return TheModule;
    TheModule = await require(`../db/notes-${process.env.NOTES_MODEL}`);
    return TheModule;
}

// exports.create = async (key,title,body) => {

// }

// exports.update = async (key,title,body) => {

// }

// exports.read = async (key) => {

// }

// exports.delete = async (key) => {

// }