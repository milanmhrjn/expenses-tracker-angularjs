angular.module("expenseTrackerApp").factory("UserModel", function ($http) {
  return {
    getUserById: function (id) {
      return $http.get(`http://localhost:5000/userDetails/${id}`);
    },
    saveUser: function (user, isEdit) {
      const url = isEdit
        ? `http://localhost:5000/userDetails/${user.id}`
        : "http://localhost:5000/userDetails";

      const method = isEdit ? "PUT" : "POST";
      return $http({
        method: method,
        url: url,
        data: user,
      });
    },
  };
});