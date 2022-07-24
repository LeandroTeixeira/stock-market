const http = require('http');
const path = require('path');
const timeStockModel = require('./model/timeStocks.model');
const { parseCSV } = require('./utils/csvParser');

const app = require('./app');
const { mongoConnect } = require('./utils/mongo');
// const { mongoConnect } = require('./services/mongo');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const loadTimeStocks = async (p) => {
  const data = parseCSV(p).map((el, index) => {
    if (index % 3 === 0) return el;
    return undefined;
  }).filter((el) => el !== undefined);
  await timeStockModel.initializeStocks(data);
};

(async function startServer() {
  await mongoConnect();

  await loadTimeStocks(path.join(__dirname, '..', 'dbInitializer.csv'));

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}());
