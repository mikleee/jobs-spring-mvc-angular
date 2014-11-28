<ul class="nav nav-tabs" ng-controller="TabController">
    <li role="presentation" ng-class="{ active : conditions.isDepList() }" ng-click="actions.setDepListAsActive()">
        <a href="#">Departments</a>
    </li>
    <li role="presentation" ng-class="{ active : conditions.isDepForm() }" ng-click="actions.setDepFormAsActive()">
        <a href="#">{{tcConditions.isAddDepStatus() ? 'Add new department' : 'Edit department'}}</a>
    </li>
</ul>