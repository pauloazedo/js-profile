const express = require('express');
const { seedDatabase } = require('../create_aleatory_users');

const router = express.Router();

// Route to seed database with random users
router.post('/seed-users', async (req, res) => {
    try {
        await seedDatabase();
        res.status(201).json({ message: '50 Aleatory Users Added Successfully!' });
    } catch (error) {
        console.error('Error seeding users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
