
let myMap = L.map("map_lsoa", {
  center: [52.5077863433557, -1.8125147837200926],
  zoom: 11
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


function chooseColor(object, value) {
  
  district = getKeyByValue(object, value);
  
  // console.log(district)
  if (district == "Birmingham") return "yellow";
  else if (district == "Coventry") return "red";
  else if (district == "Dudley") return "orange";
  else if (district == "Sandwell") return "green";
  else if (district == "Solihull") return "pink";
  else if (district == "Walsall") return "blue";
  else if (district == "Wolverhampton") return "purple";
  else return "black";
}


function getKeyByValue(object, value) {
  // Iterate through each key in the object
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      // Check if the value is present in the array associated with the current key
      if (object[key].includes(value)) {
        return key; // Return the key if a match is found
      }
    }
  }

  // If no match is found, return null
  return null;
}


const fetchData = async () => {
  try {

    const response = await fetch('static/js/json/E47000007.geojson');
    const LSOA_boundaries = await response.json();


    const response_json = await fetch('static/js/json/districtLSOAs.json');
    const districtLSOAs = await response_json.json();
    
    // console.log(LSOA_boundaries)
    // console.log(districtLSOAs);
    // console.log(districtLSOAs);
    // console.log(typeof districtLSOAs)
    // console.log(districtLSOAs)


    // console.log(typeof Object.keys(districtLSOAs))
    // console.log(Object.values(districtLSOAs))


    
    // let test = Object.keys(districtLSOAs).map((prop)=> districtLSOAs[prop]);
    // console.log(test)
   

    // let val = 'E01009524';

    // let foundKey = null;

    // // Iterate through each key in the districtLSOAs object
    // for (const key in districtLSOAs) {
    //   if (districtLSOAs.hasOwnProperty(key)) {
    //     // Check if the value is present in the array associated with the current key
    //     if (districtLSOAs[key].includes(val)) {
    //       foundKey = key;
    //       break; // Exit the loop once a match is found
    //     }
    //   }
    // }

    // console.log('Key for E01009524:', foundKey);
    L.geoJson(LSOA_boundaries, {
      // Passing in our style object
      style: function(feature) {
        return {
          color: "white",
          // fillColor: "pink",//chooseColor(feature.properties.LSOA11CD),
          fillColor: chooseColor(districtLSOAs,feature.properties.LSOA11CD),
          fillOpacity: 0.5,
          weight: 1.5
        };
      },

      // This is called on each feature.
      onEachFeature: function(feature, layer) {
        // Set the mouse events to change the map styling.
        layer.on({
          // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
          mouseover: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.9
            });
          },
          // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
          mouseout: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.5
            });
          },
          // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
          click: function(event) {
            myMap.fitBounds(event.target.getBounds());
          }
        });
        let district = getKeyByValue(districtLSOAs,feature.properties.LSOA11CD);
        // Giving each feature a popup with information that's relevant to it
        layer.bindPopup("<h4>LSOA Code: " + feature.properties.LSOA11CD + "</h4><hr>"
         + "<h4>District: " + district + "</h4><br>");
        //  + "Population: " + "?" + "<br>"
        //  + "IMD Score: " + "?" + "<br>"
        //  + "Total crime count: " + "?");
      }

    }).addTo(myMap);
    
    // Define legend
    let legend = L.control({ position: "topright" });
    // Colors:
    let legend_info = {
      "Birmingham": "yellow",
      "Solihull": "pink",
      "Coventry": "red",
      "Walsall": "blue",
      "Sandwell": "green",
      "Wolverhampton": "purple",
      "Dudley": "orange",
    };

    // console.log(legend_info)
    // console.log(Object.keys(legend_info)[0])

    // Add legend
    legend.onAdd = function () {
      let div = L.DomUtil.create("div", "legend");

      div.innerHTML = [
        "<h3>Local Authority</h3>",
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
        '<i style="background:' +
          Object.values(legend_info)[5] +
          '"></i><b>' +
          Object.keys(legend_info)[5] +
          "</b><br>",
        '<i style="background:' +
          Object.values(legend_info)[6] +
          '"></i><b>' +
          Object.keys(legend_info)[6] +
          "</b>",
      ].join("");

      return div;
    };

    legend.addTo(myMap);

    // Process the fetched data as needed
  } catch (error) {
    console.error(error);
  }
};

// Call the function to initiate the fetch
fetchData();


