<div ng-controller="DepartmentFormController">

    <div class="inline-container separated-y">

        <div class="col-2-3">
            <%--name group--%>
            <div class="separated-y">
                <div>
                    <label for="depName">Name</label>
                </div>
                <div class="inline-container">
                    <div class="col-2-3">
                        <input id="depName" type="text" placeholder="enter name" class="inputDefault"
                               ng-model="currentDep.name" <%--ng-change="actions.clearServerMessages()"--%>
                               ng-class="{inputInvalid : fieldInvalid('name')}"/>
                    </div>
                    <div class="col-10">
                        <img ng-show="fieldInvalid('name')"
                             title="{{validationMessage('name')}}"
                             style="height: 30px"
                             src="../../img/question.png">
                    </div>
                </div>
            </div>
            <%--location group--%>
            <div class="separated-y">
                <div>
                    <label for="depLocation">Location</label>
                </div>
                <div class="inline-container">
                    <div class="col-2-3">
                        <input id="depLocation" type="text" placeholder="enter location" class="inputDefault"
                               ng-model="currentDep.location"
                               ng-class="{inputInvalid : fieldInvalid('location')}"/>
                    </div>
                    <div class="col-10">
                        <img ng-show="fieldInvalid('location')"
                             title="{{validationMessage('location')}}"
                             style="height: 30px"
                             src="../../img/question.png">
                    </div>
                </div>
            </div>
        </div>

        <div ng-show="conditions.isEdit()" class="col-1-3">
            <div class="separated-y underline-light-gray">
                <div>
                    Department:
                </div>
            </div>
            <div class="separated-y inline-container">
                <div class="col-1-2">
                    Id:
                </div>
                <div class="col-1-2">
                    {{getDepartmentForEdit().id}}
                </div>
            </div>
            <div class="separated-y inline-container">
                <div class="col-1-2">
                    Name:
                </div>
                <div class="col-1-2">
                    {{getDepartmentForEdit().name}}
                </div>
            </div>
            <div class="separated-y inline-container">
                <div class="col-1-2">
                    Location:
                </div>
                <div class="col-1-2">
                    {{getDepartmentForEdit().location}}
                </div>
            </div>
        </div>

    </div>

    <div class="separated-y">
        <button ng-show="conditions.isAdd()" class="btn btn-info" ng-disabled="!validationResult().isValid"
                ng-click="actions.add()">
            Add
        </button>
        <button ng-show="conditions.isEdit()" class="btn btn-info" ng-disabled="!validationResult().isValid"
                ng-click="actions.add()">
            Update
        </button>
        <button ng-show="conditions.isEdit()" ng-click="actions.setAddStatus()" class="btn btn-default">
            Add new
        </button>
    </div>

</div>