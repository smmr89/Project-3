# Project-3 - An  interactive dashboard for street Crime in West Midlands 

![image](https://github.com/smmr89/Project-3/blob/main/app/static/images/image.jpg)

# Instructions to run app: 
 1) Git clone: (https://github.com/smmr89/Project-3)
 2) CD to app folder
 3) Python app.py
 4) Copy the URL and paste in Web browser

## Contents

* [Dataset](#dataset-header)
* [Project Outline](#project-header)
* [Tools used](#reports-header)
* [Process](#process-header)
* [Future Development](#future-development-header)

## <a id="dataset-header"></a>Dataset

## <a id="project-header"></a>Project Outline

 Our project centers around an interactive dashboard highlighting street crime in the West Midlands. We curated and cleaned police street crime data using a Jupyter notebook, resulting in three SQLite databases. Leveraging JavaScript, HTML and CSS we developed a dynamic dashboard with a user-friendly dropdown menu enabling month-specific data exploration. The visualizations offer a comprehensive overview of street crime trends, providing an accessible tool for users to interactively engage with the data.
 
## :wrench: <a id="reports-header"></a>Tools used :wrench:
  * Jupyter Notebook
  * Javascript
  * SQLite
  * Flask app
  * HTML/CSS

## :computer: <a id="process-header"></a>Process :computer:

 Steps in the process

 - First we pulled the data from the CSV and created a dataframe for each respective resource. 
 - This was then exported to a csv.
 - We then created addtional data frames to help support the creation of the SQLite databases.
 - We merged the both the Police data and the IMD data. 
 - We then used the Geolookup json to help filter out any data did not fall within the West Midlands county.
 - This was completed by a merge to remove the LSOAs outside of WMCA in the police/IMD merge.
 - The next steps included exporting the file and assigning unique colors to LSOAs in various areas.
 - Following this, we aggregated and grouped the data by LSOA and crime type on a monthly basis, creating distinct dataframes for each grouping. Subsequently, we exported these dataframes as separate SQLite databases.
 - Next, we proceeded to acquire coordinates for the heat markers. Once obtained and stored in a dataframe, we exported this information as a distinct SQLite database.

 - After finalizing our databases, we began employing Flask to enhance the interactivity of our page, seamlessly integrating it with JavaScript by adding the function of searching by month for crime in the West midlands. 

 - We utilized HTML and CSS to craft an visually appealing interface, allowing users to seamlessly access and explore the data.

 - Here are a range of views we've developed on our interactive page:

<img width="1221" alt="crime_markers" src="https://github.com/smmr89/Project-3/blob/main/app/static/images/crime_markers.png">

<img width="977" alt="Pie_chart" src="https://github.com/smmr89/Project-3/blob/main/app/static/images/pie_chart.png">

<img width="617" alt="Heat_map" src="https://github.com/smmr89/Project-3/blob/main/app/static/images/heat_map.png">


## :rocket: <a id="future-development-header"></a>**Future Development** :rocket:

 - In the realm of future development, several opportunities lie ahead for enhancing our interactive street crime dashboard. Potential areas of focus include:

     1) Feature Expansion: Introduce additional features to provide users with a more comprehensive understanding of street crime patterns.
     2) Performance Optimization: Explore opportunities to enhance the speed and efficiency of data processing and visualization rendering.
     3) User Feedback Integration: Act upon user feedback to refine existing features and incorporate new functionalities that align with user preferences.
     4) Enhanced Data Sources: Consider integrating additional data sources to enrich the depth of analysis and broaden the scope of the dashboard.

  