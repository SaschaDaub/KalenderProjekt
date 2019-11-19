$(document).ready(function () {
	$('#naviButtons i').click({param1: $(this).parentElement}, navigationClickHandler);
});

function navigationClickHandler(parent) {
	$('#naviButtons li').removeClass('buttonClicked');
	parent.currentTarget.parentElement.className += 'buttonClicked';
	$('#currentTabText').text(parent.currentTarget.title);

	if (parent.currentTarget.title === "Calendar") {
		var calendarEl = $('<div/>').attr('id', 'calendar');
		$('#mainContent').append(calendarEl);
		var calendar = new FullCalendar.Calendar(calendarEl[0], {
			plugins: [ 'dayGrid' ],
			height:  'parent',
			editable: true,
			header: {
				left: 'month basicWeek basicDay agendaWeek agendaDay',
				center: 'title',
				right: 'today prev,next'
			}
		});

		calendar.render();
	} else {
		$('#mainContent').children().remove();
	}
}