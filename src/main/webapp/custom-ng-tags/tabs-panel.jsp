<ul class="nav nav-pills" role="tablist" ng-controller="TabController as tabCtrl">
    <li role="presentation" ng-class="{ active : tabCtrl.isSet(1) }" ng-click="tabCtrl.setTab(1)">
        <a href="#">Departments</a>
    </li>
    <li role="presentation" ng-class="{ active : tabCtrl.isSet(2) }" ng-click="tabCtrl.setTab(2)">
        <a href="#">Add new department</a>
    </li>
</ul>