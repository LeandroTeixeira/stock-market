const sinon = require('sinon');

const { sequelize } = require('../models');
const {
  getStocks, getStocksByAttribute, getStocksByOwner, getStockFromDay,
  getStocksFromOwner, getTotalStocksFromOwner, getStocksByCompany,
  getStocksFromCompany, getTotalStocksFromCompany, transferOwnership,
} = require('../src/model/stocks.model');

require('dotenv').config();
/* eslint-disable no-undef */
describe('Stocks Model Test', () => {
  afterAll(() => {
    sequelize.close();
  });
  afterEach(() => {
    sinon.restore();
  });
  it('Test getStocks', async () => {
    const returned = await getStocks();
    expect(returned).toHaveProperty('length');
    expect(returned.length).toBeGreaterThanOrEqual(100);
  });

  it('Test getStocksByAttribute', async () => {
    const getByOwner = await getStocksByAttribute('ownerId', 1);

    expect(getByOwner).toHaveProperty('length');
    expect(getByOwner.length).toBeGreaterThanOrEqual(50);

    let getByCompany = await getStocksByAttribute('companyId', 1);
    expect(getByCompany).toHaveProperty('length');
    expect(getByCompany.length).toBe(1);

    getByCompany = await getStocksByAttribute('companyId', 10);
    expect(getByCompany.length).toBe(10);
  });

  it('Test getStocksByOwner', async () => {
    const returned = await getStocksByOwner();
    expect(returned).toHaveProperty('length');
    expect(returned[0]).toHaveProperty('ownerId');
    expect(returned[0]).toHaveProperty('companyId');
    expect(returned[0]).toHaveProperty('owned');

    const getByCompany = await getStocksByAttribute('companyId', 22);

    const filteredByCompany = returned.filter(({ companyId }) => companyId === 22);
    let total = 0;
    filteredByCompany.forEach(({ owned }) => { total += owned; });
    expect(total).toBe(getByCompany.length);
  });

  it('Test getStocksFromOwner and getTotalStocksFromOwner', async () => {
    const owned1 = await getStocksFromOwner(1);
    expect(owned1).toHaveProperty('length');
    expect(owned1[0]).toHaveProperty('ownerId');
    expect(owned1[0]).toHaveProperty('companyId');
    expect(owned1[0]).toHaveProperty('owned');

    const nonOwned1 = owned1.filter(({ ownerId }) => ownerId !== 1);
    expect(nonOwned1.length).toBe(0);

    const all = await getStocksByOwner();
    const allFiltered1 = all.filter(({ ownerId }) => ownerId === 1);
    expect(allFiltered1.length).toBe(owned1.length);

    const owned2 = await getStocksFromOwner(2);
    expect(owned2).toHaveProperty('length');
    expect(owned2[0]).toHaveProperty('ownerId');
    expect(owned2[0]).toHaveProperty('companyId');
    expect(owned2[0]).toHaveProperty('owned');

    const nonOwned2 = owned2.filter(({ ownerId }) => ownerId !== 2);
    expect(nonOwned2.length).toBe(0);

    const allFiltered2 = all.filter(({ ownerId }) => ownerId === 2);
    expect(allFiltered2.length).toBe(owned2.length);

    expect(owned1.length + owned2.length).toBe(all.length);

    const total11 = await getTotalStocksFromOwner(1);
    let total12 = 0;
    allFiltered1.forEach(({ owned }) => { total12 += owned; });
    let total13 = 0;
    owned1.forEach(({ owned }) => { total13 += owned; });
    expect(total11).toBe(total12);
    expect(total12).toBe(total13);

    const total21 = await getTotalStocksFromOwner(2);
    let total22 = 0;
    allFiltered2.forEach(({ owned }) => { total22 += owned; });
    let total23 = 0;
    owned2.forEach(({ owned }) => { total23 += owned; });
    expect(total21).toBe(total22);
    expect(total22).toBe(total23);
  });

  it('Test getStocksByCompany', async () => {
    const returned = await getStocksByCompany();
    expect(returned).toHaveProperty('length');
    expect(returned[0]).toHaveProperty('ownerId');
    expect(returned[0]).toHaveProperty('companyId');
    expect(returned[0]).toHaveProperty('owned');

    const getByCompany = await getStocksByAttribute('companyId', 22);

    const filteredByCompany = returned.filter(({ companyId }) => companyId === 22);
    let total = 0;
    filteredByCompany.forEach(({ owned }) => { total += owned; });
    expect(total).toBe(getByCompany.length);
  });

  it('Test getStocksFromCompany and getTotalStocksFromCompany', async () => {
    const own = await getStocksFromCompany(22);
    expect(own).toHaveProperty('length');
    expect(own[0]).toHaveProperty('ownerId');
    expect(own[0]).toHaveProperty('companyId');
    expect(own[0]).toHaveProperty('owned');
    let total = 0;
    own.forEach(({ owned }) => { total += owned; });
    expect(total).toBe(22);
    total = await getTotalStocksFromCompany(22);
    expect(total).toBe(22);
  });

  it('Test transferStock', async () => {
    let ownedBuyer = await getStocksFromOwner(1);
    ownedBuyer = ownedBuyer.filter(({ companyId }) => companyId === 22);
    expect(ownedBuyer[0].owned).toBe(11);

    let ownedSeller = await getStocksFromOwner(2);
    ownedSeller = ownedSeller.filter(({ companyId }) => companyId === 22);
    expect(ownedSeller[0].owned).toBe(11);

    let transfer = await transferOwnership(2, 1, 22, 10);
    expect(transfer).toHaveProperty('message', 'Stocks succesfully transferred.');

    ownedBuyer = await getStocksFromOwner(1);
    ownedBuyer = ownedBuyer.filter(({ companyId }) => companyId === 22);
    expect(ownedBuyer[0].owned).toBe(21);

    ownedSeller = await getStocksFromOwner(2);
    ownedSeller = ownedSeller.filter(({ companyId }) => companyId === 22);
    expect(ownedSeller[0].owned).toBe(1);

    transfer = await transferOwnership(1, 2, 22, 10);
    expect(transfer).toHaveProperty('message', 'Stocks succesfully transferred.');
    ownedBuyer = await getStocksFromOwner(1);
    ownedBuyer = ownedBuyer.filter(({ companyId }) => companyId === 22);
    expect(ownedBuyer[0].owned).toBe(11);

    ownedSeller = await getStocksFromOwner(2);
    ownedSeller = ownedSeller.filter(({ companyId }) => companyId === 22);
    expect(ownedSeller[0].owned).toBe(11);
  });

  it('Test Error Handling', async () => {
    await expect(async () => { await transferOwnership(2, 1, 22, 100); })
      .rejects
      .toThrow('Not enough stock to sell.');

    await expect(async () => { await transferOwnership(1, 1, 22, 1); })
      .rejects
      .toThrow('SellerId and buyerId can\'t be equal.');

    await expect(async () => { await getStocksByAttribute('test', 1); })
      .rejects
      .toThrow('Invalid key.');
    await expect(async () => { await getStocksByAttribute('id', -1); })
      .rejects
      .toThrow('Not Found.');

    await expect(async () => { await getStockFromDay(new Date(Date.now())); })
      .rejects
      .toThrow('Unsupported Operation.');
  });
});
