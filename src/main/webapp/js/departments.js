(function () {


    function log(message) {
        console.log(message);
    }

    function logData(message, data) {
        log(message + ':');
        log(data);
    }

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
                    console.log('good');
                })
                .error(function (data) {
                    result = data;
                    console.log('some boy');
                });

        }

    };


    var departments = angular.module('departments', []);


    departments.service('depService', [ '$http', '$q',
        function ($http, $q) {
            var depList;

            var callForDepList = function () {
                var result = $http.get('/depList');
                log('depService.callForDepList executed');
                return $http.get('/depList');
            };


            return {

                getDepList: function () {
                    var promise = callForDepList();

                    promise.then(function (data) {
                        this.setDepList(data);
                        logData('depList promise in the depService.getDepList() have been populated', data);
                    });

                    var result = depList ? depList : [];
                    logData('depService.getDepList() executed', depList);
                    return result;
                },

                setDepList: function (data) {
                    depList = data;
                    logData('depService.setDepList executed', data);
                },

                refreshDepList: function () {
                    return $http.get('/depList');
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

            $scope.depList = [];

//            var depListPromise = depService.refreshDepList();
//            log('after calling refreshDepList in the departmentListController');
//
//            depListPromise.then(function (data) {
//                $scope.depList = data;
////                depService.setDepList(data);
//                logData('depList promise in the departmentListController have been populated', data);
//            });

            $scope.getDepList = function () {
                var promise = depService.refreshDepList();
                promise.then(function (data) {
                    $scope.depList = data;
                });
            };

            $scope.getDepList();

//            $scope.depList = depService.getDepList();
//            logData('$scope.depList' + $scope.depList);


            $scope.add = function () {
                console.log('controller.add() before: ' + $scope.depList.length);
                $scope.depList.push({id: -10, name: 'jopa', location: 'joppa'});
                console.log('controller.add() after: ' + $scope.depList.length);
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