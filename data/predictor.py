
def predict (funds, assets_owned, available_assets, risk, time) :
  print (funds)
  for asset in assets_owned:
    print (asset)
  for asset in available_assets:
    print (asset)
  print (risk)
  print (time)
  print("parsed body")
  print("parsed assets owned")
  print("parsed risk")
  print ("parsed time")
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
