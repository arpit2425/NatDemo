const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');
const db = process.env.MongoDb.replace('<PASSWORD>', process.env.password);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('Database Connection successfull'));
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour name is required'],
    unique: true
  },
  price: {
    type: Number,
    required: [true, 'Tour name is required']
  },
  rating: {
    type: Number,
    default: 4.5
  }
});
const Tour = mongoose.model('Tour', tourSchema);
const newTour = new Tour({
  name: 'UK',
  price: 8000
});
newTour
  .save()
  .then(con => {
    console.log(con);
  })
  .catch(er => console.log(er));

app.listen(3000, () => {
  console.log('Server at port 3000');
});
