<div class="notificationBar" ng-controller="NotificationBarController">
    <div>
        <img ng-src="/img/{{imgPath()}}" style="height: 28px">
    </div>
    <div ng-class="{successNotification : isSuccess(), failNotification : isFail(), waitingNotification : isWaiting()}">
        {{getMessage()}}
    </div>
</div>



