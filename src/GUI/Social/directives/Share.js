"use strict";

DemoWeb_GUI_Social.directive('mrShare',  () => {
	return {
		restrict: 'E',
		replace: true,
		transclude:true,
		templateUrl: 'mr_share_template.htm',		
		controller: 'mrShareController'
	}
});
