let DemoWeb_GUI_AppBar = angular.module('DemoWeb.Components.AppBar', [])
.value("AppBarSettings", {
  HideSegments:[]  
})
.provider('AppBar', (AppBarSettingsProvider) => {
    return {
        setHideSegments: (...segments) => {
            let indexOfDefault = segments.indexOf('/');
            if(indexOfDefault>=0)
            {
                segments = segments.splice(indexOfDefault,1);
            }
            AppBarSettingsProvider.$get().HideSegments = segments;
        },

        addHideSegments: (...segments) => {
            let indexOfDefault = segments.indexOf('/');
            if(indexOfDefault>=0)
            {
                segments = segments.splice(indexOfDefault,1);
            }
            AppBarSettingsProvider.$get().HideSegments.concat(segments);
        },

        removeHideSegments: (...segments) => {
            const currentSegments = AppBarSettingsProvider.$get().HideSegments;
            let newSegments = [];
            for(let i=0;i<currentSegments.length;i++)
            {
                if(segments.indexOf(currentSegments[i])<0)
                {
                    newSegments.push(currentSegments[i]);
                }
            }
            AppBarSettingsProvider.$get().HideSegments = newSegments;
        },

        $get: ($window) => {
            return $window.DemoWeb_GUI_AppBar;
        }
    }
});