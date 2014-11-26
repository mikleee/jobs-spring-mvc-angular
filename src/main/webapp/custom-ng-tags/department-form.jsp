<div class="container" ng-controller="DepartmentFormController">

    <form novalidate>

        <div class="row" ng-hide="isEmptyDep()">
            <span class="info-area">
                {{currentDep.name}} {{currentDep.location}}
            </span>
        </div>
        <div class="row">
            <label class="col-md-4" for="depName">NAME</label>
            <input class="col-md-4" id="depName" type="text" placeholder="enter name" ng-model="currentDep.name"/>
        </div>
        <div class="row">
            <label class="col-md-4" for="depLocation">LOCATION</label>
            <input class="col-md-4" id="depLocation" type="text" placeholder="enter location"
                   ng-model="currentDep.location"/>
        </div>
        <div class="row">
            <button class="btn btn-default btn-sm" ng-click="add()">Add</button>
            <button class="btn btn-default btn-sm" ng-click="populate()">Add random 5</button>
        </div>

    </form>

</div>