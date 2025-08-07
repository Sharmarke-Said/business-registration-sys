const mongoose = require("mongoose");

const businessTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const BusinessType = mongoose.model(
  "BusinessType",
  businessTypeSchema
);

module.exports = BusinessType;
