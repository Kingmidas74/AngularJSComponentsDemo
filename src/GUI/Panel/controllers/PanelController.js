"use strict";

DemoWeb_GUI_Panel.controller('mrPanelController', ($scope) => {				

	$scope.ShowHelp = ($event) => {
		$scope.showHelpListener();
		$event.stopPropagation();
	}

});