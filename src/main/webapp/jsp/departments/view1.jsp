<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html ng-app="departments">


<head>
    <jsp:include page="./view1-resources.jsp"/>
</head>


<body>

<notification-bar></notification-bar>


<div class="col-70 text-section-default separated-y" ng-controller="MainController">


    <div class="container">

        <div class="row separated-y">
            <tabs-panel></tabs-panel>
        </div>

        <div class="row separated-y" ng-show="conditions.isDepForm()">
            <department-form></department-form>
        </div>


        <div class="row separated-y" ng-show="conditions.isDepList()">
            <department-list></department-list>
        </div>

        <div class="row separated-y" ng-show="conditions.isEmpList()">
            <employee-list></employee-list>
        </div>

        <div class="row separated-y" ng-show="conditions.isEmpForm()">
            <employee-form></employee-form>
        </div>

    </div>

</div>

<div>
    <developer-bar></developer-bar>
</div>


</body>

</html>