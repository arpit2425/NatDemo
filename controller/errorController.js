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

module.exports = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, res);
  }
};
