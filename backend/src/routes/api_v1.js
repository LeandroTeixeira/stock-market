const express = require('express');

const { getStockPriceFactory } = require('../model/companies.model');

const AccountRouter = require('./account/account.router');
const AssetsRouter = require('./assets/assets.router');
const InvestmentsRouter = require('./investments/investments.router');
const LoginRouter = require('./login/login.router');

const apiV1 = express.Router();

getStockPriceFactory().then((getStockPrice) => {
  const accountRouter = new AccountRouter();
  const assetsRouter = new AssetsRouter(getStockPrice);
  const investmentsRouter = new InvestmentsRouter(getStockPrice);
  const loginRouter = new LoginRouter();

  apiV1.use('/conta', accountRouter.getRouter());
  apiV1.use('/account', accountRouter.getRouter());

  apiV1.use('/assets', assetsRouter.getRouter());
  apiV1.use('/ativos', assetsRouter.getRouter());

  apiV1.use('/investments', investmentsRouter.getRouter());
  apiV1.use('/investimentos', investmentsRouter.getRouter());

  apiV1.use('/login', loginRouter.getRouter());
});

module.exports = apiV1;
