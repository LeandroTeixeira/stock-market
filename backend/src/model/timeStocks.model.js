const timeStocks = require('./timeStocks.mongo');
// eslint-disable-next-line no-unused-vars
async function getStockFromDay(company, day = Date.now()) {
  // console.log(company);
  const stockDay = new Date(day);
  stockDay.setHours(0, 0, 0, 0);
  const stock = await timeStocks.find({
    date: {
      $lte: day,
    },
    companyName: company.name,
    fullName: company.fullName,
  }, '-_id -__v').sort({ date: 'desc' }).limit(1);
  return stock[0];
}

async function getAllStocksFromDay(companyList, day) {
  const promiseList = [];
  await companyList.forEach(async (company) => {
    promiseList.push(getStockFromDay(company, day));
  });
  const resul = await Promise.all(promiseList);
  return resul;
}

async function getAllStocks() {
  const stocks = await timeStocks.find({}, '-_id -__v');
  return stocks;
}

async function saveStock(stock) {
  const response = await timeStocks.updateOne({
    companyName: stock.Company,
    fullName: stock.FullName,
    date: stock.Date,
    open: stock.Open,
    high: stock.High,
    low: stock.Low,
    close: stock.Close,
  }, {
    company: stock.Company,
    fullName: stock.FullName,
    date: stock.Date,
    open: stock.Open,
    high: stock.High,
    low: stock.Low,
    close: stock.Close,
  }, {
    upsert: true,
  });

  const savedStock = await timeStocks.findOne({
    companyName: stock.Company,
    fullName: stock.FullName,
    date: stock.Date,
    open: stock.Open,
    high: stock.High,
    low: stock.Low,
    close: stock.Close,
  });
  return { savedStock, response };
}

async function initializeStocks(stocks) {
  const { response } = await saveStock(stocks[0]);
  if (response.upsertedCount === 1) {
    const promiseList = [];
    stocks.forEach(async (stock) => {
      promiseList.push(saveStock(stock));
    });
    try {
      Promise.all(promiseList);
    } catch (err) {
      throw new Error(`Error saving planet to mongoDB: ${err}`);
    }
  }
  const all = await getAllStocks();
  return { stocks: all, message: 'Stocks succesfully initialized' };
}

async function getSuggestions({
  funds, assetsOwned, availableAssets, risk, time,
}) {
  // await alguma coisa
  const buy = [{
    companyId: null,
    amount: null,
    date: null,
    expectedPrice: [null, 'High/Low/avg'],

    totalSpenditure: null,
  }];
  const sell = [{
    companyId: null,
    amount: null,
    date: null,
    expectedPrice: [null, 'High/Low/avg'],
    totalProfit: null,
  }];
  return {
    suggestedBuy: buy,
    suggestedSell: sell,
    input: {
      funds, assetsOwned, availableAssets, risk, time,
    },
  };
}

module.exports = {
  getAllStocksFromDay,
  getStockFromDay,
  initializeStocks,
  saveStock,
  getSuggestions,
};
