"use strict";

DemoWeb_GUI_Social.controller('mrShareController', ($scope, $translate, NotificationService,NotificationEvents) => {				

	let Share = {
		vkontakte: (params) => {
			url  = 'http://vkontakte.ru/share.php?';
			url += 'url='          + encodeURIComponent(params.URI);
			url += '&title='       + encodeURIComponent(params.TITLE);
			url += '&description=' + encodeURIComponent(params.DESCRIPTION);
			url += '&image='       + encodeURIComponent(params.IMAGE);
			url += '&noparse=true';
			return Share.popup(url);
		},
		odnoklassniki: (params) => {
			url  = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
			url += '&st.comments=' + encodeURIComponent(params.DESCRIPTION);
			url += '&st._surl='    + encodeURIComponent(params.URI);
			return Share.popup(url);
		},
		facebook: (params) => {
			url  = 'http://www.facebook.com/sharer.php?s=100';
			url += '&p[title]='     + encodeURIComponent(params.TITLE);
			url += '&p[summary]='   + encodeURIComponent(params.DESCRIPTION);
			url += '&p[url]='       + encodeURIComponent(params.URI);
			url += '&p[images][0]=' + encodeURIComponent(params.IMAGE);
			return Share.popup(url);
		},
		twitter: (params) => {
			url  = 'http://twitter.com/share?';
			url += 'text='      + encodeURIComponent(params.TITLE);
			url += '&url='      + encodeURIComponent(params.URI);
			url += '&counturl=' + encodeURIComponent(params.URI);
			return Share.popup(url);
		},
		mailru: (params) => {
			url  = 'http://connect.mail.ru/share?';
			url += 'url='          + encodeURIComponent(params.URI);
			url += '&title='       + encodeURIComponent(params.TITLE);
			url += '&description=' + encodeURIComponent(params.DESCRIPTION);
			url += '&imageurl='    + encodeURIComponent(params.IMAGE);
			return Share.popup(url)
		},	
		popup: function(url) {
			return window.open(url,'','toolbar=0,status=0,width=626,height=436');
		}
	};


	

	$scope.socials={};

	$scope.socials.Post = ($event,network) => {		
		$event.stopPropagation();		
		let params = {
			URI:`https://demo/#!/Registration/${$scope.user.Id}`,
			TITLE:$translate.instant('ShareTitle'),
			IMAGE:'https://demo/images/logo-big.png',
			DESCRIPTION:$translate.instant('ShareDescription')
		};
		if (!Share[`${network}`](params))
		{
			NotificationService.Notify(NotificationEvents.Error, $translate.instant("JavascriptPopupRequire"));
		}		
	}
});