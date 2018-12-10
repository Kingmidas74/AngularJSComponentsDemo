"use strict";

DemoWeb_GUI_CardTable.directive('mrTablePaginator', () => {
    return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'table_paginator_template.htm',
		controller: 'TablePaginatorController',
		scope: {
			pagesInfo:"="
		}
       };
	}
);
