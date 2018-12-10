"use strict";
DemoWeb_GUI_Validation.directive("validateMessage", ($compile, $templateCache) => {
	this.templateUrlLink = "validate_message_template.htm";
	return {
		restrict: "A",
		templateUrl: templateUrlLink,
		require: "?ngModel",
		link: (scope, element, attributes, ngModel) => {			
			scope.elementPath = ngModel.$name;
			let contentTr = angular.element($templateCache.get(templateUrlLink))[0];
			element.parent()[0].appendChild(contentTr);
			$compile(contentTr)(scope);
		},
	};
});