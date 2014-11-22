<table class="table" ng-controller="departmentListController">

    <thead>
    <tr>
        <td colspan="1">
            <div class="developer-info-area">
                <input id="showDepListInJson" type="checkbox" ng-model="showDepListInJson">
                <span class="">{{showDepListInJson ? 'Hide JSON' : 'Show in JSON'}}</span>
            </div>
        </td>
        <td colspan="4">
            <div ng-show="showDepListInJson" class="developer-info-area">{{depList()}}</div>
        </td>
    </tr>
    <tr ng-hide="isEmpty()" class="header">
        <td class="col-10">ID</td>
        <td class="col-30">NAME</td>
        <td class="col-30">LOCATION</td>
        <td class="col-10"></td>
        <td>
            <div class="btn-group">
                <button class="btn btn-default" ng-click="add()">add fake</button>
                <button type="button" ng-click="deleteAll()" class="btn btn-default">delete all</button>
            </div>
        </td>
    </tr>
    </thead>

    <tbody>
    <tr ng-repeat="dep in depList()" class="underline-light-gray">
        <td class="col-10">{{dep.id}}</td>
        <td class="col-30">{{dep.name}}</td>
        <td class="col-30">{{dep.location}}</td>
        <td class="col-10">
            <button type="button" class="btn btn-default">Employees</button>
        </td>
        <td>
            <action-buttons></action-buttons>
        </td>
    </tr>
    </tbody>

</table>