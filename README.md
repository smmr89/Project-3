# Project-3 - An  interactive dashboard for street Crime in West Midlands 

![image](https://github.com/smmr89/Project-3/blob/main/app/static/images/image.jpg)

# Instructions to run app: 
 1) Clone repository: (https://github.com/smmr89/Project-3)
 2) Change directory app folder
 3) Run command `python app.py`
 4) Open the Flask app at http://127.0.0.1:5000/

## Contents

* [Dataset](#dataset-header)
* [Project Outline](#project-header)
* [Tools used](#reports-header)
* [Process](#process-header)
* [Future Development](#future-development-header)

## <a id="dataset-header"></a>Dataset

## <a id="project-header"></a>Project Outline

 Our project centers around an interactive dashboard highlighting street crime in the West Midlands. We curated and cleaned police street crime data and merged with Census data such as the Index of Multiple Deprivation 2019 and Geolookups library for LSOA boundaries/central points. This was performed using a Jupyter notebook, resulting in three SQLite databases. JavaScript, HTML, CSS were used alongisde JS libraries Charts.js and Leaflet.js to develop a dynamic dashboard with a user-friendly dropdown menu enabling month-specific data exploration. The visualizations offer a comprehensive overview of street crime trends, providing an accessible tool for users to interactively engage with the data.
 
## :wrench: <a id="reports-header"></a>Tools used :wrench:
  * Jupyter Notebook with Pandas, Geopandas and SQLite libraries
  * Python Flask App
  * Javascript with Leaflet.js/Charts.js and Leaflet.heat plugins
  * HTML/CSS with Bootstrap
  * SQLite

## :computer: <a id="process-header"></a>Process :computer:

 Steps in the process

 - Jupyter notebook/Pandas to read CSV/GeoJSON format files and clean
 - We then created addtional data frames to help support the creation of the SQLite databases.
 - We merged the both the Police data and the IMD data. 
 - We then used the Geolookup json to help filter out any data did not fall within the West Midlands county.
 - This was completed by a merge to remove the LSOAs outside of WMCA in the police/IMD merge.
 - The next steps included exporting the file and assigning unique colors to LSOAs in various areas.
 - Following this, we aggregated and grouped the data by LSOA and crime type on a monthly basis, creating distinct dataframes for each grouping. Subsequently, we exported these dataframes as separate SQLite databases.
 - Next, we proceeded to acquire coordinates for the heat markers. Once obtained and stored in a dataframe, we exported this information as a distinct SQLite database.

 - After finalizing our databases, we began employing Flask to enhance the interactivity of our page, seamlessly integrating it with JavaScript by adding the function of searching by month for crime in the West midlands. 

 - We utilized HTML and CSS to craft a visually appealing interface, allowing users to seamlessly access and explore the data.

 - Here are a range of views we've developed on our interactive page:

| | |
|:-------------------------:|:-------------------------:|
|<img width="1604" alt="screen shot 2017-08-07 at 12 18 15 pm" src="https://github.com/smmr89/Project-3/blob/main/app/static/images/lsoa.png">  LSOA Map |  <img width="1604" alt="screen shot 2017-08-07 at 12 18 15 pm" src="https://github.com/smmr89/Project-3/blob/main/app/static/images/heat.png"> Heat Map |
|<img width="1604" alt="screen shot 2017-08-07 at 12 18 15 pm" src="https://github.com/smmr89/Project-3/blob/main/app/static/images/pie.png"> Pie Chart |  <img width="1604" alt="screen shot 2017-08-07 at 12 18 15 pm" src="https://github.com/smmr89/Project-3/blob/main/app/static/images/crime.png"> Crime Map|


## :rocket: <a id="future-development-header"></a>**Future Development** :rocket:

 - Potential Further Developments

     1) Add multiple filters to view data in more specific forms such as filtering by Crime Type as well as Month and LSOA.
     2) Use a dynamically created dropwdown generated from available data
     3) Pull data using webscraping/API techniques
     4) Normalise data using population count to get crime rates
     5) Further user interaction such as search bars for crime types and/or locations (e.g. post codes)

  ## References/Data Sources

  * Police Data: https://data.police.uk/data/ 
  * Census Data/Geolookups: https://github.com/drkane/geo-lookups/tree/master
  * IMD (Index of Multiple Deprivation) Data: https://www.gov.uk/government/statistics/english-indices-of-deprivation-2019