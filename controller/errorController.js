const appError = require('./../utils/appError');
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    console.error('error', err);
    res.status(500).json({
      status: 'Error',
      message: 'Something went Wrong'
    });
  }
};
const handleValidationError = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid Input  ${errors.join('. ')}   `;
  return new appError(message, 400);
};
const handleDuplicateErrorDb = err => {
  const e = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];

  const message = `Duplicate value ${e}. Try some different value`;
  return new appError(message, 400);
};
const handleCastErrorDb = err => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new appError(message, 400);
};
module.exports = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'CastError') {
      error = handleCastErrorDb(error);
    }
    if (error.code === 11000) error = handleDuplicateErrorDb(error);
    if (error.name === 'ValidationError') error = handleValidationError(error);
    sendErrorProd(error, res);
  }
};
