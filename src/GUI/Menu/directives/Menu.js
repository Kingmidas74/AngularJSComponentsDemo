"use strict";

DemoWeb_GUI_Menu.directive('mrMenu', () => {
    return {
		restrict: 'E',
		replace: true,
		transclude: true,
        templateUrl: ($elem,$attr) => {
            if($attr.type==="filter") {
                return 'filter_template.htm'
            }
            return 'menu_template.htm';
        },        
        scope: {
            isOpen:"<"
        },
		controller: 'MenuController'
       };
	}
);
