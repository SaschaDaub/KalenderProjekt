
var events_array = [];
var clickedEvent;

$(document).ready(function () {
    var $confirmButton = $('#btn-confirm');
    var $modal = $('.modal');
    var newEvent = {};

    addLocalSavedEvents();

    $('#naviButtons i').click({param1: $(this).parentElement}, navigationClickHandler);


    $confirmButton.on('click', function (e) {
        var usage = $('.modal')[0].attributes.usage.value;

        var title = $('#newEventTitle')[0].value;
        var start = $('#newEventStartDate')[0].value;
        var end = $('#newEventEndDate')[0].value;
        var startTime = $('#newEventStartTime')[0].value;
        var endTime = $('#newEventEndTime')[0].value;


        if ( title && start && end ) {
            if ( (startTime && endTime) || (!startTime && !endTime) ) {
                if (usage === "add") {
                    addNewEvent(newEvent, $modal);
                } else if (usage === "edit") {
                    editEvent(newEvent, $modal);
                }
            } else {
                window.alert('If you want to edit the specific time of an event, please make' +
                    'sure that both inputs are filled.');
            }
        } else {
            window.alert('The Fields Title, Start Date and End Date must be filled.');
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

        var $modal = $('.modal');
        var $close = $('.btn-close');

        var calendarEl = $('<div/>').attr('id', 'calendar');
        $('#mainContent').append(calendarEl);
        $('#calendar').fullCalendar({
            plugins: ['interaction', 'dayGrid', 'moment'],
            height: 'parent',
            header: {
                left: 'month agendaWeek agendaDay',
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

                $('.modal').attr('usage', 'add');

                var windowHeight = $(window).height(),
                    windowWidth = $(window).width(),
                    modalWidth = windowWidth / 4;

                $('.modal-header').removeClass('modal-edit');

                $('#newEventTitle')[0].value = '';

                $('.modal-title').text('Add New Event');

                $close.on('click', function () {
                    $('.modal').hide();
                });

                $('#newEventStartDate')[0].value = moment(start).format();
                $('#newEventEndDate')[0].value = moment(end).format();
                $('#newEventStartTime').val('');
                $('#newEventEndTime').val('');
                $('#newEventColor')[0].value = "#3eb7c9";
                $('#newEventTextColor')[0].value = "#ffffff";

                $modal.show();
            },

            eventDrop: function (event, delta, revertFunc) {
                var eventArrayId = event.id - 1;
                events_array[eventArrayId].start = event.start;
                events_array[eventArrayId].end = event.end;

                $('#calendar').fullCalendar('updateEvent', event);
            },

            eventClick: function (event, element) {
                $('.modal').attr('usage', 'edit');
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

                $close.on('click', function () {
                    $('.modal').hide();
                });

                $('#newEventTitle')[0].value = event.title;
                $('#newEventStartDate')[0].value = moment(event.start).format('YYYY-MM-DD');
                $('#newEventEndDate')[0].value = moment(event.end).format('YYYY-MM-DD');
                $('#newEventStartTime')[0].value = moment(event.start).format('HH:mm');
                $('#newEventEndTime')[0].value = moment(event.end).format('HH:mm');
                $('#newEventColor')[0].value = event.color;
                $('#newEventTextColor')[0].value = event.textColor;
                clickedEvent = event;

                $modal.show();
            }
        });
    } else if (parent.currentTarget.title === "Appointments") {
        var calendarEl = $('<div/>').attr('id', 'calendar');
        var mainContentEl = $('#mainContent');

        mainContentEl.append(calendarEl);
        $('#calendar').fullCalendar({
            plugins: ['list'],
            height: 450,
            defaultView: 'listWeek',
            events: events_array
        });

        $('.fc-right').css('margin-left', '53%').css('width', '10%');
        $('.fc-center').css('margin-left', '-30%');

        var eventsOverview = $('<div/>');
        var currentEvents = $('<ul/>').append($('<h4/>').text('Current Events')).addClass('currentEvents');
        var comingEvents = $('<ul/>').append($('<h4/>').text('Coming Events')).addClass('comingEvents');

        mainContentEl.append(eventsOverview);

        var dateToday = new Date();
        var diffInTime;
        var diffInDays;

        var counter = 0;

        events_array.forEach(
            function(element , index) {
                var eventStartDate = new Date(element.start);
                var eventEndDate = new Date(element.end);

                diffInTime = eventStartDate.getTime() - dateToday.getTime();
                diffInDays = diffInTime / (1000 * 3600 * 24);

                var name = element.title;
                var start = element.start;

                var nameEl = $('<div/>').text(name).addClass('eventName');
                var startLabel = $('<div/>').text(moment(start).format('YYYY-MM-DD'));

                var eventLine = $('<li/>').append(nameEl).append(startLabel);
                if (diffInDays > 0 && diffInDays < 60 && counter < 6) {
                    comingEvents.append(eventLine);
                    counter++;
                } else if (eventStartDate.getTime() < dateToday.getTime() && dateToday.getTime() < eventEndDate.getTime() ) {
                    currentEvents.append(eventLine);
                }
            }
        );
        eventsOverview.append($('<br>')).append(currentEvents).append($('<br>')).append(comingEvents);
    } else if (parent.currentTarget.title === "Polls") {
        var newPollIcon = $('<i/>').addClass('fas fa-plus').attr('id', 'newPollIcon');
        var newPollText = $('<span/>').text('Create Poll').attr('id', 'newPollText');
        var newPollDiv = $('<div/>').attr('id', 'newPollDiv');
        newPollDiv.append(newPollIcon).append(newPollText);
        $('#mainContent').append(newPollDiv);
    }
}

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

    $('#calendar').fullCalendar('renderEvent', newEvent, true);
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

function addLocalSavedEvents () {
    $.ajax({
       type: "GET",
       url: "./json/events.json",
       dataType: "json",
       success: function (data) {
           var localSavedEventsList = data.events;

           $.each(localSavedEventsList, function (index, element) {
               events_array.push(element);
           });
       }
    });
}