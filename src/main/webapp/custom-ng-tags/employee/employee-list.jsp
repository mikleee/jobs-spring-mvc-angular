<table class="table" ng-controller="EmployeeListController">

    <thead>
    <tr class="header">
        <td class="col-05">ID</td>
        <td class="col-1-5">NAME</td>
        <td class="col-1-5">SALARY</td>
        <td class="col-1-5">EMAIL</td>
        <td class="col-1-5">BIRTH</td>
        <td class="col-15">
            <button class="btn btn-default btn-sm" ng-click="actions.showAddForm()">Add new</button>
        </td>
    </tr>
    </thead>

    <tbody>
    <tr ng-repeat="emp in data.currentPage().content" class="underline-light-gray">

        <td class="col-05">{{emp.id}}</td>
        <td class="col-1-5">{{emp.name}}</td>
        <td class="col-1-5">{{emp.salary}}</td>
        <td class="col-1-5">{{emp.email}}</td>
        <td class="col-1-5">{{emp.birth | date : "dd/MM/yyyy"}}</td>
        <td class="col-15">
            <emp-action-buttons></emp-action-buttons>
        </td>
    </tr>
    <tr ng-hide="conditions.isEmpty()">
        <td colspan="6">
            <paginator-body></paginator-body>
        </td>
    </tr>
    </tbody>

</table>