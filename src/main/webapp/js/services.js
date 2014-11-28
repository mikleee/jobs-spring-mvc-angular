(function () {


    function log(message) {
        console.log(message);
    }

    function logData(message, data) {
        log(message + ':');
        log(data);
    }


    var services = angular.module('services', []);


    services.service('notificationService', [ '$rootScope',
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


    services.service('pagingService', function () {

        return {

            paginate: function (array, pageSize) {
                var result = [];

                if (pageSize == 0) {
                    return result;
                }

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


    services.service('depService', [ '$http', 'notificationService', 'pagingService', 'validationService',
        function ($http, notificationService, pagingService, validationService) {

            var pageSize = 0,
                depList = [],
                pagedDepList = [],
                validationResult,
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
                if (validationResult.isValid) {
                    notificationService.notifySuccess('All correct');
                } else {
                    notificationService.notifyFail('Some boy, take focus on questions images');
                }
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
                        validationResult = validationService.validate(department, validationRules);
                        notifyValidation(validationResult);
                    } else {
                        validationResult = {isValid: false, name: {isValid: true}, location: {isValid: true}};
                    }

                    return validationResult;
                },

                getValidationResult: function () {
                    return validationResult;
                },

                refreshDepList: function (pageSize) {
                    this.setPageSize(pageSize);
                    notificationService.notifyWaiting('Fetching department list (page size = ' + pageSize + ')...');
                    $http.get('/depList').then(
                        function (response) {
                            handleSuccessCallback(response, 'Department list was updated. Try pagination.', 'depService.refreshDepList.then executed');
                        }, function (response) {
                            validationResult.name.message = 'idjfiosjfjdiofjds';
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

                deleteOne: function (department) {
                    notificationService.notifyWaiting('Deleting ' + angular.toJson(department) + ' department...');
                    $http.post('/depDelete', department).then(
                        function (response) {
                            handleSuccessCallback(response, angular.toJson(department) + ' department was deleted.', 'depService.addOne.then executed');
                        }, function (response) {
                            handleFailCallback(response, department + ' department deleting failed.');
                        }
                    );
                }

            }
        }

    ]);


    services.service('departmentFormService', function () {
        var statuses = {add: 'ADD', edit: 'EDIT'},
            status = statuses.add,
            currentDepartment;

        return {

            setEditStatus: function () {
                status = statuses.edit;
            },
            setAddStatus: function () {
                status = statuses.add;
            },

            showAddForm: function () {
                status = statuses.add;
            },
            showEditForm: function () {
                status = statuses.edit;
            },

            getTitle: function () {
                var result;
                if (status == statuses.add) {
                    result = 'Add new department';
                } else if (status == statuses.edit) {
                    result = 'Edit department';
                }
                return result;
            }

        };
    });


    services.service('tabService', function () {
        var tabs = {depList: 1, depForm: 2, empList: 3, empForm: 4},
            activeTab = tabs.depList,
            hideEmpList = true,
            hideEmpForm = true;

        return {

            isDepList: function () {
                return activeTab == tabs.depList;
            },
            isDepForm: function () {
                return activeTab == tabs.depForm;
            },
            isEmpList: function () {
                return activeTab == tabs.empList;
            },
            isEmpForm: function () {
                return activeTab == tabs.empForm;
            },

            setDepListAsActive: function () {
                activeTab = tabs.depList;
            },
            setDepFormAsActive: function () {
                activeTab = tabs.depForm;
            },
            setEmpListAsActive: function () {
                activeTab = tabs.empList;
            },
            setEmpFormAsActive: function () {
                activeTab = tabs.empForm;
            },

            isEmpListHide: function () {
                return hideEmpList;
            },
            isEmpFormHide: function () {
                return hideEmpForm;
            },

            hideEmpList: function (value) {
                hideEmpList = value;
            },
            hideEmpForm: function (value) {
                return value;
            }

        };
    });


    services.service('validationService', function () {

        /**
         * Example of validation result:
         * {isValid: true, view: {field1:{isValid:true/false}, message:'jasdjaso'},...}, server: {field1:{isValid:true/false}, message:'jasdjaso'}, ...} }
         */
        var validateField = function (objectToValidate, validationRules, fieldName) {
            var result = {isValid: true},
                regexp,
                fieldValue = objectToValidate[fieldName],
                validationRule = validationRules[fieldName];

            if (validationRule) {
                regexp = new RegExp(validationRule.pattern);

                if (!fieldValue.match(regexp)) {
                    result.message = validationRules[fieldName].message;
                    result.isValid = false;
                }

            }

            return result;

        };

        return {

            /**
             *
             * @param objectToValidate
             * @param validationRules object like this { fieldName: {pattern : 'pattern', message : 'message'}, ...}
             * @param customValidator
             * @returns {{isValid: boolean}}
             *
             *  Example of validation result:
             * {isValid: true, view: {field1:{isValid:true/false}, message:'jasdjaso'},...}, server: {field1:{isValid:true/false}, message:'jasdjaso'}, ...} }
             */
            validate: function (objectToValidate, validationRules, customValidator) {

                var result = {isValid: true};

                if (customValidator) {
                    //todo
                }

                for (var field in objectToValidate) {
                    var validationFieldResult = validateField(objectToValidate, validationRules, field);

                    if (!validationFieldResult.isValid && result.isValid) {
                        result.isValid = false;
                    }

                    result[field] = validationFieldResult;

                }

                return result;
            },

            defaultValidationResult: {isValid: true},

        };
    });


})();

