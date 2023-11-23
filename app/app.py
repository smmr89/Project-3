from flask import Flask, jsonify, render_template, request
from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
import pandas as pd
import json
import os
app = Flask(__name__)
# engine = create_engine("sqlite:///crime_IMD.sqlite")
# print(engine)
engine2 = create_engine("sqlite:///month_lsoa_gb.sqlite")
print(engine2)
engine3 = create_engine("sqlite:///crime_type_count.sqlite")
print(engine3)
engine4 = create_engine("sqlite:///heat_markers.sqlite")
print(engine4)

# df = pd.read_sql("Select * from crime_IMD", con=engine, index_col=None)
df2 = pd.read_sql("Select * from month_lsoa_gb", con=engine2, index_col=None)
df3 = pd.read_sql("Select * from crime_type_count", con=engine3, index_col=None)
df4 = pd.read_sql("Select * from heat_markers", con=engine4, index_col=None)


# print("\n================================\n")
# print(df.head(2))
# print("\n================================\n")
print("\n================================\n")
print(df2.head(2))
print("\n================================\n")
print("\n================================\n")
print(df3.head(2))
print("\n================================\n")
print("\n================================\n")
print(df4.head(2))
print("\n================================\n")


@app.route("/")
def home():
    print("\n[0]============= /Welcome to home page =============\n")

    ###########################################################################################
    ###########################################################################################
    output_file_path = "static/js/json/month_lsoa_gb.geojson"

    # Export GeoJSON to a file
    if os.path.exists(output_file_path):
        print(f"Exporting {output_file_path} has previously been performed")
    else:
        Base = automap_base()
        # reflect the tables
        Base.prepare(autoload_with=engine2)
        session = Session(bind=engine2)
        execute_string = "select * from month_lsoa_gb"
        results = engine2.connect().execute(text(execute_string)).fetchall()
        session.close()
        geojson2 = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [lon_c, lat_c],
                    },
                    "properties": {
                        "LSOA_code": str(LSOA_code),
                        "LSOA_name": str(LSOA_name),
                        "LA_District_name": str(LA_District_name),
                        "crime_count": crime_count,
                        "Month": str(Month),
                        "IMD_Score": IMD_Score,
                        "IMD_Decile": IMD_Decile,
                        "Income_Score": Income_Score,
                        "Total_population": Total_population
                    },
                } for LSOA_code, LSOA_name, LA_District_name, crime_count, Month, IMD_Score, IMD_Decile,  Income_Score, Total_population, lat_c, lon_c in results]
        }



        # Export GeoJSON to a file
        with open(output_file_path, "w") as output_file:
            json.dump(geojson2, output_file, indent=2)
        print(f"GeoJSON data has been exported to {output_file_path}")


    ###########################################################################################
    ###########################################################################################

    output_file_path = "static/js/json/crime_type_count.json"

    if os.path.exists(output_file_path):
        print(f"Exporting {output_file_path} has previously been performed")
    else:
        crime_type_count = df3.to_dict(orient='records')
        # Convert to JSON and escape HTML unsafe characters

        # Export GeoJSON to a file
        with open(output_file_path, 'w') as json_file:
            json.dump(crime_type_count, json_file)
        print(f"Json data has been exported to {output_file_path}")



    ###########################################################################################
    ###########################################################################################

    # heat_markers = df4.to_dict(orient='records')
    # Convert to JSON and escape HTML unsafe characters
    output_file_path = "static/js/json/heat_markers.geojson"

    if os.path.exists(output_file_path):
        print(f"Exporting {output_file_path} has previously been performed")
    else:
            
        Base = automap_base()
        # reflect the tables
        Base.prepare(autoload_with=engine4)
        session = Session(bind=engine4)
        execute_string = "select * from heat_markers"
        results = engine4.connect().execute(text(execute_string)).fetchall()
        session.close()

        geojson3 = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [Longitude, Latitude],
                    },
                    "properties": {
                        "Month": str(Month)
                    },
                } for Month, Latitude, Longitude in results]
        }



        # Export GeoJSON to a file
        with open(output_file_path, 'w') as json_file:
            json.dump(geojson3, json_file)
        print(f"Json data has been exported to {output_file_path}")


    return render_template("index_0.html")


@app.route("/crime_markers")
def crime_markers():
    print("\n============= /[1] Crime Markers Page =============\n")



    return render_template("index_1_crime_markers.html")


@app.route("/crime_type")
def crime_imd():
    print("\n============= /[2] Crime Type =============\n")
    
    return render_template("index_1_crime_markers.html")

@app.route("/crime_heat")
def crime_heat():
    print("\n============= /[3] Crime Heat Map =============\n")
    
    return render_template("index_3_crime_heat.html")



if __name__ == '__main__':
    app.run(debug=True)








    ###No Longer using this data###    
    # Base = automap_base()
    # Base.prepare(autoload_with=engine)

    # session = Session(bind=engine)
    # execute_string = "select * from crime_IMD"
    # results = engine.connect().execute(text(execute_string)).fetchall()
    # session.close()
    # geojson = {
    #     "type": "FeatureCollection",
    #     "features": [
    #         {
    #             "type": "Feature",
    #             "geometry": {
    #                 "type": "Point",
    #                 "coordinates": [Longitude, Latitude],
    #             },
    #             "properties": {
    #                 "crime_id": str(crime_id),
    #                 "LSOA_code": str(LSOA_code),
    #                 "LSOA_name": str(LSOA_name),
    #                 "LA_District_code": str(LA_District_code),
    #                 "LA_District_name": str(LA_District_name),
    #                 "Month": str(Month),
    #                 "crime_type": str(crime_type),
    #                 "IMD_Score": IMD_Score,
    #                 "IMD_Decile": IMD_Decile,
    #                 "Income_Score": Income_Score,
    #                 "Total_population": Total_population
    #             },
    #         } for crime_id, LSOA_code, LSOA_name, LA_District_code, LA_District_name, Month, crime_type, Longitude, Latitude, IMD_Score, IMD_Decile,  Income_Score, Total_population in results]
    # }

    # output_file_path = "static/js/json/crime_imd_merge.geojson"

    # # Export GeoJSON to a file
    # if os.path.exists(output_file_path):
    #     print(f"Exporting {output_file_path} has previously been performed")
    # else:
    #     # Export GeoJSON to a file
    #     with open(output_file_path, "w") as output_file:
    #         json.dump(geojson, output_file, indent=2)
    #     print(f"GeoJSON data has been exported to {output_file_path}")