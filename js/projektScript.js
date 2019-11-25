$(document).ready(function () {
	$('#naviButtons i').click({param1: $(this).parentElement}, navigationClickHandler);
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

		var events_array = [];

		var $modal = $('.modal'),
			$close = $('.close'),
			$confirmButton = $('#btn-confirm');

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

				var newEvent = {};
				$('#newEventStartDate')[0].value = moment(start).format('YYYY-MM-DD');
				$('#newEventEndDate')[0].value = moment(end).format('YYYY-MM-DD');
				newEvent.allDay = false;

				$confirmButton.on('click', function(e) {
					newEvent.title = $('#newEventTitle')[0].value;
					newEvent.start = $('#newEventStartDate')[0].value;
					newEvent.end = $('#newEventEndDate')[0].value;
					$('#calendar').fullCalendar('renderEvent', newEvent);
					$modal.hide();
				});

			}
		});
	}
}