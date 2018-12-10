"use strict";

DemoWeb_GUI_CardTable.controller('TablePaginatorController',  ($scope,$timeout,$window) => {

    $scope.Math=$window.Math;

    $scope.switchElementsPerPageCount = () => {
        $timeout(() => {
            $scope.pagesInfo.currentPage=1;
        });
    };

    $scope.DecreasePage = () => {
        $scope.pagesInfo.currentPage--;
    }

    $scope.IncreasePage = () => {        
         $scope.pagesInfo.currentPage++;
    }
});