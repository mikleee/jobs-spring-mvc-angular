<div ng-controller="DepartmentFormController">

    <div class="inline-container separated-y">

        <div class="col-2-3">

            <div class="separated-y">
                <div>
                    <label for="depName">NAME</label>
                </div>
                <div class="inline-container">
                    <div class="col-2-3">
                        <input id="depName" type="text" placeholder="enter name"
                               ng-model="currentDep.name" ng-blur="blur()"
                               ng-class="{inputInvalid : fieldInvalid('name'), inputDefault : !fieldInvalid('name')}"/>
                    </div>
                    <div class="col-10">
                        <img ng-show="fieldInvalid('name')"
                             title="{{validationResult().name.message}}"
                             style="height: 30px"
                             src="/img/question.png">
                    </div>
                </div>
            </div>

            <div class="separated-y">
                <div>
                    <label for="depLocation">LOCATION</label>
                </div>
                <div class="inline-container">
                    <div class="col-2-3">
                        <input id="depLocation" type="text" placeholder="enter location"
                               ng-model="currentDep.location"
                               ng-class="{inputInvalid : fieldInvalid('location'), inputDefault : !fieldInvalid('location')}"/>
                    </div>
                    <div class="col-10">
                        <img ng-show="fieldInvalid('location')"
                             title="{{validationResult().location.message}}"
                             style="height: 30px"
                             src="/img/question.png">
                    </div>
                </div>
            </div>

        </div>


        <div class="col-1-3">
            fjiowefjiowefjiowefuwehfuiwehfuiwehfuiwhweui
        </div>

    </div>

    <div class="separated-y">
        <button class="btn btn-info" ng-disabled="!validationResult().isValid" ng-click="add()">
            Add / Update //todo
        </button>
        <button class="btn btn-default">
            Add new
        </button>
    </div>

</div>