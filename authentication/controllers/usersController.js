const jwt = require('jsonwebtoken');
const fs = require('fs-extra');
const util = require('util');
const userModel = require('../db/users-sequelize.js');

//use promisify to turn fs.readFile into an API that returns promises.
const readFile = util.promisify(fs.readFile);

exports.login = async (req, res, next) => {
    console.log("login request");
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({
            auth: false,
            token: null,
            message: "Missing username or password"
        });
    }
    try {
        const validUser = await userModel.checkUserAndPassword(req.body.username, req.body.password);
        console.log(validUser);
        if (validUser && validUser.check === true) {
            const user = await userModel.find(req.body.username);
            const privateKey = await readFile('./jwtRS256.key');
            let token = jwt.sign({
                username: user.username
            }, privateKey, {
                algorithm: 'RS256',
                expiresIn: 86400
            });
            return res.status(200).send({
                auth: true,
                token: token
            });
        } else if (validUser && validUser.check === false) {
            return res.status(401).send({
                auth: false,
                token: null,
                message: validUser.message
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send("Server error");
    }
}

exports.register = async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({
            auth: false,
            token: null,
            message: "Missing username or password"
        });
    }
    try {
        const user = await userModel.find(req.body.username);
        if (user !== undefined) {
            return res.status(400).send({
                auth: false,
                token: null,
                message: `${user.username} already exists`
            });
        } else {
            const user = await userModel.createUser(req.body.username, req.body.password);
            console.log(user.dataValues);
            if (user && user.username) {
                const privateKey = await readFile('./jwtRS256.key');
                let token = jwt.sign({
                    username: user.username
                }, privateKey, {
                    algorithm: 'RS256',
                    expiresIn: 86400
                });
                return res.status(200).send({
                    auth: true,
                    token: token
                });
            }
            return res.status(400).send({
                message: "Something went wrong"
            });
        }
    } catch (e){
        console.log(e);
        return res.status(500).send("Server error");
    }
}