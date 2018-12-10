"use strict";

DemoWeb_GUI_Network.controller('AJAXBarController', ($scope, $timeout, NotificationService, NetworkEvents) => {

    $scope.LoadInProgress = false;

    NotificationService.Subscribe($scope, NetworkEvents.AJAXStart, (e) => {        
        $scope.LoadInProgress = true;
    });
    NotificationService.Subscribe($scope, NetworkEvents.AJAXEnd, (e) => {
        $timeout(() => {
            $scope.LoadInProgress = false;
        }, 1000);
    });

});