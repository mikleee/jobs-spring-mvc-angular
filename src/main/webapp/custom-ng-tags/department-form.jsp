<div class="container" ng-controller="DepartmentFormController as depFormCtrl">

    <form novalidate>
        {{depFormCtrl.currentDep.name}}
        {{depFormCtrl.currentDep.location}}

        <div class="row">
            <label class="col-md-4" for="depName">NAME</label>
            <input class="col-md-4" id="depName" type="text" placeholder="enter name" ng-model="depFormCtrl.currentDep.name"/>
        </div>
        <div class="row">
            <label class="col-md-4" for="depLocation">LOCATION</label>
            <input class="col-md-4" id="depLocation" type="text" placeholder="enter location" ng-model="depFormCtrl.currentDep.location"/>
        </div>
        <div class="row">
            <button class="btn btn-default btn-sm">Add</button>
            <button class="btn btn-default btn-sm" ng-click="depFormCtrl.populate()">Add random 5</button>
        </div>

    </form>

</div>