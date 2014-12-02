<table class="table" ng-controller="DepartmentListController">

    <thead>
    <tr class="header">
        <td class="col-05">ID</td>
        <td class="col-30">NAME</td>
        <td class="col-30">LOCATION</td>
        <td class="col-1-4">
        <div class="btn-group">
                <button class="btn btn-default btn-sm" ng-click="actions.populate()">Add random 5</button>
                <button class="btn btn-default btn-sm" ng-click="actions.showAddForm()">Add new</button>
                <button class="btn btn-default btn-sm" ng-click="actions.deleteAll()">Delete all</button>
            </div>
        </td>
    </tr>
    </thead>

    <tbody>
    <tr ng-repeat="dep in data.currentPage().content" class="underline-light-gray">
        <td class="col-05">{{dep.id}}</td>
        <td class="col-30">{{dep.name}}</td>
        <td class="col-30">{{dep.location}}</td>
        <td class="col-1-4">
        <dep-action-buttons></dep-action-buttons>
        </td>
    </tr>
    <tr ng-hide="conditions.isEmpty()">
        <td colspan="4">
            <paginator-body></paginator-body>
        </td>
    </tr>
    </tbody>

</table>