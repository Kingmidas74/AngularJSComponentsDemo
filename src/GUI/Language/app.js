let DemoWeb_GUI_Language = angular.module('DemoWeb.Components.Language', [
    
])
.value('LanguageSettings', {
})
.config(($translateProvider) => {
    $translateProvider.useStaticFilesLoader({
        prefix: 'locales/locale-',
        suffix: '.json'
    });

//	$translateProvider.preferredLanguage('ru');
    $translateProvider.useSanitizeValueStrategy(null);  
});