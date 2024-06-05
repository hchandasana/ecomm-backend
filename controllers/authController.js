const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');

module.exports = {
    register: async (req, res, next) => {
        const { username, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }

            user = new User({
                username,
                email,
                password,
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const token = jwt(user);

            res.json({ token });
        } catch (err) {
            next(err);
        }
    },
    login: async (req, res, next) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const token = jwt(user);

            res.json({ token });
        } catch (err) {
            next(err);
        }
    }
};