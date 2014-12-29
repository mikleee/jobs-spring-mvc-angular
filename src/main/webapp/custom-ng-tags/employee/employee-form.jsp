<div ng-controller="EmployeeFormController">


    <div class="inline-container separated-y">

        <div class="col-2-3">
            <%--name group--%>
            <div class="separated-y">
                <div>
                    <label for="empName">Name</label>
                </div>
                <div class="inline-container">
                    <div class="col-2-3">
                        <input id="empName" type="text" placeholder="enter name" class="inputDefault"
                               ng-model="currentEmp.name"
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
            <%--salary group--%>
            <div class="separated-y">
                <div>
                    <label for="empSalary">Salary</label>
                </div>
                <div class="inline-container">
                    <div class="col-2-3">
                        <input id="empSalary" type="text" placeholder="enter salary" class="inputDefault"
                               ng-model="currentEmp.salary"
                               ng-class="{inputInvalid : fieldInvalid('salary')}"/>
                    </div>
                    <div class="col-10">
                        <img ng-show="fieldInvalid('salary')"
                             title="{{validationMessage('salary')}}"
                             style="height: 30px"
                             src="../../img/question.png">
                    </div>
                </div>
            </div>
            <%--email group--%>
            <div class="separated-y">
                <div>
                    <label for="empEmail">Email</label>
                </div>
                <div class="inline-container">
                    <div class="col-2-3">
                        <input id="empEmail" type="text" placeholder="enter email" class="inputDefault"
                               ng-model="currentEmp.email"
                               ng-class="{inputInvalid : fieldInvalid('email')}"/>
                    </div>
                    <div class="col-10">
                        <img ng-show="fieldInvalid('email')"
                             title="{{validationMessage('email')}}"
                             style="height: 30px"
                             src="../../img/question.png">
                    </div>
                </div>
            </div>
            <%--birth group--%>
            <div class="separated-y">
                <div>
                    <label for="empBirth">Birth</label>
                </div>
                <div class="inline-container">
                    <div class="col-2-3">
                        <input id="empBirth" type="text" placeholder="enter birth" class="datePicker inputDefault"
                               value="{{currentEmp.birth | date : 'dd/MM/yyyy'}}"
                               ng-class="{inputInvalid : fieldInvalid('birth')}"/>
                    </div>
                    <div class="col-10">
                        <img ng-show="fieldInvalid('birth')"
                             title="{{validationMessage('birth')}}"
                             style="height: 30px"
                             src="../../img/question.png">
                    </div>
                </div>
            </div>
        </div>

        <div ng-show="conditions.isEdit()" class="col-1-3">
            <div class="separated-y underline-light-gray">
                <div>
                    Employee:
                </div>
            </div>
            <div class="separated-y inline-container">
                <div class="col-1-2">
                    Id:
                </div>
                <div class="col-1-2">
                    {{getEmployeeForEdit().id}}
                </div>
            </div>
            <div class="separated-y inline-container">
                <div class="col-1-2">
                    Name:
                </div>
                <div class="col-1-2">
                    {{getEmployeeForEdit().name}}
                </div>
            </div>
            <div class="separated-y inline-container">
                <div class="col-1-2">
                    Salary:
                </div>
                <div class="col-1-2">
                    {{getEmployeeForEdit().salary}}
                </div>
            </div>
            <div class="separated-y inline-container">
                <div class="col-1-2">
                    Email:
                </div>
                <div class="col-1-2">
                    {{getEmployeeForEdit().email}}
                </div>
            </div>
            <div class="separated-y inline-container">
                <div class="col-1-2">
                    Birth:
                </div>
                <div class="col-1-2">
                    {{getEmployeeForEdit().birth | date : "dd/MM/yyyy"}}
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