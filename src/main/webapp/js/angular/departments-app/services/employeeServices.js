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

            var pageSize = 0, currentPageNo = 1, empList = [], pagedEmpList = [], validationResult, serverMessages = {}, processing = false;

            var handleSuccessCallback = function (response, notificationMessage) {
                empList = response.data;
                pagedEmpList = pagingService.paginate(empList, pageSize);
                notificationService.notifySuccess(notificationMessage);
                processing = false;
            };
            var handleFailCallback = function (response, notificationMessage) {
                notificationService.notifyFail(notificationMessage);
                processing = false;
            };
            var notifyWaiting = function (message) {
                notificationService.notifyWaiting(message);
                processing = true;
            };
            var notifyValidation = function (validationResult) {
                if (tabService.isEmpForm() && !processing) {
                    if (validationResult.isValid) {
                        notificationService.notifySuccess('All correct');
                    } else {
                        notificationService.notifyFail('Some boy, take focus on questions images');
                    }
                }
            };
            var afterCallBackLogic = {
                doAfterAddLogic: function (response, employee) {
                    if (response.data.status == 'validation-error') {
                        serverMessages = response.data['serverMessages'];
                    } else {
                        handleSuccessCallback(response, Messages.empPersisted(employee));
                        if (employeeFormService.isEditStatus()) {
                            employeeFormService.setAddStatus();
                            tabService.setEmpListAsActive();
                        } else {
                            $rootScope.$broadcast('CHECK_EMP_FORM_MODEL');
                        }
                    }
                },
                doAfterDeleteOneLogic: function (response, employee) {
                    handleSuccessCallback(response, Messages.empDeleted(employee));
                    if (Utils.isAbsent(employeeFormService.getFixedEmployee())) {
                        employeeFormService.setAddStatus();
                    }
                    currentPageNo = pagingService.defineCurrentPageNo(pagedEmpList, currentPageNo);
                },
                doAfterDeleteAllLogic: function () {
                    handleSuccessCallback({data: []}, Messages.empListCleared());
                    employeeFormService.setAddStatus();
                    currentPageNo = 1;
                }
            };

            return {

                getEmpList: function () {
                    if (tabService.isEmpListHide()) {
                        empList = [];
                    }
                    return empList;
                },
                getPagedData: function () {
                    if (tabService.isEmpListHide()) {
                        pagedEmpList = [];
                    }
                    return pagedEmpList;
                },
                setPageSize: function (newPageSize) {
                    pageSize = newPageSize;
                },
                getCurrentPageNo: function () {
                    return currentPageNo;
                },
                setCurrentPageNo: function (pageNo) {
                    currentPageNo = pageNo;
                },
                repaginate: function (newPageSize) {
                    pageSize = newPageSize;
                    pagedEmpList = pagingService.paginate(empList, pageSize);
                    currentPageNo = 1;
                },

                validate: function (employee) {
                    if (!Utils.isModelEmpty(employee)) {
                        validationResult = validationService.validate(employee, Constants.validationRules.employee, serverMessages);
                        notifyValidation(validationResult);
                    } else {
                        validationResult = {isValid: false, name: {isValid: true}, salary: {isValid: true}, email: {isValid: true}, birth: {isValid: true}};
                    }
                    return validationResult;
                },
                getValidationResult: function () {
                    return validationResult;
                },
                clearServerMessages: function () {
                    serverMessages = {};
                },

                refreshEmpList: function (department, pageSize) {
                    this.setPageSize(pageSize);
                    notifyWaiting('Fetching employee list...');
                    $http.get('/empList?depId=' + department.id).then(
                        function (response) {
                            handleSuccessCallback(response, 'Employee list was updated. Try pagination.');
                            tabService.setEmpListAsActive();
                        }, function (response) {
                            handleFailCallback(response, 'Employee list updating failed.');
                        }
                    );
                },
                populateWithTestData: function (result) {
                    notifyWaiting('Populating employee list with test data...');
                    $http.post('/populate').then(
                        function (response) {
                            handleSuccessCallback(response, 'Employee list was populated with test data');
                        }, function (response) {
                            handleFailCallback(response, 'Populating employee list with test data failed.');
                        }
                    );
                },
                deleteAll: function (result) {
                    notifyWaiting('Clearing employee list...');
                    $http.post('/deleteAllEmployees').then(
                        function (response) {
                            afterCallBackLogic.doAfterDeleteAllLogic();
                        }, function (response) {
                            handleFailCallback(response, 'Deleting all employees failed.');
                        }
                    );
                },
                addOne: function (employee) {
                    notifyWaiting('Adding ' + angular.toJson(employee) + ' employee...');
                    $http.post('/persistEmployee', employee).then(
                        function (response) {
                            afterCallBackLogic.doAfterAddLogic(response, employee);
                        }, function (response) {
                            handleFailCallback(response, employee.name + ' employee adding failed.');
                        }
                    );
                },
                deleteOne: function (employee) {
                    notifyWaiting('Deleting ' + angular.toJson(employee) + ' employee...');
                    $http.post('/empDelete', employee).then(
                        function (response) {
                            afterCallBackLogic.doAfterDeleteOneLogic(response, employee);
                        }, function (response) {
                            handleFailCallback(response, employee + ' employee deleting failed.');
                        }
                    );
                }

            }
        }

    ]);


    employeeServices.service('employeeFormService', ['$rootScope', 'tabService',
        function ($rootScope, tabService) {
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
                    Utils.clearModel(fixedEmployee);
                    $rootScope.$broadcast('CHECK_EMP_FORM_MODEL');
                },
                setEditStatus: function (employee) {
                    fixedEmployee = angular.copy(employee);
                    status = statuses.edit;
                    $rootScope.$broadcast('CHECK_EMP_FORM_MODEL');
                    tabService.setDepFormAsActive();
                },
                getFixedEmployee: function () {
                    return angular.copy(fixedEmployee);
                }
            };
        }
    ]);


})();

