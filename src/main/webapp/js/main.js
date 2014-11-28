(function () {


//    function log(message) {
//        console.log(message);
//    }
//
//    function logData(message, data) {
//        log(message + ':');
//        log(data);
//    }
//
//
//    var SOME_ARRAY = [
//        {name: 'name1', location: 'location1', employeeList: []},
//        {name: 'name2', location: 'location2'},
//        {name: 'name3', location: 'location3'},
//        {name: 'name4', location: 'location4'},
//        {name: 'name5', location: 'location5'}
////        {name: 'fghgft', location: 'rth'}
//    ];


    var departments = angular.module('departments', ['directives', 'services']);


    departments.controller('MainController', ['$scope', 'tabService', function ($scope, tabService) {

        $scope.conditions = {
            isDepList: tabService.isDepList,
            isDepForm: tabService.isDepForm,
            isEmpList: tabService.isEmpList,
            isEmpForm: tabService.isEmpForm
        };

    }]);


    departments.controller('TabController', ['$scope', '$rootScope', 'tabService', 'departmentFormService',
        function ($scope, $rootScope, tabService, departmentFormService) {

            $scope.actions = {
                setDepListAsActive: tabService.setDepListAsActive,
                setDepFormAsActive: tabService.setDepFormAsActive,
                setEmpListAsActive: tabService.setEmpListAsActive,
                setEmpFormAsActive: tabService.setEmpFormAsActive
            };

            $scope.getDepTabTitle = departmentFormService.getTitle;

        }]);


    departments.controller('DepartmentListController', ['$scope', 'depService', 'departmentFormService',
        function ($scope, depService, departmentFormService) {

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
                deleteAll: depService.deleteAll,
                showEditForm: departmentFormService.showEditForm,
                showAddForm: departmentFormService.showAddForm,

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

            $scope.currentDep = {name: '', location: ''};

            $scope.validationResult = function () {
                return depService.validate($scope.currentDep);
            };

            $scope.fieldInvalid = function (fieldName) {
                var isDirty = !$scope.isEmptyDep(),
                    validationResult = depService.getValidationResult();
                return !validationResult[fieldName].isValid && isDirty;
            };

            $scope.add = function () {
                depService.addOne($scope.currentDep);
            };

            $scope.isEmptyDep = function () {
                return $scope.currentDep.name == '' && $scope.currentDep.location == '';
            };

            $scope.blur = function(){
              console.log('blur');
            };

        }
    ])
    ;


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


})
    ();

