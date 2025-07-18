angular.module("expenseTrackerApp")
  .service("ExpenseService", function ($http) {

    this.getUserById = function (id) {
      return $http.get(`http://localhost:5000/userDetails/${id}`);
    };

    this.getAllExpensesByUserId = function (userId) {
      return $http.get(`http://localhost:5000/expensesTracker/user/${userId}`);
    };

     this.deleteExpense = function (expenseId) {
    return $http.delete("http://localhost:5000/expensesTracker/" + expenseId);
  };
  });
