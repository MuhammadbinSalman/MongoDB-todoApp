const express = require('express');
const userRoute = express.Router(); 
const path = require('path')
const userController = require('../controller/userController')
const bodyParser = require('body-parser')

userRoute.use(bodyParser.urlencoded({ extended: false }))
userRoute.use(bodyParser.json())


userRoute.post('/create_user', userController.create_user)
userRoute.post('/login_user', userController.login_user)

module.exports = userRoute; 

