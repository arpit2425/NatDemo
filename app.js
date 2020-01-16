const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  console.log('HEllo from middle');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toLocaleString();
  next();
});
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
const getTours = (req, res) => {
  const ret = req.requestTime;
  res.status(200).json({
    requestTime: ret,
    status: 'success',
    results: tours.length,
    data: tours
  });
};
const newTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);
  if (!tour) {
    res.status(404).json({
      message: 'Invalid Tour'
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  }
};

app
  .route('/api/v1/tours')
  .get(getTours)
  .put(newTour);

app.route('/api/v1/tours/:id').get(getTour);
app.listen(3000, () => {
  console.log('Server at port 3000');
});
