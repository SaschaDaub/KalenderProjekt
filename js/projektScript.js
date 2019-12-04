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

function getNewEventValues(newEvent) {
    var newEventStartTime = $('#newEventStartTime')[0].value;
    var newEventEndTime = $('#newEventEndTime')[0].value;

    newEvent.title = $('#newEventTitle')[0].value;
    newEvent.start = $('#newEventStartDate')[0].value;
    newEvent.end = $('#newEventEndDate')[0].value;
    newEvent.color = $('#newEventColor')[0].value;
    newEvent.textColor = $('#newEventTextColor')[0].value;
    newEvent.allDay = false;
    newEvent.id = events_array.length + 1;

    if (newEventStartTime) {
        newEvent.start += 'T' + newEventStartTime;
    }

    if (newEventEndTime) {
        newEvent.end += 'T' + newEventEndTime;
    }

    return newEvent;
}

function addNewEvent(newEvent, $modal) {
    newEvent = getNewEventValues(newEvent);

    events_array.push({
        id: newEvent.id,
        title: newEvent.title,
        start: newEvent.start,
        end: newEvent.end,
        allDay: newEvent.allDay,
        color: newEvent.color,
        textColor: newEvent.textColor
    });

    $('#calendar').fullCalendar('renderEvent', newEvent);
    $modal.hide();
}

function editEvent(newEvent, $modal) {
    newEvent = getNewEventValues(newEvent);

    clickedEvent.title = newEvent.title;
    clickedEvent.start = newEvent.start;
    clickedEvent.end = newEvent.end;
    clickedEvent.color = newEvent.color;
    clickedEvent.textColor = newEvent.textColor;

    events_array[clickedEvent.id - 1].title = newEvent.title;
    events_array[clickedEvent.id - 1].start = newEvent.start;
    events_array[clickedEvent.id - 1].end = newEvent.end;
    events_array[clickedEvent.id - 1].color = newEvent.color;
    events_array[clickedEvent.id - 1].textColor = newEvent.textColor;

    $('#calendar').fullCalendar('updateEvent', clickedEvent);
    $modal.hide();
}


var events_array = [];
var clickedEvent;

$(document).ready(function () {
    var $confirmButton = $('#btn-confirm');
    var $modal = $('.modal');
    var newEvent = {};

    $('#naviButtons i').click({param1: $(this).parentElement}, navigationClickHandler);


    $confirmButton.on('click', function (e) {
        var usage = $('.modal')[0].attributes.usage;

        if (usage === "add") {
            addNewEvent(newEvent, $modal);
        } else if (usage === "edit") {
            editEvent(newEvent, $modal);
        }
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
            plugins: ['interaction', 'dayGrid', 'moment'],
            height: 'parent',
            header: {
                left: 'month basicWeek basicDay agendaWeek agendaDay',
                center: 'today prev,next',
                right: 'title'
            },
            editable: true,
            selectable: true,
            selectHelper: true,
            eventLimit: true,
            events: events_array,
            select: function (start, end) {
                if ($('#delete-button').length > 0) {
                    $('#delete-button').remove();
                }
                $('.modal')[0].attributes.usage = "add";
                var windowHeight = $(window).height(),
                    windowWidth = $(window).width(),
                    modalWidth = windowWidth / 4;

                $('.modal-header').removeClass('modal-edit');

                $('#newEventTitle')[0].value = '';

                $('.modal-title').text('Add New Event');

                $modal.show();

                $close.on('click', function () {
                    $('.modal').hide();
                });

                $('#newEventStartDate')[0].value = moment(start).format();
                $('#newEventEndDate')[0].value = moment(end).format();
            },

            eventDrop: function (event, delta, revertFunc) {
                var eventArrayId = event.id - 1;
                events_array[eventArrayId].start = event.start;
                events_array[eventArrayId].end = event.end;

                $('#calendar').fullCalendar('updateEvent', event);
            },

            eventClick: function (event, element) {
                $('.modal')[0].attributes.usage = "edit";
                $('.modal-title').text('Edit Event: ' + event.title);
                $('.modal-header').addClass('modal-edit');

                if ($('#delete-button').length === 0) {
                    var deleteButton = $('<button>').attr('id', 'delete-button')
                        .text('Delete')
                        .addClass('btn')
                        .click(function () {
                            $('#calendar').fullCalendar('removeEvents', event._id);
                            events_array.splice(event.id - 1, 1);
                            $modal.hide();
                            $(this).remove();
                        });
                    $('.modal-footer').append(deleteButton);
                }

                $('#newEventStartDate')[0].value = moment(event.start).format('YYYY-MM-DD');
                $('#newEventEndDate')[0].value = moment(event.end).format('YYYY-MM-DD');
                clickedEvent = event;
                $modal.show();
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