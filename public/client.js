
// initializes the globe on the client
var viewer = new Cesium.Viewer('cesiumContainer');


// rotates camera
var lastNow = Date.now();
viewer.clock.onTick.addEventListener(function(clock) {
    var now = Date.now();
    var spinRate = 0.05;
    var delta = (now - lastNow) / 1000;
    lastNow = now;
    viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, -spinRate * delta);
});


// sockets for moving real time updates between client and server
var socket = io();
socket.on('initial data', function (data) {
	console.log(data.bro);
});

