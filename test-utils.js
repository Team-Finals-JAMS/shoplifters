const mongoose = require('mongoose');
const models = [require('./models/product'), require('./models/order'), require('./models/users')];

module.exports = {};

module.exports.connectDB = async () => {
  await mongoose.connect(global.__MONGO_URI__, { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true,
    useFindAndModify: true
  });
  await Promise.all(models.map(m => m.syncIndexes()));
}

module.exports.stopDB = async () => {
  await mongoose.disconnect();
}

module.exports.clearDB = async () => {
  await Promise.all(models.map(model => model.deleteMany()))
}