const User = require('./../model/userModel');
const catchAsyn = require('./../utils/catchAsync');

exports.getAllUsers = catchAsyn(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    // requestTime: ret,
    status: 'success',
    results: users.length,
    data: users
  });
});
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not available'
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not available'
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not available'
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not available'
  });
};
