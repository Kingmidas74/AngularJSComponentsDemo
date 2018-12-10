"use strict";

DemoWeb_GUI_Social.directive('mrConnect',  () => {
	return {
		restrict: 'E',
		replace: true,
		transclude:true,
		templateUrl: 'mr_connect_template.htm',		
		controller: 'mrConnectController'		
	}
});
