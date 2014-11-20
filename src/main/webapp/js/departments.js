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
                    console.log('good');
                })
                .error(function (data) {
                    result = data;
                    console.log('some boy');
                });

        }

    };


    var departments = angular.module('departments', []);


    departments.service('depService', ['$http', '$q',
        function ($http, $q) {
            var depList = [];

            return {

                getDepList: function () {
                    return depList;
                },

                refreshDepList: function () {
                    var deferred = $q.defer();

                    $http({method: 'get', url: '/depList'})
                        .success(function (data) {
                            deferred.resolve(data);
                        }).error(function (data) {
                            console.log('some boy made mistake, data: ' + data);
                        });

                    return deferred.promise;
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


    departments.controller('departmentListController', ['$scope', 'depService',
        function ($scope, depService) {

            var depListPromise = depService.refreshDepList();
            depListPromise.then(function (data) {
                $scope.depList = data;
            });

            this.add = function () {
                console.log(this.depList.length);
                $scope.depList.push({});
                console.log(this.depList.length);
            };

            $scope.isEmpty = function () {
                console.log('is empty: ' + $scope.depList.length);
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