/* eslint-disable class-methods-use-this */
// const stocksModel = require('../../model/stocks.model');
const userModel = require('../../model/users.model');
const stockModel = require('../../model/stocks.model');

class InvestmentsController {
  constructor(getStockPrice) {
    this.getStockPrice = getStockPrice;
  }

  buyStock = async (req, res) => {
    const { codCliente, codAtivo, qtdAtivo } = req.body;
    if (codCliente === undefined || codAtivo === undefined || codAtivo === undefined) {
      return res.status(400).json({ message: 'You need to specify the buyer, the assett and the amount' });
    }
    if (qtdAtivo <= 0) { res.status(422).json({ message: 'Asset amount must be higher than 0' }); }
    const root = await userModel.getRoot();
    if (codCliente === root.id) return res.status(403).json({ mesage: 'Forbidden operation.' });
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
      return res.status(400).json({ message: 'You need to specify the buyer, the assett and the amount' });
    }
    if (qtdAtivo <= 0) { res.status(422).json({ message: 'Asset amount must be higher than 0' }); }
    const root = await userModel.getRoot();
    if (codCliente === root.id) return res.status(403).json({ mesage: 'Forbidden operation.' });

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
