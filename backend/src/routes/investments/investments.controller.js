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
      return res.status(400).json({ message: 'Error: Time is required and must be number.' });
    }

    if (Number(time) < 1) {
      return res.status(422).json({ message: 'Error: Time must be higher than zero.' });
    }

    const id = Number(req.params.id);
    if (id !== req.user.id) {
      return res.status(403).json({ message: 'Error: Forbidden operation.' });
    }
    const [user] = await userModel.getUsersByAttribute('id', id);
    const root = await userModel.getRoot();
    let owned = await stockModel.getStocksFromOwner(Number(id));
    let availables = await stockModel.getStocksFromOwner(Number(root.id));
    const companies = await companyModel.getCompanies();
    const stocks = [];

    for (let i = 0; i < companies.length; i += 1) {
      const companyMemo = await this.getStockPrice({ key: 'fullName', value: companies[i].fullName });
      stocks.push(companyMemo);
    }

    owned = owned.map((stock) => {
      const company = companies.find((c) => c.id === stock.companyId);

      const asset = stocks.find((s) => s.companyMemo.fullName === company.fullName);

      return {
        id: company.id,
        companyName: company.fullName,
        stockPrice: asset.stockPrice,

        asset: {
          open: asset.companyMemo.open,
          high: asset.companyMemo.high,

          close: asset.companyMemo.close,
          low: asset.companyMemo.low,
          date: asset.companyMemo.date,
        },
      };
    });

    availables = availables.map((stock) => {
      const company = companies.find((c) => c.id === stock.companyId);
      const asset = stocks.find((s) => s.companyMemo.fullName === company.fullName);

      return {
        id: company.id,
        companyName: company.fullName,
        available: stock.owned,
        stockPrice: asset.stockPrice,
        asset: {
          open: asset.companyMemo.open,
          high: asset.companyMemo.high,
          close: asset.companyMemo.close,
          low: asset.companyMemo.low,
          date: asset.companyMemo.date,
        },
      };
    });

    try {
      const suggestions = await timeStockModel.getSuggestions({
        funds: user.funds, availableAssets: availables, risk: user.risk, assetsOwned: owned, time,
      });
      return res.status(200).json({ suggestions });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  };

  buyStock = async (req, res) => {
    const { codCliente, codAtivo, qtdAtivo } = req.body;
    if (codCliente === undefined || codAtivo === undefined || qtdAtivo === undefined) {
      return res.status(400).json({ message: 'Error: You need to specify the buyer, the assett and the amount.' });
    }
    if (qtdAtivo <= 0) { return res.status(422).json({ message: 'Error: Asset amount must be higher than 0.' }); }
    const root = await userModel.getRoot();
    if (codCliente === root.id) return res.status(403).json({ message: 'Error: Forbidden operation.' });
    try {
      const response = await stockModel.transferOwnership({
        sellerId: root.id,
        buyerId: codCliente,
        cId: codAtivo,
        qty: qtdAtivo,
        getStockPrice: this.getStockPrice,
      });
      return res.status(200).json({ message: response.message });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  };

  sellStock = async (req, res) => {
    const { codCliente, codAtivo, qtdAtivo } = req.body;
    if (codCliente === undefined || codAtivo === undefined || codAtivo === undefined) {
      return res.status(400).json({ message: 'Error: You need to specify the buyer, the assett and the amount.' });
    }
    if (qtdAtivo <= 0) { return res.status(422).json({ message: 'Error: Asset amount must be higher than 0.' }); }
    const root = await userModel.getRoot();
    if (codCliente === root.id) return res.status(403).json({ message: 'Error: Forbidden operation.' });

    try {
      const response = await stockModel.transferOwnership({
        sellerId: codCliente,
        buyerId: root.id,
        cId: codAtivo,
        qty: qtdAtivo,
        getStockPrice: this.getStockPrice,
      });
      return res.status(200).json({ message: response.message });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  };
}

module.exports = InvestmentsController;
