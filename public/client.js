
// initializes the globe on the client
var viewer = new Cesium.Viewer('cesiumContainer');


var socket = io();
socket.on('initial data', function (data) {
	console.log(data.bro);
});

