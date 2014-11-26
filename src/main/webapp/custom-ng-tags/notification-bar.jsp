<span class="notificationBar" ng-controller="NotificationBarController">
    <span>
        <img ng-src="/img/{{imgPath()}}" style="height: 28px">
    </span>
    <span ng-class="{successNotification : isSuccess(), failNotification : isFail(), waitingNotification : isWaiting()}">
        {{getMessage()}}
    </span>
</span>



