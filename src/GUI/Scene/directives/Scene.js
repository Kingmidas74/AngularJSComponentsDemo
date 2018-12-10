"use strict";

DemoWeb_GUI_Scene.directive('mrScene',  () => {
	return {
		restrict: 'E',
		replace: true,
		transclude: {
			'actions': '?actions',
			'defaultActions': '?defaultActions',
			'menu':'?menu',
			'default': '?default',
		},
		templateUrl: ($elem,$attr) => {
			return $attr.mode==="admin" ? 'mr_scene_admin_template.htm' : 'mr_scene_template.htm'; 			
		},		
		controller: 'mrSceneController',
		scope: {
			scene:"="
		}
	}
});
