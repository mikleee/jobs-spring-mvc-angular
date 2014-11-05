(function () {

    var requests = {
        depListRequest: {method: 'get', url: '/depList'}
    };


    var depListRequest = {method: 'get', url: ''};

    var departmentList = [];


    var departments = angular.module('departments', []);


    departments.controller('DepartmentListController', ['$http', function ($http) {
        this.depList = departmentList;

        var $this = this;


        this.isEmpty = function () {
            return this.depList.length == 0;
        };

        $http(requests.depListRequest)
            .success(function (data) {
                $this.depList = data;
            })
            .error(function (data) {
                $this.depList = 'some boy made mistake';
            });

    }]);


})();