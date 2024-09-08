const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/odysseyDB')
  .then(() => {
    console.log('mongodb:connected!');
  })
  .catch(e => {
    console.log(e);
  });

module.exports = mongoose;
