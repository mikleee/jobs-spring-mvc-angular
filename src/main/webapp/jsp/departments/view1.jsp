<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html ng-app="departments">


<head>
    <jsp:include page="./view1-resources.jsp"/>
</head>


<body>

<notification-bar></notification-bar>


<div class="col-70 text-section-default separated-y" ng-controller="MainController">


    <div class="">

        <div class="separated-y">
        <tabs-panel></tabs-panel>
        </div>

        <div class="relative">

            <div class="separated-y">
                <department-list ng-show="conditions.isDepList()"></department-list>
                <employee-list ng-show="conditions.isEmpList()"></employee-list>
            </div>

            <div class="separated-y popup" ng-show="conditions.isPopup()">
                <div class="popup-content">
                    <div class="inline-container underline-light-gray">
                        <div class="col-95">form</div>
                        <div class="col-05">
                            <span class="closeIcon glyphicon glyphicon-remove" title="close" aria-hidden="true" ng-click="hidePopup()"></span>
                        </div>
                    </div>
                    <div>
                        <department-form ng-show="conditions.isDepForm()"></department-form>
                        <employee-form ng-show="conditions.isEmpForm()"></employee-form>
                    </div>
                </div>
            </div>

        </div>

    </div>

</div>

<div>
    <developer-bar></developer-bar>
</div>


</body>

</html>