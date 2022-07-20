const mongoose = require('mongoose');

const connectDB = async () => {
  mongoose
    .connect(`${process.env.URL_CONNECT_DB}`)
    .then(() => console.log('Connected to success'))
    .catch((err) => console.error(err));

  mongoose.connection.on('connected', () => console.log('Connected::: success'));
  mongoose.connection.on('disconnected', () => console.log('Disconnected:::'));
};

module.exports = connectDB;
