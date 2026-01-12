const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

//userSchema.pre((data)=> { data.password =bcrypt.hasSync(data.password, 10)}) could do something like this that uses data before db

module.exports = User;


