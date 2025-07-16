angular.module("expenseTrackerApp")
  .controller("AddUserController", function ($scope, $http, $window) {
    $scope.user = {
      name: "",
      phone: "",
      age: null,
      email: "",
      gender: "",
      address: "",
      password: ""
    };


    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");

    if (userId) {
      $http.get(`http://localhost:5000/userDetails/${userId}`)
        .then(function (response) {
          $scope.user = response.data;
        })
        .catch(function (error) {
          console.error("Failed to fetch user for editing:", error);
        });
    }


    $scope.validateInputs = function () {
      if ($scope.user.phone < 0) {
        alert("Phone number must be positive number");
        return false;
      }
      if (($scope.user.phone + "").length !== 10) {
        alert("Phone number must be exactly 10 digits");
        return false;
      }
      if ($scope.user.age < 18 || $scope.user.age > 100) {
        alert("Age must be between 18 and 100.");
        return false;
      }
      return true;
    };


    $scope.submitForm = function () {
      if (!$scope.validateInputs()) {
        return;
      }

      let method = userId ? "PUT" : "POST";
      let url = userId ? `http://localhost:5000/userDetails/${userId}` : "http://localhost:5000/userDetails";

      $http({
        method: method,
        url: url,
        data: $scope.user
      }).then(function () {
        $window.location.href = "../user_details/userDetail.html";
      }).catch(function (error) {
        console.error("Failed to save user:", error);
        alert("Error saving user.");
      });
    };
  });
