(function () {

    var departments = angular.module('departments', ['directives', 'departmentServices', 'employeeServices', 'employeeControllers', 'departmentControllers']);

    departments.controller('MainController', ['$scope', 'tabService',
        function ($scope, tabService) {

            $scope.conditions = {
                isDepList: tabService.isDepList,
                isDepForm: tabService.isDepForm,
                isEmpList: tabService.isEmpList,
                isEmpForm: tabService.isEmpForm,
                isPopup: tabService.isPopup,
                isAddStatus: tabService.isAddPopupStatus,
                isEditStatus: tabService.isEditPopupStatus
            };

            $scope.hidePopup = tabService.hidePopup;

            $scope.popupTitle = function (addLabel, editLabel, departmentLabel, employeeLabel) {
                var entityLabel, statusLabel;

                if (tabService.isAddPopupStatus()) {
                    statusLabel = addLabel;
                } else if (tabService.isEditPopupStatus()) {
                    statusLabel = editLabel;
                }

                if (tabService.isDepForm()) {
                    entityLabel = departmentLabel;
                } else if (tabService.isEmpForm()) {
                    entityLabel = employeeLabel
                }

                return statusLabel + ' ' + entityLabel;
            }

        }
    ]);


    departments.controller('TabController', ['$scope', 'tabService', 'departmentFormService',
        function ($scope, tabService, departmentFormService) {

            $scope.actions = {
                setDepListAsActive: tabService.setDepListAsActive,
                setDepFormAsActive: tabService.setDepFormAsActive,
                setEmpListAsActive: tabService.setEmpListAsActive,
                setEmpFormAsActive: tabService.setEmpFormAsActive,
                hideEmpList: tabService.hideEmpList,
                hideEmpForm: tabService.hideEmpForm
            };

            $scope.tcConditions = {
                isAddDepStatus: departmentFormService.isAddStatus,
                isEmpListHide: tabService.isEmpListHide,
                isEmpFormHide: tabService.isEmpFormHide
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


    departments.controller('DeveloperBarController', ['$scope', 'depService', 'empService',
        function ($scope, depService, empService) {
            $scope.show = false;

            $scope.data = {
                depRawData: depService.getDepList,
                depPagedData: depService.getPagedData,
                empRawData: empService.getEmpList,
                empPagedData: empService.getPagedData
            };

            $scope.validationReport = {
                department: depService.getValidationResult,
                employee: empService.getValidationResult
            };

        }
    ]);


})();

