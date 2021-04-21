import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect
from flask import Flask, jsonify, render_template
from password import password
import pandas as pd

engine = create_engine(f"postgresql://postgres:{password}@localhost:5432/cancer_db")
conn = engine.connect()
# inspector = inspect(engine)
# inspector.get_table_names()


app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/age")
def data():
    session = Session(engine)
    age_data = pd.read_sql("select * from by_age", conn).to_dict(orient="split")
    return jsonify(age_data)
    session.close()
    
@app.route("/type")
def data2():
    session = Session(engine)
    type_data = pd.read_sql("select * from by_type", conn).to_dict(orient="list")
    return jsonify(type_data)
    session.close()

@app.route("/death")
def data3():
    session = Session(engine)
    death_type_data = pd.read_sql("select * from death_by_type", conn).to_dict(orient="records")
    return jsonify(death_type_data)
    session.close()
    
if __name__ == "__main__":
    app.run()
    