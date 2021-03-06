// Earthquake GeoJSON URL variable
const dataUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the dataURL
d3.json(dataUrl).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(data.features);
    console.log(data)

  });

// Function to determine color of Marker Based on the depth of the earthquake
  function getColor(d) {
    return d > 90 ? 'purple' :
           d > 70  ? 'blue' :
           d > 50  ? 'yellow' :
           d > 30 ? 'green' :
           d > 10  ? 'orange' :
                      'red';
}
// Earthquake Feature Function
  function createFeatures(earthquakeData) {
  
    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {

      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }
  function style(feature) {
    console.log(feature)
    return {
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "white",
        weight: 1,
        fillOpacity: 0.5,
        radius: (feature.properties.mag)*7

    }
}


function pointToLayer(point, latlng) {
    return L.circleMarker(latlng);
}
    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature, 
      style: style,
      pointToLayer: pointToLayer
    });
  
    // Send our earthquakes layer to the createMap function/
    createMap(earthquakes);
  }
  
  function createMap(earthquakes) {
  
    // Create the base layers.
var mapboxUrl = "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={api_key}";


 var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });


var satellite = L.tileLayer(mapboxUrl, {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery ?? <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    api_key: API_KEY
});

    // Create a baseMaps object.
    var baseMaps = {
      "Street Map": street,
      "Topographic Map": topo,
      "Satellite Map": satellite
    };
  
    // Create an overlay object to hold our overlay.
    var overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [street, earthquakes]
    });

    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);



// Tectonic GeoJSON URL variable
    var tectonicsUrl = "https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_boundaries.json"
    // Perform a GET request to the dataURL
d3.json(tectonicsUrl).then(function (tectdata) {
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(tectdata);
    console.log(tectdata)
  });

  // Create Tectonic Plate LayerGroup
  var plates = new L.LayerGroup();
  // Perform a GET request to the dataURL
  d3.json(tectonicsURL, function(tectData) {
          // Create a GeoJSON Layer the plateData
          L.geoJson(tectData, {
              color: "green",
              weight: 2
          // Add plateData to tectonicPlates LayerGroups 
          }).addTo(plates);
          // Add tectonicPlates Layer to the Map
          plates.addTo(myMap);
      });





// Add Legend
    var legend = L.control({position: "bottomright"});

legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend'),
        levels = [-10, 10, 30, 50, 70, 90]
        

    // loop through our density intervals and generate a label with a colored square for each interval
     for (var i = 0; i < levels.length; i++) {
       div.innerHTML +=
            '<i style="background:' + getColor(   levels[i] + 1) + '"></i> ' +
        levels[i] + (grades[i + 1] ? '&ndash;' +    levels[i + 1] + '<br>' : '+')};
    }

     return div;
};

legend.addTo(myMap);
  



