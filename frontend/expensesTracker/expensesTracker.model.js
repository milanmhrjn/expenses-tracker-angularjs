angular.module("expenseTrackerApp")
  .service("ExpenseService", function ($http) {
    this.getUserById = function (userId) {
      return $http.get(`http://localhost:5000/userDetails/${userId}`);
    };

    this.getExpenseById = function (expenseId) {
      return $http.get(`http://localhost:5000/expensesTracker/${expenseId}`);
    };

    this.createExpense = function (expense) {
      return $http.post("http://localhost:5000/expensesTracker", expense);
    };

    this.updateExpense = function (expenseId, expense) {
      return $http.put(`http://localhost:5000/expensesTracker/${expenseId}`, expense);
    };
  });
