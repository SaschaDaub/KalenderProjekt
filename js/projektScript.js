var events_array = [];

$(document).ready(function () {
	var $confirmButton = $('#btn-confirm');
	var $modal = $('.modal');
	var newEvent = {};

	$('#naviButtons i').click({param1: $(this).parentElement}, navigationClickHandler);


	$confirmButton.on('click', function(e) {
		newEvent.title = $('#newEventTitle')[0].value;
		newEvent.start = $('#newEventStartDate')[0].value;
		newEvent.end = $('#newEventEndDate')[0].value;
		newEvent.allDay = false;

		events_array.push(newEvent);

		$('#calendar').fullCalendar('renderEvent', newEvent);
		$modal.hide();
	});
});



function navigationClickHandler(parent) {
	$('#mainContent').children().remove();
	$('#naviButtons li').removeClass('buttonClicked');
	parent.currentTarget.parentElement.className += 'buttonClicked';
	$('#currentTabText').text(parent.currentTarget.title);

	if (parent.currentTarget.title === "Calendar") {
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();

		var $modal = $('.modal'),
			$close = $('.btn-close');

		var calendarEl = $('<div/>').attr('id', 'calendar');
		$('#mainContent').append(calendarEl);
		$('#calendar').fullCalendar({
			plugins: [ 'interaction', 'dayGrid' , 'moment'],
			height:  'parent',
			header: {
				left: 'month basicWeek basicDay agendaWeek agendaDay',
				center: 'today prev,next',
				right: 'title'
			},
			editable: true,
			selectable: true,
			eventLimit: true,
			events: events_array,
			select: function(start, end) {
				var windowHeight = $(window).height(),
					windowWidth = $(window).width(),
					modalWidth = windowWidth/4;

				$modal.show();

				$close.on('click', function() {
						$('.modal').hide();
				});

				$('#newEventStartDate')[0].value = moment(start).format('YYYY-MM-DD');
				$('#newEventEndDate')[0].value = moment(end).format('YYYY-MM-DD');
			}
		});
	} else if (parent.currentTarget.title === "Appointments") {
		var calendarEl = $('<div/>').attr('id', 'calendar');
		$('#mainContent').append(calendarEl);
		$('#calendar').fullCalendar({
			plugins: ['list'],
			height: 'parent',
			defaultView: 'listWeek',
			events: events_array
		});
	}
}