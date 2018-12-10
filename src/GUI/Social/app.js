let DemoWeb_GUI_Social = angular.module('DemoWeb.Components.Social', [
])
.value("SocialSettings", {})
.constant('SocialEvents', {})
.provider('Social', (SocialSettingsProvider) => {
    return {        
        /*setSceneSettingsPage: (url) => {
            SceneSettingsProvider.$get().SceneSettingsPage = url;
        },

        setRemoveTaskTimeout: (ms) => {
            SceneSettingsProvider.$get().RemoveTaskTimeout = ms;
        },

        setBaseUpdateInterval: (ms) => {
            SceneSettingsProvider.$get().BaseUpdateInterval = ms;
        },

        setUnactiveUpdateInterval: (ms) => {
            SceneSettingsProvider.$get().UnactiveUpdateInterval = ms;
        },

        setTaskSettingsPage: (url) => {
            SceneSettingsProvider.$get().TaskSettingsPage = url;
        },*/

        $get: ($window) => {
            return $window.DemoWeb_GUI_Social;
        }
    }
});