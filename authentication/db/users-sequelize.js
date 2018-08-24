const Sequelize = require('sequelize');
const jsyaml = require('js-yaml');
const fs = require('fs-extra');
const util = require('util');
const bcrypt = require('bcryptjs');

let UserModel;
let sequlz;

const readFile = util.promisify(fs.readFile);

async function connectDB() {
    if (UserModel) return UserModel.sync();
    const yamlttext = await readFile(process.env.SEQUELIZE_CONNECT, 'utf8');
    const params = await jsyaml.safeLoad(yamlttext, 'utf8');
    if (!sequlz) sequlz = new Sequelize(params.dbname, params.username, params.password, {
        ...params.params
    }
    );
    if (!UserModel) UserModel = sequlz.define('User', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
        },
        password: Sequelize.STRING,
    });
    return UserModel.sync();
}

exports.createUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 8);
    const userModel = await connectDB();
    const user = await userModel.create({
        username: username,
        password: hashedPassword
    });
    return user;
}


exports.find = async (username) => {
    const userModel = await connectDB();
    const user = await userModel.find({
        where: {
            username: username
        }
    });
    const ret = user ? user : undefined;
    return ret;
}

exports.checkUserAndPassword = async (username, password) => {
    const userModel = await connectDB();
    const user = await userModel.findOne({
        where: {
            username: username
        }
    });
    if (!user) {
        return {
            check: false,
            username: username,
            message: "Could not find user"
        };
    } else if (user.username === username) {
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (passwordIsValid) {
            return {
                check: true,
                username: user.username
            };
        } else {
            return {
                check: false,
                username: username,
                message: "Incorrect password"
            };
        }
    }
}