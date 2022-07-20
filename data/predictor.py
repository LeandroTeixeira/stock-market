import json

import numpy as np
import pandas as pd
from joblib import load


def predict(funds, assets_owned, available_assets, risk, time):
  print(funds)
  for asset in assets_owned:
    print(asset)
  for asset in available_assets:
    print(asset)
  print(risk)
  print(time)
  print("parsed body")
  print("parsed assets owned")
  print("parsed risk")
  print("parsed time")
  return {
    "suggestions": {
      "suggestedBuy": [
        {
          "companyId": None,
          "amount": None,
          "date": None,
          "expectedPrice": [
            None,
            "High/Low/avg"
          ],
          "totalSpenditure": None
        }
      ],
      "suggestedSell": [
        {
          "companyId": None,
          "amount": None,
          "date": None,
          "expectedPrice": [
            None,
            "High/Low/avg"
          ],
          "totalProfit": None
        }
      ]
    }
  }


with open('./ML-Models/stats.json') as f:
  data = f.read()
stats = json.loads(data)
print(stats["Apple"])
date1_mean = np.mean([20170101, 20191231])
date1_std = date1_mean / 2
date2_mean = np.mean([20200101, 20221231])
date2_std = date2_mean / 2

clf = load('./ML-Models/persistence/Apple_high.joblib')
y = pd.DataFrame([[(20190203 - date1_mean) / date1_std,
                   (23 - stats["Apple"]["Open"]["Mean"])
                   / stats["Apple"]["Open"]["Std"],
                   (45 - stats["Apple"]["High"]["Mean"]) /
                   stats["Apple"]["High"]["Std"],
                   (63 - stats["Apple"]["Close"]["Mean"])
                   / stats["Apple"]["Close"]["Std"],
                   (22 - - stats["Apple"]["Low"]["Mean"])
                   / stats["Apple"]["Low"]["Std"],
                   (20200203 - date2_mean) / date2_std]],
                 columns=["Date", "Open", "High", "Close", "Low", "Date-1"])
pred = clf.predict(y)
print(pred)
