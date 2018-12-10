"use strict";

DemoWeb_GUI_Social.controller('mrConnectController', ($scope, $translate,NotificationService,NotificationEvents) => {				
    $scope.VKAuth = () => {
        /*UserService.TryLoginUserByVK().then(
            (success) => { 
                
            },
            (error) => { 
                NotificationService.Notify(NotificationEvents.Error, $translate.instant('AuthorizationFailed'), error);
            }
        )*/
    }
});