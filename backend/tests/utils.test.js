const path = require('path');
const { sum, sub, mul } = require('../src/utils/arithmetic');

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

describe('Arithmetics Test ', () => {
  it('Arithmetics: Test Sum', () => {
    expect(sum(-1.14, -6.87)).toEqual('-8.01');

    expect(sum(15.96, 12.31)).toEqual('28.27');
    expect(sum(15.96, 12.1)).toEqual('28.06');
    expect(sum(15.96, '12.00000000000000000000001')).toEqual('27.96000000000000000000001');
    expect(sum(15, 12)).toEqual('27');
    expect(sum(15.85, 12)).toEqual('27.85');
    expect(sum(15, 12.85)).toEqual('27.85');
    expect(sum(15.42, 12.31)).toEqual('27.73');
    expect(sum(15.042, 12.31)).toEqual('27.352');
    expect(sum(15.0000042, 12.31)).toEqual('27.3100042');
    expect(sum(-1.14, 6.87)).toEqual('5.73');
    expect(sum(1.14, -6.87)).toEqual('-5.73');
    expect(sum(0, 6.3)).toEqual('6.3');
    expect(sum(6.3, 0)).toEqual('6.3');
  });
  it('Arithmetics: Test Sub', () => {
    expect(sub(-1.14, 6.87)).toEqual('-8.01');

    expect(sub(12.1, 15.82)).toEqual('-3.72');

    expect(sub(15, 12.85)).toEqual('2.15');

    expect(sub(15, 12)).toEqual('3');
    expect(sub(15.85, 12)).toEqual('3.85');
    expect(sub(15.12, 12.31)).toEqual('2.81');
    expect(sub(15.042, 12.31)).toEqual('2.732');
    expect(sub('12,00000000000000000000001', 15.96)).toEqual('-3.95999999999999999999999');

    expect(sub('15,0000042', '12,31')).toEqual('2.6900042');
    expect(sub(-1.14, -6.87)).toEqual('5.73');
    expect(sub(1.14, -6.87)).toEqual('8.01');
    expect(sub(5.2, 5)).toEqual('0.2');
    expect(sub(5.2, 5.2)).toEqual('0');
    expect(sub('5,2345678', '5,23456789')).toEqual('-0.00000009');

    expect(sub(0, 6.3)).toEqual('-6.3');
    expect(sub(6.3, 0)).toEqual('6.3');
  });

  it('Arithmetics: Test Mul', () => {
    expect(mul('-1,14', '-6,87')).toEqual('7.8318');

    expect(mul(15.96, 12.31)).toEqual('196.4676');
    expect(mul(15.96, 12.1)).toEqual('193.116');
    expect(mul(4, 2.5)).toEqual('10');
    // expect(mul(15.96, '12,00000000000000000000001')).toEqual('191.5200000000000000000001596');
    expect(mul(15, 12)).toEqual('180');
    expect(mul(15.85, 12)).toEqual('190.2');
    expect(mul(15, 12.85)).toEqual('192.75');
    expect(mul(15.42, 12.31)).toEqual('189.8202');
    expect(mul(15.042, 12.31)).toEqual('185.16702');
    expect(mul('15,0000042', 12.31)).toEqual('184.650051702');
    expect(mul(-1.14, 6.87)).toEqual('-7.8318');
    expect(mul(1.14, -6.87)).toEqual('-7.8318');
    expect(mul(0, 6.3)).toEqual('0');
    expect(mul(6.3, 0)).toEqual('0');
  });
});
