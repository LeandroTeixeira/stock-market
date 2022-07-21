from flask import Flask, request, jsonify, render_template

from predictor import make_suggestions

app = Flask(__name__, template_folder='../backend/coverage/', static_folder='../backend/coverage/')


@app.route('/', methods=['GET'])
def getCoverage():
  return render_template('index.html')


@app.route('/suggestions/', methods=['POST'])
def suggestions():
  body = request.json
  funds = None
  assets_owned = None
  available_assets = None
  risk = None
  time = None

  try:

    if "funds" in body:
      funds = body['funds']
    else:
      return "Missing required field: funds", 401
    if "assetsOwned" in body:
      assets_owned = body['assetsOwned']
    else:
      return jsonify(message="Missing required field: assets_owned",
                     statusCode=400)

    if "availableAssets" in body:
      available_assets = body['availableAssets']
    else:
      return jsonify(message="Missing required field: available_assets",
                     statusCode=400)

    if "risk" in body:
      risk = body['risk']
    else:
      return jsonify(message="Missing required field: risk",
                     statusCode=400)

    if "time" in body:
      time = body['time']
    else:
      return jsonify(message="Missing required field: time",
                     statusCode=400)

    data = make_suggestions(funds, assets_owned, available_assets, risk, time)
    return jsonify(statusCode=200,
                   body=data)
  except:
    return jsonify(message="Failure",
                   statusCode=400)


if __name__ == "__main__":
  app.run()
