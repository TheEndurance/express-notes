var TheModule;

const model = exports.model = async () => {
    if (TheModule) return TheModule;
    TheModule = await require(`../db/notes-${process.env.NOTES_MODEL}`);
    return TheModule;
}

exports.create = async (key,title,body) => {
    return await (await model()).create(key,title,body);
}

exports.update = async (key,title,body) => {
    return await (await model()).update(key,title,body);
}

exports.read = async (key) => {
    return await (await model()).read(key);

}

exports.delete = async (key) => {
    return await (await model()).delete(key);
}

exports.keylist = async () => {
    return await (await model()).keylist();
}

exports.count = async () => {
    return await (await model()).count();
}

exports.close = async () => {
    return await (await model()).close();
}