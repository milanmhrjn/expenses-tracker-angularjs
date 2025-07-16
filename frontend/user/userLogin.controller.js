angular
  .module("expenseTrackerApp")
  .controller("UserLoginController", function ($scope, $window, UserModel) {
    $scope.user = {
      name: "",
      password: "",
    };

    $scope.login = function () {
      UserModel.login($scope.user)
        .then(function (response) {
          const user = response.data;
          alert("Login successful");
          
          if (user.role === "admin") {
            $window.location.href = "../user_details/userDetail.html";
          } else {
            $window.location.href = `../user_expenses/userExpenses.html?userId=${
              user.id
            }&userName=${encodeURIComponent(user.name)}&role=${user.role}`;
          }
        })
        .catch(function (error) {
          alert("Login failed: " + (error.data || error.message));
        });
    };
  });
