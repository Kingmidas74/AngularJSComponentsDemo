"use strict";

DemoWeb_GUI_Files.directive('mrFileExplorer', () => {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'file_explorer_template.htm',
		scope: {
			filename: "=",
			files:"=",
			removeFileListener:"=",
			createSceneListener:"=",
			apiUserToken:"="
		},
		controller: 'FileExplorerController'		
	};
});
