// Creating map object
var myMap = L.map("map", {
    center: [39.8097343, -98.5556199],
    zoom: 3
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

// Use this link to get the geojson data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

// // Our style object
// var mapStyle = {
//   color: "white",
//   fillColor: "pink",
//   fillOpacity: 0.5,
//   weight: 1.5
// };

// // Define a markerSize function that will give each earthquake a different radius based on its magnitude
// function markerSize(magnitude) {
//     return magnitude * 10;
// }

// Grabbing our GeoJSON data..
d3.json(link, function (response) {
    // Check if data is retrieved
    console.log(response);
    // Pull out array containing relevant data
    var location = response.features
    console.log(location);

    // // Loop through the earthquake array and create one marker for each quake
    // for (var i = 0; i < location.length; i++) {

    //     // Conditionals for earthquake magnitude
    //     var color = "";
    //     if (location.properties.mag > 9) {
    //         color = "#FF5E33";
    //     }
    //     else if (location.properties.mag > 8) {
    //         color = "#FFA233";
    //     }
    //     else if (location.properties.mag > 7) {
    //         color = "#F0FF33";
    //     }
    //     else if (location.properties.mag > 6) {
    //         color = "#F0FF33";
    //     }
    //     else if (location.properties.mag > 5) {
    //         color = "#BBFF33";
    //     }
    //     else {
    //         color = "#5BFF33";
    //     }


    function createMarkers(response) {

        // Pull the "stations" property off of response.data
        var stations = response.data.stations;

        // Initialize an array to hold bike markers
        var bikeMarkers = [];

        // Loop through the stations array
        for (var index = 0; index < stations.length; index++) {
            var station = stations[index];

            // For each station, create a marker and bind a popup with the station's name
            var bikeMarker = L.marker([station.lat, station.lon])
                .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");

            // Add the marker to the bikeMarkers array
            bikeMarkers.push(bikeMarker);
        }

        // Create a layer group made from the bike markers array, pass it into the createMap function
        createMap(L.layerGroup(bikeMarkers));
    }


    // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
    d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json", createMarkers);





    // Add circles to map
    for (var i = 0; i < location.length; i++) {
        var geometry = location.geometry;
        console.log(geometry);
        for (var i = 0; i < geometry.length; i++) {
            var coordinates = geometry.coordinates;
            L.circle([coordinates[1], coordinates[0]]).addTo(myMap);
        };
    };
});