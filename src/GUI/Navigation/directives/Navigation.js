"use strict";

DemoWeb_GUI_Navigation.directive('mrNavigation', () => {
    return {
		restrict: 'E',
		replace: true,
		transclude: {
			'user': '?user',
			'nav':'?nav',
			'default': '?default',
		},
		templateUrl: 'navigation_template.htm',
		controller: 'NavigationController'
       };
	}
);
