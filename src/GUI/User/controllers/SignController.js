"use strict";

DemoWeb_GUI_User.controller('mrSignController', ($scope, $timeout, $translate, $routeParams, NotificationService, NotificationEvents) => {

    $scope.signTypes = {
        SignIn: 'SignIn',
        SignUp: 'SignUp',
        Rest: 'Rest'
    };

    let DefineSignType = () => {
        let pid = $routeParams.pid;
        if(!!pid) {
            $scope.SignForm.code = pid;
            $scope.SignForm.SignType = $scope.signTypes.SignUp;            
        }
    }

    $scope.user = {};

    $scope.SignForm = {};
    $scope.SignForm.SignType = $scope.signTypes.SignIn;
    $scope.SignForm.email = '';
    $scope.SignForm.password ='';

    let SignIn = () => {
        $scope.signInListener($scope.SignForm.email,
            $scope.SignForm.password,
            $scope.SignForm.remember);
    }

    let SignUp = () => {
        let user = {
            Name: $scope.SignForm.name,
            Surname: $scope.SignForm.surname,
            EMail: $scope.SignForm.email,
            Password: $scope.SignForm.password,
            Repassword: $scope.SignForm.repassword,
            Promo: $scope.SignForm.code,
        }
        $scope.signUpListener(user).then(
            (result) => { 
                NotificationService.Notify(NotificationEvents.Success, $translate.instant('RegistrationSuccess'), result); 
            },
            (error) => { 
                NotificationService.Notify(NotificationEvents.Error, $translate.instant('RegistrationFailed'), error); 
            }
        );
    }


    let RestPassword = () => {
        $scope.restPasswordListener($scope.SignForm.email).then(
            (response) => { 
                NotificationService.Notify(NotificationEvents.Success, $translate.instant('PasswordSent'), response); 
            },
            (error) => { 
                NotificationService.Notify(NotificationEvents.Error, $translate.instant('EmailNotFound'), error);
             }
        );
    }

    $scope.SendForm = () => {
        $timeout(()=>{
            ($scope.SignForm.SignType === $scope.signTypes.SignIn)
                ? SignIn()
                : ($scope.SignForm.SignType === $scope.signTypes.SignUp)
                    ? SignUp()
                    : RestPassword();
        });
    };

    DefineSignType();
});