var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/globe.html')
});

io.on('connection', function(socket) {
	socket.emit('initial data', {
		bro: 'hi'
	});
})

server.listen(3000, function () {
	console.log('up and running')
});