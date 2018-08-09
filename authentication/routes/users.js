const express = require('express');
const router = exports.router = express.Router();
const UsersController = require('../controllers/usersController.js');
//user routes

router.post('/login',UsersController.login);

router.post('/register',UsersController.register);

