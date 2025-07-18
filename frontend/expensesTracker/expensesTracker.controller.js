angular.module("expenseTrackerApp")
  .controller("ExpenseController", function ($scope,  $window, ExpenseService) {
    $scope.expense = {};
    $scope.user = {};
    $scope.isUpdateMode = false;

    const params = new URLSearchParams(window.location.search);
    const userId = parseInt(params.get("userId"));
    const expenseId = parseInt(params.get("editExpenseId"));
    $scope.isUpdateMode = !!expenseId;

    $scope.handleCategoryChange = function () {
      if ($scope.expense.category !== "Others") {
        $scope.expense.miscellaneous = "";
      }
    };

    $scope.submitExpense = function () {
      if (!$scope.expense.amount || $scope.expense.amount < 0) {
        alert("Amount must be greater than or equal to 0.");
        return;
      }

      const data = {
        ...$scope.expense,
        userId,
        expenseDate: $scope.expense.date
      };

      const request = $scope.isUpdateMode
        ? ExpenseService.updateExpense(expenseId, data)
        : ExpenseService.createExpense(data);

      request
        .then(() => {
          alert($scope.isUpdateMode ? "Expense updated" : "Expense added");
          $window.location.href = `../user_expenses/userExpenses.html?userId=${userId}`;
        })
        .catch((err) => {
          console.error("Error submitting expense:", err);
          alert("Submission failed");
        });
    };

    function init() {
      ExpenseService.getUserById(userId)
        .then(res => $scope.user = res.data)
        .catch(() => alert("Failed to load user info"));

      if ($scope.isUpdateMode) {
        ExpenseService.getExpenseById(expenseId)
          .then(res => $scope.expense = res.data)
          .catch(() => alert("Failed to load expense data"));
      }
    }

    init();
  });
