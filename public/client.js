
// initializes the globe on the client
var viewer = new Cesium.Viewer('cesiumContainer', {
  animation: false,
  timeline: false,
  infobox: false,
  baseLayerPicker: false,
  sceneModePicker: false,
  scene3DOnly: true,
  vrButton: true,
  imageryProvider: new Cesium.MapboxImageryProvider({
  	mapId: 'mapbox.satellite',
  	accessToken: 'pk.eyJ1Ijoid29sdmVyaWFuMjMiLCJhIjoic3lSYnR0YyJ9.gwoi3oZpvvBRgntfVkXi9g'
  })
});

// utility functions
function toggleRotate () {
	var lastNow = Date.now();
	// function to remove the following listener is returned by the add lister function and stored in stopper
	var stopper = viewer.clock.onTick.addEventListener(function(clock) {
	  var now = Date.now();
	  var spinRate = 0.03;
	  var delta = (now - lastNow) / 1000;
	  lastNow = now;
	  console.log(viewer.scene.camera.position);
	  viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, -spinRate * delta);
	});
	return stopper;
}

// jQuery event handlers
var rot = false;
var stopThis = false;
$('.toggleRotate').on('click', function () {
	if (!rot) {
		stopThis = toggleRotate();
		rot = true;
	} else {
		stopThis();
		rot = false;
	}
	
});

// sockets for moving real time updates between client and server
var socket = io();
socket.on('initial data', function (data) {
	console.log(data.bro);
});

