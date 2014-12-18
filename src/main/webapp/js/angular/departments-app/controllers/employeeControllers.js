(function () {

    var employeeControllers = angular.module('employeeControllers', ['departmentServices', 'employeeServices']);


    employeeControllers.controller('EmployeeListController', ['$scope', '$rootScope', 'depService', 'employeeFormService', 'tabService', 'empService',
        function ($scope, $rootScope, depService, employeeFormService, tabService, empService) {

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
                    employeeFormService.setEditStatus(department);
                },
                showAddForm: function () {
                    employeeFormService.setAddStatus();
                    tabService.setEmpFormAsActive();
                },
                deleteOne: function (employee) {
                    empService.deleteOne(employee);
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


    employeeControllers.controller('EmployeeFormController', ['$scope', 'empService', 'employeeFormService',
        function ($scope, empService, employeeFormService) {

            $scope.$on('CHECK_EMP_FORM_MODEL', function () {
                $scope.currentEmp = employeeFormService.getFixedEmployee();
            });

            $scope.$watch('currentEmp.email', function (oldV, newV) {
                empService.clearServerMessages();
            });

            $scope.currentEmp = {name: '', location: ''};

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

})();

