"use strict";

DemoWeb_GUI_Files.directive('mrFileModel', ($parse, NotificationService, FileEvents) => {
	return {
		restrict: 'A',
		link: (scope, element, attrs) => {
			let model = $parse(attrs.fileModel);
			let modelSetter = model.assign;
			
			element.bind('change', () => {
				scope.$apply(() => {
                    NotificationService.Notify(FileEvents.FileSelected, element[0].files[0]);
				});
			});
		}
	};
});
