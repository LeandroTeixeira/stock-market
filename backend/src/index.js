const { getCompanies, getCompanyByAttribute } = require('./model/companies.model');

require('dotenv').config();

async function test() {
  const c = await getCompanyByAttribute('id', 1);
  console.log(c);
}

test();
