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

		var $modal = $('#modal'),
			$overlay = $('.overlay'),
			$close = $('#close'),
			$confirmButton = $('#confirmNewEvent');

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

				$overlay.show();
				$modal.css({
					'width' : modalWidth,
					'margin-left' : -modalWidth/2
				});

				var newEvent = new Object();
				newEvent.start = moment(start).format();
				newEvent.end = moment(end).format();
				newEvent.allDay = false;

				$close.on('click', function(){
					$overlay.hide();
				});

				$overlay.on('click', function(e) {
					if (e.target !== this) return;
					$overlay.hide();
				});

				$confirmButton.on('click', function(e) {
					newEvent.title = $('#newEventTitle')[0].value;
					events_array.push(newEvent);
					$('#calendar').fullCalendar('renderEvent', newEvent);
					$overlay.hide();
				});

			}
		});
	}
}