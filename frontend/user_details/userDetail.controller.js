angular
  .module("expenseTrackerApp")
  .controller("UserDetailController", function ($scope, $window, UserService) {
    $scope.users = [];

    UserService.getUsers()
      .then(function (response) {
        $scope.users = response.data;
      })
      .catch(function (err) {
        console.error("Failed to load users:", err);
      });

    $scope.addExpenses = function (user) {
      // localStorage.removeItem("editExpense");
      // localStorage.setItem("userId", user.id);
      $window.location.href = `../expensesTracker/expensesTracker.html?userId=${
        user.id
      }&userName=${encodeURIComponent(user.name)}`;
    };

    $scope.viewExpenses = function (user) {
      $window.location.href = `../user_expenses/userExpenses.html?userId=${
        user.id
      }&userName=${encodeURIComponent(user.name)}`;
    };

    $scope.updateUser = function (user) {
      $window.location.href = `../add_user/addUser.html?id=${user.id}`;
    };

    $scope.deleteUser = function (user, index) {
      UserService.deleteUser(user.id)
        .then(function () {
          $scope.users.splice(index, 1);
        })
        .catch(function (err) {
          console.error("Delete failed:", err);
        });
    };
  });
