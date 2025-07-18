angular
  .module("expenseTrackerApp")
  .controller(
    "UserExpensesController",
    function ($scope, $window, ExpenseService) {
      const params = new URLSearchParams($window.location.search);
      const userId = parseInt(params.get("userId"));
      const userName = params.get("userName");

      $scope.expenses = [];
      $scope.filteredExpenses = [];
      $scope.selectedDays = 7;
      $scope.heading = "";

      if (!userId) {
        alert("No user selected");
        return;
      }

      ExpenseService.getUserById(userId)
        .then((res) => {
          const nameFromBackend = res.data && res.data.name;
          $scope.heading = `${
            userName || nameFromBackend || "User"
          }'s Expenses`;
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
          alert("Unable to load user info");
        });

      ExpenseService.getAllExpensesByUserId(userId)
        .then((res) => {
          $scope.expenses = res.data;
          console.log("Fetched expenses:", $scope.expenses);
          $scope.filterByDays();
        })
        .catch((err) => {
          console.error("Failed to fetch expenses:", err);
          alert("Unable to load expenses");
        });

      $scope.filterByDays = function () {
        const today = new Date();
        const past = new Date();
        past.setDate(today.getDate() - $scope.selectedDays);

        $scope.filteredExpenses = $scope.expenses.filter((exp) => {
          const rawDate = exp.ExpenseDate || exp.expenseDate;
          if (!rawDate) return false;

          try {
            const parsedDate = new Date(
              rawDate.includes("T") ? rawDate : rawDate.replace(" ", "T")
            );
            return parsedDate >= past && parsedDate <= today;
          } catch (e) {
            console.warn("Invalid date format:", rawDate);
            return false;
          }
        });

        console.log("Filtered expenses:", $scope.filteredExpenses); // Debug
      };

      $scope.formatDate = function (rawDate) {
        return rawDate ? new Date(rawDate).toLocaleDateString() : "N/A";
      };

      $scope.addExpense = function () {
        $window.location.href = `../expensesTracker/expensesTracker.html?userId=${userId}`;
      };

      $scope.editExpense = function (exp) {
        const expenseId = exp.id || exp.Id;
        $window.location.href = `../expensesTracker/expensesTracker.html?userId=${userId}&editExpenseId=${expenseId}`;
      };

      $scope.deleteExpense = function (expenseId) {
        if (!expenseId) {
          alert("Expense ID is missing!");
          return;
        }
        if (confirm("Are you sure you want to delete this expense?")) {
          ExpenseService.deleteExpense(expenseId)
            .then(function () {
              $scope.expenses = $scope.expenses.filter(
                (exp) => (exp.id || exp.Id) !== expenseId
              );
              $scope.filterByDays();
            })
            .catch(function (error) {
              console.error("Error deleting expense:", error);
              alert("Failed to delete expense.");
            });
        }
      };
    }
  );
