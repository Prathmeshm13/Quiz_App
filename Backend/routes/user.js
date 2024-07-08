const express = require('express');
const { User } = require('../models/user');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { getUser, setUser } = require('../service/auth');

router.post('/signup', async (req, res) => {
    const { name, email, username, password, instituteName, passingYear } = req.body;
    console.log('Signup request body:', req.body);
    try {
        const user = await User.create({
            fullName: name,
            email: email,
            username: username,
            password: password,
            instituteName: instituteName,
            passingYear: passingYear,
            scores: [],
        });
        console.log('User created successfully:', user);
        res.status(201).redirect('http://localhost:5173/quiz/create-quiz');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const sessionId = uuidv4();
    console.log('Login request body:', req.body);
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            setUser(sessionId, user);
            res.cookie('uid', sessionId, {
                httpOnly: true,
                secure: false, // Set to true if using HTTPS
                sameSite: 'Lax'
            });
            console.log('User found:', user);
            res.status(201).redirect('http://localhost:5173/quiz/create-quiz');
        } else {
            console.warn('Incorrect username or password');
            res.status(401).json({ error: 'Incorrect username or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
