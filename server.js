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
	  z: 100,
	  color: 'red',
	  pixelSize: 5
	},
	{
	  name : 'dkjf',
	  description: '<div>bruh</div>',
	  x: 20,
	  y: 0,
	  z: 100,
	  color: 'red',
	  pixelSize: 10
	},
	{
	  name : 'hey',
	  description: '<div>bruh</div>',
	  x: 2,
	  y: 3,
	  z: 100,
	  color: 'red',
	  pixelSize: 10
	},
	{
	  name : 'yo',
	  description: '<div>bruhdfsdffsdf</div>',
	  x: 55,
	  y: -10,
	  z: 100,
	  color: 'red',
	  pixelSize: 10
	},
	{
	  name : 'd',
	  description: '<div>brsdfduh</div>',
	  x: -20,
	  y: 0,
	  z: 100,
	  color: 'red',
	  pixelSize: 10
	},
	{
	  name : 'f',
	  description: '<div>bruffffffffffffffh</div>',
	  x: -10,
	  y: -20,
	  z: 100,
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