const userModel = require('../../model/users.model');

class AccountController {
  withdraw = async (req, res) => {
    const { valor } = req.body;
    const { user } = req;

    if (!valor || valor <= 0) return res.status(422).json({ message: 'Error: Value is required and must be higher than 0' });

    try {
      const updatedUser = await userModel.withdraw({ key: 'id', value: user.id }, valor);
      return res.status(200).json({
        user: {
          name: updatedUser.name,
          email: updatedUser.email,
          risk: updatedUser.risk,
          funds: updatedUser.funds,
        },
      });
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  };

  deposit = async (req, res) => {
    const { valor } = req.body;
    const { user } = req;
    if (!valor || valor <= 0) return res.status(422).json({ message: 'Error: Value is required and must be higher than 0' });

    try {
      const updatedUser = await userModel.deposit({ key: 'id', value: user.id }, valor);
      return res.status(200).json({
        user: {
          name: updatedUser.name,
          email: updatedUser.email,
          risk: updatedUser.risk,
          funds: updatedUser.funds,
        },
      });
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  };

  saveAccount = async (req, res) => {
    const {
      email, password, name, risk,
    } = req.body;
    if (email === undefined || password === undefined || name === undefined) {
      return res.status(400).json({ message: 'Error: Email, name and password are required fields.' });
    }
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(422).json({ message: 'Error: Email, name and password must be strings.' });
    }
    if (risk !== undefined && Number(risk) !== 0 && Number(risk) !== 1) {
      return res.status(422).json({ message: 'Error: Risk must be either 0 or 1.' });
    }

    if (email.match(/[a-z]+[0-z]*@[a-z]+.[a-z]+\.[a-z]+/) === null) {
      return res.status(422).json({ message: 'Error: Wrong email format.' });
    }
    if (password.length < 6) {
      return res.status(422).json({ message: 'Error: Pasword must have at least 6 characters.' });
    }
    try {
      await userModel.getUsersByAttribute('email', email);
      return res.status(409).json({ message: 'Error: email already registered.' });
    } catch (err) {
      try {
        const newUser = await userModel.upsertUser({
          name, email, password, risk, funds: 0,
        });

        return res.status(201).json({
          user: {
            id: newUser.user.id,
            name: newUser.user.name,
            email: newUser.user.email,
            password: newUser.user.password,
            risk: newUser.user.risk,
            funds: newUser.user.funds,
          },
        });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
      }
    }
  };

  updateAccount = async (req, res) => {
    const [user] = await userModel.getUsersByAttribute('id', req.params.id);
    // eslint-disable-next-line eqeqeq
    if (user.id == req.user.id) {
      const {
        email, password, name, risk,
      } = req.body;
      if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(422).json({ message: 'Error: Email, name and password must be strings.' });
      }
      if (risk !== undefined && Number(risk) !== 0 && Number(risk) !== 1) {
        return res.status(422).json({ message: 'Error: Risk must be either 0 or 1.' });
      }
      if (email.match(/[a-z]+[0-z]*@[a-z]+.[a-z]+\.[a-z]+/) === null) {
        return res.status(422).json({ message: 'Error: Wrong email format.' });
      }
      if (password.length < 6) {
        return res.status(422).json({ message: 'Error: Pasword must have at least 6 characters.' });
      }
      try {
        const newUser = await userModel.upsertUser({
          name, email, password, risk,
        });

        return res.status(201).json({
          user: {
            id: newUser.user.id,
            name: newUser.user.name,
            email: newUser.user.email,
            password: newUser.user.password,
            risk: newUser.user.risk,
            funds: newUser.user.funds,
          },
        });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
      }
    }
    return res.status(403).json({ message: 'Error: Forbidden' });
  };

  deleteAccount = async (req, res) => {
    const [root] = await userModel.getRoot();
    // eslint-disable-next-line eqeqeq
    if (req.user.id != root.id) {
      return res.status(403).json({ message: 'Error: Forbidden' });
    }
    // eslint-disable-next-line eqeqeq
    if (req.params.id == root.id) {
      return res.status(403).json({ message: 'Error: Can\'t delete root user' });
    }
    try {
      const deletedUser = await userModel.deleteUserById(Number(req.params.id));
      return res.status(200).json({ message: deletedUser.message, user: deletedUser.user });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ message: err.message });
    }
  };

  getAccount = async (req, res) => {
    try {
      const [user] = await userModel.getUsersByAttribute('id', req.params.id);
      // eslint-disable-next-line eqeqeq
      if (user.id == req.user.id) {
        return res.status(200).json({
          user: {
            name: user.name,
            email: user.email,
            risk: user.risk,
            funds: user.funds,
          },
        });
      }
      return res.status(200).json({
        user: {
          name: user.name,
          email: user.email,
        },
      });
    } catch ({ message }) {
      return res.status(404).json({ message });
    }
  };
}
module.exports = AccountController;
