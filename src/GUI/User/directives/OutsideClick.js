"use strict";

CustomModule.directive('customDir',($window, $parse) => {
    return {
      restrict: 'A',
      link: (scope, element, attrs) => {
        let clickOutHandler = $parse(attrs.customDir);
        angular.element($window).on('event', (event) => { 
            event.stopPropagation();
            if (!element[0].contains(event.target)) {                
                clickOutHandler(scope, {$event: event});
                scope.$applyAsync();
            }
        });
      }
    };
});

TypeScript — надмножество JavaScript, поэтому любой код на JavaScript будет выполнен и в TypeScript.



function filter(arr, condition)
{
    var result = [];
    for(var i=0;i<arr.length;i++)
    {
        if(condition(arr[i])===true)
        {
            res
        }
    }
}