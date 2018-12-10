"use strict";

DemoWeb_GUI_FillUp.directive('mrFillUp', () => {
	return {
		restrict: 'E',
		replace: true,
		transclude:true,
		templateUrl: 'mr_fill_up_template.htm',
		controller: 'mrFillUpController',
		scope: {
			rates:"=",
			changeMinutesListener:"=",
			changeMoneyListener:"=",
			sendPaymentListener:"="
		}
	}
});