const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true }, // Index for sorting
  email: { type: String, required: true, unique: true },
  interests: { type: [String], required: true }, // Store interests as an array
  profilePicture: { type: String, default: 'default.png' } // Default profile picture
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
