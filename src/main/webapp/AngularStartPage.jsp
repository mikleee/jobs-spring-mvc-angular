<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page language="java" contentType="text/html;UTF-8"
         pageEncoding="UTF-8" %>

<html ng-app>

<head>
    <script type="text/javascript" src="<c:url value ="//ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular.min.js"/>"></script>
    <link href="https://cdn.jsdelivr.net/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" type="text/css" media="all">
    <link href="/css/style.css" rel="stylesheet" type="text/css" media="all">
</head>

<body>

<div>

    <div class="rounded block-70 section-grey">
        <label for="header" class="rounded text-section-blue">Header {{header}}</label>
        <input id="header" type="text" ng-model="header" class="rounded" placeholder="angular test">
    </div>


</div>


</body>

</html>