let DemoWeb_GUI_User = angular.module('DemoWeb.Components.User', [
    'ngCookies',
])
.value('UserSettings', {
    WaitTimePeriod: 1000 * 60 * .5,
    AuthorizedScreen:'',
    UnAuthorizedScreen:''
})
.constant('UserEvents', {
    LoginUser: "login_user",
    UnLoginUser: "unlogin_user",
    AccessGranted: "access_granted",
    AccessDenied: "access_denied",
    UserActive: "user_active",
    UserUnactive: "user_unactive",
    UserOff:"user_off"
})
.provider('User', (UserSettingsProvider) => {
    return {
        setWaitTimePeriod: (ms) => {
            UserSettingsProvider.$get().WaitTimePeriod = ms;
        },

        setAuthorizedScreen: (title) => {
            UserSettingsProvider.$get().AuthorizedScreen = title;
        },

        setUnAuthorizedScreen: (title) => {
            UserSettingsProvider.$get().UnAuthorizedScreen = title;
        },

        $get: ($window) => {            
            return $window.DemoWeb_GUI_User;
        }
    }
});