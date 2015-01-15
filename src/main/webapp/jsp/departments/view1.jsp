<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html ng-app="departments">


<head>
    <jsp:include page="./view1-resources.jsp"/>
</head>


<body>

<notification-bar></notification-bar>


<div class="col-80 <%--text-section-default --%>separated-y" ng-controller="MainController">


    <div class="inline-container">

        <div class="separated-y col-15">
            <tabs-panel></tabs-panel>
        </div>

        <div id="contentContainer" class="relative col-85">

            <div class="separated-y">
                <department-list ng-show="conditions.isDepList()"></department-list>
                <employee-list ng-show="conditions.isEmpList()"></employee-list>
            </div>

            <div class="separated-y popup" ng-show="conditions.isPopup()">
                <div id="popupContent" class="popup-content">
                    <div class="popup-header">
                        <div class="col-95">{{popupTitle('Add','Edit','department','employee')}}</div>
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