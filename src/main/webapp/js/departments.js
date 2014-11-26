(function () {


    function log(message) {
        console.log(message);
    }

    function logData(message, data) {
        log(message + ':');
        log(data);
    }

    var activeTab = 1;

    var EMPTY_DEPARTMENT = {name: '', location: ''};
    var EMPTY_PAGE = {number: 0, content: []};

    var SOME_ARRAY = [
        {name: 'name1', location: 'location1'},
        {name: 'name2', location: 'location2'},
        {name: 'name3', location: 'location3'},
        {name: 'name4', location: 'location4'},
        {name: 'name5', location: 'location5'}
//        {name: 'fghgft', location: 'rth'}
    ];


    var departments = angular.module('departments', ['directives']);


    departments.service('notificationService', [ '$rootScope',
        function ($rootScope) {

            var success = 'SUCCESS', fail = 'FAIL', waiting = 'WAITING';

            $rootScope.lastNotification = {status: success, message: 'nothing happened'};

            return {

                notifySuccess: function (message) {
                    $rootScope.lastNotification.message = message;
                    $rootScope.lastNotification.status = success;
                },

                notifyFail: function (message) {
                    $rootScope.lastNotification.message = message;
                    $rootScope.lastNotification.status = fail;
                },

                notifyWaiting: function (message) {
                    $rootScope.lastNotification.message = message;
                    $rootScope.lastNotification.status = waiting;
                },

                updateNotification: function (notification) {
                    $rootScope.lastNotification.message = notification.message;
                    $rootScope.lastNotification.status = notification.status;
                },

                isFail: function () {
                    return  $rootScope.lastNotification.status == fail;
                },

                isSuccess: function () {
                    return  $rootScope.lastNotification.status == success;
                },

                isWaiting: function () {
                    return  $rootScope.lastNotification.status == waiting;
                },

                getMessage: function () {
                    return  $rootScope.lastNotification.message;
                }

            }

        }
    ]);


    departments.service('pagingService', function () {

        return {

            paginate: function (array, pageSize) {
                var result = [];

                for (var i = 0; i < array.length;) {
                    var page = {number: result.length + 1, content: []};

                    while (page.content.length < pageSize && i < array.length) {
                        page.content.push(array[i]);
                        i++;
                    }

                    result.push(page);

                }

                return result;
            }
        };
    });


    departments.service('depService', [ '$http', 'notificationService', 'pagingService',
        function ($http, notificationService, pagingService) {

            var depList = [];
            var pagedDepList = [];

            var handleSuccessCallback = function (response, notificationMessage, logMessage) {
                depList = response.data;
                logData(logMessage, response);
                notificationService.notifySuccess(notificationMessage);
            };

            var handleFailCallback = function (response, notificationMessage) {
                notificationService.notifyFail(notificationMessage);
            };

            return {

                getDepList: function () {
                    return depList;
                },

                setDepList: function (response) {
                    depList = response.data;
                },

                refreshDepList: function () {
                    notificationService.notifyWaiting('Fetching department list...');
                    $http.get('/depList').then(
                        function (response) {
                            handleSuccessCallback(response, 'Department list was updated.', 'depService.refreshDepList.then executed');
                        }, function (response) {
                            handleFailCallback(response, 'Department list updating failed.');
                        }
                    );

                },

                populateWithTestData: function (result) {
                    notificationService.notifyWaiting('Populating department list with test data...');
                    $http.post('/populate').then(
                        function (response) {
                            handleSuccessCallback(response, 'Department list was populated with test data', 'depService.populateWithTestData.then executed');
                        }, function (response) {
                            handleFailCallback(response, 'Populating department list with test data failed.');
                        }
                    );
                },

                deleteAll: function (result) {
                    notificationService.notifyWaiting('Clearing department list...');
                    $http.post('/deleteAllDepartments').then(
                        function (response) {
                            handleSuccessCallback({data: []}, 'All departments were deleted.', 'depService.deleteAll.then executed');
                        }, function (response) {
                            handleFailCallback(response, 'Deleting all departments failed.');
                        }
                    );
                },

                addOne: function (department) {
                    notificationService.notifyWaiting('Adding ' + angular.toJson(department) + ' department...');
                    $http.post('/addDep', department).then(
                        function (response) {
                            handleSuccessCallback(response, angular.toJson(department) + ' department was added.', 'depService.addOne.then executed');
                            department.name = '';
                            department.location = '';
                        }, function (response) {
                            handleFailCallback(response, department.name + ' department adding failed.');
                        }
                    );
                },

                deleteOne: function (id) {
                    notificationService.notifyWaiting('Adding ' + id + ' department...');
                    $http.post('/depDelete', {id: id}).then(
                        function (response) {
                            handleSuccessCallback(response, id + ' department was deleted.', 'depService.addOne.then executed');
                        }, function (response) {
                            handleFailCallback(response, id + ' department deleting failed.');
                        }
                    );
                }

            }
        }

    ])
    ;


    departments.controller('MainController', ['$rootScope', function ($rootScope) {

        $rootScope.activeTab = 1;

        this.isDepList = function () {
            return $rootScope.activeTab == 1;
        };

        this.isDepForm = function () {
            return $rootScope.activeTab == 2;
        }

    }]);


    departments.controller('TabController', ['$rootScope', function ($rootScope) {

        this.setTab = function (tabNo) {
            $rootScope.activeTab = tabNo;
        };

        this.isSet = function (tabNo) {
            return tabNo == $rootScope.activeTab;
        }

    }]);


    departments.controller('DepartmentListController', ['$scope', 'depService', 'notificationService', 'pagingService',
        function ($scope, depService, notificationService, pagingService) {
            depService.refreshDepList();

            var pagedList = [];

            $scope.config = {
                showDepListInJson: false,
                currentPage: 1,
                pageSize: 5
            };

            $scope.depList = function () {
                var result = depService.getDepList();
                pagedList = pagingService.paginate(result, $scope.config.pageSize);
                return result;
            };

            $scope.pages = function () {
                return pagedList;
            };

            $scope.deleteAll = depService.deleteAll;

            $scope.add = function () {
                depService.getDepList().push({id: -10, name: 'jopa', location: 'joppa'});
                notificationService.notifySuccess('Fake department added');
            };

            $scope.deleteOne = function (id) {
                depService.deleteOne(id);
            };

            $scope.isEmpty = function () {
                return depService.getDepList().length == 0;
            };

//            $scope.currentPage = function () {
//                return $scope.pagedList()[$scope.config.currentPage].content;
//            };

            $scope.getPagedList = function () {
                return pagedList;
            };


        }
    ]);


    departments.controller('DepartmentFormController', ['$scope', '$http', 'depService', 'notificationService',
        function ($scope, $http, depService, notificationService) {
            $scope.currentDep = {name: '', location: ''};

            $scope.populate = depService.populateWithTestData;

            $scope.add = function () {
                depService.addOne($scope.currentDep);
            };

            $scope.isEmptyDep = function () {
                return $scope.currentDep.name == '' &&
                    $scope.currentDep.location == '';
            };

        }
    ]);


    departments.controller('NotificationBarController', ['$scope', 'notificationService',
        function ($scope, notificationService) {
            $scope.getMessage = notificationService.getMessage;
            $scope.isFail = notificationService.isFail;
            $scope.isSuccess = notificationService.isSuccess;
            $scope.isWaiting = notificationService.isWaiting;

            $scope.imgPath = function () {
                var result;
                if ($scope.isFail()) {
                    result = 'fail.png';
                } else if ($scope.isSuccess()) {
                    result = 'success.png';
                } else if ($scope.isWaiting()) {
                    result = 'waiting.gif';
                }
                return result;
            };
        }
    ]);


})
    ();

