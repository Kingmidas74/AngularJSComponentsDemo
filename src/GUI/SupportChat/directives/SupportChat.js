"use strict";

DemoWeb_GUI_SupportChat.directive('supportchat', ($timeout) => {
	return {
		restrict: 'E',
		templateUrl: 'support_chat_template_1.htm',
		scope: {
			user: "="
		},
		link: (scope, element, attr, ctrl, transclude) => {
			$timeout(() => {
				scope.$watch("user", function (newVal, oldVal) {
					console.log("newval",newVal, oldVal);
					let userId = newVal.Id;
					let uName = newVal.Name;
					let uEmail = newVal.EMail;
					if (parseInt(userId) > 0) {
						//	if (!(typeof (chat_instance) != 'undefined' && chat_instance != null)) {
						window.chaport = {
							app_id: '5b54c551d0e5753e08b46b14',
							visitor: {
								name: userId + "(" + uName + " - " + uEmail + ")"
							}
						};
						let v2 = window.chaport;
						v2._q = [];
						v2._l = {};
						v2.q = function () {
							v2._q.push(arguments)
						};
						v2.on = function (e, fn) {
							if (!v2._l[e]) v2._l[e] = [];
							v2._l[e].push(fn)
						};
						var s = document.createElement('script');
						s.type = 'text/javascript';
						s.async = true;
						s.src = 'https://app.chaport.com/javascripts/insert.js';
						var ss = document.getElementsByTagName('script')[0];
						ss.parentNode.insertBefore(s, ss);
						//}
					}
					else {
						//chaport-container
						let elements = document.getElementsByClassName('chaport-container');
						while (elements.length > 0) {
							elements[0].parentNode.removeChild(elements[0]);							
						}
					}
				});
			});
		}
	};
});