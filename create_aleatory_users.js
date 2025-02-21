require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Profile = require('./models/Profile'); // Adjust the path if needed

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });

// Function to Generate Fake Profiles
const generateFakeProfiles = (count) => {
  return Array.from({ length: count }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    interests: Array.from({ length: 3 }, () => faker.word.words(1)), // Generate 3 random interests
    profilePicture: 'default_profile.jpg', // Use the correct path for default profile image
  }));
};

// Seed Database
const seedDatabase = async () => {
  try {
    const fakeProfiles = generateFakeProfiles(50);

    // Insert New Profiles Without Removing Existing Ones
    await Profile.insertMany(fakeProfiles);
    console.log('✅ Successfully inserted 50 fake users');

    mongoose.connection.close(); // Close connection after insertion
    console.log('🔌 Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error inserting users:', error);
    mongoose.connection.close();
  }
};

// Execute the seeding function
seedDatabase();
