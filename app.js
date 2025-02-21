const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const profileController = require('./controllers/profileController');

const app = express();

// Connect to MongoDB
require('./config/db');

// Set the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

// Serve static files (images, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Profile Routes
app.get('/', profileController.index); // Show all profiles
app.get('/create', profileController.create); // Show create profile page
app.post('/create', profileController.createProfile); // Handle profile creation
app.get('/edit/:id', profileController.edit); // Show edit profile page
app.post('/edit/:id', profileController.update); // Handle profile update
app.get('/delete/:id', profileController.deleteProfile); // Handle single profile deletion
app.post('/bulk-delete', profileController.bulkDeleteProfiles); // Handle bulk delete

// Handle 404 errors
app.use((req, res, next) => {
  console.warn(`404 - Page not found: ${req.originalUrl}`);
  res.status(404).send("Sorry, page not found!");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).send("Something went wrong!");
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
