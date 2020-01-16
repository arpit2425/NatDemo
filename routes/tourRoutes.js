const express = require('express');
const tourRoute = express.Router();
const tourController = require('./../controller/tourController');

tourRoute
  .route('/')
  .get(tourController.getTours)
  .put(tourController.newTour);

tourRoute.route('/:id').get(tourController.getTour);

module.exports = tourRoute;
