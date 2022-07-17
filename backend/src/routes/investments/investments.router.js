const express = require('express');
const InvestmentsController = require('./investments.controller');

class InvestmentsRouter {
  investmentsController;

  getStockPrice;

  router;

  constructor(getStockPrice) {
    this.getStockPrice = getStockPrice;
    this.investmentsController = new InvestmentsController(this.getStockPrice);

    this.router = express.Router();

    this.router.post('/comprar', this.investmentsController.buyStock);
    this.router.post('/vender', this.investmentsController.sellStock);
  }

  getRouter() {
    return this.router;
  }
}
module.exports = InvestmentsRouter;
