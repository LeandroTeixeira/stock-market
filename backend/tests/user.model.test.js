const sinon = require('sinon');

const { sequelize } = require('../models');
const usersModel = require('../src/model/users.model');

require('dotenv').config();
/* eslint-disable no-undef */
describe('Stocks Model Test', () => {
  afterAll(() => {
    sequelize.close();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('GetUsersByAttribute', async () => {
    let users = await usersModel.getUsersByAttribute('email', 'leandroteixeira3@gmail.com');
    expect(users.length).toBe(1);
    expect(users[0].name).toEqual('Leandro Teixeira');
    users = await usersModel.getUsersByAttribute('email', 'root');
    expect(users.length).toBe(1);
    expect(users[0].name).toEqual('root');
    expect(users[0].funds).toEqual(0);
  });

  it('GetUsersByTwoAttributes', async () => {
    let users = await usersModel.getUsersByTwoAttributes('email', 'leandroteixeira3@gmail.com', 'password', 'kjkszpj1');
    expect(users.length).toBe(1);
    expect(users[0].name).toEqual('Leandro Teixeira');
    users = await usersModel.getUsersByTwoAttributes('email', 'root', 'password', process.env.MYSQL_DEV_PASSWORD);
    expect(users.length).toBe(1);
    expect(users[0].name).toEqual('root');
    expect(users[0].funds).toEqual(0);
  });

  it('Upsert and Delete User', async () => {
    const user = await usersModel.getUsersByAttribute('email', 'leandroteixeira3@gmail.com');
    user[0].funds = 7500;
    let newUser = await usersModel.upsertUser(user[0]);
    expect(newUser).toHaveProperty('message', 'User succesfully updated.');
    expect(newUser).toHaveProperty('user');
    expect(newUser.user.name).toEqual('Leandro Teixeira');
    expect(newUser.user.email).toEqual('leandroteixeira3@gmail.com');
    expect(newUser.user.funds).toBe(7500);
    newUser.user.funds = 5000;

    newUser = await usersModel.upsertUser(newUser.user.dataValues);
    expect(newUser.user.funds).toBe(5000);

    newUser = await usersModel.upsertUser({
      name: 'TEST123',
      email: 'TEST123@gmail.com',
      password: 'TEST12345',
      funds: 2000,
    });
    expect(newUser).toHaveProperty('message', 'User succesfully created.');
    expect(newUser).toHaveProperty('user');
    expect(newUser.user.name).toEqual('TEST123');
    expect(newUser.user.email).toEqual('TEST123@gmail.com');
    expect(newUser.user.isRoot).toBe(false);
    expect(newUser.user.funds).toBe(2000);

    const response = await usersModel.deleteUserById(newUser.user.id);
    expect(response).toHaveProperty('message');

    expect(response.message).toEqual('User succesfully deleted.');
  });

  it('Transfer Funds', async () => {
    seller = await usersModel.getUsersByAttribute('id', 1);
    buyer = await usersModel.getUsersByAttribute('id', 2);
    const fundsSeller = seller[0].funds;
    const fundsBuyer = buyer[0].funds;

    expect(fundsSeller).toBe(0);
    expect(fundsBuyer).toBe(5000);

    let response = await usersModel.transferFunds(buyer[0].id, seller[0].id, 2000);
    expect(response).toHaveProperty('message');
    expect(response.message).toBe('Funds were succesfully transferred.');

    seller = await usersModel.getUsersByAttribute('id', 1);
    buyer = await usersModel.getUsersByAttribute('id', 2);
    expect(seller[0].funds - fundsSeller).toBe(2000);
    expect(fundsBuyer - buyer[0].funds).toBe(2000);

    response = await usersModel.transferFunds(seller[0].id, buyer[0].id, 2000);
    expect(response).toHaveProperty('message');
    expect(response.message).toBe('Funds were succesfully transferred.');
    seller = await usersModel.getUsersByAttribute('id', 1);
    buyer = await usersModel.getUsersByAttribute('id', 2);
    expect(seller[0].funds).toBe(fundsSeller);
    expect(buyer[0].funds).toBe(fundsBuyer);
  });

  it('Deposit and Withdraw', async () => {
    let user = await usersModel.getUsersByAttribute('id', 2);
    const { funds } = user[0];
    expect(funds).toBe(5000);
    await usersModel.withdraw({ key: 'id', value: 2 }, 5000);
    user = await usersModel.getUsersByAttribute('id', 2);
    expect(user[0].funds).toBe(0);

    await usersModel.deposit({ key: 'id', value: 2 }, 5000);
    user = await usersModel.getUsersByAttribute('id', 2);
    expect(user[0].funds).toBe(5000);
  });

  it('Error handling', async () => {
    await expect(async () => {
      await usersModel.getUsersByAttribute('id', -1);
    })
      .rejects
      .toThrow('Not Found.');

    await expect(async () => {
      await usersModel.getUsersByTwoAttributes('email', 'leandroteixeira3@gmail.com', 'password', '-1232');
    })
      .rejects
      .toThrow('Not Found.');

    await expect(async () => {
      await usersModel.getUsersByTwoAttributes('email', 'leandroteixeira3@gmail.com', 'passwtord', '-1232');
    })
      .rejects
      .toThrow('Invalid keys.');

    await expect(async () => {
      await usersModel.getUsersByAttribute('passwtord', '-1232');
    })
      .rejects
      .toThrow('Invalid key.');
    await expect(async () => {
      await usersModel.withdraw({ key: 'id', value: 2 }, 10000);
    })
      .rejects
      .toThrow('Insufficient funds.');
  });
});
