const mongoose = require('mongoose');

const timeStockSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    open: {
      type: Number,
      required: true,
    },
    high: {
      type: Number,
      required: true,
    },
    low: {
      type: Number,
      required: true,
    },
    close: {
      type: Number,
      required: true,
    },
  },
);

module.exports = mongoose.model('Time Stock', timeStockSchema);
