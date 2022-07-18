const stockModel = require('../../model/stocks.model');
const companyModel = require('../../model/companies.model');

class AssetsController {
  getTrendingCompanies;

  constructor(getStockPrice) {
    this.getStockPrice = getStockPrice;
  }

  getTrends = async (req, res) => {
    if (this.getTrendingCompanies === undefined) {
      this.getTrendingCompanies = await companyModel
        .getTrendingCompaniesFactory(this.getStockPrice);
    }
    let { amount, days } = req.body;
    if (amount === undefined
      || Number.isNaN(Number(amount))) amount = 5;
    if (days === undefined || Number.isNaN(Number(days))) days = 15;
    try {
      const { trends } = await this.getTrendingCompanies(Number(days), Number(amount));
      res.status(200).json({ trends });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  };

  get = async (req, res) => {
    const { type } = req.body;
    const { id } = req.params;
    if (!type) {
      return res.status(400).json({ message: 'Error: Type is required' });
    }
    if (type.toLowerCase() !== 'asset' && type.toLowerCase() !== 'client') {
      return res.status(400).json({ message: 'Error: Type must be either asset or client' });
    }
    try {
      if (type === 'asset') {
        const company = await companyModel.getCompanyByAttribute('id', Number(id));
        const asset = await stockModel.getTotalStocksFromCompany(Number(id));
        const { stockPrice } = await this.getStockPrice({ key: 'id', value: id });
        return res.status(200).json({
          id: company.id,
          name: company.name,
          fullName: company.fullName,
          amount: asset,
          value: stockPrice,
        });
      }
      if (Number(id) !== req.user.id) {
        return res.status(401)
          .json({ message: 'Can\'t require assets from other users' });
      }
      const owned = await stockModel.getStocksFromOwner(Number(id));
      const promiseList = [];
      owned.forEach((o) => {
        promiseList.push(this.getStockPrice({ key: 'id', value: o.companyId }));
      });
      const stocks = await Promise.all(promiseList);
      const ownedPriced = stocks.map(
        (stock, index) => ({
          userId: owned[index].ownerId,
          companyId: owned[index].companyId,
          amount: owned[index].owned,
          value: stock.stockPrice,
        }),
      );
      return res.status(200).json(ownedPriced);
    } catch ({ message }) {
      return res.status(404).json({ message });
    }
  };
}
module.exports = AssetsController;
