const express = require('express')
const tourRoute = express.Router()
const tourController = require('./../controller/tourController')

// tourRoute.param('id', tourController.checkID);

tourRoute
  .route('/')
  .get(tourController.getTours)

  .post(tourController.newTour)

tourRoute
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour)

module.exports = tourRoute
