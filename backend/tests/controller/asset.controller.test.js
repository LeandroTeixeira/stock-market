/* eslint-disable no-undef */
const supertest = require('supertest');
const sinon = require('sinon');
const userModel = require('../../src/model/users.model');
const companyModel = require('../../src/model/companies.model');
const stockModel = require('../../src/model/stocks.model');
const timeStocksModel = require('../../src/model/timeStocks.model');

describe('Asset Controller Test ', () => {
  afterEach(() => {
    sinon.restore();
  });
  it('Test 0', () => {});
});
