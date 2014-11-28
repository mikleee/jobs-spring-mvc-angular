<div ng-controller="DeveloperBarController">

    <div class="developer-info-area">
        <label for="showDeveloperBar">{{showDeveloperBar ? 'Hide' : 'Show'}} developer bar</label>
        <input id="showDeveloperBar" type="checkbox" ng-model="showDeveloperBar">
    </div>

    <div class="developer-info-area" ng-show="showDeveloperBar">

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
                {{data.rawData()}}
            </div>
        </div>

        <div class="developer-info-area">
            <div class="developer-info-area">
                <label for="depPagedData">
                    {{depPagedData ? 'Hide' : 'Show'}} paged department data
                </label>
                <input id="depPagedData" type="checkbox" ng-model="depPagedData">
            </div>
            <div class="developer-info-area" ng-repeat="page in data.pagedData()" ng-show="depPagedData">
                <div class="developer-info-area">
                    <span>{{page.number}}</span>
                    <span>size: {{page.content.length}}</span>
                </div>
                <div class="developer-info-area">{{page.content}}</div>
            </div>
        </div>

    </div>

</div>
