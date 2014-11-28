(function () {

    var directives = angular.module('directives', []);


    directives.directive("depActionButtons", function () {
        return {
            restrict: 'E',
            templateUrl: 'custom-ng-tags/dep-action-buttons.jsp'
        };
    });


    directives.directive("departmentForm", function () {
        return {
            restrict: 'E',
            templateUrl: 'custom-ng-tags/department-form.jsp'
        };
    });


    directives.directive("departmentList", function () {
        return {
            restrict: 'E',
            templateUrl: 'custom-ng-tags/department-list.jsp'
        };
    });


    directives.directive("tabsPanel", function () {
        return {
            restrict: 'E',
            templateUrl: 'custom-ng-tags/tabs-panel.jsp'
        };
    });

    directives.directive("notificationBar", function () {
        return {
            restrict: 'E',
            templateUrl: 'custom-ng-tags/notification-bar.jsp'
        };
    });

    directives.directive("paginatorBody", function () {
        return {
            restrict: 'E',
            templateUrl: 'custom-ng-tags/paginator-body.jsp'
        };
    });

    directives.directive("developerBar", function () {
        return {
            restrict: 'E',
            templateUrl: 'custom-ng-tags/developer-bar.jsp'
        };
    });

})();

