import json

import numpy as np
import pandas as pd
from joblib import load
with open('./ML-Models/stats.json') as f:
  data = f.read()
stats = json.loads(data)
date1_mean = np.mean([20170101, 20191231])
date1_std = date1_mean / 600
date2_mean = np.mean([20200101, 20221231])
date2_std = date2_mean / 2400

def normalize_data(company_name, asset, time):
  end_time_normalized = (int(time[0:10].replace('-',''))-date2_mean)/date2_std
  start_time_normalized = (int(asset["date"][0:10].replace('-',''))-date1_mean)/date1_std
  open_normalized = (float(asset["open"]) - stats[company_name]["Open"]["Mean"]) / stats[company_name]["Open"]["Std"]
  high_normalized = (float(asset["high"]) - stats[company_name]["High"]["Mean"]) / stats[company_name]["High"]["Std"]
  close_normalized =  (float(asset["close"]) - stats[company_name]["Close"]["Mean"]) / stats[company_name]["Close"]["Std"]
  low_normalized = (float(asset['low']) - stats[company_name]["Low"]["Mean"]) / stats[company_name]["Low"]["Std"]

  frame = pd.DataFrame([[start_time_normalized, open_normalized, high_normalized, close_normalized, low_normalized, end_time_normalized]],  columns=["Date", "Open", "High", "Close", "Low", "Date-1"])
  # print(frame)
  return frame



def make_suggestions(funds, assets_owned, available_assets, risk, time):
  try:
    funds = float(funds)
    suggested_sell = []
    suggested_buy_aux = []
    best_buy = None
    best_profit = 0

    for asset in assets_owned:
      company_id = asset["id"]
      name = asset["companyName"]
      asset_data = asset["asset"]
      current_price = asset["stockPrice"]
      clf = None
      if risk == 0:
        clf = load(f'./ML-Models/persistence/{name}_high.joblib')
      else:
        clf = load(f'./ML-Models/persistence/{name}_low.joblib')
      pred_data = normalize_data(name,asset_data, time)
      pred = clf.predict(pred_data)[0]
      profit = float(current_price) - pred
      if(profit > 0):
        sell = dict()
        sell['id'] = company_id
        sell["companyName"] = name
        sell["currentPrice"]=  current_price
        sell["expectedPrice"]= format(pred, ".3f")
        sell["expectedProfit"]= f'{format(profit, ".3f")} per unit'
        suggested_sell.append(sell)


    assets_available_to_buy = []
    for asset in available_assets:
      available_buy = funds // float(asset["stockPrice"])
      if available_buy > 0:
        asset_available = dict()
        asset_available["id"] = asset["id"]
        asset_available["companyName"] = asset["companyName"]
        asset_available["stockPrice"] = asset["stockPrice"]
        asset_available["asset"] = asset["asset"]
        if available_buy > asset["available"]:
          asset_available["available"] = asset["available"]
        else:
          asset_available["available"] = available_buy
        assets_available_to_buy.append(asset_available)



    for asset in assets_available_to_buy[0:5]:
      name = asset["companyName"]
      company_id = asset["id"]
      asset_data = asset["asset"]
      current_price = asset["stockPrice"]
      clf = None
      if risk == 0:
        clf = load(f'./ML-Models/persistence/{name}_low.joblib')
      else:
        clf = load(f'./ML-Models/persistence/{name}_high.joblib')

      pred_data = normalize_data(name,asset_data, time)
      pred = clf.predict(pred_data)[0]
      profit = (pred-float(current_price)) * asset["available"]
      if(profit > best_profit):
        best_profit = profit
        best_buy = dict()
        best_buy["id"] = company_id
        best_buy["companyName"] = name
        best_buy["currentPrice"]=  current_price
        best_buy["buyable"] = asset["available"]
        best_buy["expectedPrice"]= format(pred, ".3f")
        best_buy["expectedProfit"]= f'{format(profit, ".3f")} total'

    return_data = dict()
    return_data["suggestedSell"] = suggested_sell
    return_data["suggestedBuy"] = best_buy
    return return_data
  except:
    return "Error processing data"
