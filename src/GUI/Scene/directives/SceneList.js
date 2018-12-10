"use strict";

DemoWeb_GUI_Scene.directive('mrSceneList', () => {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'mr_scene_list_template.htm',		
		controller: 'mrSceneListController'
	}
});
