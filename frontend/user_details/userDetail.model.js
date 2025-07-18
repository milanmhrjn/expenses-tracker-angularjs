angular.module("expenseTrackerApp")
  .factory("UserService", function ($http) {
    return {
      getUsers: function () {
        return $http.get("http://localhost:5000/userDetails");
      },
      deleteUser: function (id) {
        return $http.delete(`http://localhost:5000/userDetails/${id}`);
      }
    };
  });
