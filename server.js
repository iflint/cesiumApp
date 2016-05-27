var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/globe.html')
});

var intialDataArray = [{
	  name : 'Wyoming',
	  description: '<div>lks dfjkls sdklf skldfj klsd</div>',
	  x: 0,
	  y: 0,
	  color: 'red',
	  pixelSize: 5
	},
	{
	  name : 'dkjf',
	  description: '<div>bruh</div>',
	  x: 20,
	  y: 0,
	  color: 'red',
	  pixelSize: 10
	}
];

io.on('connection', function(socket) {
	socket.emit('initial data', intialDataArray);
});

server.listen(3000, function () {
	console.log('up and running')
});