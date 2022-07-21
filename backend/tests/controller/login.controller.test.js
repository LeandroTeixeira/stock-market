/* eslint-disable no-undef */
const request = require('supertest');
const sinon = require('sinon');
const userModel = require('../../src/model/users.model');
const app = require('../../src/app');
const { mongoDisconnect } = require('../../src/utils/mongo');
const { sequelize } = require('../../models');

describe('Login Controller Test ', () => {
  afterEach(() => {
    sinon.restore();
  });
  afterAll(async () => {
    sequelize.close();
    await mongoDisconnect();
  });
  it('Login Controller: Get Current Version', async () => {
    await request(app)
      .get('/version')
      .expect(200)
      .expect({ version: 'v1' });
  });

  it('Login Controller : Post Login succesfull cases', async () => {
    const getStub = sinon.stub(userModel, 'getUsersByTwoAttributes').resolves(
      [{
        name: 'Leandro Teixeira',
        email: 'leandroteixeira3@gmail.com',
        password: 'kjkszpj',
        isRoot: false,
        funds: '5000',
      }],
    );
    let loggedUser = await request(app)
      .post('/login')
      .send({ email: '123', password: 1234 })
      .expect(200);

    expect(loggedUser.body).toHaveProperty('token');
    expect(loggedUser.body).toHaveProperty('user', {
      name: 'Leandro Teixeira',
      email: 'leandroteixeira3@gmail.com',
      funds: '5000',
    });

    sinon.assert.calledWithExactly(getStub.firstCall, 'email', '123', 'password', 1234);

    loggedUser = await request(app)
      .post('/login')
      .send({ name: '123', password: 1234 })
      .expect(200);
    sinon.assert.calledWithExactly(getStub.secondCall, 'name', '123', 'password', 1234);
  });

  it('Login Controller : Post Login fail cases', async () => {
    sinon.stub(userModel, 'getUsersByTwoAttributes').throws(new Error('Error: 404'));

    await request(app)
      .post('/login')
      .send({})
      .expect(400)
      .expect({ message: 'Error: Password is required.' });

    await request(app)
      .post('/login')
      .send({ password: 1224 })
      .expect(400)
      .expect({ message: 'Error: It\'s required to provide email or name for logging in.' });

    await request(app)
      .post('/login')
      .send({ email: '123', password: 1234 })
      .expect({ message: 'Error: 404' });
  });
});
