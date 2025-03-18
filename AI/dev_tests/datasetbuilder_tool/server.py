from flask import Flask, request, jsonify
import os
import json

app = Flask(__name__)
cur_dataset = None

with open('dataset.json', 'r') as f:
    dataset = json.load(f)
print(dataset)

@app.route('/', methods=['POST'])
def home():
    return "Welcome to the Dataset Builder Tool!"

@app.route('/build/', methods=['GET'])
def build():
    return "build dataset page"

@app.route('/save/', methods=['POST'])
def save():
    return "dataset saved"

@app.route('/load_next/', methods=['GET'])
def load_next():
    return "load next image"