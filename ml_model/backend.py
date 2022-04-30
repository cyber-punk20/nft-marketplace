from flask import Flask, request
from flask_cors import CORS, cross_origin
from ml_model import *

app = Flask(__name__)
CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
# input_params = {"city":"San Francisco","back":"Suburban","task":"Segmentation","content":"Cars","class_dist":[10,20,30,400,500,600,700,800,90,10]}


@app.route("/api/estimate", methods = ['POST'])
@cross_origin()
def result():
    if(request.method == 'POST'): 
        input_params = {}
        # print(request.form)
        print(request.json)
        input_params['city'] = request.json['city']
        input_params['back'] = request.json['back']
        input_params['task'] = request.json['task']
        input_params['content'] = request.json['content']
        input_params['class_dist'] = request.json['class_dist']
        return f"{predict_price(input_params)}"