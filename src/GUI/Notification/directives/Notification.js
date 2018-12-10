"use strict";

DemoWeb_GUI_Notification.directive('mrNotification', () => {
    return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'notification_template.htm',
		controller: 'NotificationController'
       };
	}
);
