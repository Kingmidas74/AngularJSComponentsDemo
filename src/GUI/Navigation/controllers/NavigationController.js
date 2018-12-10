"use strict";

DemoWeb_GUI_Navigation.controller('NavigationController',  ($scope,$location,NotificationService, NavigationSettings, NavigationEvents) => {

    $scope.state = NavigationSettings.IsOpenByDefault;

    NotificationService.Subscribe($scope, NavigationEvents.ToggleNavigation, () => {$scope.state=!$scope.state;});
    NotificationService.Subscribe($scope, NavigationEvents.ShowNavigation, () => {$scope.state=true;});
    NotificationService.Subscribe($scope, NavigationEvents.HideNavigation, () => {$scope.state=false;});

    $scope.ToggleSidebar = () => {
        $scope.state = !$scope.state;
    }

    $scope.HideSideBar = () => {	
        let result=false;
        for(let i=0; i<NavigationSettings.HideSegments.length; i++)
        {
            if($location.$$path.startsWith(NavigationSettings.HideSegments[i]))
            {
                result=true;
            }
        }
        result=result || $location.$$path==='/';
        return result;
    }
});