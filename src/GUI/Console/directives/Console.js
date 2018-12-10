"use strict";

DemoWeb_GUI_Console.directive('mrConsole', () => {
    return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'console_template.htm',
		controller: 'ConsoleController',
		scope: {
			items: "="
		}
       };
	}
);
