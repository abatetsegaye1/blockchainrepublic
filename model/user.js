const mongoose = require("mongoose");
const bcrypt = require('bcryptjs'); // Don't forget to install bcryptjs: npm install bcryptjs

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password BEFORE saving (this is crucial)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if password is new or changed

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err); // Handle errors!
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;