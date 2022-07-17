const sinon = require('sinon');

const { sequelize } = require('../models');
const {
  getCompanies, COMPANY_LIST, getCompanyByAttribute, getStockPriceFactory, getTrendingCompanies,
} = require('../src/model/companies.model');
const stocks = require('../src/model/stocks.model');

require('dotenv').config();
/* eslint-disable no-undef */
describe('Companies Model Test', () => {
  afterAll(() => {
    sequelize.close();
  });
  afterEach(() => {
    sinon.restore();
  });
  it('Test getAllCompanies', async () => {
    const returned = await getCompanies();
    expect(returned).toEqual(COMPANY_LIST);
  });

  it('Test getCompanyByAttribute', async () => {
    const tester = COMPANY_LIST[2];
    const getById = await getCompanyByAttribute('id', 3);
    expect(getById).toEqual({ id: 3, ...tester });
    const getByName = await getCompanyByAttribute('name', tester.name);
    expect(getByName).toEqual({ id: 3, ...tester });
    const getByFullName = await getCompanyByAttribute('fullName', tester.fullName);
    expect(getByFullName).toEqual({ id: 3, ...tester });
  });

  it('Test error cases', async () => {
    error = await getCompanyByAttribute(3, 3);
    expect(error).toHaveProperty('error', 'Invalid key.');
    error = await getCompanyByAttribute('name', 'babaca de abada');
    expect(error).toHaveProperty('error', 'Not Found.');
  });

  it('Test stock price - Memo', async () => {
    const getStockStub = sinon.stub(stocks, 'getStockFromDay');
    getStockStub.withArgs({ id: 1, ...COMPANY_LIST[0] }).resolves({
      name: COMPANY_LIST[0].name,
      fullName: COMPANY_LIST[0].fullName,
      open: stocks.OPEN,
      high: stocks.HIGH,
      low: stocks.LOW,
      close: stocks.CLOSE,
      lowHour: stocks.LOW_HOUR,
      highHour: stocks.HIGH_HOUR,
    });
    getStockStub.withArgs({ id: 2, ...COMPANY_LIST[1] }).resolves({
      name: COMPANY_LIST[1].name,
      fullName: COMPANY_LIST[1].fullName,
      open: stocks.OPEN,
      high: stocks.HIGH,
      low: stocks.LOW,
      close: stocks.CLOSE,
      lowHour: stocks.LOW_HOUR,
      highHour: stocks.HIGH_HOUR,
    });
    const getStockPrice = await getStockPriceFactory();
    const today = new Date(Date.now());
    today.setHours(0, 0, 0, 0);

    const time = new Date(Date.now());
    time.setHours(11, 0, 0, 0);
    let stock = await getStockPrice({ key: 'name', value: COMPANY_LIST[0].name }, time);

    expect(stock.stockPrice).toBeGreaterThanOrEqual(stocks.LOW);
    expect(stock.stockPrice).toBeLessThanOrEqual(stocks.HIGH);

    expect(stock.memo).toHaveProperty(String(today.valueOf()));
    expect(stock.memo[today.valueOf()]).toHaveProperty('companies');

    expect(stock.messageMemo).toBe('Calculated');

    stock = await getStockPrice({ key: 'name', value: COMPANY_LIST[1].name });

    expect(stock.memo[today.valueOf()].companies[0].name).toBe(COMPANY_LIST[0].name);
    expect(stock.memo[today.valueOf()].companies[0].fullName).toBe(COMPANY_LIST[0].fullName);
    expect(stock.memo[today.valueOf()].companies[1].name).toBe(COMPANY_LIST[1].name);
    expect(stock.memo[today.valueOf()].companies[1].fullName).toBe(COMPANY_LIST[1].fullName);
    expect(stock.messageMemo).toBe('Calculated');

    stock = await getStockPrice({ key: 'name', value: COMPANY_LIST[0].name });
    expect(stock.messageMemo).toBe('Memoized');

    stock = await getStockPrice({ key: 'name', value: COMPANY_LIST[1].name });
    expect(stock.messageMemo).toBe('Memoized');
  });

  it('Test stock price - Time', async () => {
    const getStockStub = sinon.stub(stocks, 'getStockFromDay');
    getStockStub.withArgs({ id: 1, ...COMPANY_LIST[0] }).resolves({
      name: COMPANY_LIST[0].name,
      fullName: COMPANY_LIST[0].fullName,
      open: stocks.OPEN,
      high: stocks.HIGH,
      low: stocks.LOW,
      close: stocks.CLOSE,
      lowHour: stocks.LOW_HOUR,
      highHour: stocks.HIGH_HOUR,
    });
    getStockStub.withArgs({ id: 2, ...COMPANY_LIST[1] }).resolves({
      name: COMPANY_LIST[1].name,
      fullName: COMPANY_LIST[1].fullName,
      open: stocks.OPEN,
      high: stocks.HIGH,
      low: stocks.LOW,
      close: stocks.CLOSE,
      lowHour: stocks.LOW_HOUR,
      highHour: stocks.HIGH_HOUR,
    });
    const getStockPrice = await getStockPriceFactory();
    const [day1, auxDay1] = [new Date('2017-12-12T02:00:00'), new Date('2017-12-12T00:00:00')];
    const [day2, auxDay2] = [new Date(`2018-12-12T${stocks.LOW_HOUR}:00:00`), new Date('2018-12-12T00:00:00')];
    const [day3, auxDay3] = [new Date(`2019-12-12T${stocks.HIGH_HOUR}:00:00`), new Date('2019-12-12T00:00:00')];
    const day4 = new Date('2019-12-12T22:00:00');
    let stock;

    stock = await getStockPrice({ key: 'name', value: COMPANY_LIST[0].name }, day1);
    expect(stock.stockPrice).toBe(stocks.OPEN);
    expect(stock.messageMemo).toBe('Calculated');
    stock = await getStockPrice({ key: 'name', value: COMPANY_LIST[1].name }, day2);
    expect(stock.stockPrice).toBe(stocks.LOW);
    expect(stock.messageMemo).toBe('Calculated');
    stock = await getStockPrice({ key: 'name', value: COMPANY_LIST[1].name }, day3);
    expect(stock.stockPrice).toBe(stocks.HIGH);
    expect(stock.messageMemo).toBe('Calculated');
    stock = await getStockPrice({ key: 'name', value: COMPANY_LIST[0].name }, day4);
    expect(stock.stockPrice).toBe(stocks.CLOSE);
    expect(stock.messageMemo).toBe('Calculated');

    stock = await getStockPrice({ key: 'name', value: COMPANY_LIST[0].name }, day1);
    expect(stock.stockPrice).toBe(stocks.OPEN);
    expect(stock.messageMemo).toBe('Memoized');
    stock = await getStockPrice({ key: 'name', value: COMPANY_LIST[1].name }, day2);
    expect(stock.stockPrice).toBe(stocks.LOW);
    expect(stock.messageMemo).toBe('Memoized');
    stock = await getStockPrice({ key: 'name', value: COMPANY_LIST[0].name }, day3);
    expect(stock.stockPrice).toBe(stocks.HIGH);
    expect(stock.messageMemo).toBe('Memoized');
    stock = await getStockPrice({ key: 'name', value: COMPANY_LIST[1].name }, day4);
    expect(stock.stockPrice).toBe(stocks.CLOSE);
    expect(stock.messageMemo).toBe('Memoized');

    expect(stock.memo).toHaveProperty(String(auxDay1.valueOf()));
    expect(stock.memo).toHaveProperty(String(auxDay2.valueOf()));
    expect(stock.memo).toHaveProperty(String(auxDay3.valueOf()));

    expect(stock.memo[auxDay1.valueOf()]).toHaveProperty('companies');
    expect(stock.memo[auxDay1.valueOf()].companies).toHaveLength(1);
    expect(stock.memo[auxDay1.valueOf()].companies[0].name).toBe(COMPANY_LIST[0].name);
    expect(stock.memo[auxDay1.valueOf()].companies[0].fullName).toBe(COMPANY_LIST[0].fullName);

    expect(stock.memo[auxDay2.valueOf()]).toHaveProperty('companies');
    expect(stock.memo[auxDay2.valueOf()].companies).toHaveLength(1);
    expect(stock.memo[auxDay2.valueOf()].companies[0].name).toBe(COMPANY_LIST[1].name);
    expect(stock.memo[auxDay2.valueOf()].companies[0].fullName).toBe(COMPANY_LIST[1].fullName);

    expect(stock.memo[auxDay3.valueOf()]).toHaveProperty('companies');
    expect(stock.memo[auxDay3.valueOf()].companies).toHaveLength(2);
    expect(stock.memo[auxDay3.valueOf()].companies[0].name).toBe(COMPANY_LIST[1].name);
    expect(stock.memo[auxDay3.valueOf()].companies[0].fullName).toBe(COMPANY_LIST[1].fullName);
    expect(stock.memo[auxDay3.valueOf()].companies[1].name).toBe(COMPANY_LIST[0].name);
    expect(stock.memo[auxDay3.valueOf()].companies[1].fullName).toBe(COMPANY_LIST[0].fullName);
  });
  it('Test stock price - Error', async () => {
    const getStockPrice = await getStockPriceFactory();
    const error = await getStockPrice({ key: 'name', value: 'Babaca de abada' });
    expect(error).toHaveProperty('error', 'Not Found.');
  });

  it('Test trending companies', async () => {
    const trends = await getTrendingCompanies(30, 10);
    expect(trends).toHaveProperty('bestAbsolute');
    expect(trends).toHaveProperty('worstAbsolute');
    expect(trends).toHaveProperty('bestRelative');
    expect(trends).toHaveProperty('worstRelative');

    expect(trends.bestAbsolute).toHaveLength(10);
    expect(trends.worstAbsolute).toHaveLength(10);
    expect(trends.bestRelative).toHaveLength(10);
    expect(trends.worstRelative).toHaveLength(10);

    for (let i = 0; i < trends.bestAbsolute - 1; i += 1) {
      expect(trends.bestAbsolute[i].absoluteVariation)
        .toBeGreaterThanOrEqual(trends.bestAbsolute[i + 1].absoluteVariation);

      for (let j = 0; j < trends.worstAbsolute; j += 1) {
        expect(trends.bestAbsolute[i]).toBeGreaterThanOrEqual(trends.worstAbsolute[j]);
      }
    }
    for (let i = 0; i < trends.bestRelative - 1; i += 1) {
      expect(trends.bestRelative[i].relativeVariation)
        .toBeGreaterThanOrEqual(trends.bestRelative[i + 1].relativeVariation);

      for (let j = 0; j < trends.worstRelative; j += 1) {
        expect(trends.bestRelative[i]).toBeGreaterThanOrEqual(trends.worstRelative[j]);
      }
    }
    for (let i = 0; i < trends.worstAbsolute - 1; i += 1) {
      expect(trends.worstAbsolute[i].absoluteVariation)
        .toBeLessThanOrEqual(trends.worstAbsolute[i + 1].absoluteVariation);
    }
    for (let i = 0; i < trends.worstRelative - 1; i += 1) {
      expect(trends.worstRelative[i].relativeVariation)
        .toBeLessThanOrEqual(trends.worstRelative[i + 1].relativeVariation);
    }
  });
});
