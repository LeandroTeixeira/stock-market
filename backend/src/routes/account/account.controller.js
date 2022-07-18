const userModel = require('../../model/users.model');

class AccountController {
  withdraw = async (req, res) => {
    const { valor } = req.body;
    const { user } = req;

    if (!valor || valor <= 0) return res.status(422).json({ message: 'Value is required and must be higher than 0' });

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
    if (!valor || valor <= 0) return res.status(422).json({ message: 'Value is required and must be higher than 0' });

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
