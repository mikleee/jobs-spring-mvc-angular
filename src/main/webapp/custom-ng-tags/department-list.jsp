<table class="table" ng-controller="DepartmentListController">

    <thead>
    <tr ng-hide="conditions.isEmpty()" class="header">
        <td class="col-10">ID</td>
        <td class="col-30">NAME</td>
        <td class="col-30">LOCATION</td>
        <td class="col-10"></td>
        <td>
            <div class="btn-group">
                <button class="btn btn-default" ng-click="actions.addFake()">add fake</button>
                <button type="button" ng-click="actions.deleteAll()" class="btn btn-default">delete all
                </button>
            </div>
        </td>
    </tr>
    </thead>

    <tbody>
    <tr ng-repeat="dep in data.currentPage().content" class="underline-light-gray">
        <td class="col-10">{{dep.id}}</td>
        <td class="col-30">{{dep.name}}</td>
        <td class="col-30">{{dep.location}}</td>
        <td class="col-10">
            <button type="button" class="btn btn-default">Employees</button>
        </td>
        <td>
            <div class="btn-group">
                <button type="button" class="btn btn-default">Edit</button>
                <button type="button" ng-click="actions.deleteOne(dep);" class="btn btn-default">Delete</button>
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="1" class="col-10">
            <%--<select ng-model="config.pageSize">--%>
            <%--<option value="5">5</option>--%>
            <%--<option value="10">10</option>--%>
            <%--<option value="20">20</option>--%>
            <%--</select>--%>
        </td>
        <td colspan="4">
            <ul class="nav nav-pills" role="tablist">
                <li role="presentation" ng-repeat="page in data.pagedData()"
                    ng-class="{active : conditions.isCurrentPage(page)}">
                    <a href="#" ng-click="actions.setCurrentPage(page);">{{page.number}}</a>
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <td colspan="5">
            <div class="developer-info-area">
                <input id="showDepListInJson" type="checkbox" ng-model="models.showDepListInJson">
                <span>
                    {{models.showDepListInJson ? 'Hide' : 'Show'}} developer bar.
                </span>
            </div>
            <div class="developer-info-area" ng-show="models.showDepListInJson">
                <div class="developer-info-area">
                    <div class="developer-info-area">
                        Raw data:
                    </div>
                    <div class="developer-info-area">
                        {{data.rawData()}}
                    </div>
                </div>
                <div class="developer-info-area">
                    <div class="developer-info-area">
                        Paged data:
                    </div>
                    <div class="developer-info-area" ng-repeat="page in data.pagedData()">
                        <div class="developer-info-area">
                            <span>{{page.number}}</span>
                            <span>size: {{page.content.length}}</span>
                        </div>
                        <div class="developer-info-area">{{page.content}}</div>
                    </div>
                </div>
            </div>
        </td>
    </tr>
    </tbody>

</table>