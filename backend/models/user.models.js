const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  salary: {
    type: String,
    required: true,
  },
  category: [
    {
      type: String,
    },
  ],
  transaction: [
    {
      fee: String,

      date: String,

      info: String,

      category: String,
    },
  ],
  savings: [
    {
      saving: String,

      goal: Number,

      amount: Number,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
