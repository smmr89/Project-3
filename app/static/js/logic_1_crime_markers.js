
const geojsonFilePath = 'static/js/json/month_lsoa_gb.geojson';

// Use the fetch API to load the GeoJSON file
fetch(geojsonFilePath)
  .then(response => response.json())
  .then(geojsonData => {
    // Now you can work with the loaded GeoJSON data
    console.log(geojsonData);
    createFeatures(geojsonData.features);

  })
  .catch(error => console.error('Error loading GeoJSON:', error));

function createFeatures(crimeData) {

    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h4>Crime Stats in LSOA: ${feature.properties.LSOA_code}, ${feature.properties.LA_District_name}</h4><hr>
      <h5>Crime Count: ${feature.properties.crime_count}</h5>
      <h5>IMD Decile: ${feature.properties.IMD_Decile}</h5>
      <h5>Population: ${feature.properties.Total_population}</h5>`);
    }
    
  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  let crime_markers = L.geoJSON(crimeData, {
    onEachFeature: onEachFeature,

    pointToLayer: function (feature, latlng) {
      // console.log(feature.properties.mag)
      // Size of circles determined by magntiude
      magScale = feature.properties.crime_count * 0.2;
      // Color of circles determined by IMD
      depthScale = feature.properties.IMD_Decile;
      // console.log(depthScale)
      // return L.circleMarker(latlng, geojsonMarkerOptions);
      // Call the getColor function to get a color based on the depthScale
      let markerColor = getColor(depthScale);
      // console.log(markerColor)
      // Input arguments for the circleMarker
      return L.circleMarker(latlng, {
        radius: magScale,
        color: markerColor,
        fillColor: markerColor,
        fillOpacity: 0.75,
      });
    },
  });

  // Send our earthquakes layer to the createMap function/
  createMap(crime_markers, crimeData);
}

function createMap(crime_markers, crimeData) {

  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  // let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  //   attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  // });

  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street
    // "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    'Crime Markers': crime_markers
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map_crime", {
    // center: [52.489471, -1.898575],
    center: [52.5077863433557, -1.8125147837200926],
    zoom: 10,
    layers: [street, crime_markers]
  });
  
  // let selectedMonth = "2023-09";
  
  // Handle dropdown change event
  var dropdown = document.getElementById("monthDropdown");


  dropdown.addEventListener("change", function() {
      var selectedMonth = dropdown.value;
      filterDataByMonth(selectedMonth);


      
      // let geo_data = crimeData;
      // console.log(geo_data)
      console.log(selectedMonth)
      // let data_geo = crime_markers;
      // var targetMonth = "2023-07";
      var totalCrimeCount = getTotalCrimeCountForMonth(crimeData, selectedMonth);
      console.log(totalCrimeCount)
      // Update the content of the statistics box
      var statisticsBox = document.getElementById("month-statistics");
      // statisticsBox.innerHTML = `<p>test</p>`

      statisticsBox.innerHTML = `<p>Total Street Crime Count <hr>MONTH SELECTED: ${selectedMonth}<hr> CRIME COUNT: ${totalCrimeCount}</p>`;
  });

  // Set the initial selected month
  var selectedMonth = "2023-09";
  dropdown.value = selectedMonth;

  // Trigger the change event manually to update the map and statistics
  var changeEvent = new Event("change");
  dropdown.dispatchEvent(changeEvent);


    function filterDataByMonth(selectedMonth) {
      crime_markers.eachLayer(function(layer) {
          if (layer.feature.properties.Month === selectedMonth) {
              layer.addTo(myMap);
          } else {
              myMap.removeLayer(layer);
          }
      });
    }



  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  
    // Define legend
    let legend = L.control({ position: "bottomleft" });
    // Colors:
    let legend_info = {
      "1-2": "#008000", //GREEN
      "3-4": "#00FF00", //LIME
      "5-6": "#FFFF00", //YELLOW
      "7-8": "#FFA500", //ORANGE
      "9-10": "#FF0000" // RED
    };

    // console.log(legend_info)
    // console.log(Object.keys(legend_info)[0])

    // Add legend
    legend.onAdd = function () {
      let div = L.DomUtil.create("div", "legend");

      div.innerHTML = [
        "<h5>IMD Score (1-10)</h5>",
        '<i style="background:' +
          Object.values(legend_info)[0] +
          '"></i><b>' +
          Object.keys(legend_info)[0] +
          "</b><br>",
        '<i style="background:' +
          Object.values(legend_info)[1] +
          '"></i><b>' +
          Object.keys(legend_info)[1] +
          "</b><br>",
        '<i style="background:' +
          Object.values(legend_info)[2] +
          '"></i><b>' +
          Object.keys(legend_info)[2] +
          "</b><br>",
        '<i style="background:' +
          Object.values(legend_info)[3] +
          '"></i><b>' +
          Object.keys(legend_info)[3] +
          "</b><br>",
        '<i style="background:' +
          Object.values(legend_info)[4] +
          '"></i><b>' +
          Object.keys(legend_info)[4] +
          "</b><br>",
        // '<i style="background:' +
        //   Object.values(legend_info)[5] +
        //   '"></i><b>' +
        //   Object.keys(legend_info)[5] +
        //   "</b><br>",
        // '<i style="background:' +
        //   Object.values(legend_info)[6] +
        //   '"></i><b>' +
        //   Object.keys(legend_info)[6] +
        //   "</b>",
      ].join("");

      return div;
    };

    legend.addTo(myMap);






}



// Define color ranges based on depth
function getColor(depth) {
  // https://www.rapidtables.com/web/color/RGB_Color.html
  // let markerColor = "#8B0000"; //DARK RED - default color: if depth 100 or greater
  let markerColor = "#FF0000"; // RED
  if (depth < 3) {
    markerColor = "#008000"; //GREEN
  } else if (depth < 5) {
    markerColor = "#00FF00"; //LIME
  } else if (depth < 7) {
    markerColor = "#FFFF00"; //YELLOW
  } else if (depth < 9) {
    markerColor = "#FFA500"; //ORANGE
  } //else if (depth < 11) {
    //markerColor = "#FF4500"; //ORANGE RED
 // } else if (depth < 13) {
    //markerColor = "#FF0000"; // RED
 // }

  return markerColor;
}


function getTotalCrimeCountForMonth(crimeData, targetMonth) {
  // Initialize the total count to 0
  let totalCrimeCount = 0;

  // Iterate through each feature in the GeoJSON data
  crimeData.forEach(function(feature) {
      // Check if the feature corresponds to the target month
      if (feature.properties.Month === targetMonth) {
          // Add the crime_count to the total
          totalCrimeCount += feature.properties.crime_count;
      }
  });

  // Return the total crime count for the specified month
  return totalCrimeCount;
}