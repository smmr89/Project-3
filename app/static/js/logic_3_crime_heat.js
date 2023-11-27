

// Create our map, giving it the streetmap and earthquakes layers to display on load.
let myMap = L.map("map_heat", {
  center: [52.5077863433557, -1.8125147837200926],
  zoom: 11
});



// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Access the list of months from the dropdown
var dropdown = document.getElementById("monthDropdown");

// Initial selected month
var selectedMonth = dropdown.value;

// Variable to store the heat layer
let heat;


// Function to filter data by month
function filterDataByMonth(month, geojsonData) {
  return geojsonData.features.filter(item => item.properties.Month === month);
}

function updateHeatMap(month, geojsonData) {
  // remove previous layer if it exists
  if (heat) {
    myMap.removeLayer(heat);
  }

  var filteredData = filterDataByMonth(month, geojsonData);

  let heatArray = [];
  
  for (let i = 0; i < filteredData.length; i++) {
    let location = filteredData[i].geometry;
    if (location) {
      //console.log(location);
      heatArray.push([location.coordinates[1], location.coordinates[0]]);
    }

  }

  heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
  }).addTo(myMap);

  // get total crime count
  var totalCrimeCount = filteredData.length;
  console.log(totalCrimeCount)
  // Update the content of the statistics box
  var statisticsBox = document.getElementById("month-statistics");
  // statisticsBox.innerHTML = `<p>test</p>`

  statisticsBox.innerHTML = `<p>Total Street Crime Count <hr>MONTH SELECTED: ${selectedMonth}<hr> CRIME COUNT: ${totalCrimeCount}</p>`;
}

const geojson_heat = 'static/js/json/heat_markers.geojson';

// Use the fetch API to load the GeoJSON file
fetch(geojson_heat)
  .then(response => response.json())
  .then(geojsonData => {
    
    console.log(geojsonData);
   

      // Update pie chart for the initial selected month
      updateHeatMap(selectedMonth, geojsonData);

      // Handle dropdown change event
      dropdown.addEventListener("change", function () {
          selectedMonth = dropdown.value;
          updateHeatMap(selectedMonth, geojsonData);


  })
  .catch(error => console.error('Error loading GeoJSON:', error));
});
