(function () {


    var departments = angular.module('departments', ['directives', 'departmentServices']);


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
                setEmpFormAsActive: tabService.setEmpFormAsActive
            };

            $scope.tcConditions = {
                isAddDepStatus: departmentFormService.isAddStatus
            };


        }]);


    departments.controller('DepartmentListController', ['$scope', '$rootScope', 'depService', 'departmentFormService', 'tabService',
        function ($scope, $rootScope, depService, departmentFormService, tabService) {

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
                showEditForm: function (department) {
                    tabService.setDepFormAsActive();
                    departmentFormService.setEditStatus(department);
                    $rootScope.$broadcast('CHECK_DEP_FORM_MODEL');
                },
                showAddForm: function () {
                    tabService.setDepFormAsActive();
                    departmentFormService.showAddForm()
                },
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


    departments.controller('DeveloperBarController', ['$scope', 'depService',
        function ($scope, depService) {
            $scope.show = false;

            $scope.data = {
                rawData: depService.getDepList,
                pagedData: depService.getPagedData
            };

            $scope.validationReport = {
                department: depService.getValidationResult
            };

        }
    ]);


})();

