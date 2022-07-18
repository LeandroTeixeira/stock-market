const express = require('express');
const InvestmentsController = require('./investments.controller');
const LoginController = require('../login/login.controller');

class InvestmentsRouter {
  investmentsController;

  getStockPrice;

  router;

  loginController;

  constructor(getStockPrice) {
    this.getStockPrice = getStockPrice;
    this.investmentsController = new InvestmentsController(this.getStockPrice);
    this.loginController = new LoginController();
    this.router = express.Router();

    this.router.post('/comprar', this.loginController.getMiddleware(), this.investmentsController.buyStock);
    this.router.post('/vender', this.loginController.getMiddleware(), this.investmentsController.sellStock);
    this.router.get('/suggestions', this.loginController.getMiddleware(), this.investmentsController.getSuggestions);
  }

  getRouter() {
    return this.router;
  }
}
module.exports = InvestmentsRouter;
