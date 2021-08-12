const mongoose = require('mongoose');
const User = require('../models/user');

Module.export = {};

Module.export.getUserByEmail = async (userEmail) => {
  return await User.findOne({ email: userEmail }).lean();
};
