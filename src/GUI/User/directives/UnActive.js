"use strict";
DemoWeb_GUI_User.directive("mrUserActive", (NotificationService, UserEvents, UserSettings, $interval) => {
    
    let userIsActive = true; 
    let afkTimer,offTimer;

    let OnUserAction = () => {
        if (userIsActive === false) {         
            NotificationService.Notify(UserEvents.UserActive);
        }

        userIsActive = true;

        if (!!afkTimer) {
            $interval.cancel(afkTimer);
            if (!!offTimer) {
                $interval.cancel(offTimer);
            }
        }

        

        afkTimer = $interval(() => {
            if (userIsActive) {
                userIsActive = false;
                NotificationService.Notify(UserEvents.UserUnactive);
            }
        }, UserSettings.WaitTimePeriod); 
        
        offTimer = $interval(() => {
            if (userIsActive==false) {
                NotificationService.Notify(UserEvents.UserOff);
            }
        }, UserSettings.WaitTimePeriod*10); 
    }
    return {
        restrict: "A",
        link: (scope, element) => {            
            element[0].addEventListener('mousemove', OnUserAction, false);            
            element[0].addEventListener('keydown', OnUserAction, false);
        }
    };
});