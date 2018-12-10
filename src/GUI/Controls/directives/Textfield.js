"use strict";

DemoWeb_GUI_Controls.directive('mrTextfield',  () => {
	return {
		restrict: 'E',
		templateUrl: 'textfield_template.htm',
		replace: true,
		transclude: true,
		scope: {
			value:"=",
			type:"@",
			isRequired:"=",
			change:"&",
			placeholder:"@"
		}		
	};
});
