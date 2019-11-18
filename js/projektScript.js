$(document).ready(function () {
	$('#naviButtons i').click({param1: $(this).parentElement}, navigationClickHandler);
});

function navigationClickHandler(parent) {
	$('#naviButtons li').removeClass('buttonClicked');
	parent.currentTarget.parentElement.className += 'buttonClicked';
	$('#currentTabText').text(parent.currentTarget.title);
	$('#mainContent div').text('keine HTML eingebunden!');
}