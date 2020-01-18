const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');
const Tour = require('./model/tourModel');
const db = process.env.MongoDb.replace('<PASSWORD>', process.env.password);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('Database Connection successfull'));

app.listen(3000, () => {
  console.log('Server at port 3000');
});
