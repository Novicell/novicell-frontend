'use strict';

/**
* @desc Load google maps
* html example: <div id="map-canvas" data-lat="56.109574" data-lng="10.155361" data-zoom="15"></div>
* js example: novicell.map.init();
* @author Danni Larsen - DLA, Martin Haun - MHA
* @requires: It also requires something to get the LAT, LNG and ZOOMLEVEL, and append it to the map-canvas element, as data-attibutes
(umbraco 7: https://our.umbraco.org/projects/backoffice-extensions/angulargooglemaps) - remember to set a height for the map-canvas element!
*/


var novicell = novicell || {};

novicell.map = novicell.map || function () {
	var isLoaded = false;

	function init() {
		document.onscroll = function () {
			var element = document.getElementById('map-canvas');
			if (!isLoaded && element && isScrolledIntoView(element)) {
				isLoaded = true;
				// Async load the GMaps API and run "initialize"
				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&callback=initialize';
				document.body.appendChild(script);
			}
		};
	}

	return {
		init: init
	};
} ();


function initialize() {
	// Get map element from HTML
	var mapElement = document.getElementById('map-canvas');
	// Get lat / lng form the map element's attributes
	var lat = parseFloat(mapElement.getAttribute('data-lat').replace(',', '.')),
		lng = parseFloat(mapElement.getAttribute('data-lng').replace(',', '.'));

	//Get zoom level
	var zoomLevel = parseInt(mapElement.getAttribute('data-zoom'));

	// Set cordinates of the map
	var coordinates = new google.maps.LatLng(lat, lng);

	// Snazzymaps styles
	// https://snazzymaps.com/style/28228/simply-transport
	var mapStyles = [{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "landscape.man_made", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.natural.landcover", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.natural.terrain", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.attraction", "elementType": "all", "stylers": [{ "visibility": "on" }, { "weight": "0.64" }] }, { "featureType": "poi.park", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "lightness": "19" }, { "saturation": "0" }] }, { "featureType": "poi.place_of_worship", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }, { "visibility": "on" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.local", "elementType": "all", "stylers": [{ "visibility": "on" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.line", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "saturation": "0" }, { "lightness": "41" }, { "gamma": "1.27" }] }, { "featureType": "transit.station.airport", "elementType": "all", "stylers": [{ "visibility": "on" }] }, { "featureType": "transit.station.bus", "elementType": "all", "stylers": [{ "visibility": "on" }, { "hue": "#ff0000" }] }, { "featureType": "transit.station.rail", "elementType": "all", "stylers": [{ "visibility": "on" }, { "saturation": "23" }, { "lightness": "0" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#d3f3f4" }, { "visibility": "on" }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "labels.text", "stylers": [{ "color": "#ffffff" }, { "weight": "0.01" }, { "visibility": "off" }] }];

	// Set map options
	var mapOptions = {
		zoom: zoomLevel,
		disableDefaultUI: false,
		draggable: false,
		scrollwheel: false,
		center: coordinates,
		styles: mapStyles // outcomment for default styles
	};

	// Set icon
	var icon = {
		url: "dist/images/map-pin.png", // customize the icon here
		scaledSize: new google.maps.Size(30, 40) // and set size here
	};

	// Set the google maps element
	var map = new google.maps.Map(mapElement, mapOptions);

	// Set marker
	var marker = new google.maps.Marker({
		position: coordinates,
		map: map,
		icon: icon,
		title: 'Novicell'
	});

	/******* Infowindow ************************************/
	// Set HTML content for info window
	var contentString = '<div class="marker-content">' +
		'<div class="siteNotice">' +
		'</div>' +
		'<h1 class="marker-content-header">Novicell DP</h1>' +
		'<div class="marker-content-body">' +
		'<p><b>Office hours:</b><br />8.00am – 4.00pm</p>' +
		'<p><b>Phone</b><br />+45 8619 0550</p>' +
		'<p><b>Email</b><br /><a href="mailto:info@novicell.dk" title="Send us an email">ncdp@novicell.dk</a></p>' +
		'<p><strong>Novicell Aarhus</strong><br />Søren Nymarks Vej 6<br />8270 Højbjerg</p>' +
		'</div>' +
		'</div>';

	// Set info window content
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	//Add eventlistner for click on marker
	google.maps.event.addListener(marker, 'click', function () {
		infowindow.open(map, marker);
	});

	/******* / Infowindow  ************************************/


	// Recalculate center on resize
	google.maps.event.addDomListener(window, "resize", function () {
		var center = map.getCenter();
		google.maps.event.trigger(map, "resize");
		map.setCenter(center);
	});
}

function isScrolledIntoView(el) {
	var elemTop = el.getBoundingClientRect().top;
	var elemBottom = el.getBoundingClientRect().bottom;

	return (elemBottom >= 0) && (elemTop <= window.innerHeight);
}