"use strict";

DemoWeb_GUI_User.directive('mrSign', () => {
    return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: ($elem, $attr) => ({
			public: 'sign_public_template.htm',
			private: 'sign_private_template.htm'
		}[$attr.mode]),
		controller: 'mrSignController',
		scope: {
			signInListener:"=",
			signUpListener:"=",
			restPasswordListener:"="
		},
		link: (scope, elem, attrs) => {
			// Fixes Chrome bug: https://groups.google.com/forum/#!topic/angular/6NlucSskQjY
			elem.prop('method', 'POST');
	
			// Fix autofill issues where Angular doesn't know about autofilled inputs
			if(attrs.ngSubmit) {
			  setTimeout(() => {
				elem.unbind('submit').bind('submit', (e) => {
				  e.preventDefault();
				  let arr = elem.find('input');
				  if (arr.length > 0) {
					arr.triggerHandler('input').triggerHandler('change').triggerHandler('keydown');
					scope.$apply(attrs.ngSubmit);
				  }
				});
			  }, 0);
			}
		  }		
       };
	}
);
