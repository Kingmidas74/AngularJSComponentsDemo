"use strict";

DemoWeb_GUI_AppBar.component('mrAppbar', {
    templateUrl: 'appbar_template.htm',
    replace: true,
    transclude: {
        'actions': '?actions',
        'default': '?default',
    },
    controller: class {
        constructor($scope, $translate,$location, AppBarSettings) {
            this.$location = $location;
            this.AppBarSettings = AppBarSettings;
            $scope.$on('$routeChangeStart', (scope, next, current) => {
                if(next.$$route.segment) {     
                    this.currentTitle =  next.$$route.segment;
                }
                else {
                    this.currentTitle = $translate.instant("Scenes");
                }
            });
        }
    
        get CurrentTitle() {
            return this.currentTitle;
        }
    
        set CurrentTitle(value) {
            this.currentTitle = value;
        }

        HideAppBar() {	
            let result=false;
            for(let i=0; i<this.AppBarSettings.HideSegments.length; i++)
            {
                if(this.$location.$$path.startsWith(this.AppBarSettings.HideSegments[i]))
                {
                    result=true;
                }
            }
            result=result || this.$location.$$path==='/';
            return result;
        }
    },
    controllerAs:'vm' 
	}
);
