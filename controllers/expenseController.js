const Expense = require('../models/expense');
const User = require('../models/user');
const Joi = require('joi');

const createExpense = async (req, res) => {
    const schema = Joi.object({
        description: Joi.string().required(),
        totalAmount: Joi.number().required(),
        splitMethod: Joi.string().valid('equal', 'exact', 'percentage').required(),
        shares: Joi.array().items(Joi.object({
            user: Joi.string().required(),
            amountOwed: Joi.number(),
            percentage: Joi.number(),
        })),
    });

    const getExpensesByUser = async (req, res) => {
        try {
            const userId = req.params.userId;
            const expenses = await Expense.find({ 'participants.userId': userId });
            res.status(200).json(expenses);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving expenses', error });
        }
    };
    

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const expense = new Expense({ ...req.body, user: req.user.id });
        await expense.save();
        res.status(201).send({ message: 'Expense created successfully' });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

const getUserBalance = async (req, res) => {
    try {
        const expenses = await Expense.find({ 'shares.user': req.params.userId }).populate('user');
        res.send(expenses);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

const downloadBalanceSheet = async (req, res) => {
    // Logic to create and send a CSV file
};

module.exports = { createExpense, getUserBalance, downloadBalanceSheet };
