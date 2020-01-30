const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');
const Tour = require('./model/tourModel');
const User = require('./model/userModel');
const db = process.env.MongoDb.replace('<PASSWORD>', process.env.password);
process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  process.exit(1);
});

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('Database Connection successfull'));

const server = app.listen(3000, () => {
  console.log('Server at port 3000');
});
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
