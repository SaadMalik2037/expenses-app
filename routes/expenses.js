const express = require('express');
const Expense = require('../models/expense');
const router = express.Router();

// Create a new expense
router.post('/', async (req, res) => {
    try {
        const { description, amount, splitMethod, participants } = req.body;
        const newExpense = new Expense({ description, amount, splitMethod, participants });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/:userId', expenseController.getExpensesByUser);

// Retrieve all expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find().populate('participants.userId');
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
