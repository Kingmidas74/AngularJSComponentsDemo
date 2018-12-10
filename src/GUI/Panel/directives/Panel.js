"use strict";

DemoWeb_GUI_Panel.directive('mrPanel', () => {
	return {
		restrict: 'E',
		replace: true,
		transclude: {
			'header': '?header',
			'default': '?default',
		},
		templateUrl: 'mr_panel_template.htm',
		controller: 'mrPanelController',
		scope: {
			showHelpListener: "="
		}
	}
});