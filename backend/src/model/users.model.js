const { Op } = require('sequelize');
const { User, Sequelize } = require('../../models/index');
const { sum, sub } = require('../utils/arithmetic');

const defaultAttributes = ['id', 'name', 'email', 'password', 'isRoot', 'risk', 'funds'];
async function getUsersByAttribute(key, value) {
  if (Object.keys(User.rawAttributes).find((k) => k === key)) {
    const result = await User.findAll({
      attributes: defaultAttributes,
      where: {
        [key]: [value],
      },
    });
    if (result.length === 0) throw new Error('Not Found.');
    return result;
  }
  throw new Error('Invalid key.');
}
async function getUsersByTwoAttributes(key1, value1, key2, value2) {
  const keys = Object.keys(User.rawAttributes);
  if (keys.find((k) => k === key1) && keys.find((k) => k === key2)) {
    const result = await User.findAll({
      attributes: defaultAttributes,
      where: {
        [Op.and]: [{ [key1]: [value1] }, { [key2]: [value2] }],
      },
    });
    if (result.length === 0) throw new Error('Not Found.');
    return result;
  }
  throw new Error('Invalid keys.');
}

async function upsertUser(user) {
  const defaultUser = {
    isRoot: false,
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    funds: 0,
  };
  const [newUser, created] = await User.upsert({ ...defaultUser, ...user });
  if (created) return { user: newUser, message: 'User succesfully created.' };
  return { user: newUser, message: 'User succesfully updated.' };
}

async function deposit({ key, value }, qty) {
  const user = await getUsersByAttribute(key, value);
  user[0].funds = sum(qty, user[0].funds);
  const updatedUser = await upsertUser(user[0]);
  return updatedUser.user;
}

async function withdraw({ key, value }, qty) {
  const user = await getUsersByAttribute(key, value);
  if (Number(user[0].funds) < qty) throw new Error('Insufficient funds.');
  user[0].funds = sub(user[0].funds, qty);
  const updatedUser = await upsertUser(user[0]);
  return updatedUser.user;
}

async function transferFunds(sourceId, destinationId, amount) {
  const seller = await getUsersByAttribute('id', destinationId);
  const buyer = await getUsersByAttribute('id', sourceId);
  if (!buyer[0].isRoot && Number(buyer[0].funds) < amount) throw new Error('Insufficient funds.');
  console.log(seller[0]);
  seller[0].funds = sum(seller[0].funds, amount);
  buyer[0].funds = sub(buyer[0].funds, amount);
  await upsertUser(buyer[0]);
  await upsertUser(seller[0]);
  return { message: 'Funds were succesfully transferred.' };
}

async function deleteUserById(id) {
  const user = await getUsersByAttribute('id', id);

  await User.destroy({
    where: { id: user[0].id },
  });

  try {
    await getUsersByAttribute('id', id);
  } catch (err) {
    return { message: 'User succesfully deleted.' };
  }
  throw new Error('Error deleting user');
}

async function getRoot() {
  const [root] = await getUsersByAttribute('isRoot', true);
  return root;
}

module.exports = {
  getUsersByAttribute,
  getRoot,
  getUsersByTwoAttributes,
  upsertUser,
  deleteUserById,
  transferFunds,
  deposit,
  withdraw,
};
