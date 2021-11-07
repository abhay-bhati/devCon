const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("users", UserSchema);
