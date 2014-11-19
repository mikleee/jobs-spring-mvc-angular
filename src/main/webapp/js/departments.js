(function () {

    var departmentList = [];
    var activeTab = 1;

    var Util = {

        logAjax: function (data, result) {
            console.log('Data: ' + data);
            console.log('Result: ' + result);
        }

    };

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


    departments.service('depService', ['$http',
        function ($http) {
            var depList = [];

            return {

                getDepList: function () {
                    this.refreshDepList();
                    return depList;
                },

                refreshDepList: function () {
                    $http({method: 'get', url: '/depList'})
                        .success(function (data) {
                            depList = data;
                        }).error(function (data) {
                            alert('some boy made mistake, data: ' + data);
                        });
                }

            };
        }
    ]);


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


    departments.controller('departmentListController', ['$scope', '$http', 'depService',
        function ($scope, $http, depService) {

            $scope.depList = depService.getDepList();

//            $http({method: 'get', url: '/depList'})
//                .success(function (data) {
//                    $scope.depList = data;
//                }).error(function (data) {
//                    alert('some boy made mistake, data: ' + data);
//                });

            this.add = function () {
                alert(this.depList.length);
                $scope.depList.push({});
                alert(this.depList.length);
            };

            $scope.isEmpty = function () {
                alert('is empty: ' + $scope.depList.length);
                return $scope.depList.length == 0;
            };


        }
    ]);


    departments.controller('DepartmentFormController', ['$scope', '$http',
        function ($scope, $http) {
            this.currentDep = {name: '', location: ''};

            var $this = this;


            this.isEmpty = function () {
                return this.depList.length == 0;
            };

            this.populate = function () {
                requests.populate($http, $scope.depList);
            };


        }
    ]);


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