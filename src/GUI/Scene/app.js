let DemoWeb_GUI_Scene = angular.module('DemoWeb.Components.mrScene', [
	'ngDialog'
])
.value("SceneSettings", {
    SceneSettingsPage:'',
    TaskSettingsPage:'',
    RemoveTaskTimeout:1000*5,
    BaseUpdateInterval:1000*5,
    UnactiveUpdateInterval:1000*60
})
.constant('TaskEvents', {
    TaskCreated: "task_created"   
})
.constant('SceneEvents', {
    SceneCreated: "scene_created"
})
.provider('Scene', (SceneSettingsProvider) => {
    return {        
        setSceneSettingsPage: (url) => {
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
        },

        $get: ($window) => {
            return $window.DemoWeb_GUI_Scene;
        }
    }
});