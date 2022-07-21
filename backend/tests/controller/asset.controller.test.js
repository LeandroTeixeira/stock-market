/* eslint-disable no-undef */
const request = require('supertest');
const sinon = require('sinon');
const userModel = require('../../src/model/users.model');
const companyModel = require('../../src/model/companies.model');
const stockModel = require('../../src/model/stocks.model');
const app = require('../../src/app');
const { mongoDisconnect } = require('../../src/utils/mongo');
const { sequelize } = require('../../models');

jest.mock('../../src/model/companies.model', () => {
  const originalModule = jest.requireActual('../../src/model/companies.model');
  return {
    __esModule: true,
    ...originalModule,
    getStockPriceFactory: async () => async function getStockPrice() {
      return { stockPrice: 25 };
    },
    getTrendingCompaniesFactory: async () => async function getTrends(days) {
      if (days < 15) {
        return {
          trends: {
            bestAbsolute: [],
            worstAbsolute: [],
            bestRelative: [],
            worstRelative: [],
          },
        };
      }

      const error = new Error('Error getting trends');
      throw error;
    },
  };
});

describe('Asset Controller Test ', () => {
  afterEach(() => {
    sinon.restore();
  });
  afterAll(async () => {
    sequelize.close();
    await mongoDisconnect();
  });
  it('Asset Controller: Get Trends Success', async () => {
    await request(app)
      .get('/ativos')
      .send({ days: 5 })
      .expect(200)
      .expect({
        trends: {
          bestAbsolute: [],
          worstAbsolute: [],
          bestRelative: [],
          worstRelative: [],
        },
      });
  });

  it('Asset Controller: Get Trends Failure', async () => {
    await request(app)
      .get('/ativos')
      .expect(400)
      .expect({ message: 'Error getting trends' });
  });

  it('Asset Controller: Get Assets Success', async () => {
    sinon.stub(userModel, 'getUsersByTwoAttributes')
      .resolves([{
        id: 1, name: 'Test', email: 'Test', funds: '100',
      }]);
    sinon.stub(companyModel, 'getCompanyByAttribute').resolves({ id: 1, name: 'AA', fullName: 'Alcoolicos Anonimos' });
    sinon.stub(stockModel, 'getTotalStocksFromCompany').resolves(21);
    sinon.stub(stockModel, 'getStocksFromOwner').resolves([
      {
        ownerId: 1,
        companyId: 2,
        owned: 3,
      },
      {
        ownerId: 1,
        companyId: 3,
        owned: 5,
      },
      {
        ownerId: 1,
        companyId: 4,
        owned: 5,
      }]);

    const response = await request(app).post('/login').send({ email: 'Test', password: 'Test' });

    await request(app)
      .get('/ativos/1')
      .set('Authorization', response.body.token)
      .send({ type: 'asset' })
      .expect(200)
      .expect({
        id: 1, name: 'AA', fullName: 'Alcoolicos Anonimos', amount: 21, value: 25,
      });

    await request(app)
      .get('/ativos/1')
      .set('Authorization', response.body.token)
      .send({ type: 'client' })
      .expect(200)
      .expect([
        {
          userId: 1, companyId: 2, amount: 3, value: 25,
        },
        {
          userId: 1, companyId: 3, amount: 5, value: 25,
        },
        {
          userId: 1, companyId: 4, amount: 5, value: 25,
        },
      ]);
  });

  it('Asset Controller: Get Assets Failure', async () => {
    sinon.stub(userModel, 'getUsersByTwoAttributes')
      .resolves([{
        id: 1, name: 'Test', email: 'Test', funds: '100',
      }]);
    const response = await request(app).post('/login').send({ email: 'Test', password: 'Test' });
    sinon.stub(companyModel, 'getCompanyByAttribute').throws(new Error('Asset Controller Test Error'));
    await request(app)
      .get('/ativos/1')
      .set('Authorization', response.body.token)
      .send()
      .expect(400)
      .expect({ message: 'Error: Type is required' });

    await request(app)
      .get('/ativos/1')
      .set('Authorization', response.body.token)
      .send({ type: 'testing' })
      .expect(422)
      .expect({ message: 'Error: Type must be either asset or client' });

    await request(app)
      .get('/ativos/1')
      .set('Authorization', response.body.token)
      .send({ type: 'asset' })
      .expect(404)
      .expect({ message: 'Asset Controller Test Error' });

    await request(app)
      .get('/ativos/2')
      .set('Authorization', response.body.token)
      .send({ type: 'client' })
      .expect(403)
      .expect({ message: 'Can\'t require assets from other users' });
  });
});
