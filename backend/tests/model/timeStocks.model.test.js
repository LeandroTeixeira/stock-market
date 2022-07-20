/* eslint-disable no-undef */
const sinon = require('sinon');
const { COMPANY_LIST } = require('../../src/model/companies.model');
const timeStocks = require('../../src/model/timeStocks.model');
const timeStocksModel = require('../../src/model/timeStocks.mongo');
const { mongoConnect, mongoDisconnect } = require('../../src/utils/mongo');

describe('Time Stocks Model Test ', () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });
  afterEach(() => {
    sinon.restore();
  });

  it('Time Stocks: Initialize Stocks', async () => {
    const updateOneStub = sinon.stub(timeStocksModel, 'updateOne').onCall(0).resolves({ upsertedCount: 1 });
    sinon.stub(timeStocksModel, 'findOne').resolves({});
    const { message } = await timeStocks.initializeStocks([1]);
    expect(message).toEqual('Stocks succesfully initialized');
    updateOneStub.onCall(2).resolves({ upsertedCount: 1 });
    sinon.stub(Promise, 'all').throws(new Error('Error'));

    await expect(async () => {
      await timeStocks.initializeStocks([1, 2, 43, 66]);
    })
      .rejects
      .toThrow('Error');
  });

  it('Time Stocks: Get Stock From Day ', async () => {
    const now = new Date(Date.now());
    const day1 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const offset = 20;
    const promiseList = [];

    COMPANY_LIST.forEach(async (company) => {
      promiseList.push(timeStocks.getStockFromDay(company, day1));
    });
    const stocks = await Promise.all(promiseList);
    stocks.forEach((stock, index) => {
      expect(stock).toHaveProperty('companyName', COMPANY_LIST[index].name);
      expect(stock).toHaveProperty('fullName', COMPANY_LIST[index].fullName);

      expect(stock).toHaveProperty('date');
      expect(stock.date.getTime()).toBeGreaterThan(day1.getTime() - offset * 24 * 60 * 60 * 1000);
      expect(stock.date.getTime()).toBeLessThanOrEqual(day1.getTime());
    });
  });

  it('Time Stocks: Get AllStocks From Day ', async () => {
    const day1 = new Date(Date.now());
    const newDay = new Date(day1.getTime() - 500 * 24 * 60 * 60 * 1000);

    const stock = await timeStocks.getAllStocksFromDay(COMPANY_LIST, newDay);
    expect(stock.length).toBe(COMPANY_LIST.length);
    const emptyStocks = stock.filter((data) => data === undefined);
    const nonEmptyStocks = stock.filter((data) => data !== undefined);
    const dataless = COMPANY_LIST.filter(
      (company) => nonEmptyStocks.find((s) => s.companyName === company.name) === undefined,
    );
    console.log('Dataless: ', dataless);
    expect(emptyStocks).toHaveLength(0);
    expect(stock.length).toBe(COMPANY_LIST.length);
    for (let i = 0; i < stock.length; i += 1) {
      expect(stock[i].fullName).toEqual(COMPANY_LIST[i].fullName);
    }
  });
});
