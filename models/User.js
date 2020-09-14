const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, "is required"]
  },
  password: {
    type: String,
    required: [true, "is required"]
  }
})

schema.pre("save", function(next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if(err) {
      return next(err)
    }
    this.password = hash;
    next();
  });
});

module.exports = mongoose.model("User", schema)