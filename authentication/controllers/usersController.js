const jwt = require('jsonwebtoken');
const fs = require('fs-extra');
const util = require('util');
const userModel = require('../db/users-sequelize.js');

//use promisify to turn fs.readFile into an API that returns promises.
const readFile = util.promisify(fs.readFile);

exports.login = async (req, res, next) => {
    const validUser = await userModel.checkUserAndPassword(req.body.username, req.body.password);
    if (validUser && validUser.check === true) {
        const user = await userModel.find(req.body.username);
        const privateKey = await readFile('jwtRS256.key');
        let token = jwt.sign({
            username: user.username
        }, privateKey, {
            algorithm: 'RS256',
            expiresIn: 86400
        });
        res.status(200).send({
            auth: true,
            token: token
        })
    } else if (validUser && validUser.check === false) {
        res.status(400).send({
            auth: false,
            token: null,
            message: validUser.message
        });
    }
}

//TODO:
exports.register = async (req,res,next) => {
    
}