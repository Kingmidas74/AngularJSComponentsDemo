"use strict";

DemoWeb_GUI_Controls.directive('mrSelect', () => {
	return {
		restrict: 'E',
		templateUrl: 'select_template.htm',
		replace: true,
		transclude: true,
		scope: {
			value:"=",
			options:"=",
			change:"&"
		}
	};
});
