"use strict";

DemoWeb_GUI_Controls.controller('mrCheckboxController',  ($scope) => {

    $scope.changeValue = ($event,value) => {
        $event.stopPropagation();
        if(!!($scope.change)) $scope.change(value)
    }

});