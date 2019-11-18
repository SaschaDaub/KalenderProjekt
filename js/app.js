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

app.get("/css/styles.css", (req, res) => {
	res.sendFile("styles.css", {root: path.join("./css")});
});

app.get("/css/all.css", (req, res) => {
	res.sendFile("all.css", {root: path.join("./css")});
});

app.get("/externals/accountLogoDefault.png", (req, res) => {
	res.sendFile("accountLogoDefault.png", {root: path.join("./externals")});
});

app.get("/externals/trennstrich_kolli3.png", (req, res) => {
	res.sendFile("trennstrich_kolli3.png", {root: path.join("./externals")});
});

app.get("/css/all.css", (req, res) => {
	res.sendFile("all.css", {root: path.join("./css")});
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


const server = http.createServer(app);


server.listen(3000, () => {
	console.log("Server is listening on port 3000.");
});