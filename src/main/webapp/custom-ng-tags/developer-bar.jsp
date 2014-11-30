<div ng-controller="DeveloperBarController">

    <div class="developer-info-area">
        <label for="showDeveloperBar">{{showDeveloperBar ? 'Hide' : 'Show'}} developer bar</label>
        <input id="showDeveloperBar" type="checkbox" ng-model="showDeveloperBar">
    </div>

    <div class="inline-container">

        <div class="developer-info-area col-1-2" ng-show="showDeveloperBar">

            <div class="developer-info-area">
                <div class="developer-info-area">
                    <label for="currentDepValidation">
                        {{currentDepValidation ? 'Hide' : 'Show'}} current department validation report
                    </label>
                    <input id="currentDepValidation" type="checkbox" ng-model="currentDepValidation">
                </div>
                <div class="developer-info-area" ng-show="currentDepValidation">
                    {{validationReport.department()}}
                </div>
            </div>

            <div class="developer-info-area">
                <div class="developer-info-area">
                    <label for="depRawData">
                        {{depRawData ? 'Hide' : 'Show'}} raw department data
                    </label>
                    <input id="depRawData" type="checkbox" ng-model="depRawData">
                </div>
                <div class="developer-info-area" ng-show="depRawData">
                    {{data.depRawData()}}
                </div>
            </div>

            <div class="developer-info-area">
                <div class="developer-info-area">
                    <label for="depPagedData">
                        {{depPagedData ? 'Hide' : 'Show'}} paged department data
                    </label>
                    <input id="depPagedData" type="checkbox" ng-model="depPagedData">
                </div>
                <div class="developer-info-area" ng-repeat="page in data.depPagedData()" ng-show="depPagedData">
                    <div class="developer-info-area">
                        <span>{{page.number}}</span>
                        <span>size: {{page.content.length}}</span>
                    </div>
                    <div class="developer-info-area">{{page.content}}</div>
                </div>
            </div>

        </div>

        <div class="developer-info-area col-1-2" ng-show="showDeveloperBar">

            <div class="developer-info-area">
                <div class="developer-info-area">
                    <label for="currentEmpValidation">
                        {{currentEmpValidation ? 'Hide' : 'Show'}} current empartment validation report
                    </label>
                    <input id="currentEmpValidation" type="checkbox" ng-model="currentEmpValidation">
                </div>
                <div class="developer-info-area" ng-show="currentEmpValidation">
                    {{validationReport.empartment()}}
                </div>
            </div>

            <div class="developer-info-area">
                <div class="developer-info-area">
                    <label for="empRawData">
                        {{empRawData ? 'Hide' : 'Show'}} raw empartment data
                    </label>
                    <input id="empRawData" type="checkbox" ng-model="empRawData">
                </div>
                <div class="developer-info-area" ng-show="empRawData">
                    {{data.empRawData()}}
                </div>
            </div>

            <div class="developer-info-area">
                <div class="developer-info-area">
                    <label for="empPagedData">
                        {{empPagedData ? 'Hide' : 'Show'}} paged empartment data
                    </label>
                    <input id="empPagedData" type="checkbox" ng-model="empPagedData">
                </div>
                <div class="developer-info-area" ng-repeat="page in data.empPagedData()" ng-show="empPagedData">
                    <div class="developer-info-area">
                        <span>{{page.number}}</span>
                        <span>size: {{page.content.length}}</span>
                    </div>
                    <div class="developer-info-area">{{page.content}}</div>
                </div>
            </div>

        </div>

    </div>

</div>