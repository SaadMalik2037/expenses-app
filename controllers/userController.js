const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const registerUser = async (req, res) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();

        res.status(201).send({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: 'Invalid email or password' });

    const validPassword = await user.comparePassword(password);
    if (!validPassword) return res.status(400).send({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
};

module.exports = { registerUser, loginUser };
