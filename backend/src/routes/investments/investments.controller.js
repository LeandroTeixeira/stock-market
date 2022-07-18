/* eslint-disable no-await-in-loop */
/* eslint-disable class-methods-use-this */
const userModel = require('../../model/users.model');
const stockModel = require('../../model/stocks.model');
const companyModel = require('../../model/companies.model');
const timeStockModel = require('../../model/timeStocks.model');

class InvestmentsController {
  constructor(getStockPrice) {
    this.getStockPrice = getStockPrice;
  }

  getSuggestions = async (req, res) => {
    const { time } = req.body;
    if (time === undefined || Number.isNaN(time)) {
      return res.status(403).json({ mesage: 'Error: Time is required and must be number.' });
    }

    if (Number(time) < 1) {
      return res.status(422).json({ mesage: 'Error: Time must be higher than zero.' });
    }

    const id = Number(req.params.id);
    if (id !== req.user.id) {
      return res.status(403).json({ mesage: 'Error: Forbidden operation.' });
    }
    const [user] = await userModel.getUsersByAttribute('id', id);
    const root = await userModel.getRoot();
    const owned = await stockModel.getStocksFromOwner(Number(id));
    let availables = await stockModel.getStocksFromOwner(Number(root.id));
    const companies = await companyModel.getCompanies();
    const stocks = [];
    for (let i = 0; i < companies.length; i += 1) {
      const { companyMemo } = await this.getStockPrice({ key: 'fullName', value: companies[i].fullName });
      stocks.push(companyMemo);
    }
    availables = availables.map((stock) => {
      const company = companies.find((c) => c.id === stock.companyId);
      return {
        companyId: stock.companyId,
        companyName: company.name,
        available: stock.owned,
      };
    });
    const availableAssets = availables.map((available) => {
      const asset = stocks.find((stock) => stock.companyName === available.companyName);
      return {
        ...available,
        asset: {
          open: asset.open,
          close: asset.close,
          high: asset.high,
          low: asset.low,
          date: asset.date,
        },
      };
    });
    const suggestions = await timeStockModel.getSuggestions({
      funds: user.funds, availableAssets, risk: user.risk, assetsOwned: owned, time,
    });

    return res.status(200).json({ suggestions });
  };

  buyStock = async (req, res) => {
    const { codCliente, codAtivo, qtdAtivo } = req.body;
    if (codCliente === undefined || codAtivo === undefined || codAtivo === undefined) {
      return res.status(400).json({ message: 'Error: You need to specify the buyer, the assett and the amount.' });
    }
    if (qtdAtivo <= 0) { res.status(422).json({ message: 'Error: Asset amount must be higher than 0.' }); }
    const root = await userModel.getRoot();
    if (codCliente === root.id) return res.status(403).json({ mesage: 'Error: Forbidden operation.' });
    try {
      const response = await stockModel.transferOwnership({
        sellerId: root.id,
        buyerId: codCliente,
        cId: codAtivo,
        qty: qtdAtivo,
        getStockPrice: this.getStockPrice,
      });
      return res.status(200).json({ mesage: response.message });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  };

  sellStock = async (req, res) => {
    const { codCliente, codAtivo, qtdAtivo } = req.body;
    if (codCliente === undefined || codAtivo === undefined || codAtivo === undefined) {
      return res.status(400).json({ message: 'Error: You need to specify the buyer, the assett and the amount.' });
    }
    if (qtdAtivo <= 0) { res.status(422).json({ message: 'Error: Asset amount must be higher than 0.' }); }
    const root = await userModel.getRoot();
    if (codCliente === root.id) return res.status(403).json({ mesage: 'Error: Forbidden operation.' });

    try {
      const response = await stockModel.transferOwnership({
        sellerId: codCliente,
        buyerId: root.id,
        cId: codAtivo,
        qty: qtdAtivo,
        getStockPrice: this.getStockPrice,
      });
      return res.status(200).json({ mesage: response.message });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  };
}

module.exports = InvestmentsController;
