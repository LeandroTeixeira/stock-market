const http = require('http');
const path = require('path');
const timeStockModel = require('./model/timeStocks.model');
const { parseCSV } = require('./utils/csvParser');

const app = require('./app');
const { mongoConnect } = require('./utils/mongo');
const { COMPANY_LIST } = require('./model/companies.model');
// const { mongoConnect } = require('./services/mongo');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const dataPaths = {
  full: path.join(__dirname, 'data', 'stockData.csv'),
  test: path.join(__dirname, '..', 'tests', 'stockData-test.csv'),
};

const loadTimeStocks = async (path) => {
  const data = parseCSV(path).map((el, index) => {
    if (index % 10 === 0) return el;
  }).filter((el) => el !== undefined);
  await timeStockModel.initializeStocks(data);
};

(async function startServer() {
  await mongoConnect();

  await loadTimeStocks(dataPaths.test);
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}());
