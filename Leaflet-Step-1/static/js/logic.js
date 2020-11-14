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

// Define a markerSize function that will give each earthquake a different radius based on its magnitude
function markerSize(magnitude) {
    return magnitude * 10;
}

// Grabbing our GeoJSON data..
d3.json(link, function (response) {
    // Creating a geoJSON layer with the retrieved data
    console.log(response);

    // Loop through the earthquake array and create one marker for each quake
    for (var i = 0; i < data.length; i++) {

        // Conditionals for earthquake magnitude
        var color = "";
        if (data[i].features.properties.mag > 9) {
            color = "#FF5E33";
        }
        else if (data[i].features.properties.mag > 8) {
            color = "#FFA233";
        }
        else if (data[i].features.properties.mag > 7) {
            color = "#F0FF33";
        }
        else if (data[i].features.properties.mag > 6) {
            color = "#F0FF33";
        }
        else if (data[i].features.properties.mag > 5) {
            color = "#BBFF33";
        }
        else {
            color = "#5BFF33";
        }

        // Add circles to map
        L.circle(data[i].features.geometry.coordinates[i], {
            fillOpacity: 0.75,
            color: "white",
            fillColor: color,
            // Adjust radius
            radius: countries[i].points * 1500
        }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h3>Points: " + countries[i].points + "</h3>").addTo(myMap);
    }