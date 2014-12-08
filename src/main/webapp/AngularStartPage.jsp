<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page language="java" contentType="text/html;UTF-8"
         pageEncoding="UTF-8" %>


<c:url var="angularPath" value="//ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular.min.js"/>
<c:url var="bootstrapJSPath" value="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"/>
<c:url var="bootstrapCSSPath" value="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css"/>
<c:url var="jQueryPath" value="http://code.jquery.com/jquery-2.1.1.js"/>


<html ng-app="departments">


<head>

    <script type="text/javascript" src="${angularPath}"></script>
    <script type="text/javascript" src="${jQueryPath}"></script>
    <script type="text/javascript" src="<c:url value ="${bootstrapJSPath}"/>"></script>
    <script type="text/javascript" src="<c:url value ="js/utils.js"/>"></script>
    <script type="text/javascript" src="<c:url value ="js/models.js"/>"></script>
    <script type="text/javascript" src="<c:url value ="js/main.js"/>"></script>
    <script type="text/javascript" src="<c:url value ="js/directives.js"/>"></script>
    <script type="text/javascript" src="<c:url value ="js/services/departmentServices.js"/>"></script>
    <script type="text/javascript" src="<c:url value ="js/services/employeeServices.js"/>"></script>
    <script type="text/javascript" src="<c:url value ="js/services/commonServices.js"/>"></script>

    <link href="https://cdn.jsdelivr.net/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" type="text/css"
          media="all">
    <link href="css/style.css" rel="stylesheet" type="text/css" media="all">
    <link href="css/blocks.css" rel="stylesheet" type="text/css" media="all">
    <link href="${bootstrapCSSPath}" rel="stylesheet" type="text/css" media="all">

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

    </div>

</div>

<div>
    <developer-bar></developer-bar>
</div>


</body>

</html>