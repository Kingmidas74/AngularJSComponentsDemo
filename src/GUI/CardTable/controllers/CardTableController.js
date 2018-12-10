"use strict";

DemoWeb_GUI_CardTable.controller('CardTableController',  ($scope, NotificationService, NavigationEvents) => {


    $scope.Current_Title = "";

    $scope.ToggleNavigation = () => {
        NotificationService.Notify(NavigationEvents.ToggleNavigation);
    }

    $scope.$on('$routeChangeStart', (scope, next, current) => {   
        if(next.$$route.segment) {     
            $scope.Current_Title =  next.$$route.segment;
        }
        else {
            $scope.Current_Title =  "Scenes";
        }

    });
    
});