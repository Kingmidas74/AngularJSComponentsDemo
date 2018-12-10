let DemoWeb_GUI_Files = angular.module('DemoWeb.Components.Files', [
    'ngDialog',
    'cfp.hotkeys'
])
.value('FilesSettings', {
    AcceptableExtensions: ["zip","rar"],
    IsOpenByDefault: false
})
.constant('FileEvents', {
    ToggleFileExplorer:"toggle_file_explorer",
    ShowFileExplorer:"show_file_explorer",
    HideFileExplorer:"hide_file_explorer",
    FileSelected:"file_selected"
})
.config((hotkeysProvider) => {
    hotkeysProvider.includeCheatSheet = false;
})
.provider('Files', (FilesSettingsProvider) => {
    return {
        setAcceptableExtensions: (...exts) => {
            FilesSettingsProvider.$get().AcceptableExtensions = exts;
        },

        setDefaultStateOpen: (isOpen) => {
            FilesSettingsProvider.$get().IsOpenByDefault = isOpen;
        },
        
        setShowSegments: (...segments) => {
            FilesSettingsProvider.$get().ShowSegments = segments;
        },

        addShowSegments: (...segments) => {
            FilesSettingsProvider.$get().ShowSegments.concat(segments);
        },

        removeShowSegments: (...segments) => {
            const currentSegments = FilesSettingsProvider.$get().ShowSegments;
            let newSegments = [];
            for(let i=0;i<currentSegments.length;i++)
            {
                if(segments.indexOf(currentSegments[i])<0)
                {
                    newSegments.push(currentSegments[i]);
                }
            }
            FilesSettingsProvider.$get().ShowSegments = newSegments;
        },

        $get: ($window) => {
            return $window.DemoWeb_GUI_Files;
        }
    }
});