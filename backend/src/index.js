const http = require('http');
const path = require('path');
const axios = require('axios');
const timeStockModel = require('./model/timeStocks.model');
const { parseCSV } = require('./utils/csvParser');

const app = require('./app');
const { mongoConnect } = require('./utils/mongo');
// const { mongoConnect } = require('./services/mongo');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const dataPaths = {
  full: path.join(__dirname, 'data', 'stockData.csv'),
  test: path.join(__dirname, '..', 'tests', 'stockData-test.csv'),
};

const loadTimeStocks = async (p) => {
  const data = parseCSV(p).map((el, index) => {
    if (index % 10 === 0) return el;
    return undefined;
  }).filter((el) => el !== undefined);
  await timeStockModel.initializeStocks(data);
};

(async function startServer() {
  await mongoConnect();

  await loadTimeStocks(dataPaths.test);
  // const req = http.request({
  //   host: 'localhost',
  //   path: '/',
  //   port: '5000',
  //   method: 'POST',
  //   body: {
  //     var1: 'Teixeira, ',
  //   },
  // }, (res) => {
  //   let str = '';
  //   res.on('data', (chunk) => {
  //     str += chunk;
  //   });

  //   res.on('end', () => {
  //     console.log(str);
  //   });
  // });
  // req.write('TEixeira, ');
  // req.end();
  // const response = await axios
  //   .post('http://localhost:5000/', {
  //     funds: 2000,
  //     assetsOwned: [{
  //       ownerId: 1,
  //       companyId: 2,
  //       owned: 1,
  //     },
  //     {
  //       ownerId: 1,
  //       companyId: 3,
  //       owned: 1,
  //     },
  //     {
  //       ownerId: 1,
  //       companyId: 4,
  //       owned: 2,
  //     },
  //     {
  //       ownerId: 1,
  //       companyId: 5,
  //       owned: 2,
  //     },
  //     {
  //       ownerId: 1,
  //       companyId: 6,
  //       owned: 3,
  //     },
  //     {
  //       ownerId: 1,
  //       companyId: 7,
  //       owned: 3,
  //     },
  //     {
  //       ownerId: 1,
  //       companyId: 8,
  //       owned: 4,
  //     },
  //     {
  //       ownerId: 1,
  //       companyId: 9,
  //       owned: 4,
  //     },
  //     {
  //       ownerId: 1,
  //       companyId: 10,
  //       owned: 5,
  //     },
  //     {
  //       ownerId: 1,
  //       companyId: 11,
  //       owned: 5,
  //     },
  //     {
  //       ownerId: 1,
  //       companyId: 12,
  //       owned: 6,
  //     },
  //     {
  //       ownerId: 1,
  //       companyId: 13,
  //       owned: 6,
  //     },
  //     {
  //       ownerId: 1,
  //       companyId: 14,
  //       owned: 7,
  //     },
  //     {
  //       ownerId: 1,
  //       companyId: 15,
  //       owned: 7,
  //     },
  //     {
  //       ownerId: 1,
  //       companyId: 16,
  //       owned: 8,
  //     },
  //     {
  //       ownerId: 1,
  //       companyId: 17,
  //       owned: 8,
  //     },
  //     {
  //       ownerId: 1,
  //       companyId: 18,
  //       owned: 9,
  //     },
  //     {
  //       ownerId: 1,
  //       companyId: 19,
  //       owned: 9,
  //     },
  //     {
  //       ownerId: 1,
  //       companyId: 20,
  //       owned: 10,
  //     },
  //     {
  //       ownerId: 1,
  //       companyId: 21,
  //       owned: 10,
  //     },
  //     {
  //       ownerId: 1,
  //       companyId: 22,
  //       owned: 11,
  //     },
  //     {
  //       ownerId: 1,
  //       companyId: 23,
  //       owned: 11,
  //     }],
  //     availableAssets: [{
  //       companyId: 2,
  //       companyName: 'AA',
  //       available: 1,
  //       asset: {
  //         open: '20.302',
  //         close: '20.368',
  //         high: '20.501',
  //         low: '20.013',
  //         date: '2022-07-06T00:00:00.000Z',
  //       },
  //     },
  //     {
  //       companyId: 3,
  //       companyName: 'AAC',
  //       available: 1,
  //       asset: {
  //         open: '22.84',
  //         close: '22.5',
  //         high: '22.84',
  //         low: '21.74',
  //         date: '2022-07-05T00:00:00.000Z',
  //       },
  //     },
  //     {
  //       companyId: 4,
  //       companyName: 'AAL',
  //       available: 2,
  //       asset: {
  //         open: '35.525',
  //         close: '35.525',
  //         high: '35.833',
  //         low: '35.259',
  //         date: '2022-07-18T00:00:00.000Z',
  //       },
  //     },
  //     {
  //       companyId: 5,
  //       companyName: 'AAN',
  //       available: 2,
  //       asset: {
  //         open: '23.65',
  //         close: '23.32',
  //         high: '23.69',
  //         low: '23.32',
  //         date: '2022-07-15T00:00:00.000Z',
  //       },
  //     },
  //     {
  //       companyId: 6,
  //       companyName: 'AAOI',
  //       available: 3,
  //       asset: {
  //         open: '11.71',
  //         close: '11.56',
  //         high: '11.785',
  //         low: '11.451',
  //         date: '2022-07-14T00:00:00.000Z',
  //       },
  //     },
  //     {
  //       companyId: 7,
  //       companyName: 'AAON',
  //       available: 3,
  //       asset: {
  //         open: '28.159',
  //         close: '28.208',
  //         high: '28.486',
  //         low: '27.95',
  //         date: '2022-07-13T00:00:00.000Z',
  //       },
  //     },
  //     {
  //       companyId: 8,
  //       companyName: 'AAPL',
  //       available: 4,
  //       asset: {
  //         open: '94.63',
  //         close: '94.874',
  //         high: '95.148',
  //         low: '94.583',
  //         date: '2022-07-12T00:00:00.000Z',
  //       },
  //     },
  //     {
  //       companyId: 9,
  //       companyName: 'AAT',
  //       available: 4,
  //       asset: {
  //         open: '41.991',
  //         close: '42.263',
  //         high: '42.321',
  //         low: '41.498',
  //         date: '2022-07-11T00:00:00.000Z',
  //       },
  //     },
  //     {
  //       companyId: 10,
  //       companyName: 'AAU',
  //       available: 5,
  //       asset: {
  //         open: '1.53',
  //         close: '1.47',
  //         high: '1.54',
  //         low: '1.43',
  //         date: '2022-07-08T00:00:00.000Z',
  //       },
  //     },
  //     {
  //       companyId: 11,
  //       companyName: 'AB',
  //       available: 5,
  //       asset: {
  //         open: '20.189',
  //         close: '20.189',
  //         high: '20.455',
  //         low: '20.005',
  //         date: '2022-07-07T00:00:00.000Z',
  //       },
  //     },
  //     {
  //       companyId: 12,
  //       companyName: 'ABB',
  //       available: 6,
  //       asset: {
  //         open: '17.818',
  //         close: '17.985',
  //         high: '18.003',
  //         low: '17.687',
  //         date: '2022-07-06T00:00:00.000Z',
  //       },
  //     },
  //     {
  //       companyId: 13,
  //       companyName: 'ABBV',
  //       available: 6,
  //       asset: {
  //         open: '59.229',
  //         close: '58.679',
  //         high: '59.427',
  //         low: '58.537',
  //         date: '2022-07-05T00:00:00.000Z',
  //       },
  //     },
  //     {
  //       companyId: 14,
  //       companyName: 'ABCB',
  //       available: 7,
  //       asset: {
  //         open: '30.86',
  //         close: '30.415',
  //         high: '30.87',
  //         low: '30.405',
  //         date: '2022-07-18T00:00:00.000Z',
  //       },
  //     },
  //     {
  //       companyId: 15,
  //       companyName: 'ABC',
  //       available: 7,
  //       asset: {
  //         open: '84.448',
  //         close: '83.754',
  //         high: '84.703',
  //         low: '83.135',
  //         date: '2022-07-15T00:00:00.000Z',
  //       },
  //     },
  //     {
  //       companyId: 16,
  //       companyName: 'ABEO',
  //       available: 8,
  //       asset: {
  //         open: '2.44',
  //         close: '2.37',
  //         high: '2.4401',
  //         low: '2.31',
  //         date: '2022-07-14T00:00:00.000Z',
  //       },
  //     },
  //     {
  //       companyId: 17,
  //       companyName: 'ABEV',
  //       available: 8,
  //       asset: {
  //         open: '5.6113',
  //         close: '5.6113',
  //         high: '5.6307',
  //         low: '5.563',
  //         date: '2022-07-13T00:00:00.000Z',
  //       },
  //     },
  //     {
  //       companyId: 18,
  //       companyName: 'ABG',
  //       available: 9,
  //       asset: {
  //         open: '56.62',
  //         close: '56.69',
  //         high: '57.32',
  //         low: '56.34',
  //         date: '2022-07-12T00:00:00.000Z',
  //       },
  //     },
  //     {
  //       companyId: 19,
  //       companyName: 'ABIO',
  //       available: 9,
  //       asset: {
  //         open: '3.14',
  //         close: '3.1',
  //         high: '3.21',
  //         low: '3.01',
  //         date: '2022-07-11T00:00:00.000Z',
  //       },
  //     },
  //     {
  //       companyId: 20,
  //       companyName: 'ABM',
  //       available: 10,
  //       asset: {
  //         open: '35.802',
  //         close: '36.076',
  //         high: '36.321',
  //         low: '35.802',
  //         date: '2022-07-08T00:00:00.000Z',
  //       },
  //     },
  //     {
  //       companyId: 21,
  //       companyName: 'ABMD',
  //       available: 10,
  //       asset: {
  //         open: '111.96',
  //         close: '113.53',
  //         high: '114.5',
  //         low: '111.14',
  //         date: '2022-07-07T00:00:00.000Z',
  //       },
  //     },
  //     {
  //       companyId: 22,
  //       companyName: 'ABR',
  //       available: 11,
  //       asset: {
  //         open: '6.3602',
  //         close: '6.3781',
  //         high: '6.405',
  //         low: '6.2707',
  //         date: '2022-07-06T00:00:00.000Z',
  //       },
  //     },
  //     {
  //       companyId: 23,
  //       companyName: 'ABT',
  //       available: 11,
  //       asset: {
  //         open: '37.935',
  //         close: '38.06',
  //         high: '38.177',
  //         low: '37.838',
  //         date: '2022-07-05T00:00:00.000Z',
  //       },
  //     }],
  //     risk: 0,
  //     time: 20,
  //   });
  // console.log(response.status);
  // console.log(response.data.body.suggestions.suggestedBuy);
  // .then((res) => {
  //   console.log(`statusCode: ${res.status}`);
  //   console.log(res.data);
  // })
  // .catch((error) => {
  //   console.error(error);
  // });
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}());
