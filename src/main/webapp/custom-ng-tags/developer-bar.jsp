<div class="developer-info-area" ng-class="DeveloperBarController">
    <input type="checkbox" ng-model="show" ng-change="refreshData">
    <span>{{show ? 'Hide' : 'Show'}} developer bar.</span>
</div>

<div class="developer-info-area" ng-show="show">
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