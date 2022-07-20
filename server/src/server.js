require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const createError = require('http-errors');
const routes = require('./routes');
const errorHandleRequest = require('./middleware/errorHandleRequest');
const connectDB = require('./services/connectDB');

const PORT = process.env.PORT || 5554;

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1', routes);
app.use('/hello', (req, res) => {
  res.status(200).json({ message: 'Hello ông bình!' });
});
app.use('*', (req, res, next) => {
  next(createError(404, 'Not found this page'));
});
app.use(errorHandleRequest);

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('db is stopped');
});

app.listen(PORT, () => {
  connectDB();
  console.log('Server running on port ' + PORT);
});
