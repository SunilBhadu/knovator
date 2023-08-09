const User = require('../models/User')
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'knovator'

const LocalStrategy = require('passport-local').Strategy;

// Task 2 : APIs for login and registration using passport JWT token.

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists.' });
        }
        // used bcrypt for the purpose to hide password in database and keep it secured.
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, secretKey);
        res.status(201).json({ message: 'User registered successfully.', user: newUser, token: token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'An error occurred.', err });
    }
}

const login = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.status(500).json({ message: 'An error occurred.' });
            }
            const token = jwt.sign({ id: user._id }, secretKey);
            return res.json({ message: 'User signned in successfully.', user, token });
        });
    })(req, res, next);
}

// passport.use is getting called when passport.authenicate is triggerd
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);
module.exports = { register, login }