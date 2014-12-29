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
                showEditForm: function (employee) {
                    employeeFormService.setEditStatus(employee);
                },
                showAddForm: function () {
                    employeeFormService.setAddStatus();
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

            $scope.$on('SET_EMP_FORM_MODEL', function () {
                $scope.currentEmp = employeeFormService.getFixedEmployee();
            });
            $scope.$on('CLEAR_EMP_FORM_MODEL', function () {
                Utils.clearModel($scope.currentEmp);
            });
            $scope.$on('EMP_BIRTH_SELECTED', function (event, stringDate) {
                $scope.currentEmp.birth = Utils.parseDate(stringDate);
            });


            $scope.$watch('currentEmp.email', function (oldV, newV) {
                empService.clearServerMessages();
            });

            $scope.currentEmp = Utils.createEmptyModel(['name', 'salary', 'email', 'birth']);

            $scope.conditions = {
                isEmptyEmp: function () {
                    return $scope.currentDep.name == '' && $scope.currentDep.location == '';
                },
                isEdit: employeeFormService.isEditStatus,
                isAdd: employeeFormService.isAddStatus
            };

            $scope.actions = {
                add: function () {
                    empService.addOne($scope.currentEmp);
                },
                setAddStatus: function () {
                    empService.resetDepartment($scope.currentEmp);
                    employeeFormService.setAddStatus();
                }
            };

            $scope.validationResult = function () {
                return empService.validate($scope.currentEmp);
            };

            $scope.fieldInvalid = function (fieldName) {
                var isDirty = !Utils.isModelEmpty($scope.currentEmp),
                    validationResult = $scope.validationResult();
                return !validationResult[fieldName].isValid && isDirty;
            };

            $scope.validationMessage = function (fieldName) {
                var validationResult = $scope.validationResult();
                return validationResult[fieldName].message;
            };

            $scope.getEmployeeForEdit = employeeFormService.getFixedEmployee;

        }

    ]);

})();

