angular.module("expenseTrackerApp")
  .factory("UserModel", function ($http) {
    return {
      login: function (user) {
        return $http.post("http://localhost:5000/userDetails/login", {
          name: user.name,
          password: user.password
        });
      }
    };
  });
