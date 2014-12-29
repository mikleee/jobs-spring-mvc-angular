(function () {

    var departmentControllers = angular.module('departmentControllers', ['directives', 'departmentServices', 'employeeServices', 'employeeControllers']);


    departmentControllers.controller('DepartmentListController', ['$scope', '$rootScope', 'depService', 'departmentFormService', 'tabService', 'pagingService', 'empService',
        function ($scope, $rootScope, depService, departmentFormService, tabService, pagingService, empService) {

            $scope.models = {
                pageSize: 5,
                pageSizes: [3, 5, 10]
            };

            $scope.data = {
                rawData: depService.getDepList,
                pagedData: depService.getPagedData,
                currentPage: function () {
                    return this.pagedData()[depService.getCurrentPageNo() - 1];
                }
            };

            $scope.actions = {
                populate: depService.populateWithTestData,
                deleteAll: depService.deleteAll,
                showEmpList: function (department) {
                    empService.refreshEmpList(department, $scope.models.pageSize);
                },
                showEditForm: function (department) {
                    departmentFormService.setEditStatus(department);
                },
                showAddForm: function () {
                    departmentFormService.setAddStatus();
                },
                deleteOne: function (department) {
                    depService.deleteOne(department);
                },
                setCurrentPage: function (page) {
                    depService.setCurrentPageNo(page.number);
                },
                setPageSize: function (pageSize) {
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
                    return page.number == depService.getCurrentPageNo();
                },
                isCurrentPageSize: function (pageSize) {
                    return pageSize == $scope.models.pageSize;
                }
            };

            depService.refreshDepList($scope.models.pageSize);

        }
    ]);


    departmentControllers.controller('DepartmentFormController', ['$scope', 'depService', 'departmentFormService',
        function ($scope, depService, departmentFormService) {

            $scope.$on('CLEAR_DEP_FORM_MODEL', function () {
                Utils.clearModel($scope.currentDep);
            });

            $scope.$on('SET_DEP_FORM_MODEL', function () {
                $scope.currentDep = departmentFormService.getFixedDepartment();
            });

            $scope.$watch('currentDep.name', function (oldV, newV) {
                depService.clearServerMessages();
            });

            $scope.currentDep = Utils.createEmptyModel(['name', 'location']);

            $scope.conditions = {
                isEmptyDep: function () {
                    return Utils.isModelEmpty($scope.currentDep);
                },
                isEdit: departmentFormService.isEditStatus,
                isAdd: departmentFormService.isAddStatus
            };

            $scope.actions = {
                add: function () {
                    depService.addOne($scope.currentDep);
                },
                setAddStatus: function () {
                    Utils.clearModel($scope.currentDep);
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

