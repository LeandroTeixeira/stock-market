/* eslint-disable no-undef */
const request = require('supertest');
const sinon = require('sinon');
const userModel = require('../../src/model/users.model');
const companyModel = require('../../src/model/companies.model');
const stockModel = require('../../src/model/stocks.model');
const { sequelize } = require('../../models');
const app = require('../../src/app');
const { mongoDisconnect } = require('../../src/utils/mongo');

jest.mock('../../src/model/companies.model', () => {
  const originalModule = jest.requireActual('../../src/model/companies.model');
  // Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    getStockPriceFactory: async () => {
      const id = 0;
      return async function getStockPrice() {
        return {
          companyMemo:
        {
          id,
          open: '22.84',
          close: '22.5',
          high: '22.84',
          low: '21.74',
          date: '2022-07-05T00:00:00.000Z',
          volume: 100,
        },
        };
      };
    },
  };
});

describe('Investment Controller Test ', () => {
  afterEach(() => {
    sinon.restore();
  });

  beforeAll(() => {

  });

  afterAll(() => {
    mongoDisconnect();
    sequelize.close();
  });

  it('Investment Controller: Get Suggestions Success', async () => {
    sinon.stub(userModel, 'getUsersByTwoAttributes').resolves([{
      id: 1, name: 'Test', email: 'Test', funds: '100',
    }]);
    sinon.stub(userModel, 'getRoot').resolves({ id: 0 });
    sinon.stub(userModel, 'getUsersByAttribute').resolves([{ id: 1, funds: 5000, risk: 0 }]);

    sinon.stub(companyModel, 'getStockPriceFactory').returns();

    const stubGetStocksFromOwner = sinon.stub(stockModel, 'getStocksFromOwner');
    stubGetStocksFromOwner.withArgs(1).resolves(['Owned Stocks']);
    stubGetStocksFromOwner.withArgs(0).resolves([{ companyId: 1, owned: 10 },
      { companyId: 2, owned: 20 }, { companyId: 3, owned: 30 }]);

    sinon.stub(companyModel, 'getCompanies').resolves([
      { id: 1, fullName: 'Agilent Technologies Inc' },
      { id: 2, fullName: 'Alcoa Corp' },
      { id: 3, fullName: 'Ares Acquisition Corp' }]);

    const response = await request(app).post('/login').send({ email: 'Test', password: 'Test' });

    const r = await request(app)
      .get('/investimentos/1')
      .set('Authorization', response.body.token)
      .send({ time: 50 })
      .expect(200);
    expect(r.body).toHaveProperty('suggestions');
    const { suggestions } = r.body;
    expect(suggestions).toHaveProperty('input');
    expect(suggestions.input).toHaveProperty('funds', 5000);
    expect(suggestions.input).toHaveProperty('risk', 0);
    expect(suggestions.input).toHaveProperty('assetsOwned', ['Owned Stocks']);
  });

  it('Investment Controller: Get Suggestion Error', async () => {
    sinon.stub(userModel, 'getUsersByTwoAttributes').resolves([{
      id: 1, name: 'Test', email: 'Test', funds: '100',
    }]);

    const response = await request(app).post('/login').send({ email: 'Test', password: 'Test' });

    await request(app)
      .get('/investimentos/1')
      .set('Authorization', response.body.token)
      .send({})
      .expect(400)
      .expect({ message: 'Error: Time is required and must be number.' });

    await request(app)
      .get('/investimentos/1')
      .set('Authorization', response.body.token)
      .send({ time: -1 })
      .expect(422)
      .expect({ message: 'Error: Time must be higher than zero.' });

    await request(app)
      .get('/investimentos/0')
      .set('Authorization', response.body.token)
      .send({ time: 20 })
      .expect(403)
      .expect({ message: 'Error: Forbidden operation.' });
  });

  it('Investment Controller: Authentication Error', async () => {
    sinon.stub(userModel, 'getUsersByTwoAttributes').resolves([{
      id: 1, name: 'Test', email: 'Test', funds: '100',
    }]);
    const getUserStub = sinon.stub(userModel, 'getUsersByAttribute').resolves([]);
    const response = await request(app).post('/login').send({ email: 'Test', password: 'Test' });

    await request(app)
      .post('/investimentos/comprar')
      .send({})
      .expect(401)
      .expect({ message: 'Error: Token not found.' });

    await request(app)
      .post('/investimentos/comprar')
      .set('Authorization', response.body.token)
      .send({})
      .expect(401)
      .expect({ message: 'Error: Failed to fetch user from token.' });

    getUserStub.throws(new Error('Error 404'));

    await request(app)
      .post('/investimentos/comprar')
      .set('Authorization', response.body.token)
      .send({})
      .expect(401)
      .expect({ message: 'Error 404' });
  });

  it('Investment Controller: Sell Stock Success', async () => {
    sinon.stub(userModel, 'getRoot').resolves({ id: 0 });
    sinon.stub(stockModel, 'transferOwnership').resolves({ message: 'Stocks succesfully transferred.' });
    sinon.stub(userModel, 'getUsersByTwoAttributes').resolves([{
      id: 1, name: 'Test', email: 'Test', funds: '100',
    }]);

    const response = await request(app).post('/login').send({ email: 'Test', password: 'Test' });
    await request(app)
      .post('/investimentos/vender')
      .set('Authorization', response.body.token)
      .send({ codCliente: 1, codAtivo: 1, qtdAtivo: 2 })
      .expect(200)
      .expect({ message: 'Stocks succesfully transferred.' });
  });

  it('Investment Controller: Sell Stock Error', async () => {
    sinon.stub(userModel, 'getRoot').resolves({ id: 0 });
    sinon.stub(userModel, 'getUsersByTwoAttributes').resolves([{
      id: 1, name: 'Test', email: 'Test', funds: '100',
    }]);
    sinon.stub(stockModel, 'transferOwnership').throws(new Error('Error 404'));

    const response = await request(app).post('/login').send({ email: 'Test', password: 'Test' });

    await request(app)
      .post('/investimentos/vender')
      .set('Authorization', response.body.token)
      .send({})
      .expect(400)
      .expect({ message: 'Error: You need to specify the buyer, the assett and the amount.' });

    await request(app)
      .post('/investimentos/vender')
      .set('Authorization', response.body.token)
      .send({ codCliente: 1, codAtivo: 1, qtdAtivo: -2 })
      .expect(422)
      .expect({ message: 'Error: Asset amount must be higher than 0.' });

    await request(app)
      .post('/investimentos/vender')
      .set('Authorization', response.body.token)
      .send({ codCliente: 0, codAtivo: 1, qtdAtivo: 2 })
      .expect(403)
      .expect({ message: 'Error: Forbidden operation.' });

    await request(app)
      .post('/investimentos/vender')
      .set('Authorization', response.body.token)
      .send({ codCliente: 1, codAtivo: 1, qtdAtivo: 2 })
      .expect(400)
      .expect({ message: 'Error 404' });
  });
  it('Investment Controller: Buy Stock Success', async () => {
    sinon.stub(userModel, 'getRoot').resolves({ id: 0 });
    sinon.stub(stockModel, 'transferOwnership').resolves({ message: 'Stocks succesfully transferred.' });
    sinon.stub(userModel, 'getUsersByTwoAttributes').resolves([{
      id: 1, name: 'Test', email: 'Test', funds: '100',
    }]);

    const response = await request(app).post('/login').send({ email: 'Test', password: 'Test' });
    await request(app)
      .post('/investimentos/comprar')
      .set('Authorization', response.body.token)
      .send({ codCliente: 1, codAtivo: 1, qtdAtivo: 2 })
      .expect(200)
      .expect({ message: 'Stocks succesfully transferred.' });
  });

  it('Investment Controller: Buy Stock Error', async () => {
    sinon.stub(userModel, 'getRoot').resolves({ id: 0 });
    sinon.stub(userModel, 'getUsersByTwoAttributes').resolves([{
      id: 1, name: 'Test', email: 'Test', funds: '100',
    }]);
    sinon.stub(stockModel, 'transferOwnership').throws(new Error('Error 404'));

    const response = await request(app).post('/login').send({ email: 'Test', password: 'Test' });

    await request(app)
      .post('/investimentos/comprar')
      .set('Authorization', response.body.token)
      .send({})
      .expect(400)
      .expect({ message: 'Error: You need to specify the buyer, the assett and the amount.' });

    await request(app)
      .post('/investimentos/comprar')
      .set('Authorization', response.body.token)
      .send({ codCliente: 1, codAtivo: 1, qtdAtivo: -2 })
      .expect(422)
      .expect({ message: 'Error: Asset amount must be higher than 0.' });

    await request(app)
      .post('/investimentos/comprar')
      .set('Authorization', response.body.token)
      .send({ codCliente: 0, codAtivo: 1, qtdAtivo: 2 })
      .expect(403)
      .expect({ message: 'Error: Forbidden operation.' });

    await request(app)
      .post('/investimentos/comprar')
      .set('Authorization', response.body.token)
      .send({ codCliente: 1, codAtivo: 1, qtdAtivo: 2 })
      .expect(400)
      .expect({ message: 'Error 404' });
  });
});
