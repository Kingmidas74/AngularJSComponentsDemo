"use strict";

DemoWeb_GUI_Controls.directive('mrCheckbox',  () => {
	return {
		restrict: 'E',
		templateUrl: 'checkbox_template.htm',
		replace: true,
		transclude: true,
		controller: "mrCheckboxController",
		scope: {
			checked:"=",
			change:"="
		}
		
	};
});
