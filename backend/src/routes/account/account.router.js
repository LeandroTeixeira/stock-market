const express = require('express');
const AccountController = require('./account.controller');
const LoginController = require('../login/login.controller');

class AccountRouter {
  accountController;

  loginController;

  getStockPrice;

  router;

  constructor() {
    this.accountController = new AccountController(this.getStockPrice);
    this.loginController = new LoginController();

    this.router = express.Router();
    this.router.post(
      '/saque',
      this.loginController.getMiddleware(),
      this.accountController.withdraw,
    );
    this.router.post(
      '/deposito',
      this.loginController.getMiddleware(),
      this.accountController.deposit,
    );
    this.router.get(
      '/:id',
      this.loginController.getMiddleware(),
      this.accountController.getAccount,
    );
  }

  getRouter() {
    return this.router;
  }
}
module.exports = AccountRouter;
