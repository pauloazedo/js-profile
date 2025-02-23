const Profile = require('../models/Profile');
const multer = require('multer');
const path = require('path');

// Multer storage configuration for profile picture upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Index route: Show all profiles
exports.index = async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ name: 1 });
    res.render('index', { profiles });
  } catch (err) {
    console.error('Error fetching profiles:', err);
    res.status(500).send('Error fetching profiles');
  }
};

// Create profile page
exports.create = (req, res) => {
  res.render('createProfile');
};

// Handle profile creation
exports.createProfile = [
  upload.single('profilePicture'),
  async (req, res) => {
    try {
      const { name, email, interests } = req.body;
      const profilePicture = req.file ? req.file.filename : 'default.png';
      const formattedInterests = interests ? interests.split(',').map(i => i.trim()) : [];

      const newProfile = new Profile({
        name,
        email,
        interests: formattedInterests,
        profilePicture
      });

      await newProfile.save();
      res.redirect('/');
    } catch (err) {
      console.error('Error creating profile:', err);
      res.status(500).send('Error creating profile');
    }
  }
];

// Edit profile page
exports.edit = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).send('Profile not found');
    res.render('editProfile', { profile });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).send('Error fetching profile');
  }
};

// Handle profile update
exports.update = [
  upload.single('profilePicture'),
  async (req, res) => {
    try {
      const { name, email, interests } = req.body;
      const updatedProfile = await Profile.findById(req.params.id);
      if (!updatedProfile) return res.status(404).send('Profile not found');

      updatedProfile.name = name;
      updatedProfile.email = email;
      updatedProfile.interests = interests ? interests.split(',').map(i => i.trim()) : [];

      if (req.file) updatedProfile.profilePicture = req.file.filename;

      await updatedProfile.save();
      res.redirect(`/edit/${req.params.id}`);
    } catch (err) {
      console.error('Error updating profile:', err);
      res.status(500).send('Error updating profile');
    }
  }
];

// Handle single profile deletion
exports.deleteProfile = async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error('Error deleting profile:', err);
    res.status(500).send('Error deleting profile');
  }
};

// Handle bulk profile deletion
exports.bulkDeleteProfiles = async (req, res) => {
  try {
    const { profileIds } = req.body;
    if (!Array.isArray(profileIds) || profileIds.length === 0) {
      return res.status(400).send("Invalid request: No profiles selected.");
    }

    await Profile.deleteMany({ _id: { $in: profileIds } });
    res.status(200).send("Profiles deleted successfully.");
  } catch (err) {
    console.error('Error deleting profiles:', err);
    res.status(500).send('Error deleting profiles.');
  }
};
