const express = require('express');
const app = express();
const morgan = require('morgan');
const globalErrorHandler = require('./controller/errorController');
const appError = require('./utils/appError');
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
  next(new appError(`No route with ${req.originalUrl} found in server`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
