const express = require('express');
const tourRoute = express.Router();
const tourController = require('./../controller/tourController');
const authController = require('./../controller/authController');

// tourRoute.param('id', tourController.checkID);
tourRoute
  .route('/top-5-tours')
  .get(tourController.top5, tourController.getTours);

tourRoute
  .route('/')
  .get(tourController.getTours)

  .post(tourController.newTour);

tourRoute
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.getTour
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.deleteTour
  );

module.exports = tourRoute;
