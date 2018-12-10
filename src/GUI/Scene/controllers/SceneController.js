"use strict";

DemoWeb_GUI_Scene.controller('mrSceneController', ($scope, $timeout, ngDialog) => {				

	$scope.SelectedFIlesCount = () => {		
		try{
			let selectedCount = $scope.scene.Tasks.filter((task)=> {
				return task.Selected;
			}).length;
			$scope.scene.Selected=selectedCount===$scope.scene.Tasks.length
			return selectedCount;
		}
		catch(e) {
			return 0;
		}
	};

	$scope.ChangeSelectScene = (value) => {
		$timeout(()=> {
			for(let i=0; i<$scope.scene.Tasks.length;i++)
			{
				$scope.scene.Tasks[i].Selected = !value;
			}
		});
	}

	$scope.ShowSceneProperties = ($event,scene) => {
		$scope.showScenePropertiesListener(scene);
		$event.stopPropagation();
	}

	$scope.CalculateTotalCost = () => {		
		return $scope.scene.Tasks.reduce((acc, task)=>acc+(task.Cost),0);
	}

	$scope.ToggleCollapse = () => {
		$scope.scene.Expand = !$scope.scene.Expand;
	}
});