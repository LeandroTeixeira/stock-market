const express = require('express');
const LoginController = require('./login.controller');

class LoginRouter {
  loginController;

  router;

  constructor() {
    this.loginController = new LoginController(this.getStockPrice);

    this.router = express.Router();
    this.router.post('/', this.loginController.postLogin);
  }

  getRouter() {
    return this.router;
  }
}
module.exports = LoginRouter;
