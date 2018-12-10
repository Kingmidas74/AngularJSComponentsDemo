"use strict";

DemoWeb_GUI_Notification.service('NotificationService', function ($rootScope) {
	
	this.Subscribe = (scope, event, callback) => {		
		let handler = $rootScope.$on(event, callback); 		
		scope.$on('$destroy', handler);
	};

	this.Notify = (event, ...args) => {		
		$rootScope.$emit(event,...args);
	}
});