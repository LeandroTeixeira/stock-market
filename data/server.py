from flask import Flask, request, jsonify
from predictor import predict

app = Flask(__name__)

@app.route('/suggestions/', methods=['POST'])
def suggestions():
    body = request.json
    funds = None
    assets_owned = None
    available_assets = None
    risk = None
    time = None
    try:
      if funds in body:
         funds = body['funds']
      else:
        return jsonify(message="Missing required field: funds",
                    statusCode=400)
      if assets_owned in body:
        assets_owned = body['assetsOwned']
      else:
          return jsonify(message="Missing required field: assets_owned",
                       statusCode=400)
      if available_assets in body:
        available_assets = body['availableAssets']
      else:
         return jsonify(message="Missing required field: available_assets",
                   statusCode=400)
      if risk in body:
        risk = body['risk']
      else:
        return jsonify(message="Missing required field: risk",
                       statusCode=400)
      if time in body:
        time = body['time']
      else:
        return jsonify(message="Missing required field: time",
                     statusCode=400)
      data = predict(funds, assets_owned, available_assets, risk, time)
      return jsonify(statusCode=200,
                     body=data)
    except:
      return jsonify(message= "Failure",
                    statusCode= 400)

if __name__ == "__main__":
  app.run()
