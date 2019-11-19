var app = angular.module('customServerApp', ['ui.calendar']);


app.controller('calendarController', function($scope) {
	$scope.eventSources = [];

	$scope.uiConfig = {
		calendar: {
			height:  800,
			editable: true,
			header: {
				left: 'month basicWeek basicDay agendaWeek agendaDay',
				center: 'title',
				right: 'today prev,next'
			},
			eventClick: $scope.alertEventOnClick,
			eventDrop: $scope.alertOnDrop,
			eventResize: $scope.alertOnResize
		}
	}
});