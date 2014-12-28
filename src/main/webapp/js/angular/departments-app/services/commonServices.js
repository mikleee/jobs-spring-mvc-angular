(function () {


    var commonServices = angular.module('commonServices', []);


    commonServices.service('notificationService', [
        function () {

            var statuses = {success: 'SUCCESS', fail: 'FAIL', waiting: 'WAITING'},
                lastNotification = {status: statuses.success, message: 'nothing happened'};

            return {

                notifySuccess: function (message) {
                    lastNotification.message = message;
                    lastNotification.status = statuses.success;
                },
                notifyFail: function (message) {
                    lastNotification.message = message;
                    lastNotification.status = statuses.fail;
                },
                notifyWaiting: function (message) {
                    lastNotification.message = message;
                    lastNotification.status = statuses.waiting;
                },

                isFail: function () {
                    return  lastNotification.status == statuses.fail;
                },
                isSuccess: function () {
                    return  lastNotification.status == statuses.success;
                },
                isWaiting: function () {
                    return  lastNotification.status == statuses.waiting;
                },

                getMessage: function () {
                    return  lastNotification.message;
                }

            }

        }
    ]);


    commonServices.service('pagingService', [
        function () {

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
                },

                defineCurrentPageNo: function (pagedList, currentPageNo) {
                    var actualPageNo = currentPageNo - 1;
                    var currentPage = pagedList[actualPageNo];
                    if (actualPageNo != 0 && currentPage == null) {
                        currentPageNo--;
                    }
                    return currentPageNo;
                }
            };
        }]);


    commonServices.service('tabService', function () {
        var tabs = Constants.tabs,
            activeTab = tabs.depList,
            activePopup,
            hideEmpList = true,
            hideEmpForm = true;

        return {

            getActiveTab: function () {
                return activeTab;
            },

            isDepList: function () {
                return activeTab == tabs.depList;
            },
            isDepForm: function () {
                return activePopup == tabs.depForm;
            },
            isEmpList: function () {
                return activeTab == tabs.empList;
            },
            isEmpForm: function () {
                return activePopup == tabs.empForm;
            },
            isPopup: function () {
                return this.isDepForm() || this.isEmpForm();
            },

            setDepListAsActive: function () {
                activeTab = tabs.depList;
            },
            setDepFormAsActive: function () {
                activePopup = tabs.depForm;
            },
            setEmpListAsActive: function () {
                activeTab = tabs.empList;
                hideEmpList = false;
            },
            setEmpFormAsActive: function () {
                activePopup = tabs.empForm;
                hideEmpForm = false;
                documentModifier.appendDatePicker();
            },
            hidePopup: function () {
                activePopup = null;
            },

            isEmpListHide: function () {
                return hideEmpList;
            },
            isEmpFormHide: function () {
                return hideEmpForm;
            },

            hideEmpList: function () {
                hideEmpList = true;
                if (activeTab == tabs.empList) {
                    activeTab = tabs.depList;
                }

            },
            hideEmpForm: function () {
                hideEmpForm = true;
                if (activeTab == tabs.empForm) {
                    activeTab = tabs.depList;
                }
            }

        };
    });


    commonServices.service('validationService', [
        function () {

            var validateField = function (objectToValidate, validationRules, serverMessages, fieldName) {
                var result = {isValid: true},
                    regexp,
                    fieldValue = objectToValidate[fieldName],
                    validationRule = validationRules[fieldName],
                    serverMessage = serverMessages[fieldName];

                if (serverMessage) {
                    result.message = serverMessage;
                    result.isValid = false;
                }

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

                validate: function (objectToValidate, validationRules, serverMessages) {
                    var result = {isValid: true};

                    for (var field in objectToValidate) {
                        var validationFieldResult = validateField(objectToValidate, validationRules, serverMessages, field);

                        if (!validationFieldResult.isValid && result.isValid) {
                            result.isValid = false;
                        }

                        result[field] = validationFieldResult;

                    }

                    return result;
                },

                defaultValidationResult: {isValid: true}

            };
        }]);


})();