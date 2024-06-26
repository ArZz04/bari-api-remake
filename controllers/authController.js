const User = require('../models/User');
const jwt = require('jsonwebtoken');

const { secret, expiresIn } = require('../config/jwt');

const register = async (req, res) => {
    const { name, lastname, username, password } = req.body;
    try {
        const newUser = new User({ name, lastname, username, password});
        await newUser.save();
        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Registration failed' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, username: user.username }, secret, { expiresIn });
        const dataUser = { id: user._id, username: user.username, role: user.role };
        res.cookie('token', token, {
            
        });
        res.json({ dataUser, token });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Login failed' });
    }
};

module.exports = { register, login };
