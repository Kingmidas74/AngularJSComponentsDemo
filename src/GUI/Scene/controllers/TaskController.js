"use strict";

DemoWeb_GUI_Scene.controller('mrTaskController', ($scope) => {				

	$scope.cancelTaskRemove = ($event,task) => {
		$scope.cancelRemoveTaskListener(task);
		$event.stopPropagation();				
	}

	$scope.OpenTaskSettings = ($event,task) => {		
		$event.stopPropagation()
		$scope.showTaskSettingsListener(task);
		
	}

});