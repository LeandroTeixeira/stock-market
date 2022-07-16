const { get } = require('http');
const path = require('path');
const { getCompanies, COMPANY_LIST, getCompanyByAttribute } = require('../src/model/companies.model');
const { parseCSV } = require('../src/utils/csvParser');

/* eslint-disable no-undef */
describe('Model Test', () => {
  describe('Parser Test', () => {
    it('Test if it successfully parses the file', () => {
      const stockData = parseCSV(path.join(__dirname, 'stockData-test.csv'));
      expect(stockData.length).toBeGreaterThanOrEqual(1000);
      const data = stockData[0];
      expect(data).toHaveProperty('Company');
      expect(data).toHaveProperty('FullName');
      expect(data).toHaveProperty('Open');
      expect(data).toHaveProperty('Close');
      expect(data).toHaveProperty('Volume');
      expect(data).toHaveProperty('High');
      expect(data).toHaveProperty('Low');
    });
    it('Test error handling', () => {
      const wrongPath = 'sstockData-test.csv';
      let error = parseCSV(wrongPath);
      expect(error).toHaveProperty('error', `ENOENT: no such file or directory, open '${wrongPath}'`);
      error = parseCSV(25);
      expect(error).toHaveProperty('error', 'Path must be string');
    });
  });
  describe('Companies Model Test', () => {
    it('Test if all companies are succesfully returned', async () => {
      const returned = await getCompanies();
      expect(returned).toEqual(COMPANY_LIST);
    });
    it('Test if the right companies are returned', async () => {
      const tester = COMPANY_LIST[2];
      const getById = await getCompanyByAttribute('id', 3);
      expect(getById).toEqual(tester);
      const getByName = await getCompanyByAttribute('name', tester.name);
      expect(getByName).toEqual(tester);
      const getByFullName = await getCompanyByAttribute('fullName', tester.fullName);
      expect(getByFullName).toEqual(tester);
    });
    it('Test if it returns error if the attribute does not exist', async () => {
      const error = await getCompanyByAttribute(3, 3);
      expect(error).toHaveProperty('error', 'Invalid key.');
    });
  });
});
