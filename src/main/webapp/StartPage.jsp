<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page language="java" contentType="text/html;UTF-8"
         pageEncoding="UTF-8" %>

<html>

<head>
    <title>Start page</title>
    <link href="css/style.css" rel="stylesheet" type="text/css" media="all">
    <script type="text/javascript" src="<c:url value ="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.js"/>"></script>
    <script type="text/javascript" src="<c:url value ="js/models.js"/>"></script>
    <script type="text/javascript" src="<c:url value="js/utils.js"/>"></script>
    <script type="text/javascript" src="<c:url value="js/startPage.js"/>"></script>
    <script type="text/javascript" src="<c:url value="js/departmentManipulations.js"/>"></script>
    <script type="text/javascript" src="<c:url value="js/employeeManipulations.js"/>"></script>


</head>

<body>

<script>
    $(document).ready(renderStartPage);
</script>

</body>

</html>