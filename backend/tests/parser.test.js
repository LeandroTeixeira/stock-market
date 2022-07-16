const path = require('path');

const { parseCSV } = require('../src/utils/csvParser');
require('dotenv').config();

/* eslint-disable no-undef */
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
