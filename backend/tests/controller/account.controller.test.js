/* eslint-disable no-undef */
const request = require('supertest');
const sinon = require('sinon');
const userModel = require('../../src/model/users.model');
const app = require('../../src/app');
const { mongoDisconnect } = require('../../src/utils/mongo');
const { sequelize } = require('../../models');

describe('Account Controller Test ', () => {
  afterEach(() => {
    sinon.restore();
  });
  afterAll(async () => {
    sequelize.close();
    await mongoDisconnect();
  });
  it('Account Controller: Delete Error', async () => {
    sinon.stub(userModel, 'getUsersByAttribute')
      .withArgs('id', 1).resolves([{
        id: 1, name: 'Test', email: 'Test', funds: '100', risk: 0,
      }]);
    sinon.stub(userModel, 'getUsersByTwoAttributes')
      .resolves([{
        id: 1, name: 'Test', email: 'Test', funds: '100',
      }]);

    sinon.stub(userModel, 'deleteUserById').throws(new Error('Error deleting user'));

    sinon.stub(userModel, 'getRoot')
      .onFirstCall()
      .resolves({ id: 0 })
      .onSecondCall()
      .resolves({ id: 1 })
      .onThirdCall()
      .resolves({ id: 1 });

    const response = await request(app).post('/login').send({ email: 'Test', password: 'Test' });

    await request(app)
      .delete('/account/1')
      .set('Authorization', response.body.token)
      .send()
      .expect(403)
      .expect({ message: 'Error: Forbidden' });

    await request(app)
      .delete('/account/1')
      .set('Authorization', response.body.token)
      .send()
      .expect(403)
      .expect({ message: 'Error: Can\'t delete root user' });

    await request(app)
      .delete('/account/2')
      .set('Authorization', response.body.token)
      .send()
      .expect(404)
      .expect({ message: 'Error deleting user' });
  });

  it('Account Controller: Delete Success', async () => {
    sinon.stub(userModel, 'getUsersByAttribute')
      .withArgs('id', 1).resolves([{
        id: 1, name: 'Test', email: 'Test', funds: '100', risk: 0,
      }]);
    sinon.stub(userModel, 'getUsersByTwoAttributes')
      .resolves([{
        id: 1, name: 'Test', email: 'Test', funds: '100',
      }]);

    sinon.stub(userModel, 'deleteUserById').resolves({
      user: {
        id: 1, name: 'Test2', password: '234', email: 'Test2', funds: '1000', risk: 0,
      },
      message: 'User succesfully deleted.',
    });

    sinon.stub(userModel, 'getRoot').resolves({ id: 1 });

    const response = await request(app).post('/login').send({ email: 'Test', password: 'Test' });

    await request(app)
      .delete('/account/2')
      .set('Authorization', response.body.token)
      .send()
      .expect(200)
      .expect({
        user: {
          id: 1, name: 'Test2', password: '234', email: 'Test2', funds: '1000', risk: 0,
        },
        message: 'User succesfully deleted.',
      });
  });

  it('Account Controller: Get Error', async () => {
    const getUserStub = sinon.stub(userModel, 'getUsersByAttribute')
      .withArgs('id', 1).resolves([{
        id: 1, name: 'Test', email: 'Test', funds: '100', risk: 0,
      }]);
    sinon.stub(userModel, 'getUsersByTwoAttributes')
      .resolves([{
        id: 1, name: 'Test', email: 'Test', funds: '100',
      }]);
    getUserStub.withArgs('id', 3).throws(new Error('Account Controller : Get Error'));
    const response = await request(app).post('/login').send({ email: 'Test', password: 'Test' });
    await request(app)
      .get('/account/3')
      .set('Authorization', response.body.token)
      .send()
      .expect(404)
      .expect({ message: 'Account Controller : Get Error' });
  });

  it('Account Controller: Get Success', async () => {
    sinon.stub(userModel, 'getUsersByTwoAttributes')
      .resolves([{
        id: 1, name: 'Test', email: 'Test', funds: '100',
      }]);
    const getUserStub = sinon.stub(userModel, 'getUsersByAttribute')
      .withArgs('id', 1).resolves([{
        id: 1, name: 'Test', email: 'Test', funds: '100', risk: 0,
      }]);
    getUserStub.withArgs('id', 2).resolves([{
      id: 2, name: 'Test2', email: 'Test2', funds: '200', risk: 1,
    }]);

    const token = await request(app).post('/login').send({ email: 'Test', password: 'Test' });

    let response = await request(app)
      .get('/account/1')
      .set('Authorization', token.body.token)
      .send()
      .expect(200);

    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toEqual({
      name: 'Test',
      email: 'Test',
      risk: 0,
      funds: '100',
    });
    response = await request(app)
      .get('/account/2')
      .set('Authorization', token.body.token)
      .send()
      .expect(200);

    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toEqual({
      name: 'Test2',
      email: 'Test2',
    });
  });

  it('Account Controller: Withdraw Success', async () => {
    sinon.stub(userModel, 'withdraw').resolves({
      name: 'Test',
      email: 'test',
      risk: 0,
      funds: 1,
    });
    sinon.stub(userModel, 'getUsersByTwoAttributes')
      .resolves([{
        id: 1, name: 'Test', email: 'Test', funds: '100',
      }]);
    const response = await request(app).post('/login').send({ email: 'Test', password: 'Test' });

    await request(app)
      .post('/account/saque')
      .set('Authorization', response.body.token)
      .send({ valor: 2000 })
      .expect(200)
      .expect({
        user: {
          name: 'Test',
          email: 'test',
          risk: 0,
          funds: 1,
        },
      });
  });

  it('Account Controller: Withdraw Error', async () => {
    sinon.stub(userModel, 'withdraw').throws(new Error('Error: Insufficient funds.'));
    sinon.stub(userModel, 'getUsersByTwoAttributes')
      .resolves([{
        id: 1, name: 'Test', email: 'Test', funds: '100',
      }]);
    const response = await request(app).post('/login').send({ email: 'Test', password: 'Test' });
    await request(app)
      .post('/account/saque')
      .set('Authorization', response.body.token)
      .send({ valor: -1 })
      .expect(422)
      .expect({ message: 'Error: Value is required and must be higher than 0' });

    await request(app)
      .post('/account/saque')
      .set('Authorization', response.body.token)
      .send()
      .expect(422)
      .expect({ message: 'Error: Value is required and must be higher than 0' });

    await request(app)
      .post('/account/saque')
      .set('Authorization', response.body.token)
      .send({ valor: 1000 })
      .expect(400)
      .expect({ message: 'Error: Insufficient funds.' });
  });

  it('Account Controller: Deposit Success', async () => {
    sinon.stub(userModel, 'deposit').resolves({
      name: 'Test',
      email: 'test',
      risk: 0,
      funds: 1,
    });
    sinon.stub(userModel, 'getUsersByTwoAttributes')
      .resolves([{
        id: 1, name: 'Test', email: 'Test', funds: '100',
      }]);
    const response = await request(app).post('/login').send({ email: 'Test', password: 'Test' });

    await request(app)
      .post('/account/deposito')
      .set('Authorization', response.body.token)
      .send({ valor: 2000 })
      .expect(200)
      .expect({
        user: {
          name: 'Test',
          email: 'test',
          risk: 0,
          funds: 1,
        },
      });
  });
  it('Account Controller: Deposit Error', async () => {
    sinon.stub(userModel, 'deposit').throws(new Error('Deposit error.'));

    sinon.stub(userModel, 'getUsersByTwoAttributes')
      .resolves([{
        id: 1, name: 'Test', email: 'Test', funds: '100',
      }]);
    const response = await request(app).post('/login').send({ email: 'Test', password: 'Test' });
    await request(app)
      .post('/account/deposito')
      .set('Authorization', response.body.token)
      .send({ valor: -1 })
      .expect(422)
      .expect({ message: 'Error: Value is required and must be higher than 0' });

    await request(app)
      .post('/account/deposito')
      .set('Authorization', response.body.token)
      .send()
      .expect(422)
      .expect({ message: 'Error: Value is required and must be higher than 0' });

    await request(app)
      .post('/account/deposito')
      .set('Authorization', response.body.token)
      .send({ valor: 1000 })
      .expect(400)
      .expect({ message: 'Deposit error.' });
  });

  it('Account Controller : Save Account Success', async () => {
    sinon.stub(userModel, 'getUsersByTwoAttributes')
      .resolves([{
        id: 1, name: 'Test', email: 'Test', funds: '100',
      }]);

    sinon.stub(userModel, 'getUsersByAttribute')
      .withArgs('email', 'unregistered@gm.co')
      .throws(new Error('Not registered'));

    const returnValue = {
      user: {
        id: 2,
        name: 'Leo',
        email: 'worked',
        password: 'workedP',
        risk: 0,
        funds: 2000,
      },
    };
    sinon.stub(userModel, 'upsertUser').resolves({
      user: {
        id: 2,
        name: 'Leo',
        email: 'worked',
        password: 'workedP',
        risk: 0,
        funds: 2000,
      },
    });

    const response = await request(app).post('/login').send({ email: 'Test', password: 'Test' });
    await request(app)
      .post('/account')
      .set('Authorization', response.body.token)
      .send({
        email: 'unregistered@gm.co', password: '1asdasd23', name: 123, risk: 0,
      })
      .expect(returnValue);
  });

  it('Account Controller : Save Account Error', async () => {
    sinon.stub(userModel, 'getUsersByTwoAttributes').resolves([{
      id: 1, name: 'Test', email: 'Test', funds: '100',
    }]);
    const getUserStub = sinon.stub(userModel, 'getUsersByAttribute')
      .withArgs('email', 'registered@gn.co').resolves({});
    getUserStub.withArgs('email', 'unregistered@gm.co').throws(new Error('Not registered'));
    sinon.stub(userModel, 'upsertUser').throws(new Error('Failed Upsert'));
    const response = await request(app).post('/login').send({ email: 'Test', password: 'Test' });

    await request(app)
      .post('/account')
      .set('Authorization', response.body.token)
      .send({})
      .expect(400)
      .expect({ message: 'Error: Email, name and password are required fields.' });

    await request(app)
      .post('/account')
      .set('Authorization', response.body.token)
      .send({ email: 123, password: 123, name: 123 })
      .expect(422)
      .expect({ message: 'Error: Email and password must be strings.' });

    await request(app)
      .post('/account')
      .set('Authorization', response.body.token)
      .send({
        email: '123', password: '123', name: 123, risk: 2,
      })
      .expect(422)
      .expect({ message: 'Error: Risk must be either 0 or 1.' });

    await request(app)
      .post('/account')
      .set('Authorization', response.body.token)
      .send({
        email: 'leo@gmai.', password: '123', name: 123, risk: 0,
      })
      .expect(422)
      .expect({ message: 'Error: Wrong email format.' });

    await request(app)
      .post('/account')
      .set('Authorization', response.body.token)
      .send({
        email: 'registered@gm.co', password: '124aba53', name: 123, risk: 0,
      })
      .expect(409)
      .expect({ message: 'Error: email already registered.' });

    await request(app)
      .post('/account')
      .set('Authorization', response.body.token)
      .send({
        email: 'unregistered@gm.co', password: '1as3', name: 123, risk: 0,
      })
      .expect(422)
      .expect({ message: 'Error: Pasword must have at least 6 characters.' });

    await request(app)
      .post('/account')
      .set('Authorization', response.body.token)
      .send({
        email: 'unregistered@gm.co', password: '1asdasd23', name: 123, risk: 0,
      })
      .expect(400)
      .expect({ message: 'Failed Upsert' });
  });

  it('Account Controller : Update Success', async () => {
    sinon.stub(userModel, 'getUsersByTwoAttributes')
      .resolves([{
        id: 1, name: 'Test', email: 'Test', funds: '100',
      }]);

    const returnValue = {
      user: {
        id: 2,
        name: 'Leo',
        email: 'worked',
        password: 'workedP',
        risk: 0,
        funds: 2000,
      },
    };
    sinon.stub(userModel, 'upsertUser').resolves({
      user: {
        id: 2,
        name: 'Leo',
        email: 'worked',
        password: 'workedP',
        risk: 0,
        funds: 2000,
      },
    });

    const response = await request(app).post('/login').send({ email: 'Test', password: 'Test' });
    await request(app)
      .put('/account/1')
      .set('Authorization', response.body.token)
      .send({
        email: 'unregistered@gm.co', password: '1asdasd23', name: 123, risk: 0,
      })
      .expect(returnValue);
  });

  it('Account Controller : Update Error', async () => {
    sinon.stub(userModel, 'getUsersByTwoAttributes').resolves([{
      id: 1, name: 'Test', email: 'Test', funds: '100',
    }]);
    const getUserStub = sinon.stub(userModel, 'getUsersByAttribute')
      .resolves([{
        id: 1, name: 'Test', email: 'Test', funds: '100',
      }]);
    getUserStub.withArgs('email', 'unregistered@gm.co').throws(new Error('Not registered'));
    sinon.stub(userModel, 'upsertUser').throws(new Error('Failed Upsert'));
    const response = await request(app).post('/login').send({ email: 'Test', password: 'Test' });
    await request(app)
      .put('/account/1')
      .set('Authorization', response.body.token)
      .send({})
      .expect(400)
      .expect({ message: 'Error: Email and password are required fields.' });

    await request(app)
      .put('/account/1')
      .set('Authorization', response.body.token)
      .send({ email: 123, password: 123, name: 123 })
      .expect(422)
      .expect({ message: 'Error: Email and password must be strings.' });

    await request(app)
      .put('/account/1')
      .set('Authorization', response.body.token)
      .send({
        email: '123', password: '123', name: 123, risk: 2,
      })
      .expect(422)
      .expect({ message: 'Error: Risk must be either 0 or 1.' });

    await request(app)
      .put('/account/1')
      .set('Authorization', response.body.token)
      .send({
        email: 'leo@gmai.', password: '123', name: 123, risk: 0,
      })
      .expect(422)
      .expect({ message: 'Error: Wrong email format.' });

    await request(app)
      .put('/account/2')
      .set('Authorization', response.body.token)
      .send({
        email: 'registered@gm.co', password: '124aba53', name: 123, risk: 0,
      })
      .expect(403)
      .expect({ message: 'Error: Forbidden operation.' });

    await request(app)
      .put('/account/1')
      .set('Authorization', response.body.token)
      .send({
        email: 'unregistered@gm.co', password: '1as3', name: 123, risk: 0,
      })
      .expect(422)
      .expect({ message: 'Error: Pasword must have at least 6 characters.' });

    await request(app)
      .put('/account/1')
      .set('Authorization', response.body.token)
      .send({
        email: 'unregistered@gm.co', password: '1asdasd23', name: 123, risk: 0,
      })
      .expect(400)
      .expect({ message: 'Failed Upsert' });
  });
});
