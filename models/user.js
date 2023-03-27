const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
