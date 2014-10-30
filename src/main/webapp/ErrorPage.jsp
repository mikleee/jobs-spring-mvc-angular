<%--@elvariable id="exceptionMessage" type="java.lang.String"--%>
<html>

<head>
    <title>Error page</title>
    <link href="css/style.css" rel="stylesheet" type="text/css" media="all">
</head>

<body>

<table>
    <tr>
        <th class="withButtons">${exceptionMessage}</th>
    </tr>
    <tr>
        <Form method="get" action="/deplist">
            <td>
                <INPUT class="button" TYPE="submit" VALUE="Department list" formaction="/depList.html">
                <INPUT class="button" TYPE="submit" VALUE="Go home" formaction="/jobs.html">
            </td>
        </form>
    </tr>

</table>

</body>

</html>