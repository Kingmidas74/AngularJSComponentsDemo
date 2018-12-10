"use strict";

DemoWeb_GUI_User.directive('mrUserPanel', () => {
    return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'user_panel_template.htm',
		controller: 'UserController',
		scope: {
			user:"="
		}		
       };
	}
);
