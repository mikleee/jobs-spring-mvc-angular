(function () {


    function log(message) {
        console.log(message);
    }

    function logData(message, data) {
        log(message + ':');
        log(data);
    }


    var employeeServices = angular.module('employeeServices', ['commonServices']);


    employeeServices.service('empService', ['$rootScope', '$http', 'notificationService', 'pagingService', 'validationService', 'tabService', 'employeeFormService',
        function ($rootScope, $http, notificationService, pagingService, validationService, tabService, employeeFormService) {

            var pageSize = 0,
                empList = [],
                pagedEmpList = [],
                validationResult,
                serverMessages = {},
                validationRules = {
                    name: {pattern: '^[a-zA-Z]{3,20}$', message: 'the name should be alpha [3 - 20]'},
                    location: {pattern: '^[a-zA-Z]{0,20}$', message: 'the location should be alpha [0 - 20]'}
                };

            var handleSuccessCallback = function (response, notificationMessage, logMessage) {
                empList = response.data;
                pagedEmpList = pagingService.paginate(empList, pageSize);
                logData(logMessage, response);
                notificationService.notifySuccess(notificationMessage);
            };
            var handleFailCallback = function (response, notificationMessage) {
                notificationService.notifyFail(notificationMessage);
            };
            var notifyValidation = function (validationResult) {
                if (!tabService.isEmpForm()) {
                    return;
                }

                if (validationResult.isValid) {
                    notificationService.notifySuccess('All correct');
                } else {
                    notificationService.notifyFail('Some boy, take focus on questions images');
                }
            };
            var _resetemployee = function (employee) {
                //todo
                employee.id = null;
                employee.name = '';
                employee.location = '';
            };

            var _isExist = function (employee) {
                for (var k = 0; k < empList.length; k++) {
                    if (employee && empList[k].id == employee.id) {
                        return true;
                    }
                }
                return false;
            };
            var _doAfterAddLogic = function (response, employee) {
                if (response.data.status == 'validation-error') {
                    serverMessages = response.data.serverMessages;
                } else {
                    var notificationMessage = angular.toJson(employee) + ' employee was ' + (employeeFormService.isAddStatus() ? 'added' : 'updated');
                    handleSuccessCallback(response, notificationMessage, 'empService.addOne.then executed');
                    employeeFormService.clearFixedEmployee();
                    if (employeeFormService.isEditStatus()) {
                        employeeFormService.setAddStatus();
                        tabService.setEmpListAsActive();
                    }
                    $rootScope.$broadcast('CHECK_EMP_FORM_MODEL');
                }
            };
            var _doAfterDeleteOneLogic = function (response, employee) {
                handleSuccessCallback(response, angular.toJson(employee) + ' employee was deleted.', 'depService.addOne.then executed');
                if (!_isExist(employeeFormService.getFixedEmployee())) {
                    employeeFormService.clearFixedEmployee();
                    employeeFormService.setAddStatus();
                    $rootScope.$broadcast('CHECK_EMP_FORM_MODEL');
                }
            };
            var _doAfterDeleteAllLogic = function () {
                handleSuccessCallback({data: []}, 'All employees were deleted.', 'empService.deleteAll.then executed');
                employeeFormService.clearFixedEmployee();
                employeeFormService.setAddStatus();
                $rootScope.$broadcast('CHECK_EMP_FORM_MODEL');
            };


            return {

                getEmpList: function () {
                    return empList;
                },
                setEmpList: function (response) {
                    empList = response.data;
                },

                getPagedData: function () {
                    return pagedEmpList;
                },
                setPageSize: function (newPageSize) {
                    pageSize = newPageSize;
                },
                repaginate: function (newPageSize) {
                    pageSize = newPageSize;
                    pagedEmpList = pagingService.paginate(empList, pageSize);
                },

                validate: function (employee) {
                    //todo
                    if (employee.name != '' || employee.location != '') {
                        validationResult = validationService.validate(employee, validationRules, serverMessages);
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

                resetEmployee: function (employee) {
                    _resetemployee(employee);
                },

                refreshEmpList: function (pageSize) {
                    this.setPageSize(pageSize);
                    notificationService.notifyWaiting('Fetching employee list (page size = ' + pageSize + ')...');
                    $http.get('/empList').then(
                        function (response) {
                            handleSuccessCallback(response, 'employee list was updated. Try pagination.', 'depService.refreshEmpList.then executed');
                        }, function (response) {
                            handleFailCallback(response, 'employee list updating failed.');
                        }
                    );

                },
                populateWithTestData: function (result) {
                    notificationService.notifyWaiting('Populating employee list with test data...');
                    $http.post('/populate').then(
                        function (response) {
                            handleSuccessCallback(response, 'employee list was populated with test data', 'depService.populateWithTestData.then executed');
                        }, function (response) {
                            handleFailCallback(response, 'Populating employee list with test data failed.');
                        }
                    );
                },
                deleteAll: function (result) {
                    notificationService.notifyWaiting('Clearing employee list...');
                    $http.post('/deleteAllemployees').then(
                        function (response) {
                            _doAfterDeleteAllLogic();
                        }, function (response) {
                            handleFailCallback(response, 'Deleting all employees failed.');
                        }
                    );
                },
                addOne: function (employee) {
                    notificationService.notifyWaiting('Adding ' + angular.toJson(employee) + ' employee...');
                    $http.post('/persistemployee', employee).then(
                        function (response) {
                            _doAfterAddLogic(response, employee);
                        }, function (response) {
                            handleFailCallback(response, employee.name + ' employee adding failed.');
                        }
                    );
                },
                deleteOne: function (employee) {
                    notificationService.notifyWaiting('Deleting ' + angular.toJson(employee) + ' employee...');
                    $http.post('/depDelete', employee).then(
                        function (response) {
                            _doAfterDeleteOneLogic(response, employee);
                        }, function (response) {
                            handleFailCallback(response, employee + ' employee deleting failed.');
                        }
                    );
                }

            }
        }

    ]);


    employeeServices.service('employeeFormService', [
        function () {
            var statuses = {add: 'ADD', edit: 'EDIT'},
                status = statuses.add,
                fixedEmployee = {};

            return {

                isEditStatus: function () {
                    return status == statuses.edit;
                },
                isAddStatus: function () {
                    return status == statuses.add;
                },

                setAddStatus: function () {
                    status = statuses.add;
                },
                setEditStatus: function (employee) {
                    fixedEmployee = employee;
                    status = statuses.edit;
                },

                getFixedEmployee: function () {
                    return angular.copy(fixedemployee);
                },
                clearFixedEmployee: function () {
                    fixedemployee.id = null;
                    fixedemployee.name = '';
                    fixedemployee.location = '';
                }

            };
        }]);


})();

