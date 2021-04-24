# Import dependencies
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect
from flask import Flask, jsonify, render_template
# from password import password
import pandas as pd
import psycopg2

# Create engine and connection
engine = create_engine(f"postgresql://jicssazuzgoail:a0c424d25817964a8cf3affd77b289e0dd6a343351eea5dbfc893600d86ddb6e@ec2-52-23-45-36.compute-1.amazonaws.com:5432/d9h6bju2mm69af")
conn = engine.connect()

# Initialize Flask app
app = Flask(__name__)

# Create home route that run the index.html
@app.route("/")
def home():
    return render_template("index.html")

# Create a route that returns a dictionary of a list of the regions
@app.route("/regions")
def data():
    session = Session(engine)
    regions_list = pd.read_sql("select entity from by_age", conn).to_dict(orient="list")
    session.close()
    return jsonify(regions_list)

# Create a route that returns a dictionary of age data for a specific region
@app.route("/age/<entity>")
def data2(entity):
    query = f"select * from by_age where entity like '{entity}'"
    session = Session(engine)
    age_data = pd.read_sql(query, conn).to_dict(orient="records")
    session.close()
    return jsonify(age_data)

# Create a route that returns a dictionary of type data for a specific region
@app.route("/type/<entity>")
def data3(entity):
    query = f"select * from by_type where entity like '{entity}'"
    session = Session(engine)
    type_data = pd.read_sql(query, conn).to_dict(orient="records")
    session.close()
    return jsonify(type_data)

# Create a route that returns a dictionary of death by type data for a specific region
@app.route("/death/<entity>")
def data4(entity):
    query = f"select * from death_by_type where entity like '{entity}'"
    session = Session(engine)
    death_type_data = pd.read_sql(query, conn).to_dict(orient="records")
    session.close()
    return jsonify(death_type_data)
    
if __name__ == "__main__":
    app.run()