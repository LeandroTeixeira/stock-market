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
