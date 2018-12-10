"use strict";

DemoWeb_GUI_Files.controller('FileExplorerController', ($scope, $location, $translate, $http, $q, FileService, ngDialog, NotificationService, FilesSettings, FileEvents, NotificationEvents) => {

	$scope.state = FilesSettings.IsOpenByDefault;
	$scope.isFileUpload = false;

	NotificationService.Subscribe($scope, FileEvents.ToggleFileExplorer, () => {
		$scope.state = !$scope.state;
	});
	NotificationService.Subscribe($scope, FileEvents.ShowFileExplorer, () => {
		$scope.state = true;
	});
	NotificationService.Subscribe($scope, FileEvents.HideFileExplorer, () => {
		$scope.state = false;
	});

	$scope.StopPropagation = ($event) => {
		$scope.state = true;
		$event.stopPropagation();
	}

	$scope.TogglePanel = () => {
		for (let i = 0; i < $scope.files.length; i++) {
			$scope.files[i].Selected = false;
		}
		$scope.state = !$scope.state;
	}

	$scope.files = [];

	$scope.AllFilesSelected = false;

	$scope.SelectedFIlesCount = () => {
		let selectedFilesCount = $scope.files.filter((f) => {
			return f.Selected === true;
		}).length;
		$scope.AllFilesSelected = selectedFilesCount === $scope.files.length
		return selectedFilesCount;
	};


	$scope.ToggleSelection = (file) => {
		file.Selected = !file.Selected;
	}

	$scope.RemoveFile = (file) => {
		$scope.files = $scope.files.filter((f) => {
			return f.Title !== file.Title;
		});
		if (file.Progress == 0) {
			$scope.removeFileListener(file);
		}
	}

	$scope.RemoveCurrentFile = ($event, file) => {
		$event.stopPropagation();
		$scope.files = $scope.files.filter((f) => {
			return f.Title !== file.Title;
		});
		if (file.Progress == 0) {
			$scope.removeFileListener(file);
		}
	}

	$scope.CancelFileUpload = ($event, file) => {
		$event.stopPropagation();
		file.Request.Cancel();
	}

	$scope.RemoveSelectedFiles = () => {
		for (let i = 0; i < $scope.files.length; i++) {
			if ($scope.files[i].Selected) {
				$scope.RemoveFile($scope.files[i]);
				i--;
			}
		}
		$scope.state = true;
	}

	$scope.CreateScenes = () => {
		for (let i = 0; i < $scope.files.length; i++) {
			if ($scope.files[i].Selected) {
				$scope.createSceneListener($scope.files[i]);
			}
		}
	}

	$scope.ToggleAllFiles = (value) => {
		for (let i = 0; i < $scope.files.length; i++) {
			$scope.files[i].Selected = !value;
		}
	}

	$scope.ClosePanel = () => {
		$scope.state = false;
	}



	let CheckDoubleFiles = (file) => {
		let new_name = `${file.name}`;
		for (let i = 0; i < $scope.files.length; i++) {
			let exist_name = `${$scope.files[i].Title}`;
			if (new_name === exist_name) {
				return false;
			}
		}
		return true;
	};

	let CheckSizeFile = (file) => {
		if ((file.size / 1000000000) > 2)
			return false;

		return true;
	};

	let CheckNameFile = (name) => {
		let regex = new RegExp('^[a-zA-Z0-9_]+$');
		let temp = name.substring(0, name.indexOf('.'));
		if (!regex.test(temp))
			return false;

		return true;
	};


	let IsValidFile = (file) => {
		if (FileService.FileIsValid(file) === false) {
			NotificationService.Notify(NotificationEvents.Error, `${$translate.instant("WrongExtension")} ${$translate.instant("AvailableExtensions")} ${FilesSettings.AcceptableExtensions.join()}`);
			return "NotValid";
		}
		if (!CheckSizeFile(file)) {
			return "Oversize";
		}
		if (!CheckNameFile(file.name)) {
			return "NotValidName";
		}
		if (!CheckDoubleFiles(file)) {
			return "Double";
		}
		return "Ok";
	}

	$scope.ShowFileBar = () => {
		let result = false;
		for (let i = 0; i < FilesSettings.ShowSegments.length; i++) {
			if ($location.$$path.startsWith(FilesSettings.ShowSegments[i])) {
				result = true;
			}
		}
		return result;
	}

	NotificationService.Subscribe($scope, FileEvents.FileSelected, ($event, file) => {
		$scope.file = file;
		let flag = true;
		while (flag) {
			let result = IsValidFile(file);

			let extension = `.${FileService.GetExtensionOfFile(file)}`;

			switch (result) {
				case "Cancel":
					return;
				case "NotValid":
					return;
				case "Oversize":
					ngDialog.open({
						template: 'size_dialog_template.htm',
						controller: 'SizeDialogController',
						closeByDocument: false,
						closeByNavigation: false,
						disableAnimation: true,
						closeByEscape: true,
						showClose: false,
						scope: $scope
					});
					return;
				case "NotValidName":
					$scope.oldFileName = file.name.substring(0, file.name.lastIndexOf('.'));

					$scope.errorStatus = "NotValidFileName";
					let res1 = ngDialog.openConfirm({
							template: 'rename_dialog_template.htm',
							controller: 'ReNameDialogController',
							closeByDocument: false,
							closeByNavigation: false,
							disableAnimation: true,
							closeByEscape: true,
							showClose: false,
							scope: $scope
						})
						.then(
							(confirm) => {
								let  blob = file.slice(0, -1, 'zip'); 
								let newFile = new File([blob], confirm + extension);
								$scope.files.unshift({
									Title: confirm + extension,
									Date: file.lastModifiedDate = new Date(file.lastModifiedDate).toLocaleString(undefined, {
										day: 'numeric',
										month: 'numeric',
										year: '2-digit',	
										hour: '2-digit',
										minute: '2-digit',
									}),
									Selected: true,
									Size: (file.size / 1000000).toFixed(2),
								});
								StartUpload(newFile, 0);
							},
							(cancel) => {
								$scope.state = true;
							}
						);
					return;
				case "Double":
					$scope.oldFileName = file.name.substring(0, file.name.lastIndexOf('.'));
					
					$scope.errorStatus = "Double";
					let res2 = ngDialog.openConfirm({
							template: 'rename_dialog_template.htm',
							controller: 'ReNameDialogController',
							closeByDocument: false,
							closeByNavigation: false,
							disableAnimation: true,
							closeByEscape: true,
							showClose: false,
							scope: $scope
						})
						.then(
							(confirm) => {
								let  blob = file.slice(0, -1, 'zip'); 
								let newFile = new File([blob], confirm + extension);
								$scope.files.unshift({
									Title: confirm + extension,
									Date: file.lastModifiedDate = new Date(file.lastModifiedDate).toLocaleString(undefined, {
										day: 'numeric',
										month: 'numeric',
										year: '2-digit',
										hour: '2-digit',
										minute: '2-digit',
									}),
									Selected: true,
									Size: (file.size / 1000000).toFixed(2),
								});
								StartUpload(newFile, 0);
							},
							(cancel) => {
								$scope.state = true;
							}
						);
					return;
				case "Ok":
					flag = false;
					break;
			}
		}
		$scope.files.unshift({
			Title: file.name,
			Date: file.lastModifiedDate = new Date(file.lastModifiedDate).toLocaleString(undefined, {
				day: 'numeric',
				month: 'numeric',
				year: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
			}),
			Selected: true,
			Size: (file.size / 1000000).toFixed(2),
		});
		StartUpload(file, 0);
	});

	let GetListenerByFile = (index) => {
		let _i = index;
		return (e) => {
			$scope.files[_i].Progress = Math.round(((e.loaded / e.total) * 10000)) / 100;
			$scope.$applyAsync();
		};
	}

	let uploadFile = (file, listener, file_name, index) => {
		$scope.isFileUpload = true;
		var uploadData = new FormData();
		uploadData.append('file', file);
		var fileData = angular.toJson({
			'FileName': file.name,
			'FileSize': file.size
		});
		uploadData.append('fileData', fileData)
		let newFileHeader = {
			key: "x-file-name",
			value: file.name
		}
		if (typeof (file_name) !== "undefined") {
			newFileHeader.value = file_name;
		}
		let headers = {
			'Content-Type': undefined,
			'FileName': file.name,
			'FileSize': file.size,
		};
		headers[`Authorization`] = `Bearer ${$scope.apiUserToken.value}`;
		headers[`${newFileHeader.key}`] = newFileHeader.value;

		$scope.files[index].Request = 
		{
			Canceler: $q.defer(),
			Cancel: function () {
				this.Canceler.resolve();
			}
		}

		var promise =  $http({
			method: 'POST',
			url: '[[%APIurl%]]files/archives',
			headers: headers,
			timeout: $scope.files[index].Request.Canceler.promise,
			uploadEventHandlers: {
				progress: listener
			},
			data: uploadData,
			transformRequest: angular.identity
		}).then(
			(resp) => {
				$scope.files[index].Progress = 0;
				NotificationService.Notify(NotificationEvents.Success, $translate.instant('LoadCompleted'));
				$scope.isFileUpload = false;
				$scope.$applyAsync();
			},
			(err) => {
				$scope.RemoveFile($scope.files[index]);
				if(err.xhrStatus === "abort")
					NotificationService.Notify(NotificationEvents.Succes, $translate.instant("CancelFileUpload"), err);
				else
					NotificationService.Notify(NotificationEvents.Error, $translate.instant('LoadFailed'), err);
				$scope.isFileUpload = false;
				$scope.$applyAsync();
			}
		);

		$scope.files[index].Request.Promise = promise;

		return promise;
	}

	let StartUpload = (file, index) => {
		$scope.state = true;
		uploadFile(file, GetListenerByFile(index), $scope.files[index].Title, index);
	}
});