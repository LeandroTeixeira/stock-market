const sinon = require('sinon');

const { sequelize } = require('../../models');
const stocks = require('../../src/model/stocks.model');
const timeStocks = require('../../src/model/timeStocks.model');
const {
  COMPANY_LIST,
} = require('../../src/model/companies.model');
const userModel = require('../../src/model/users.model');
require('dotenv').config();
const { mongoDisconnect } = require('../../src/utils/mongo');

/* eslint-disable no-undef */
describe('Stocks Model Test', () => {
  afterAll(async () => {
    sequelize.close();
    await mongoDisconnect();
  });
  afterEach(() => {
    sinon.restore();
  });
  const getStockPrice = async () => ({ stockPrice: 100 });

  it('Stocks Model: Test getStocks', async () => {
    const returned = await stocks.getStocks();
    expect(returned).toHaveProperty('length');
    expect(returned.length).toBeGreaterThanOrEqual(100);
  });

  it('Stocks Model: Test getStocksByAttribute', async () => {
    const getByOwner = await stocks.getStocksByAttribute('ownerId', 1);

    expect(getByOwner).toHaveProperty('length');
    expect(getByOwner.length).toBeGreaterThanOrEqual(50);

    let getByCompany = await stocks.getStocksByAttribute('companyId', 1);
    expect(getByCompany).toHaveProperty('length');
    expect(getByCompany.length).toBe(1);

    getByCompany = await stocks.getStocksByAttribute('companyId', 10);
    expect(getByCompany.length).toBe(10);
  });

  it('Stocks Model: Test getStocksByOwner', async () => {
    const returned = await stocks.getStocksByOwner();
    expect(returned).toHaveProperty('length');
    expect(returned[0]).toHaveProperty('ownerId');
    expect(returned[0]).toHaveProperty('companyId');
    expect(returned[0]).toHaveProperty('owned');

    const getByCompany = await stocks.getStocksByAttribute('companyId', 22);

    const filteredByCompany = returned.filter(({ companyId }) => companyId === 22);
    let total = 0;
    filteredByCompany.forEach(({ owned }) => { total += owned; });
    expect(total).toBe(getByCompany.length);
  });

  it('Stocks Model: Test getStocksFromOwner and getTotalStocksFromOwner', async () => {
    const owned1 = await stocks.getStocksFromOwner(1);
    expect(owned1).toHaveProperty('length');
    expect(owned1[0]).toHaveProperty('ownerId');
    expect(owned1[0]).toHaveProperty('companyId');
    expect(owned1[0]).toHaveProperty('owned');

    const nonOwned1 = owned1.filter(({ ownerId }) => ownerId !== 1);
    expect(nonOwned1.length).toBe(0);

    const all = await stocks.getStocksByOwner();
    const allFiltered1 = all.filter(({ ownerId }) => ownerId === 1);
    expect(allFiltered1.length).toBe(owned1.length);

    const owned2 = await stocks.getStocksFromOwner(2);
    expect(owned2).toHaveProperty('length');
    expect(owned2[0]).toHaveProperty('ownerId');
    expect(owned2[0]).toHaveProperty('companyId');
    expect(owned2[0]).toHaveProperty('owned');

    const nonOwned2 = owned2.filter(({ ownerId }) => ownerId !== 2);
    expect(nonOwned2.length).toBe(0);

    const allFiltered2 = all.filter(({ ownerId }) => ownerId === 2);
    expect(allFiltered2.length).toBe(owned2.length);

    expect(owned1.length + owned2.length).toBe(all.length);

    const total11 = await stocks.getTotalStocksFromOwner(1);
    let total12 = 0;
    allFiltered1.forEach(({ owned }) => { total12 += owned; });
    let total13 = 0;
    owned1.forEach(({ owned }) => { total13 += owned; });
    expect(total11).toBe(total12);
    expect(total12).toBe(total13);

    const total21 = await stocks.getTotalStocksFromOwner(2);
    let total22 = 0;
    allFiltered2.forEach(({ owned }) => { total22 += owned; });
    let total23 = 0;
    owned2.forEach(({ owned }) => { total23 += owned; });
    expect(total21).toBe(total22);
    expect(total22).toBe(total23);
  });

  it('Stocks Model: Test getStocksByCompany', async () => {
    const returned = await stocks.getStocksByCompany();
    expect(returned).toHaveProperty('length');
    expect(returned[0]).toHaveProperty('ownerId');
    expect(returned[0]).toHaveProperty('companyId');
    expect(returned[0]).toHaveProperty('owned');

    const getByCompany = await stocks.getStocksByAttribute('companyId', 22);

    const filteredByCompany = returned.filter(({ companyId }) => companyId === 22);
    let total = 0;
    filteredByCompany.forEach(({ owned }) => { total += owned; });
    expect(total).toBe(getByCompany.length);
  });

  it('Stocks Model: Test getStocksFromCompany and getTotalStocksFromCompany', async () => {
    const own = await stocks.getStocksFromCompany(22);
    expect(own).toHaveProperty('length');
    expect(own[0]).toHaveProperty('ownerId');
    expect(own[0]).toHaveProperty('companyId');
    expect(own[0]).toHaveProperty('owned');
    let total = 0;
    own.forEach(({ owned }) => { total += owned; });
    expect(total).toBe(22);
    total = await stocks.getTotalStocksFromCompany(22);
    expect(total).toBe(22);
  });

  it('Stocks Model: Test transferStock', async () => {
    const getStockStub = sinon.stub(timeStocks, 'getStockFromDay');
    sinon.stub(userModel, 'transferFunds');
    getStockStub.withArgs({ id: 22, ...COMPANY_LIST[21] }).resolves({
      name: COMPANY_LIST[21].name,
      fullName: COMPANY_LIST[21].fullName,
      open: stocks.OPEN,
      high: stocks.HIGH,
      low: stocks.LOW,
      close: stocks.CLOSE,
      lowHour: stocks.LOW_HOUR,
      highHour: stocks.HIGH_HOUR,
    });
    let ownedBuyer = await stocks.getStocksFromOwner(1);
    ownedBuyer = ownedBuyer.filter(({ companyId }) => companyId === 22);
    expect(ownedBuyer[0].owned).toBe(11);

    let ownedSeller = await stocks.getStocksFromOwner(2);
    ownedSeller = ownedSeller.filter(({ companyId }) => companyId === 22);
    expect(ownedSeller[0].owned).toBe(11);

    let transfer = await stocks.transferOwnership({
      sellerId: 2, buyerId: 1, cId: 22, qty: 10, getStockPrice,
    });
    expect(transfer).toHaveProperty('message', 'Stocks succesfully transferred.');

    ownedBuyer = await stocks.getStocksFromOwner(1);
    ownedBuyer = ownedBuyer.filter(({ companyId }) => companyId === 22);
    expect(ownedBuyer[0].owned).toBe(21);

    ownedSeller = await stocks.getStocksFromOwner(2);
    ownedSeller = ownedSeller.filter(({ companyId }) => companyId === 22);
    expect(ownedSeller[0].owned).toBe(1);

    transfer = await stocks.transferOwnership({
      sellerId: 1, buyerId: 2, cId: 22, qty: 10, getStockPrice,
    });
    expect(transfer).toHaveProperty('message', 'Stocks succesfully transferred.');

    ownedBuyer = await stocks.getStocksFromOwner(1);
    ownedBuyer = ownedBuyer.filter(({ companyId }) => companyId === 22);
    expect(ownedBuyer[0].owned).toBe(11);

    ownedSeller = await stocks.getStocksFromOwner(2);
    ownedSeller = ownedSeller.filter(({ companyId }) => companyId === 22);
    expect(ownedSeller[0].owned).toBe(11);
  });

  it('Stocks Model: Test Error Handling', async () => {
    await expect(async () => {
      await stocks.transferOwnership({
        sellerId: 2, buyerId: 1, cId: 22, qty: 100, getStockPrice,
      });
    })
      .rejects
      .toThrow('Not enough stock to sell.');

    await expect(async () => {
      await stocks.transferOwnership({
        sellerId: 1, buyerId: 1, cId: 22, qty: 10, getStockPrice,
      });
    })
      .rejects
      .toThrow('SellerId and buyerId can\'t be equal.');

    await expect(async () => { await stocks.getStocksByAttribute('test', 1); })
      .rejects
      .toThrow('Invalid key.');

    await expect(async () => { await stocks.getStocksByAttribute('id', -1); })
      .rejects
      .toThrow('Not Found.');
    sinon.restore();
  });
});
