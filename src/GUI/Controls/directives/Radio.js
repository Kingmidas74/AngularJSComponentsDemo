"use strict";

DemoWeb_GUI_Controls.directive('mrRadio',  () => {
	return {
		restrict: 'E',
		templateUrl: 'radio_template.htm',
		replace: true,
		transclude: true,
		scope: {
			checked:"=",
			value:"=",
			group:"@"
		}
	};
});
