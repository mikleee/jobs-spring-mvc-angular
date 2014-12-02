(function () {

    var departments = angular.module('departments', ['directives', 'departmentServices', 'employeeServices']);


    departments.controller('MainController', ['$scope', 'tabService', function ($scope, tabService) {

        $scope.conditions = {
            isDepList: tabService.isDepList,
            isDepForm: tabService.isDepForm,
            isEmpList: tabService.isEmpList,
            isEmpForm: tabService.isEmpForm
        };

    }]);


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

        }]);


    departments.controller('DepartmentListController', ['$scope', '$rootScope', 'depService', 'departmentFormService', 'tabService', 'empService',
        function ($scope, $rootScope, depService, departmentFormService, tabService, empService) {

            $scope.models = {
                pageSize: 5,
                pageSizes: [3, 5, 10]
            };

            $scope.data = {
                currentPageNo: 1,
                rawData: depService.getDepList,
                pagedData: depService.getPagedData,
                currentPage: function () {
                    return this.pagedData()[this.currentPageNo - 1];
                }
            };

            $scope.actions = {
                populate: depService.populateWithTestData,
                deleteAll: function () {
                    $scope.data.currentPageNo = 1;
                    depService.deleteAll();
                },
                showEmpList: function (department) {
                    empService.refreshEmpList(department, $scope.models.pageSize);
                },
                showEditForm: function (department) {
                    departmentFormService.setEditStatus(department);
                },
                showAddForm: departmentFormService.setAddStatus,
                deleteOne: function (department) {
                    depService.deleteOne(department);
                    $scope.data.currentPageNo = 1;
                },
                setCurrentPage: function (page) {
                    $scope.data.currentPageNo = page.number;
                },
                setPageSize: function (pageSize) {
                    $scope.data.currentPageNo = 1;
                    $scope.models.pageSize = pageSize;
                    depService.repaginate(pageSize);
                }
            };

            $scope.conditions = {
                isEmpty: function () {
                    return depService.getDepList().length == 0;
                },
                noEmployees: function (department) {
                    return department.employeeList.length == 0;
                },
                isCurrentPage: function (page) {
                    return page.number == $scope.data.currentPageNo;
                },
                isCurrentPageSize: function (pageSize) {
                    return pageSize == $scope.models.pageSize;
                }
            };

            depService.refreshDepList($scope.models.pageSize);

        }
    ]);


    departments.controller('DepartmentFormController', ['$scope', 'depService', 'departmentFormService',
        function ($scope, depService, departmentFormService) {

            $scope.$on('CHECK_DEP_FORM_MODEL', function () {
                $scope.currentDep = departmentFormService.getFixedDepartment();
            });

            $scope.$watch('currentDep.name', function (oldV, newV) {
                depService.clearServerMessages();
            });

            $scope.currentDep = {name: '', location: ''};

            $scope.conditions = {
                isEmptyDep: function () {
                    return $scope.currentDep.name == '' && $scope.currentDep.location == '';
                },
                isEdit: departmentFormService.isEditStatus,
                isAdd: departmentFormService.isAddStatus
            };

            $scope.actions = {
                add: function () {
                    depService.addOne($scope.currentDep);
                },
                setAddStatus: function () {
                    depService.resetDepartment($scope.currentDep);
                    departmentFormService.setAddStatus();
                }
            };

            $scope.validationResult = function () {
                return depService.validate($scope.currentDep);
            };

            $scope.fieldInvalid = function (fieldName) {
                var isDirty = !$scope.conditions.isEmptyDep(),
                    validationResult = $scope.validationResult();
                return !validationResult[fieldName].isValid && isDirty;
            };

            $scope.validationMessage = function (fieldName) {
                var validationResult = $scope.validationResult();
                return validationResult[fieldName].message;
            };

            $scope.getDepartmentForEdit = departmentFormService.getFixedDepartment;

        }

    ]);


    departments.controller('EmployeeListController', ['$scope', '$rootScope', 'depService', 'departmentFormService', 'tabService', 'empService',
        function ($scope, $rootScope, depService, departmentFormService, tabService, empService) {

            $scope.models = {
                pageSize: 5,
                pageSizes: [3, 5, 10]
            };

            $scope.data = {
                currentPageNo: 1,
                rawData: empService.getEmpList,
                pagedData: empService.getPagedData,
                currentPage: function () {
                    return this.pagedData()[this.currentPageNo - 1];
                }
            };

            $scope.actions = {
                deleteAll: function () {
                    $scope.data.currentPageNo = 1;
                    empService.deleteAll();
                },
                showEditForm: function (department) {
                    departmentFormService.setEditStatus(department);
                },
                showAddForm: departmentFormService.setAddStatus,
                deleteOne: function (department) {
                    depService.deleteOne(department);
                    $scope.data.currentPageNo = 1;
                },
                setCurrentPage: function (page) {
                    $scope.data.currentPageNo = page.number;
                },
                setPageSize: function (pageSize) {
                    $scope.data.currentPageNo = 1;
                    $scope.models.pageSize = pageSize;
                    empService.repaginate(pageSize);
                }
            };

            $scope.conditions = {
                isEmpty: function () {
                    return empService.getEmpList().length == 0;
                },
                isCurrentPage: function (page) {
                    return page.number == $scope.data.currentPageNo;
                },
                isCurrentPageSize: function (pageSize) {
                    return pageSize == $scope.models.pageSize;
                }
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
                department: depService.getValidationResult
            };

        }
    ]);


})();

