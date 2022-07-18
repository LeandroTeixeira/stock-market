const express = require('express');
const AssetsController = require('./assets.controller');
const LoginController = require('../login/login.controller');

class AssetsRouter {
  assetsController;

  getStockPrice;

  router;

  loginController;

  constructor(getStockPrice) {
    this.getStockPrice = getStockPrice;
    this.assetsController = new AssetsController(this.getStockPrice);
    this.loginController = new LoginController();

    this.router = express.Router();
    this.router.get(
      '/:id',
      this.loginController.getMiddleware(),
      this.assetsController.get,
    );
    this.router.get('/', this.assetsController.getTrends);
  }

  getRouter() {
    return this.router;
  }
}
module.exports = AssetsRouter;
