from datetime import datetime
from flask import *
import flask
from pymongo import MongoClient
from flask_pymongo import PyMongo
import pymongo
from flask import jsonify
import requests
from flask import Flask
from flask_cors import CORS

app=Flask(__name__)
CORS(app)


client = MongoClient('mongodb://localhost:27017/')

db = client["weather_forcast"] 
open_weather_API_endpoint = "http://api.openweathermap.org/" 
APIKEY='e7ed61e617d4442039695f733f7ae49b'
temp_unit='metric'
cityname=[]
mlatmlon=[]
@app.route('/register',methods=['POST','GET'])
def register():
    if request.method=='GET':
        name=request.args.get('name')
        email=request.args.get('email')
        password=request.args.get('password')
        reg = {'name': name, 'email':email,'password':password}
        db.register.insert_one(reg)
    # return "Inserted"

@app.route('/login',methods=['POST','GET'])
def login():
    if request.method=='GET':
        email=request.args.get('email')
        password=request.args.get('password')
        resp=db.register.find({'email':email,'password':password})
        if resp:
            return("0")
        else:
            return("1")
@app.route("/cityadd",methods=['POST','GET'])
def cityadd():
    if request.method=='GET':
        city=request.args.get('city')
        cityname.append(city)
    # print(cityname)
    url = str(open_weather_API_endpoint)+"/data/2.5/forecast?q="+str(city)+"&appid=e7ed61e617d4442039695f733f7ae49b&units="+str(temp_unit)
    forcast_data = requests.get(url).json()
    # print(forcast_data)
    for element in forcast_data['list']: 
                try:  
                    db.city_weather.insert_one({'_id':city,"data":element})   
                except:
                    pymongo.errors.DuplicateKeyError
                    continue
   

               
@app.route("/cityweather",methods=['POST','GET'])
def cityweather():
    
    cityforcast=[]
    for i in db.city_weather.find({}): 
                    city_climate={
                        'city':i['_id'],
                        'temp_now':i['data']['main']['temp'],
                        'temp_max':i['data']['main']['temp_max'],
                        'temp_min':i['data']['main']['temp_min'],
                        'description':i['data']['weather'][0]['description'],
                        'icon':i['data']['weather'][0]['icon'],
                        'datetime':i['data']['dt_txt'],
                        # 'mlat':i['data']['city']['coord']['lat'],
                        # 'mlon':i['data']['city']['coord']['lon']
                    }
                    cityforcast.append(city_climate)
    return jsonify(cityforcast)
    

@app.route("/deletecity/",methods=['GET'])
def citydelete():
        city=request.args.get('city')
        db.city_weather.delete_one({'_id': city}) 
        # return(city)

@app.route("/updatecity",methods=['GET'])
def cityupdate():
        city=request.args.get('city')
        db.city_weather.delete_one({'_id': city}) 
        url = str(open_weather_API_endpoint)+"/data/2.5/forecast?q="+str(city)+"&appid=e7ed61e617d4442039695f733f7ae49b&units="+str(temp_unit)
        forcast = requests.get(url).json()
        for element in forcast['list']: 
                    try: 
                        
                        db.city_weather.insert_one({'_id':city,"data":element})         
                    except:
                        pymongo.errors.DuplicateKeyError
                        continue
# @app.route("/viewmap",methods=['GET'])
# def citymap():
#         for city in cityname:
#             print(cityname)
#             url = str(open_weather_API_endpoint)+"/data/2.5/forecast?q="+str(city)+"&appid=e7ed61e617d4442039695f733f7ae49b&units="+str(temp_unit)
#             forcast = requests.get(url).json()                      
#             latlon={
#                             'mlat':forcast['city']['coord']['lat'],
#                             'mlon':forcast['city']['coord']['lon'],
#                             }
#             mlatmlon.append(latlon)
#         print(mlatmlon)
        # return jsonify(mlatmlon)
    # map='https://www.openstreetmap.org/?mlat={}&mlon={}0#map=8/{mlat}/{mlon}' 



if __name__=='__main__':

    app.run(debug=True)

