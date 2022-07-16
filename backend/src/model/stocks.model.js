const HIGH = 100;
const LOW = 50;
const OPEN = 75;
const CLOSE = 75;
const LOW_HOUR = 12;
const HIGH_HOUR = 16;

async function getStock(company, day = Date.now()) {
  return 'Unsupported Operation';
  // return {
  //   name: company.name,
  //   fullName: company.fullName,
  //   open: OPEN,
  //   high: HIGH,
  //   low: LOW,
  //   close: CLOSE,
  // };
}

module.exports = {
  getStock,
  HIGH,
  LOW,
  CLOSE,
  OPEN,
  LOW_HOUR,
  HIGH_HOUR,
};
