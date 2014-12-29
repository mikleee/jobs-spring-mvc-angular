<ul class="nav nav-pills nav-stacked" ng-controller="TabController">

    <li role="presentation" ng-class="{ active : conditions.isDepList() }" ng-click="actions.setDepListAsActive()">
        <a href="#">Departments</a>
    </li>

    <%--<li role="presentation" ng-class="{ active : conditions.isDepForm() }" ng-click="actions.setDepFormAsActive()">--%>
    <%--<a href="#">{{tcConditions.isAddDepStatus() ? 'Add new department' : 'Edit department'}}</a>--%>
    <%--</li>--%>

    <li role="presentation" ng-class="{ active : conditions.isEmpList() }" ng-click="actions.setEmpListAsActive()"
        ng-hide="tcConditions.isEmpListHide()">
        <a href="#">
            Employee list
            <span class="closeIcon glyphicon glyphicon-remove" title="close" aria-hidden="true"
                  ng-click="actions.hideEmpList(); $event.stopPropagation();"></span>
        </a>
    </li>

    <%--<li role="presentation" ng-class="{ active : conditions.isEmpForm() }" ng-click="actions.setEmpFormAsActive()"--%>
        <%--ng-hide="tcConditions.isEmpFormHide()">--%>
        <%--<a href="#">{{tcConditions.isAddEmpStatus() ? 'Add new employee' : 'Edit employee'}}--%>
         <%--<span class="closeIcon glyphicon glyphicon-remove" title="close" aria-hidden="true"--%>
               <%--ng-click="actions.hideEmpForm(); $event.stopPropagation();"></span>--%>
        <%--</a>--%>
    <%--</li>--%>
</ul>