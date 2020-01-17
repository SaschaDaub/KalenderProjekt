const http = require("http");
const https = require("https");
const express = require("express");
const path = require("path");

var app = express();

app.get("/", (req, res) => {
	console.log(res.statusCode);
	app.use('/static', express.static('html'));
	res.sendFile("testGui.html", {root: path.join("./html")});
});

app.get("/js/angularScript.js", (req, res) => {
	var filename = 'angularScript.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./js")});
});

app.get("/js/projektScript.js", (req, res) => {
	var filename = 'projektScript.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./js")});
});

app.get("/node_modules/jquery.min.js", (req, res) => {
	var filename = 'jquery.min.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./node_modules/jquery/dist")});
});

app.get("/node_modules/moment.min.js", (req, res) => {
	var filename = 'moment.min.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./node_modules/moment/min")});
});

app.get("/node_modules/angular.min.js", (req, res) => {
	var filename = 'angular.min.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./node_modules/angular")});
});

app.get("/node_modules/calendar.js", (req, res) => {
	var filename = 'calendar.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./node_modules/angular-ui-calendar/src")});
});

app.get("/node_modules/fullcalendar.min.js", (req, res) => {
	var filename = 'fullcalendar.min.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./node_modules/fullcalendar/dist")});
});

app.get("/node_modules/gcal.js", (req, res) => {
	var filename = 'gcal.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./node_modules/fullcalendar/dist")});
});

app.get("/node_modules/core/main.js", (req, res) => {
	var filename = 'main.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./node_modules/@fullcalendar/core")});
});

app.get("/node_modules/daygrid/main.js", (req, res) => {
	var filename = 'main.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./node_modules/@fullcalendar/daygrid")});
});

app.get("/node_modules/interaction/main.js", (req, res) => {
	var filename = 'main.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./node_modules/@fullcalendar/interaction")});
});

app.get("/node_modules/moment/main.js", (req, res) => {
	var filename = 'main.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./node_modules/@fullcalendar/moment")});
});

app.get("/node_modules/list/main.js", (req, res) => {
	var filename = 'main.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./node_modules/@fullcalendar/list")});
});

app.get("/css/styles.css", (req, res) => {
	res.sendFile("styles.css", {root: path.join("./css")});
});

app.get("/css/all.css", (req, res) => {
	res.sendFile("all.css", {root: path.join("./css")});
});

app.get("/node_modules/fullcalendar.css", (req, res) => {
	res.sendFile("fullcalendar.css", {root: path.join("./node_modules/fullcalendar/dist")});
});

app.get("/node_modules/core/main.css", (req, res) => {
	res.sendFile("main.css", {root: path.join("./node_modules/@fullcalendar/core")});
});

app.get("/node_modules/daygrid/main.css", (req, res) => {
	res.sendFile("main.css", {root: path.join("./node_modules/@fullcalendar/daygrid")});
});

app.get("/node_modules/list/main.css", (req, res) => {
	res.sendFile("main.css", {root: path.join("./node_modules/@fullcalendar/list")});
});

app.get("/webfonts/fa-solid-900.woff2", (req, res) => {
	res.sendFile("fa-solid-900.woff2", {root: path.join("./webfonts")});
});

app.get("/webfonts/fa-solid-900.woff", (req, res) => {
	res.sendFile("fa-solid-900.woff", {root: path.join("./webfonts")});
});

app.get("/webfonts/fa-solid-900.ttf", (req, res) => {
	res.sendFile("fa-solid-900.ttf", {root: path.join("./webfonts")});
});

app.get("/json/events.json", (req, res) => {
	res.sendFile("events.json", { root: path.join("./json")});
});


const server = http.createServer(app);


server.listen(3000, () => {
	console.log("Server is listening on port 3000. \n\r mmmh lecker lecker");
});