const stockModel = require('../../model/stocks.model');
const companyModel = require('../../model/companies.model');

class AssetsController {
  constructor(getStockPrice) {
    this.getStockPrice = getStockPrice;
  }

  async get(req, res) {
    const { type } = req.body;
    const { id } = req.params;
    if (!type) {
      return res.status(400).json({ message: 'Type is required' });
    }
    if (type.toLowerCase() !== 'asset' && type.toLowerCase() !== 'client') {
      return res.status(400).json({ message: 'Type must be either asset or client' });
    }
    try {
      if (type === 'asset') {
        const company = await companyModel.getCompanyByAttribute('id', Number(id));
        const asset = await stockModel.getTotalStocksFromCompany(Number(id));
        return res.status(200).json({
          name: company.name,
          fullName: company.fullName,
          amount: asset,
        });
      }
      if (Number(id) !== req.user.id) {
        return res.status(401)
          .json({ message: 'Can\'t require assets from other users' });
      }
      const owned = await stockModel.getStocksFromOwner(Number(id));
      return res.status(200).json(owned);
    } catch ({ message }) {
      return res.status(404).json({ message });
    }
  }
}
module.exports = AssetsController;
