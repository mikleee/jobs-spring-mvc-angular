<table class="table" ng-controller="departmentListController">

    <thead>
    <tr ng-hide="isEmpty()" class="header">
        <td class="col-10">ID</td>
        <td class="col-30">NAME</td>
        <td class="col-30">LOCATION</td>
        <td class="col-10"></td>
        <td><button ng-click="depListCtrl.add()">ergkop</button></td>
    </tr>
    </thead>

    <tbody>
    <tr ng-repeat="dep in depList" class="underline-light-gray">
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