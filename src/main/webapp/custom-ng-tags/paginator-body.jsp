<div class="container">

    <div class="row">
        <div class="col-md-2">
            <nav>
                <ul class="pagination">
                    <li ng-repeat="pageSize in models.pageSizes"
                        ng-class="{active : conditions.isCurrentPageSize(pageSize)}">
                        <a class="text-sm" href="#" ng-click="actions.setPageSize(pageSize);" title="page size">{{pageSize}}</a>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="col-md-10">
            <nav>
                <ul class="pagination">
                    <li ng-repeat="page in data.pagedData()" ng-class="{active : conditions.isCurrentPage(page)}">
                        <a class="text-sm" href="#" ng-click="actions.setCurrentPage(page);" title="page number">{{page.number}}</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>

</div>