<div class="btn-group">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"
            aria-expanded="false">
        Actions <span class="caret"></span>
    </button>
    <ul class="dropdown-menu" role="menu">
        <li>
            <a class="text-sm" href="#">Add employee
            </a>
        </li>
        <li ng-hide="conditions.noEmployees(dep);">
            <a class="text-sm" href="#">
                Employee list
            </a>
        </li>
        <li>
            <a class="text-sm" href="#" ng-click="actions.showEditForm(dep);">
                Edit
            </a>
        </li>
        <li>
            <a class="text-sm" href="#" ng-click="actions.deleteOne(dep);">
                Delete
            </a>
        </li>
    </ul>
</div>