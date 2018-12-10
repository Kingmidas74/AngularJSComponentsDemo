let DemoWeb_GUI_Navigation = angular.module('DemoWeb.Components.Navigation', [
    'cfp.hotkeys'
])
.value('NavigationSettings', {
    IsOpenByDefault: true,
    HideSegments:[]
})
.constant('NavigationEvents', {
    ToggleNavigation:"toggle_navigation",
    ShowNavigation:"show_navigation",
    HideNavigation:"hide_navigation"
})
.config((hotkeysProvider) => {
    hotkeysProvider.includeCheatSheet = false;
})
.provider('Navigation', (NavigationSettingsProvider) => {
    return {
        setDefaultStateOpen: (isOpen) => {
            NavigationSettingsProvider.$get().IsOpenByDefault = isOpen;
        },

        setHideSegments: (...segments) => {
            let indexOfDefault = segments.indexOf('/');
            if(indexOfDefault>=0)
            {
                segments = segments.splice(indexOfDefault,1);
            }
            NavigationSettingsProvider.$get().HideSegments = segments;
        },

        addHideSegments: (...segments) => {
            let indexOfDefault = segments.indexOf('/');
            if(indexOfDefault>=0)
            {
                segments = segments.splice(indexOfDefault,1);
            }
            NavigationSettingsProvider.$get().HideSegments.concat(segments);
        },

        removeHideSegments: (...segments) => {
            const currentSegments = NavigationSettingsProvider.$get().HideSegments;
            let newSegments = [];
            for(let i=0;i<currentSegments.length;i++)
            {
                if(segments.indexOf(currentSegments[i])<0)
                {
                    newSegments.push(currentSegments[i]);
                }
            }
            NavigationSettingsProvider.$get().HideSegments = newSegments;
        },

        $get: ($window) => {
            return $window.DemoWeb_GUI_Navigation;
        }
    }
});