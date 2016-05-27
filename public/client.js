
// initializes the globe on the client
var globe = new Cesium.Globe();
globe.enableLighting = true;
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
  }),
  globe: globe
});

// utility functions
function toggleRotate () {
	var lastNow = Date.now();
	var entityArray = viewer.entities.values;
	var xCoordArray = [];
	var currentEntity;
	var newEntity;
	var smallestDiff;

	for (i=0; i < entityArray.length; i++) {
		var dd = entityArray[i].position._value;
		var radianLon = Cesium.Cartographic.fromCartesian(dd).longitude;
		xCoordArray.push(radianLon);
	}

	// function to remove the following listener is returned by the add lister function and stored in stopper
	var stopper = viewer.clock.onTick.addEventListener(function(clock) {
	  var now = Date.now();
	  var spinRate = 0.05;
	  var delta = (now - lastNow) / 1000;
	  lastNow = now;

	  var cX = viewer.scene.camera.positionCartographic.longitude;
	  for (i=0; i < xCoordArray.length; i++) {
	  	var nX = xCoordArray[i];
	  	var thisDiff = Math.abs(nX - cX);
	  	if (!smallestDiff || thisDiff < smallestDiff) {
  			smallestDiff = thisDiff;
  			newEntity = entityArray[i].id;
  			
	  	}
	  }
	  if (newEntity != currentEntity) {
	  	console.log(currentEntity, thisDiff, smallestDiff);
	  	currentEntity = newEntity;
	  	smallestDiff = false;
		  viewer.selectedEntity = viewer.entities.getById(currentEntity);
		  console.log(viewer.selectedEntity);
	  }
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
	for (i=0; i < data.length; i++) {
		viewer.entities.add({
			name: data[i].name,
			description: data[i].description,
			position: Cesium.Cartesian3.fromDegrees(data[i].x, data[i].y),
			point: {
				color: Cesium.Color.fromCssColorString(data[i].color),
				pixelSize: data[i].pixelSize
			}
		});
	}
});

