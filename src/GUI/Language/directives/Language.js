"use strict";

DemoWeb_GUI_Language.directive('mrLanguage', () => {
	return {
		restrict: 'E',
		replace:true,
		transclude:true,
		templateUrl: ($elem, $attr) => ({
			list: 'language_list_template.htm',
			box: 'language_box_template.htm'
		}[$attr.mode]),
		controller: 'LanguageController',
		scope:{
			languages:"=",
			language:"=",
			switchLanguageListener:"="
		}
	}
});
