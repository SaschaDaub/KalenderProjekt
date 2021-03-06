var events_array = [];
var clickedEvent;
var isLoggedIn = {};

$(document).ready(function () {
    var $confirmButton = $('#btn-confirm');
    var $modal = $('.modal');
    var newEvent = {};

    $('#logOutIconDiv').click(function () {
        isLoggedIn.value = false;
        logOut();
    });

    var loggedIn = localStorage.getItem('isLoggedIn');
    isLoggedIn = JSON.parse(loggedIn);

    if (!isLoggedIn) {
        isLoggedIn = {
            'value': false
        };
    }

    if (isLoggedIn.value == false) {
        logOut();
    } else {
        $('.animate').hide();
    }

    addLocalSavedEvents();

    $('#naviButtons i').click({param1: $(this).parentElement}, navigationClickHandler);


    $confirmButton.on('click', function (e) {
        var usage = $('.modal')[0].attributes.usage.value;

        var title = $('#newEventTitle')[0].value;
        var start = $('#newEventStartDate')[0].value;
        var end = $('#newEventEndDate')[0].value;
        var startTime = $('#newEventStartTime')[0].value;
        var endTime = $('#newEventEndTime')[0].value;


        if (title && start && end) {
            if ((startTime && endTime) || (!startTime && !endTime)) {
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
                $('#newEventColor')[0].value = "#0096ff";
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
        var calendarPar = $('<div/>').attr('id', 'calendarPar').append(calendarEl);
        var mainContentEl = $('#mainContent');

        mainContentEl.append(calendarPar);
        $('#calendar').fullCalendar({
            plugins: ['list'],
            height: 'parent',
            defaultView: 'listWeek',
            events: events_array
        });

        $('.fc-right').css('margin-left', '53%').css('width', '10%');
        $('.fc-center').css('margin-left', '-30%');


        var eventsOverview = $('<div/>').attr('id', 'eventsOverviewWrapper');
        var currentEventsList = $('<ul/>').attr('id', 'currentEventsList');
        var comingEventsList = $('<ul/>').attr('id', 'comingEventsList');
        var currentEvents = $('<div/>').append($('<h4/>').text('Current Events')).append(currentEventsList).addClass('currentEvents');
        var comingEvents = $('<div/>').append($('<h4/>').text('Coming Events')).append(comingEventsList).addClass('comingEvents');

        mainContentEl.append(eventsOverview);

        var dateToday = new Date();
        var diffInTime;
        var diffInDays;

        var counter = 0;

        events_array.forEach(
            function (element, index) {
                var eventStartDate = new Date(element.start);
                var eventEndDate = new Date(element.end);

                diffInTime = eventStartDate.getTime() - dateToday.getTime();
                diffInDays = diffInTime / (1000 * 3600 * 24);

                var name = element.title;
                var start = element.start;

                var nameEl = $('<div/>').text(name).addClass('eventName');
                var startLabel = $('<div/>').text(moment(start).format('YYYY-MM-DD'));

                var eventLine = $('<li/>').append(nameEl).append(startLabel);
                if (diffInDays > 0 && diffInDays < 60) {
                    comingEventsList.append(eventLine);
                    counter++;
                } else if (eventStartDate.getTime() < dateToday.getTime() && dateToday.getTime() < eventEndDate.getTime()) {
                    currentEventsList.append(eventLine);
                }
            }
        );
        eventsOverview.append(currentEvents).append(comingEvents);
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

//Is called when you add a new Event to the Calendar
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

//Is called when you edit an existing event on the Calendar page
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

function addLocalSavedEvents() {
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

//logs the user in
function logIn(uname, psw) {
    $.ajax({
        url: '/log_in',
        data: {
            userName: uname,
            password: psw
        },
        dataType: "text",
        method: 'post',
        success: function (response) {
            if (response == "true") {
                $('.animate').addClass('hidden').hide();
                $('#accountLogo').show();
                $('#naviButtons').show();
                $('#logOutIconDiv').show();
                $('#mainContent').show();
                localStorage.setItem('isLoggedIn', JSON.stringify({'value': true}));
            } else {
                $('#loginButton').show();
                window.alert('Wrong Username or Password.');
            }
        },
        error: function (error) {
            console.log(error.errorText);
        }
    });
}

//logs the User out
function logOut() {
    $('#accountLogo').hide();
    $('#naviButtons').hide();
    $('#logOutIconDiv').hide();
    $('#mainContent').hide();
    $('.animate').removeClass('hidden').show();
    $('#loginButton').show();

    localStorage.setItem('isLoggedIn', JSON.stringify({'value': false}));

    $('#loginButton').click(function () {
        var uname = $('#uname')[0].value;
        var psw = $('#psw')[0].value;
        if (uname && psw) {
            logIn(uname, psw);
            $('#loginButton').hide();
        }
    });
}