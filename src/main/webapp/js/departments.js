(function () {


    function log(message) {
        console.log(message);
    }

    function logData(message, data) {
        log(message + ':');
        log(data);
    }

    var activeTab = 1;


    var departments = angular.module('departments', []);

    departments.service('notificationService', [ '$rootScope',
        function ($rootScope) {

            return {
                updateNotification: function (notification) {
                    $rootScope.lastNotification = notification;
                }
            }

        }
    ]);

    departments.service('depService', [ '$http', '$q', '$rootScope',
        function ($http, $q, $rootScope) {

            var handleCallback = function (response, notificationMessage, logMessage) {
                $rootScope.depList = response.data;
                $rootScope.lastNotification = notificationMessage;
                logData('logMessage', response);
            };

            return {

                getDepList: function () {
                    var result = $rootScope.depList ? $rootScope.depList : [];
                    logData('depService.getDepList() executed', result);
                    return result;
                },

                setDepList: function (response) {
                    $rootScope.depList = response.data;
                },

                refreshDepList: function () {
                    $http.get('/depList').then(
                        function (response) {
                            handleCallback(response, 'Department list was updated', 'depService.refreshDepList.then executed');
                        }
                    );

                },

                populateWithTestData: function (result) {
                    $http.post('/populate').then(
                        function (response) {
                            handleCallback(response, 'Department list was populated with test data', 'depService.populateWithTestData.then executed');
                        }
                    );
                },

                deleteAll: function (result) {
                    $http.post('/deleteAllDepartments').then(
                        function (response) {
                            $rootScope.depList = [];
                            $rootScope.lastNotification = 'All departments were deleted';
                        }
                    );
                },

                addOne: function (department) {
                    $http.post('/doDepAddOrUpdate', department).then(
                        function (response) {
                            handleCallback(response, department.name + ' department was added.', 'depService.addOne.then executed');
                        }
                    );
                }

            }
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


    departments.controller('departmentListController', ['$scope', 'depService', '$rootScope',
        function ($scope, depService, $rootScope) {

            depService.refreshDepList();

            $scope.showDepListInJson = false;

            $scope.add = function () {
                $scope.depList().push({id: -10, name: 'jopa', location: 'joppa'});
                $rootScope.lastNotification = 'Fake department added';
            };

            $scope.isEmpty = function () {
                logData('departmentListController.isEmpty', $scope.depList());
                return $scope.depList().length == 0;
            };

            $scope.depList = depService.getDepList;

            $scope.deleteAll = depService.deleteAll;

        }
    ]);


    departments.controller('DepartmentFormController', ['$scope', '$http', 'depService', 'notificationService',
        function ($scope, $http, depService, notificationService) {
            $scope.currentDep = {name: '', location: ''};

            $scope.populate = depService.populateWithTestData;

            $scope.add = function () {
                depService.addOne($scope.currentDep);
                notificationService.updateNotification($scope.currentDep.name + ' department was added.');
            };

        }
    ]);


    departments.controller('NotificationBarController', ['$scope', '$rootScope',
        function ($scope, $rootScope) {
            var defaultNotification = 'nothing happened';

            $scope.getNotification = function () {
                var result = $rootScope.lastNotification ? $rootScope.lastNotification : defaultNotification;
                return $rootScope.lastNotification;
            }

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

    departments.directive("notificationBar", function () {
        return {
            restrict: 'E',
            templateUrl: 'custom-ng-tags/notification-bar.jsp'
        };
    });

})();


//var requests = {
//
//    depListRequest: function () {
//        return {method: 'get', url: '/depList'}
//    },
//
//    refreshDepList: function (httpService) {
//
//        var result;
//
//        httpService({method: 'get', url: '/depList'})
//
//            .success(function (data) {
//                result = data;
//            })
//
//            .error(function (data) {
//                result = 'some boy';
//            });
//
//        return result;
//    },
//
//
//    populate: function (httpService, result) {
//
//        httpService({method: 'POST', url: '/populate'})
//            .success(function (data) {
//                result = data;
//                console.log('good');
//            })
//            .error(function (data) {
//                result = data;
//                console.log('some boy');
//            });
//
//    }
//
//};
