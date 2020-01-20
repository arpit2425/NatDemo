// const fs = require('fs');
const Tour = require('./../model/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );
// exports.checkID = (req, res, next, val) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       message: 'Invalid Tour'
//     });
//   }
//   next();
// };
// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'Fail',
//       message: 'Missing Name or Price'
//     });
//   }
//   next();
// };

exports.top5 = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage';
  next();
};
exports.getTours = async (req, res) => {
  try {
    // const queryObj = { ...req.query };
    // const ExcludeField = ['sort', 'page', 'limit', 'fields'];
    // ExcludeField.forEach(el => delete queryObj[el]);
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    // let query = Tour.find(JSON.parse(queryStr));
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(',').join(' ');

    //   query = query.sort(sortBy);
    // }
    // if (req.query.fields) {
    //   const sel = req.query.fields.split(',').join(' ');
    //   query = query.select(sel);
    // } else {
    //   query = query.select('-__v');
    // }
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 10;
    // const skip = (page - 1) * limit;
    // query = query.skip(skip).limit(limit);
    // if (req.query.page) {
    //   const numtour = await Tour.countDocuments();
    //   if (skip >= numtour) throw new Error("Page doesn't exists");
    // }
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    // const ret = req.requestTime;
    res.status(200).json({
      // requestTime: ret,
      status: 'success',
      results: tours.length,
      data: tours
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};
exports.newTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    });
  }

  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   err => {
  //     res.status(201).json({
  //       status: 'success',
  //       data: {
  //         tour: newTour
  //       }
  //     });
  //   }
  // );
};
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
  // const id = req.params.id * 1;
  // const tour = tours.find(el => el.id === id);
};
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};
