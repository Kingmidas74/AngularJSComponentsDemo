"use strict";

DemoWeb_GUI_Menu.controller('MenuController', ($scope) => {

    $scope.OpenMenu = ($event) => {
        $scope.isOpen=true;
        $event.stopPropagation();
    }

    $scope.CloseMenu = ($event) => {
        if($scope.isOpen) {
            $scope.isOpen=false;
        }
        $event.stopPropagation();
    }

    $scope.ToggleMenu = ($event) => {
        $scope.isOpen=!$scope.isOpen;
        $event.stopPropagation();
    }
    
});