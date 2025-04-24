const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema(
  {
    name: String,
    url: String,
  },
  {
    timestamps: true,
  }
);

module.exports = ResourceSchema;
