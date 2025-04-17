const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema({
  name: String,
  url: String,
});

module.exports = ResourceSchema;
