const express = require('express');
const userRoute = express.Router();
const userController = require('./../controller/userController');
const authController = require('./../controller/authController');
userRoute.route('/signup').post(authController.signup);
userRoute.route('/login').post(authController.login);
userRoute
  .route('/')
  .get(authController.protect, userController.getAllUsers)
  .post(userController.createUser);
userRoute
  .route('/:id')
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRoute;
