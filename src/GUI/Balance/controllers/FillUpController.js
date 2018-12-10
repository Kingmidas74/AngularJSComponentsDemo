"use strict";

DemoWeb_GUI_FillUp.controller('mrFillUpController', ($scope,$timeout,$window,$document,$translate,NotificationService,NotificationEvents,ngDialog) => {				

	$scope.balance={};

	$scope.balance.MinutesValue = 0;
	$scope.balance.MoneyValue = 0;	
	$scope.balance.CurrencyCB = 'RUB';
	$scope.balance.PaymentSystem='WALLET_ONE';
	$scope.balance.CBRules = false;

	$scope.balance.InProcess=false;

	let rubMinimumAmount = 1;
	let usdMinimumAmount = 1;
	let eurMinimumAmount = 1;

	let isValidAmount = (amount) => {
		let regex = /^[0-9]\d*(((,\d{3}){1})?(\.\d+)?)$/;
		return regex.test(amount);
	};	

	let сheckAmountForMinimum = (currency, amount) => {
		switch (currency) {
			case 'RUB':
				if (amount < rubMinimumAmount) {
					NotificationService.Notify(NotificationEvents.Error, `${$translate.instant("MinimumAmount")} ${rubMinimumAmount} ${currency}`);
					return false;
				};
			case 'USD':
				if (amount < usdMinimumAmount) {
					NotificationService.Notify(NotificationEvents.Error, `${$translate.instant("MinimumAmount")} ${rubMinimumAmount} ${currency}`);
					return false;
				}
			case 'EUR':
				if (amount < eurMinimumAmount) {
					NotificationService.Notify(NotificationEvents.Error, `${$translate.instant("MinimumAmount")} ${rubMinimumAmount} ${currency}`);
					return false;
				}
		}
		return true;
	};

	let getCurrencyRate = () => {
		if ($scope.balance.CurrencyCB === 'USD') {
			return $scope.rates['USDRUB'];
		}
		if ($scope.balance.CurrencyCB === 'EUR') {
			return $scope.rates['EURRUB'];
		}
		return 1.0;
	}

	let showHelpFillUp = () => {
		$scope.balance.properties = "правила для денег";
		ngDialog.open({
			template: 'mr_payments_rules_dialog_template.htm',
			closeByDocument: false,
			closeByNavigation: false,
			disableAnimation: true,
			closeByEscape: true,
			showClose: false,
			scope: $scope
		})
	}

	let createMessage = () => {
		$scope.balance.ConversionInfo = '';
		if ($scope.balance.CurrencyCB !== 'RUB') {
			let rate = $scope.rates["" + $scope.balance.CurrencyCB + "RUB"];
			let money = parseFloat($scope.balance.MoneyValue);
			let val = money * rate;
			let message = `${val} рублей (По курсу 1 ${$scope.balance.CurrencyCB} = ${rate} руб.)`;
			if (val > 0) {
				$scope.balance.ConversionInfo = message;
			}
		}

	}

	$scope.balance.ChangeMoney = (tt) => {	
		$timeout(()=>{
			let money = 0;
			if ($scope.balance.CurrencyCB === 'RUB') {			
				money = parseFloat($scope.balance.MoneyValue);
			}
			else {
				money = parseFloat($scope.balance.MoneyValue) * ($scope.rates["" + $scope.balance.CurrencyCB + "RUB"])
			}
			if (money > 0) {
				money = money.toString().replace(".", ",");	
				$scope.changeMoneyListener(money).then(
					(success)=> {
						$scope.balance.MinutesValue = parseFloat(success).toFixed(2);
						$scope.$applyAsync();
					},
					(error)=>{

					}
				)	
			}
		});
	};

	$scope.balance.ChangeMinutes = () => {
		$timeout(() => {
			let minutes = parseFloat($scope.balance.MinutesValue);
			if (minutes <= 0) return;
			minutes = minutes.toString().replace(".", ",");
			$scope.changeMinutesListener(minutes).then(
				(success) => {
					if ($scope.balance.CurrencyCB === 'RUB') {
						$scope.balance.MoneyValue = parseFloat(success).toFixed(2);
					}
					else {
						$scope.balance.MoneyValue = (success / ($scope.rates["" + $scope.balance.CurrencyCB + "RUB"])).toFixed(2);
					}
					$scope.$applyAsync();
				},
				(error) => {

				}
			);
		});
	};

	$scope.$watch('balance.CurrencyCB', (newval, oldval) => {
		if (oldval === newval) {
			return;
		}
		let money = 0.0;
		if (oldval === "USD" && newval === "RUB") {
			money = parseFloat($scope.balance.MoneyValue) * $scope.rates["USDRUB"];
		}
		if (oldval === "RUB" && newval === "USD") {
			money = parseFloat($scope.balance.MoneyValue) / ($scope.rates["USDRUB"]);
		}

		if (oldval === "EUR" && newval === "RUB") {
			money = parseFloat($scope.balance.MoneyValue) * $scope.rates["EURRUB"];
		}
		if (oldval === "RUB" && newval === "EUR") {
			money = parseFloat($scope.balance.MoneyValue) / ($scope.rates["EURRUB"]);
		}

		if (oldval === "USD" && newval === "EUR") {
			money = (parseFloat($scope.balance.MoneyValue) * $scope.rates["USDRUB"]) / ($scope.rates["EURRUB"]);
		}
		if (oldval === "EUR" && newval === "USD") {
			money = (parseFloat($scope.balance.MoneyValue) * ($scope.rates["EURRUB"])) / ($scope.rates["USDRUB"]);
		}
		$scope.balance.MoneyValue = money.toFixed(2);
		//createMessage();
	});

	

	$scope.balance.AcceptLiscence = () => {
		$scope.balance.CBRules = !$scope.balance.CBRules;
	}

	$scope.balance.showHelpFillUpHandler = () => showHelpFillUp();

	$scope.balance.Pay = () => {
		$scope.balance.InProcess = true;
		if (!isValidAmount($scope.balance.MoneyValue)) {
			NotificationService.Notify(NotificationEvents.Error, $translate.instant("InvalidAmount"));
			$scope.balance.InProcess = false;
			return;
		}
		if (!сheckAmountForMinimum($scope.balance.CurrencyCB, parseFloat($scope.balance.MoneyValue))) {
			$scope.balance.InProcess = false;
			return;
		}
		if (!$scope.balance.CBRules) {
			NotificationService.Notify(NotificationEvents.Error, $translate.instant("LicenseAgreementRequire"));
			$scope.balance.InProcess = false;
			return;
		}
		if($scope.balance.PaymentSystem.toString()==='ELECTRON')
		{
			NotificationService.Notify(NotificationEvents.Error, $translate.instant("CallToSupport"));
			$scope.balance.InProcess = false;
			return;
		}
		$scope.sendPaymentListener($scope.balance.CurrencyCB.toString(),
			$scope.balance.MoneyValue.toString().replace(".", ","),
			getCurrencyRate().toString().replace(".", ","),
			$scope.balance.PaymentSystem.toString()
		).then((success)=> {
			NotificationService.Notify(NotificationEvents.Success, $translate.instant("PaymentsSuccess"));					
			if($scope.balance.PaymentSystem.toString()==="SBERBANK" || $scope.balance.PaymentSystem.toString()==="PAYPAL") {
				$window.location.href =success.Body.Result.data;						
			}
			else
			{
				let data = JSON.parse(success.Body.Result.data);
				let agregatorPage = success.Body.Result.agregatorPage;
				let form = document.createElement("form");
				form.acceptCharset="UTF-8";
				form.method = "POST";
				form.action = agregatorPage;

				for (let k in data) {
					if (data.hasOwnProperty(k)) {
						let elem = document.createElement("input");
						elem.name = k;
						elem.value = data[k];
						form.appendChild(elem);
					}
				}
				form.style.display = "none";
				angular.element(document.body).append(form);
				//console.log(form);
				form.submit();
			}
			$scope.$applyAsync();
		}, (error)=> {
			NotificationService.Notify(NotificationEvents.Error, $translate.instant("PaymentsFailed"),error);
			$scope.balance.InProcess = false;	
			$scope.$applyAsync();
		});

		/*
		(response) => {
					
					if(paymentSystem==="SBERBANK" || paymentSystem==="PAYPAL") {
						window.location.href =response.Body.Result.data;						
					}
					else
					{
						let data = JSON.parse(response.Body.Result.data);
						let agregatorPage = response.Body.Result.agregatorPage;
						let form = document.createElement("form");

						form.method = "POST";
						form.action = agregatorPage;

						for (let k in data) {
							if (data.hasOwnProperty(k)) {
								let elem = document.createElement("input");
								elem.name = k;
								elem.value = data[k];
								form.appendChild(elem);
							}
						}
						form.style.display = "none";
						document.body.appendChild(form);
						form.submit();
					}
					
				},
				(error) => { throw error; }
				);
		*/
	};
	

});