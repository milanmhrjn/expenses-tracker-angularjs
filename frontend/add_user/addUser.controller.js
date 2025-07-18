
angular.module("expenseTrackerApp")
  .controller("AddUserController", function ($scope, $window, UserModel) {
    $scope.user = {
      name: "",
      phone: "",
      age: null,
      email: "",
      gender: "",
      address: "",
      password: "",
      role:"user"
    };

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");
    $scope.editMode = !!userId;
    if ($scope.editMode) {
      UserModel.getUserById(userId)
        .then(function (response) {
          $scope.user = response.data;
          $scope.user.phone = Number(response.data.phone);

        })
        .catch(function (error) {
          console.error("Failed to fetch user:", error);
        });
    }

    $scope.validateInputs = function () {
      if ($scope.user.phone < 0) {
        alert("Phone number must be a positive number");
        return false;
      }
      if (($scope.user.phone + "").length !== 10) {
        alert("Phone number must be exactly 10 digits");
        return false;
      }
      if ($scope.user.age < 18 || $scope.user.age > 100) {
        alert("Age must be between 18 and 100");
        return false;
      }
      return true;
    };

    $scope.submitForm = function () {
      if (!$scope.validateInputs()) return;

      const userData = $scope.user;
      if ($scope.editMode) userData.id = userId;

      UserModel.saveUser(userData, $scope.editMode)
        .then(function () {
          $window.location.href = "../user_details/userDetail.html";
        })
        .catch(function (error) {
          console.error("Failed to save user:", error);
          alert("Error saving user.");
        });
    };
  });
