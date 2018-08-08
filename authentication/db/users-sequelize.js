const Sequelize = require('sequelize');
const jsyaml = require('js-yaml');
const fs = require('fs-extra');
const util = require('util');

let UserModel;
let sequlz;

async function connectDB() {
    if (UserModel) return UserModel.sync();

    const yamlttext = await fs.readFile(process.env.SEQUELIZE_CONNECT, 'utf8');
    const params = await jsyaml.safeLoad(yamlttext, 'utf8');

    if (!sequlz) sequlz = new Sequelize(params.dbname, params.username, params.params);

    sequlz.define('User', {
        username: {
            type: Sequelize.STRING,
            unique: true
        },
        password: Sequelize.STRING,
        provider: Sequelize.STRING,
        familyName: Sequelize.STRING,
        givenName: Sequelize.STRING,
        middleName: Sequelize.STRING,
        emails: Sequelize.STRING(2048),
        photos: Sequelize.STRING(2048)
    });
    return UserModel.sync();
}