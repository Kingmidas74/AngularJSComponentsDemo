let DemoWeb_GUI_Notification = angular.module('DemoWeb.Components.Notification', [])
.constant('NotificationEvents', {
    Message: "show_message",
    Error: "show_error",
    Warning: "show_warning",
    Success: "show_success",  
}).value('NotificationSettings', {
    Timeouts: {
        WARNING: 1*1000,
        INFO: 1*1000,
        SUCCESS: 1*1000,
        ERROR: 1*1000,
    }       
}).provider('Notification', (NotificationSettingsProvider) => {
    return {
        setTimeouts: (timeouts) => {
            Object.assign(NotificationSettingsProvider.$get().Timeouts, timeouts);
        },

        $get: ($window) => {
            return $window.DemoWeb_GUI_Notification;
        }
    }
});