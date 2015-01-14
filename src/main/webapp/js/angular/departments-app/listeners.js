var listeners = {

    registerEmpFormControllerListeners: function ($scope, empService, employeeFormService) {
        $scope.$on('SET_EMP_FORM_MODEL', function () {
            $scope.currentEmp = employeeFormService.getFixedEmployee();
        });
        $scope.$on('CLEAR_EMP_FORM_MODEL', function () {
            Utils.clearModel($scope.currentEmp);
        });
        $scope.$on('EMP_BIRTH_SELECTED', function (event, stringDate) {
            $scope.currentEmp.birth = Utils.parseDate(stringDate);
        });
        $scope.$on(Constants.events.containerShouldBeResized, function () {
            DocumentModifier.fitContainer('contentContainer', 'popupContainer');
        });
    }

};

var watchers = {

    registerEmpFormControllerWatchers: function ($scope, empService, employeeFormService) {
        $scope.$watch('currentEmp.email', function (oldV, newV) {
            empService.clearServerMessages();
        });
    }

};