const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema(
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
      type: String,
      required: true,
    },
    low: {
      type: String,
      required: true,
    },
    close: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model('Launch', stockSchema);
