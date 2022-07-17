/* eslint-disable class-methods-use-this */
// const stocksModel = require('../../model/stocks.model');

class InvestmentsController {
  constructor(getStockPrice) {
    this.getStockPrice = getStockPrice;
  }

  buyStock() {
    console.log('Executed Buy Stock');
    return 'Executed Buy Stock';
  }

  sellStock() {
    console.log('Executed Sell Stock');
    return 'Executed Sell Stock';
  }
}
module.exports = InvestmentsController;
