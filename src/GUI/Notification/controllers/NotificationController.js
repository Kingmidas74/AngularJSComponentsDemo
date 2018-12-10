"use strict";

DemoWeb_GUI_Notification.controller('NotificationController', ($scope, $timeout, NotificationService, NotificationEvents, NotificationSettings) => {

	$scope.Message = "";
    $scope.NotificationExist = false;
    $scope.MessageType = "";

    $scope.close = () => { $scope.NotificationExist = false; }

    let LogFactory = (status) => {     
        let _status = status;
        return (event, ...args) => {        
            let innerStatus = _status;
            if (args[0] !== "" && typeof (args[0]) !== "undefined" && !$scope.NotificationExist) {                
                $scope.Message = args[0];
                $scope.NotificationExist = true;
                $scope.MessageType = innerStatus;
                $scope.$applyAsync();
            }
            if (status === MessageTypes.Error) {
                console.log("Message arguments: ", args);
            } else if (status === MessageTypes.Info) {
                console.log("Message arguments: ", args);
            } else if (status === MessageTypes.Warning) {
                console.log("Message arguments: ", args);
            }
            else {
                console.log("Message arguments: ", args);
            }
            $timeout($scope.close, NotificationSettings.Timeouts[innerStatus]);
        }
    }

    let MessageTypes = {
        Error: "ERROR",
        Info: "INFO",
        Success: "SUCCESS",
        Warning: "WARNING"
    };

    NotificationService.Subscribe($scope, NotificationEvents.Error, LogFactory(MessageTypes.Error));
    NotificationService.Subscribe($scope, NotificationEvents.Message, LogFactory(MessageTypes.Info));
    NotificationService.Subscribe($scope, NotificationEvents.Warning, LogFactory(MessageTypes.Warning));
    NotificationService.Subscribe($scope, NotificationEvents.Success, LogFactory(MessageTypes.Success));
    
});