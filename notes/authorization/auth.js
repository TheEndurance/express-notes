const fs = require('fs-extra');
const util = require('util');
const path = require('path');
const jwt = require('jsonwebtoken');
const readFileAsync = util.promisify(fs.readFile);


exports.verifyJWT = async (req, res, next) => {
    let err;
    if (req.headers.authorization) {
        const auth = req.headers.authorization.split(' ');
        if (auth.length === 2) {
            if (auth[0] === "JWT" || auth[0] === "jwt") {
                const publicKey =  await readFileAsync(path.join(__dirname,'..', 'jwtRS256.key.pub'));
                try {
                    const payload = jwt.verify(auth[1], publicKey, {
                        algorithms: ['RS256']
                    });
                    req.payload = payload;
                    return next();
                } catch (e) {
                    err = new Error(`Token verfication error: ${e}`);
                }
            } else {
                err = new Error("Token type must be JWT or jwt");
            }
        } else {
            err = new Error("Incorrect authorization format");
        }
    } else {
        err = new Error("No Authorization header specified");
    }
    if (err) {
        return next(err);
    }
}