const express = require('express');
const router = express.Router();
const expensesTrackerController = require('../controller/expenseTracker.controller');

router.post('/expensesTracker', expensesTrackerController.createExpense);
router.get('/expensesTracker/user/:userId', expensesTrackerController.getExpensesByUserId);
router.delete('/expensesTracker/:id', expensesTrackerController.deleteExpenseById);
router.get('/expensesTracker', expensesTrackerController.getAllExpenses);
router.get('/expensesTracker/:id', expensesTrackerController.getExpenseById); 
router.put("/expensesTracker/:id", expensesTrackerController.updateExpenseById);


module.exports = router;




