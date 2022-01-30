from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_appbuilder import AppBuilder
from flask_mongoengine import MongoEngine
from flask_appbuilder.security.mongoengine.manager import SecurityManager

app = Flask(__name__)

app.secret_key = "secretkey"

app.config["MONGO_URI"] = "mongodb+srv://lucas:1234@desafio-freshmania.gcleq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongo = PyMongo(app)

@app.route('/products')
def products():
    db_response = mongo.db.Product.find()
    products = []
    for product in db_response:
        products.append(
            dict(
                id=str(product['_id']),
                name=product['name'],
                logo=product['logo'],
                value=product['value']
            )
        )
    return dict(products=products)

@app.route('/add', methods=['POST'])
def add_product():
    json = request.json
    logo = json['logo']
    name = json['name']
    value = json['value']
    
    if logo and name and value and request.method == 'POST':
        db_response = mongo.db.Product.insert_one({'name':name,'logo':logo,'value':value})
        product_adedded = mongo.db.Product.find_one({'_id':db_response.inserted_id})
        product = dict(
            id=str(product_adedded['_id']),
            name=product_adedded['name'],
            logo=product_adedded['logo'],
            value=product_adedded['value']
        )
        resp = jsonify({"message":"Product added!", "product":product })
        resp.status_code = 200
        return resp
    else:
        return wrong_data()
    
@app.route('/product/update/<id>', methods=['PUT'])
def update_product(id):
    _id = id
    json = request.json
    name = json['name']
    logo = json['logo']
    value = json['value']
    if name and logo and value and request.method == 'PUT':
        mongo.db.Product.update_one({'_id':ObjectId(_id['$oid'])if '$oid' in _id else ObjectId(_id)},
        {'$set':{
            'name':name,
            'logo':logo,
            'value':value
        }}).raw_result
        product_updated = mongo.db.Product.find_one({'_id':ObjectId(_id['$oid'])if '$oid' in _id else ObjectId(_id)})
        product = dict(
            id=str(product_updated['_id']),
            name=product_updated['name'],
            logo=product_updated['logo'],
            value=product_updated['value']
        )
        resp = jsonify({"message":"Product updated!", "product":product })
        resp.status_code = 200
        return resp
    else:
        return wrong_data()

@app.route('/product/delete/<id>', methods=['DELETE'])
def delete_product(id):
    _id = id
    product_to_be_deleted = mongo.db.Product.find_one({'_id':ObjectId(_id['$oid'])if '$oid' in _id else ObjectId(_id)})
    product = dict(
        id=str(product_to_be_deleted['_id']),
        name=product_to_be_deleted['name'],
        logo=product_to_be_deleted['logo'],
        value=product_to_be_deleted['value']
    )
    mongo.db.Product.delete_one({'_id':ObjectId(id)})
    resp = jsonify({"message":"Product deleted!", "product":product })
    resp.status_code = 200
    return resp
    
    
@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status':404,
        'message':'Not found ' + request.url
    }
    resp = jsonify(message)
    resp.status_code = 404
    return resp    

if __name__ == "__main__":
    app.run(debug=True)
    
@app.errorhandler(400)
def wrong_data(error=None):
    message = {
        'status':400,
        'message':'Data might be wrong, check if all fields are filled and right typed'
    }
    resp = jsonify(message)
    resp.status_code = 400
    return resp    

if __name__ == "__main__":
    app.run(debug=True)