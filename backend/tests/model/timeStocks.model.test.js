/* eslint-disable no-undef */
const sinon = require('sinon');
const axios = require('axios');
const { COMPANY_LIST } = require('../../src/model/companies.model');
const timeStocks = require('../../src/model/timeStocks.model');
const timeStocksModel = require('../../src/model/timeStocks.mongo');
const { mongoConnect, mongoDisconnect } = require('../../src/utils/mongo');
const { sequelize } = require('../../models');

describe('Time Stocks Model Test ', () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    sequelize.close();
    await mongoDisconnect();
  });
  afterEach(() => {
    sinon.restore();
  });

  it('Time Stocks: Get Suggestions', async () => {
    const axiosStub = sinon.stub(axios, 'post');
    axiosStub.onFirstCall().resolves({ data: { body: 'Error processing data' } });
    axiosStub.onSecondCall().resolves({
      data: {
        body: {
          suggestions: {
            suggestedBuy: {
              buyable: 175,
              companyName: 'Acer Therapeutics Inc',
              currentPrice: '9.449',
              expectedPrice: '12.493',
              expectedProfit: '532.752 total',
              id: 4,
            },
            suggestedSell: [
              {
                companyName: 'Apple',
                currentPrice: '148.751',
                expectedPrice: '134.030',
                expectedProfit: '14.721 per unit',
                id: 1,
              },
              {
                companyName: 'Ambev',
                currentPrice: '5.938',
                expectedPrice: '5.492',
                expectedProfit: '0.446 per unit',
                id: 2,
              },
              {
                companyName: 'Abbott Laboratories',
                currentPrice: '48.795',
                expectedPrice: '43.677',
                expectedProfit: '5.118 per unit',
                id: 3,
              },
              {
                companyName: 'Arthur J. Gallagher & Co.',
                currentPrice: '57.926',
                expectedPrice: '53.850',
                expectedProfit: '4.076 per unit',
                id: 11,
              },
              {
                companyName: 'American Express',
                currentPrice: '84.205',
                expectedPrice: '75.210',
                expectedProfit: '8.995 per unit',
                id: 15,
              },
            ],
          },
        },
      },
    });
    await expect(async () => {
      await timeStocks.getSuggestions(1, 2, 3, 4, 5);
    })
      .rejects
      .toThrow('Error processing data');

    const response = await timeStocks.getSuggestions(1, 2, 3, 4, 5);
    expect(response).toEqual({
      suggestions: {
        suggestedBuy: {
          buyable: 175,
          companyName: 'Acer Therapeutics Inc',
          currentPrice: '9.449',
          expectedPrice: '12.493',
          expectedProfit: '532.752 total',
          id: 4,
        },
        suggestedSell: [
          {
            companyName: 'Apple',
            currentPrice: '148.751',
            expectedPrice: '134.030',
            expectedProfit: '14.721 per unit',
            id: 1,
          },
          {
            companyName: 'Ambev',
            currentPrice: '5.938',
            expectedPrice: '5.492',
            expectedProfit: '0.446 per unit',
            id: 2,
          },
          {
            companyName: 'Abbott Laboratories',
            currentPrice: '48.795',
            expectedPrice: '43.677',
            expectedProfit: '5.118 per unit',
            id: 3,
          },
          {
            companyName: 'Arthur J. Gallagher & Co.',
            currentPrice: '57.926',
            expectedPrice: '53.850',
            expectedProfit: '4.076 per unit',
            id: 11,
          },
          {
            companyName: 'American Express',
            currentPrice: '84.205',
            expectedPrice: '75.210',
            expectedProfit: '8.995 per unit',
            id: 15,
          },
        ],
      },
    });
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
    // eslint-disable-next-line no-console
    console.log('Dataless: ', dataless);
    expect(emptyStocks).toHaveLength(0);
    expect(stock.length).toBe(COMPANY_LIST.length);
    for (let i = 0; i < stock.length; i += 1) {
      expect(stock[i].fullName).toEqual(COMPANY_LIST[i].fullName);
    }
  });
});
