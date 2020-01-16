const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRoute = require('./routes/tourRoutes');
const userRoute = require('./routes/userRoutes');
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

app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);

module.exports = app;
