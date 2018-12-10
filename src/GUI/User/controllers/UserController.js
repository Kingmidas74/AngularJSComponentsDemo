"use strict";

DemoWeb_GUI_User.controller('UserController', ($scope, NotificationService, UserEvents,NotificationEvents, NavigationEvents) => {
	
	$scope.ToggleNavigation = () => {
		NotificationService.Notify(NavigationEvents.ToggleNavigation);
	}
	
/*
	$scope.setUserRate = (item) => {
		if (!!item) {
			UserService.UpdateUserRate(item).then(
                (res) => { NotificationService.Notify(NotificationEvents.Success, "RATE HAS BEEN CHANGED!"); },
                (rej) => { NotificationService.Notify(NotificationEvents.Error, "CHANGE RATE FALLEN!"); }
			);
		}
	}   	

	$scope.CallToSupport = () => {
        NotificationService.Notify(SupportEvents.CallSupport);
	};
	
*/
});