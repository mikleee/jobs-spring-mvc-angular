<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page language="java" contentType="text/html;UTF-8" pageEncoding="UTF-8" %>


<c:url var="angularPath" value="//ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular.min.js"/>
<c:url var="bootstrapJSPath" value="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"/>
<c:url var="bootstrapCSSPath" value="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css"/>
<c:url var="jQueryPath" value="http://code.jquery.com/jquery-2.1.1.js"/>
<c:url var="jQueryUIPath" value="/js/lib/jquery-ui.js"/>
<c:url var="jQueryUICSSPath" value="/css/lib/jquery-ui/jquery-ui.css"/>
<c:url var="jQueryUIThemeCSSPath" value="/css/lib/jquery-ui/jquery-ui.theme.css"/>

<script type="text/javascript" src="${angularPath}"></script>
<script type="text/javascript" src="${jQueryPath}"></script>
<script type="text/javascript" src="${jQueryUIPath}"></script>
<script type="text/javascript" src="<c:url value ="${bootstrapJSPath}"/>"></script>


<link href="${bootstrapCSSPath}" rel="stylesheet" type="text/css" media="all">
<link href="${jQueryUICSSPath}" rel="stylesheet" type="text/css" media="all">
<link href="${jQueryUIThemeCSSPath}" rel="stylesheet" type="text/css" media="all">



