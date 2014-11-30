(function () {


    function log(message) {
        console.log(message);
    }

    function logData(message, data) {
        log(message + ':');
        log(data);
    }


    var departmentServices = angular.module('departmentServices', ['commonServices']);


    departmentServices.service('depService', ['$rootScope', '$http', 'notificationService', 'pagingService', 'validationService', 'tabService', 'departmentFormService',
        function ($rootScope, $http, notificationService, pagingService, validationService, tabService, departmentFormService) {

            var pageSize = 0,
                depList = [],
                pagedDepList = [],
                validationResult,
                serverMessages = {},
                validationRules = {
                    name: {pattern: '^[a-zA-Z]{3,20}$', message: 'the name should be alpha [3 - 20]'},
                    location: {pattern: '^[a-zA-Z]{0,20}$', message: 'the location should be alpha [0 - 20]'}
                };

            var handleSuccessCallback = function (response, notificationMessage, logMessage) {
                depList = response.data;
                pagedDepList = pagingService.paginate(depList, pageSize);
                logData(logMessage, response);
                notificationService.notifySuccess(notificationMessage);
            };
            var handleFailCallback = function (response, notificationMessage) {
                notificationService.notifyFail(notificationMessage);
            };
            var notifyValidation = function (validationResult) {
                if (!tabService.isDepForm()) {
                    return;
                }

                if (validationResult.isValid) {
                    notificationService.notifySuccess('All correct');
                } else {
                    notificationService.notifyFail('Some boy, take focus on questions images');
                }
            };
            var _resetDepartment = function (department) {
                department.id = null;
                department.name = '';
                department.location = '';
            };

            var _isExist = function (department) {
                for (var j = 0; j < depList.length; j++) {
                    if (department && depList[j].id == department.id) {
                        return true;
                    }
                }
                return false;
            };
            var _doAfterAddLogic = function (response, department) {
                if (response.data.status == 'validation-error') {
                    serverMessages = response.data.serverMessages;
                } else {
                    var notificationMessage = angular.toJson(department) + ' department was ' + (departmentFormService.isAddStatus() ? 'added' : 'updated');
                    handleSuccessCallback(response, notificationMessage, 'depService.addOne.then executed');
                    departmentFormService.clearFixedDepartment();
                    if (departmentFormService.isEditStatus()) {
                        departmentFormService.setAddStatus();
                        tabService.setDepListAsActive();
                    }
                    $rootScope.$broadcast('CHECK_DEP_FORM_MODEL');
                }
            };
            var _doAfterDeleteOneLogic = function (response, department) {
                handleSuccessCallback(response, angular.toJson(department) + ' department was deleted.', 'depService.addOne.then executed');
                if (!_isExist(departmentFormService.getFixedDepartment())) {
                    departmentFormService.clearFixedDepartment();
                    departmentFormService.setAddStatus();
                    $rootScope.$broadcast('CHECK_DEP_FORM_MODEL');
                }
            };
            var _doAfterDeleteAllLogic = function () {
                handleSuccessCallback({data: []}, 'All departments were deleted.', 'depService.deleteAll.then executed');
                departmentFormService.clearFixedDepartment();
                departmentFormService.setAddStatus();
                tabService.setDepListAsActive(); //todo logic now works but shit
                $rootScope.$broadcast('CHECK_DEP_FORM_MODEL');
            };


            return {

                getDepList: function () {
                    return depList;
                },
                setDepList: function (response) {
                    depList = response.data;
                },

                getPagedData: function () {
                    return pagedDepList;
                },
                setPageSize: function (newPageSize) {
                    pageSize = newPageSize;
                },
                repaginate: function (newPageSize) {
                    pageSize = newPageSize;
                    pagedDepList = pagingService.paginate(depList, pageSize);
                },

                validate: function (department) {
                    if (department.name != '' || department.location != '') {
                        validationResult = validationService.validate(department, validationRules, serverMessages);
                        notifyValidation(validationResult);
                    } else {
                        validationResult = {isValid: false, name: {isValid: true}, location: {isValid: true}};
                    }
                    return validationResult;
                },
                getValidationResult: function () {
                    return validationResult;
                },
                clearServerMessages: function () {
                    serverMessages = {};
                },

                resetDepartment: function (department) {
                    _resetDepartment(department);
                },

                refreshDepList: function (pageSize) {
                    this.setPageSize(pageSize);
                    notificationService.notifyWaiting('Fetching department list (page size = ' + pageSize + ')...');
                    $http.get('/depList').then(
                        function (response) {
                            handleSuccessCallback(response, 'Department list was updated. Try pagination.', 'depService.refreshDepList.then executed');
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
                            _doAfterDeleteAllLogic();
                        }, function (response) {
                            handleFailCallback(response, 'Deleting all departments failed.');
                        }
                    );
                },
                addOne: function (department) {
                    notificationService.notifyWaiting('Adding ' + angular.toJson(department) + ' department...');
                    $http.post('/persistDepartment', department).then(
                        function (response) {
                            _doAfterAddLogic(response, department);
                        }, function (response) {
                            handleFailCallback(response, department.name + ' department adding failed.');
                        }
                    );
                },
                deleteOne: function (department) {
                    notificationService.notifyWaiting('Deleting ' + angular.toJson(department) + ' department...');
                    $http.post('/depDelete', department).then(
                        function (response) {
                            _doAfterDeleteOneLogic(response, department);
                        }, function (response) {
                            handleFailCallback(response, department + ' department deleting failed.');
                        }
                    );
                }

            }
        }

    ]);


    departmentServices.service('departmentFormService', ['$rootScope', 'tabService',
        function ($rootScope, tabService) {
            var statuses = {add: 'ADD', edit: 'EDIT'},
                status = statuses.add,
                fixedDepartment = {};

            var _clearFixedDepartment = function () {
                fixedDepartment.id = null;
                fixedDepartment.name = '';
                fixedDepartment.location = '';
            };

            return {

                isEditStatus: function () {
                    return status == statuses.edit;
                },
                isAddStatus: function () {
                    return status == statuses.add;
                },

                setAddStatus: function () {
                    status = statuses.add;
                    _clearFixedDepartment();
                    $rootScope.$broadcast('CHECK_DEP_FORM_MODEL');
                    tabService.setDepFormAsActive();
                },
                setEditStatus: function (department) {
                    fixedDepartment = angular.copy(department);
                    status = statuses.edit;
                    $rootScope.$broadcast('CHECK_DEP_FORM_MODEL');
                    tabService.setDepFormAsActive();
                },

                getFixedDepartment: function () {
                    return angular.copy(fixedDepartment);
                },
                clearFixedDepartment: _clearFixedDepartment

            };
        }]);


})();

