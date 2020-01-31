const express = require('express');
const userRoute = express.Router();
const userController = require('./../controller/userController');
const authController = require('./../controller/authController');
userRoute.route('/signup').post(authController.signup);
userRoute.route('/login').post(authController.login);
userRoute.route('/forgotPassword').post(authController.forgotPassword);
userRoute.route('/resetPassword').patch(authController.resetPassword);
userRoute
  .route('/')
  .get(authController.protect, userController.getAllUsers)
  .post(userController.createUser);
userRoute
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getUser
  )
  .put(
    authController.protect,
    authController.restrictTo('admin'),
    userController.updateUser
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser
  );

module.exports = userRoute;
