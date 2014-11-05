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
    <script type="text/javascript" src="<c:url value ="js/departments.js"/>"></script>

    <link href="https://cdn.jsdelivr.net/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" type="text/css" media="all">
    <link href="css/style.css" rel="stylesheet" type="text/css" media="all">
    <link href="css/blocks.css" rel="stylesheet" type="text/css" media="all">
    <link href="${bootstrapCSSPath}" rel="stylesheet" type="text/css" media="all">

</head>


<body>


<div class="rounded col-70 row-60 text-section-default scrollable-y separated-y" ng-controller="DepartmentListController as depListCtrl">

    <div class="container">


        <ul class="nav nav-pills" role="tablist">
            <li role="presentation" class="active"><a href="#">Departments</a></li>
            <li role="presentation"><a href="#">Add new department</a></li>
        </ul>

        <div class="row separated-y">

            <%--<table class="rounded text-section-light-blue col-95 separated-y">--%>
            <table class="table">

                <tr ng-hide="depListCtrl.isEmpty()" class="header">
                    <th class="col-1-4">ID</th>
                    <th class="col-1-4">NAME</th>
                    <th class="col-1-4">LOCATION</th>
                    <th class="col-1-4"></th>
                </tr>

                <tr ng-repeat="dep in depListCtrl.depList" class="underline-light-gray">
                    <td class="col-1-4">{{dep.id}}</td>
                    <td class="col-1-4">{{dep.name}}</td>
                    <td class="col-1-4">{{dep.location}}</td>
                    <td class="col-1-4">
                        <div class="btn-group">
                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                Action
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu">
                                <li><a href="#">Employees</a></li>
                                <li><a href="#">Edit</a></li>
                                <li><a href="#">Delete</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>

            </table>

        </div>

    </div>

</div>


<%--<div class="rounded col-95 section-grey" ng-controller="DepartmentListController as depListCtrl">--%>

<%--<label for="header" class="rounded text-section-blue">temp model contains {{depListCtrl.depList.length}} items</label>--%>

<%--<p id="header" class="rounded text-section-light-blue" ng-model="depListCtrl.depList">{{depListCtrl.depList}}</p>--%>

<%--</div>--%>

</body>

</html>