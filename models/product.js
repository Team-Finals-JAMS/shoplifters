const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: mongoose.ObjectId, index: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: sting, required: true },
  category: { type: String, required: true },
  image: { type: string },
});

module.exports = mongoose.model('product', itemSchema);
