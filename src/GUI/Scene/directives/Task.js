"use strict";

DemoWeb_GUI_Scene.directive('mrTask',  () => {
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
			return $attr.mode==="admin" ? 'mr_task_admin_template.htm' : 'mr_task_template.htm'; 			
		},		
		controller: 'mrTaskController',
		scope: {
			task:"=",
			showTaskSettingsListener:"=",
			cancelRemoveTaskListener:"="
		}
	}
});
