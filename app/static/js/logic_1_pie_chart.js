// test_logic_pie_chart.js

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
    // Access the list of months from the dropdown
    var dropdown = document.getElementById("monthDropdown");

    // Initial selected month
    var selectedMonth = dropdown.value;

    // Function to filter data by month
    function filterDataByMonth(month, crimeTypeCountData) {
        return crimeTypeCountData.filter(item => item.Month === month);
    }

    // Function to update the pie chart
    function updatePieChart(month, crimeTypeCountData) {
        var filteredData = filterDataByMonth(month, crimeTypeCountData);
    
        // Extract crime types and counts for the selected month
        var labels = filteredData.map(item => item.crime_type);
        var data = filteredData.map(item => item.crime_count);
    
        // Get the canvas element
        var canvas = document.getElementById("crimePieChart");
    

        canvas.width = 100; // Set your desired width
        canvas.height = 100; // Set your desired height

        // Clear the existing chart if it exists
        if (window.myPieChart) {
            window.myPieChart.destroy();
        }
    
        // Initialize the new chart
        var ctx = canvas.getContext('2d');
        window.myPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        '#1f78b4', // Dark Blue
                        '#33a02c', // Green
                        '#e31a1c', // Red
                        '#ff7f00', // Orange
                        '#6a3d9a', // Purple
                        '#b15928', // Brown
                        '#a6cee3', // Light Blue
                        '#b2df8a', // Light Green
                        '#fb9a99', // Light Red
                        '#fdbf6f', // Light Orange
                        '#cab2d6', // Light Purple
                        '#ffff99', // Pale Yellow
                        '#8c510a', // Dark Orange
                        '#636363'  // Dark Gray
                      ]
                    //getRandomColors(data.length),
                }]
            }
        });
    }
    

    // // Function to generate random colors for the pie chart
    // function getRandomColors(numColors) {
    //     var colors = [];
    //     for (var i = 0; i < numColors; i++) {
    //         colors.push(getRandomColor());
    //     }
    //     return colors;
    // }

    // // Function to generate a random color
    // function getRandomColor() {
    //     var letters = '0123456789ABCDEF';
    //     var color = '#';
    //     for (var i = 0; i < 6; i++) {
    //         color += letters[Math.floor(Math.random() * 16)];
    //     }
    //     return color;
    // }

    const json_path = 'static/js/json/crime_type_count.json';

    // Use the fetch API to load the GeoJSON file
    fetch(json_path)
        .then(response => response.json())
        .then(crimeTypeCountData => {
            // Log the data to the console for debugging
            console.log('Fetched Data:', crimeTypeCountData);

            // Update pie chart for the initial selected month
            updatePieChart(selectedMonth, crimeTypeCountData);

            // Handle dropdown change event
            dropdown.addEventListener("change", function () {
                selectedMonth = dropdown.value;
                updatePieChart(selectedMonth, crimeTypeCountData);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
});
























// const json_path = 'static/js/json/crime_type_count.json';

// // Use the fetch API to load the GeoJSON file
// fetch(json_path)
//   .then(response => response.json())
//   .then(crimeTypeCountData  => {
//     // Now you can work with the loaded GeoJSON data
//     console.log(crimeTypeCountData );
//     // createFeatures(geojsonData.features);



    // // Wait for the DOM to be ready
    // document.addEventListener('DOMContentLoaded', function () {
    //     // Mock data for testing purposes
    //     var crimeTypeCountData = [
    //         { "Month": "2023-07", "crime_type": "Type1", "crime_count": 10 },
    //         { "Month": "2023-07", "crime_type": "Type2", "crime_count": 15 },
    //         // Add more data as needed
    //     ];

    //     // Access the list of months from the dropdown
    //     var dropdown = document.getElementById("monthDropdown");

    //     // Initial selected month
    //     var selectedMonth = dropdown.value;

    //     // Create a function to filter data by month
    //     function filterDataByMonth(month) {
    //         return crimeTypeCountData.filter(item => item.Month === month);
    //     }

    //     // Function to update the pie chart
    //     function updatePieChart(month) {
    //         var filteredData = filterDataByMonth(month);
    //         // Log data to console for debugging
    //         console.log('Filtered Data:', filteredData);

    //         // Extract crime types and counts for the selected month
    //         var labels = filteredData.map(item => item.crime_type);
    //         var data = filteredData.map(item => item.crime_count);

    //         // Get the canvas element
    //         var canvas = document.getElementById("crimePieChart");

    //         // Initialize the chart
    //         var ctx = canvas.getContext('2d');
    //         var myPieChart = new Chart(ctx, {
    //             type: 'pie',
    //             data: {
    //                 labels: labels,
    //                 datasets: [{
    //                     data: data,
    //                     backgroundColor: getRandomColors(data.length),
    //                 }]
    //             }
    //         });
    //     }

    //     // Update pie chart for the initial selected month
    //     updatePieChart(selectedMonth);

    //     // Handle dropdown change event
    //     dropdown.addEventListener("change", function () {
    //         selectedMonth = dropdown.value;
    //         updatePieChart(selectedMonth);
    //     });

    //     // Function to generate random colors for the pie chart
    //     function getRandomColors(numColors) {
    //         var colors = [];
    //         for (var i = 0; i < numColors; i++) {
    //             colors.push(getRandomColor());
    //         }
    //         return colors;
    //     }

    //     // Function to generate a random color
    //     function getRandomColor() {
    //         var letters = '0123456789ABCDEF';
    //         var color = '#';
    //         for (var i = 0; i < 6; i++) {
    //             color += letters[Math.floor(Math.random() * 16)];
    //         }
    //         return color;
    //     }
    // });





// })
// .catch(error => console.error('Error loading GeoJSON:', error));