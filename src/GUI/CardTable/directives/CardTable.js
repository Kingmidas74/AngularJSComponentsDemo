"use strict";

DemoWeb_GUI_CardTable.directive('mrCardTable', () => {
    return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'card_table_template.htm',
		controller: 'CardTableController'
       };
	}
);
