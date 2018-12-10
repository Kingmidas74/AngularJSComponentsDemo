DemoWeb_GUI_Scene.filter('parsestatus', ($filter) => {
	let list = [
		"CREATING",
        "CREATED",
        "STARTED",
        "SAVED",
        "NOT_STARTED",
        "RUNNING",
        "FINISHED",
        "HOLDED",
        "ABORTED",
        "ERROR",
        "QUEUED",
        "HOLDED_BY_BILLING",
        "HOLDED_BY_USER",
        "HOLDED_BY_ADMIN",
        "TIMEOUT_REACHED",
        "SUSPENDED",
        "COMPLETE",
        "TIMEOUT_HAS_BEEN_REACHED",
        "RESERVED"
	];
	return (input) => {
		if (input) {
			if(angular.isNumber(input)) return $filter('linetospace')(list[input]);
			return $filter('linetospace')(input);
		}
	}
});