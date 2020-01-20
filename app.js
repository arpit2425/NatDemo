const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRoute = require('./routes/tourRoutes');
const userRoute = require('./routes/userRoutes');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toLocaleString();
  next();
});

app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'Fail',
  //   message: `No route with ${req.originalUrl} found in server`
  // });
  const err = new Error(`No route with ${req.originalUrl} found in server`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});
app.use((err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});
module.exports = app;
