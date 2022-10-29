const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  name: { type: String, required: true }, 
  watchlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media"
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);