"use strict";
DemoWeb_GUI_Validation.directive("validate",  () => {
    return {
        restrict: "A",
        require: "ngModel",
        link: (scope, element, attributes, ngModel) => {
            ngModel.$validators.NotValid =  (input) => {
                let result = true;
                if (!!input) {
                    let pattern = new RegExp(ngModel.$$attr.validate);
                    result = pattern.test(input);
                }
                return result;
            }
        }
    };
});