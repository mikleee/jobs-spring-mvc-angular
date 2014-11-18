(function () {

    var departmentList = [];
    var activeTab = 1;

    var requests = {

        depListRequest: function () {
            return {method: 'get', url: '/depList'}
        },

        refreshDepList: function (httpService) {

            var result;

            httpService({method: 'get', url: '/depList'})

                .success(function (data) {
                    result = data;
                })

                .error(function (data) {
                    result = 'some boy';
                });

            return result;
        },


        populate: function (httpService, result) {

            httpService({method: 'POST', url: '/populate'})
                .success(function (data) {
                    result = data;
                    alert('good');
                })
                .error(function (data) {
                    result = data;
                    alert('some boy');
                });

        }

    };


    var departments = angular.module('departments', []);


//    departments.factory('rootRepo', ['$scope', '$http', function ($scope, $http) {
//
//        $http(requests.depListRequest)
//            .success(function (data) {
//                $scope.depList = data;
//            }).error(function (data) {
//                $scope.depList = 'some boy made mistake';
//            });
//
//        $scope.getDepList = function () {
//            return $scope.depList;
//        };
//
//        $scope.setDepList = function (deplist) {
//            $scope.depList = deplist;
//        }
//
//    }]);

    departments.service('callService', function () {

        this.depListRequest = function () {
            return {method: 'get', url: '/depList'}
        };

        this.refreshDepList = function (httpService) {
            var result;

            httpService({method: 'get', url: '/depList'})
                .success(function (data) {
                    result = data;
                })
                .error(function (data) {
                    result = 'some boy';
                });

            return result;
        };

        this.populate = function (httpService, result) {

            httpService({method: 'POST', url: '/populate'})
                .success(function (data) {
                    result = data;
                    alert('good');
                })
                .error(function (data) {
                    result = data;
                    alert('some boy');
                });

        }

    });


    departments.controller('MainController', function () {

        this.isDepList = function () {
            return activeTab == 1;
        };

        this.isDepForm = function () {
            return activeTab == 2;
        }

    });


    departments.controller('TabController', ['$scope', function () {

        this.setTab = function (tabNo) {
            activeTab = tabNo;
        };

        this.isSet = function (tabNo) {
            return tabNo == activeTab;
        }

    }]);


    departments.controller('departmentListController', ['$scope', '$http', 'callService', function ($scope, $http, callService) {
        var $this = this;

//        this.depList = function () {
//            return rootRepo.getDepList();
//        };
        this.depList = [];

        this.add = function () {
            alert(this.depList.length);
            this.depList.push({});
            alert(this.depList.length);
        };

        this.isEmpty = function () {
            return $this.depList.length == 0;
        };



        $http(requests.depListRequest)
            .success(function (data) {
                $this.depList = data;
            }).error(function (data) {
                $this.depList = 'some boy made mistake';
            });

    }]);


    departments.controller('DepartmentFormController', ['$scope', '$http', 'departmentListController', function ($scope, $http, departmentListController) {
        this.currentDep = {name: '', location: ''};

        var $this = this;


        this.isEmpty = function () {
            return this.depList.length == 0;
        };

        this.populate = function () {
            requests.populate($http, $scope.depList);
        };


    }]);


    /****************************directives************************************/


    departments.directive("actionButtons", function () {
        return {
            restrict: 'E',
            templateUrl: 'custom-ng-tags/action-buttons.jsp'
        };
    });


    departments.directive("departmentForm", function () {
        return {
            restrict: 'E',
            templateUrl: 'custom-ng-tags/department-form.jsp'
        };
    });


    departments.directive("departmentList", function () {
        return {
            restrict: 'E',
            templateUrl: 'custom-ng-tags/department-list.jsp'
        };
    });


    departments.directive("tabsPanel", function () {
        return {
            restrict: 'E',
            templateUrl: 'custom-ng-tags/tabs-panel.jsp'
        };
    });

})();