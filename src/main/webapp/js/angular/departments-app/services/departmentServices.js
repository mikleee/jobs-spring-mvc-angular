(function () {

    var departmentServices = angular.module('departmentServices', ['commonServices']);


    departmentServices.service('depService', ['$rootScope', '$http', 'notificationService', 'pagingService', 'validationService', 'tabService', 'departmentFormService',
        function ($rootScope, $http, notificationService, pagingService, validationService, tabService, departmentFormService) {

            var pageSize = 0, currentPageNo = 1, depList = [], pagedDepList = [], validationResult, serverMessages = {}, processing = false;

            var handleSuccessCallback = function (response, notificationMessage) {
                depList = response.data;
                pagedDepList = pagingService.paginate(depList, pageSize);
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
                if (tabService.isDepForm() && !processing) {
                    if (validationResult.isValid) {
                        notificationService.notifySuccess('All correct');
                    } else {
                        notificationService.notifyFail('Some boy, take focus on questions images');
                    }
                }
            };
            var afterCallBackLogic = {
                doAfterAddLogic: function (response, department) {
                    if (response.data.status == 'validation-error') {
                        serverMessages = response.data['serverMessages'];
                    } else {
                        handleSuccessCallback(response, Messages.depPersisted(department));
                        if (departmentFormService.isEditStatus()) {
                            departmentFormService.setAddStatus();
                            tabService.setDepListAsActive();
                        } else {
                            $rootScope.$broadcast('CHECK_DEP_FORM_MODEL');
                        }
                    }
                },
                doAfterDeleteOneLogic: function (response, department) {
                    handleSuccessCallback(response, Messages.depDeleted(department));
                    if (Utils.isAbsent(departmentFormService.getFixedDepartment())) {
                        departmentFormService.setAddStatus();
                    }
                    currentPageNo = pagingService.defineCurrentPageNo(pagedDepList, currentPageNo);
                },
                doAfterDeleteAllLogic: function () {
                    handleSuccessCallback({data: []}, Messages.depListCleared());
                    departmentFormService.setAddStatus();
                    currentPageNo = 1;
                }
            };

            return {

                getDepList: function () {
                    return depList;
                },
                getPagedData: function () {
                    return pagedDepList;
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
                    pagedDepList = pagingService.paginate(depList, pageSize);
                    currentPageNo = 1;
                },

                validate: function (department) {
                    if (!Utils.isModelEmpty(department)) {
                        validationResult = validationService.validate(department, Constants.validationRules.department, serverMessages);
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

                refreshDepList: function (pageSize) {
                    this.setPageSize(pageSize);
                    notifyWaiting('Fetching department list...');
                    $http.get('/depList').then(
                        function (response) {
                            handleSuccessCallback(response, 'Department list was updated. Try pagination.');
                        }, function (response) {
                            handleFailCallback(response, 'Department list updating failed.');
                        }
                    );
                },
                populateWithTestData: function (result) {
                    notifyWaiting('Populating department list with test data...');
                    $http.post('/populate').then(
                        function (response) {
                            handleSuccessCallback(response, 'Department list was populated with test data');
                        }, function (response) {
                            handleFailCallback(response, 'Populating department list with test data failed.');
                        }
                    );
                },
                deleteAll: function (result) {
                    notifyWaiting('Clearing department list...');
                    $http.post('/deleteAllDepartments').then(
                        function (response) {
                            afterCallBackLogic.doAfterDeleteAllLogic();
                        }, function (response) {
                            handleFailCallback(response, 'Deleting all departments failed.');
                        }
                    );
                },
                addOne: function (department) {
                    notifyWaiting('Adding ' + angular.toJson(department) + ' department...');
                    $http.post('/persistDepartment', department).then(
                        function (response) {
                            afterCallBackLogic.doAfterAddLogic(response, department);
                        }, function (response) {
                            handleFailCallback(response, department.name + ' department adding failed.');
                        }
                    );
                },
                deleteOne: function (department) {
                    notifyWaiting('Deleting ' + angular.toJson(department) + ' department...');
                    $http.post('/depDelete', department).then(
                        function (response) {
                            afterCallBackLogic.doAfterDeleteOneLogic(response, department);
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

            return {
                isEditStatus: function () {
                    return status == statuses.edit;
                },
                isAddStatus: function () {
                    return status == statuses.add;
                },
                setAddStatus: function () {
                    status = statuses.add;
                    Utils.clearModel(fixedDepartment);
                    $rootScope.$broadcast('CHECK_DEP_FORM_MODEL');
                },
                setEditStatus: function (department) {
                    fixedDepartment = angular.copy(department);
                    status = statuses.edit;
                    $rootScope.$broadcast('CHECK_DEP_FORM_MODEL');
                    tabService.setDepFormAsActive();
                },
                getFixedDepartment: function () {
                    return angular.copy(fixedDepartment);
                }
            };
        }
    ]);


})();

