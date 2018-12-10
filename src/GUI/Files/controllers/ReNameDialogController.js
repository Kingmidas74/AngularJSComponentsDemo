"use strict";

DemoWeb_GUI_Files.controller('ReNameDialogController', ($scope, $timeout) => {

    let regexp = new RegExp('^[a-zA-Z0-9_]+$');
    $scope.errorPattern = false;
    $scope.errorDouble = false;

    $scope.textBoxChanged = () =>
    {
        $timeout(()=>{
            $scope.errorPattern = !regexp.test($scope.oldFileName);
            $scope.errorDouble = false;

            $scope.files.forEach(element => {
                let name = element.Title.substring(0, element.Title.indexOf('.'));

                if(name === $scope.oldFileName)
                    $scope.errorDouble = true;
            });
		});
    }

    $scope.textBoxChanged();
});