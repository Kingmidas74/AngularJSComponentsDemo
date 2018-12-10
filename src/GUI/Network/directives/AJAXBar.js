"use strict";

DemoWeb_GUI_Network.directive('mrAjaxBar', () => {
	return {
		restrict: 'E',
		replace:true,
		transclude:true,
		templateUrl: 'ajax_bar_template.htm',
		controller: 'AJAXBarController'
	}
});
