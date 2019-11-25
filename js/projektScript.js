/*var startDate = [start._d.getMonth().AddZero(),
				start._d.getDate().AddZero(),
				start._d.getFullYear()].join('/') + ', ' +
					[start._d.getHours().AddZero(),
					start._d.getMinutes().AddZero()].join(':');

				var endDate = [end._d.getMonth().AddZero(),
						end._d.getDate().AddZero(),
						end._d.getFullYear()].join('/') + ', ' +
					[end._d.getHours().AddZero(),
						end._d.getMinutes().AddZero()].join(':'); */

var events_array = [];

$(document).ready(function () {
	var $confirmButton = $('#btn-confirm');
	var $modal = $('.modal');
	var newEvent = {};

	$('#naviButtons i').click({param1: $(this).parentElement}, navigationClickHandler);


	$confirmButton.on('click', function(e) {
		newEvent.title = $('#newEventTitle')[0].value;
		newEvent.start = $('#newEventStartDate')[0].value + 'T' + $('#newEventStartTime')[0].value;
		newEvent.end = $('#newEventEndDate')[0].value + 'T' + $('#newEventEndTime')[0].value;
		newEvent.color = $('#newEventColor')[0].value;
		newEvent.textColor = $('#newEventTextColor')[0].value;
		newEvent.allDayDefault = false;
		newEvent.id = events_array.length + 1;

		events_array.push({
			id: newEvent.id,
			title: newEvent.title,
			start: newEvent.start,
			end: newEvent.end,
			allDayDefault: newEvent.allDayDefault,
			color: newEvent.color,
			textColor: newEvent.textColor
		});

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

				$('#newEventTitle')[0].value = '';

				$modal.show();

				$close.on('click', function() {
						$('.modal').hide();
				});

				$('#newEventStartDate')[0].value = moment(start).format();
				$('#newEventEndDate')[0].value = moment(end).format();
			},
			dateClick: function(info) {
				prompt("You want to delete this event?");
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