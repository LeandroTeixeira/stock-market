const jwt = require('jsonwebtoken');
const process = require('process');
const userModel = require('../../model/users.model');
require('dotenv').config();

class LoginController {
  secret;

  jwtConfig;

  middleware;

  constructor() {
    this.secret = process.env.JWT_SECRET;
    this.jwtConfig = {
      expiresIn: '1h',
      algorithm: 'HS256',
    };
    this.middleware = async (req, res, next) => {
      const token = req.headers.authorization;

      if (!token) { return res.status(401).json({ message: 'Error: Token not found.' }); }

      try {
        const decoded = jwt.verify(token, this.secret);
        const [user] = await userModel.getUsersByAttribute('id', decoded.data.id);
        if (!user) {
          return res
            .status(401)
            .json({ message: 'Error: Failed to fetch user from token.' });
        }
        req.user = user;
        next();
      } catch (err) {
        return res.status(401).json({ message: err.message });
      }
    };
  }

  getMiddleware() {
    return this.middleware;
  }

  postLogin = async (req, res) => {
    const { name, email, password } = req.body;
    if (!password) return res.status(400).json({ message: 'Error: Password is required.' });
    if (!name && !email) {
      return res.status(400)
        .json({ message: 'Error: It\'s required to provide email or name for logging in.' });
    }
    let user;

    try {
      if (email) {
        const foundUser = await userModel.getUsersByTwoAttributes('email', email, 'password', password);
        [user] = foundUser;
      } else {
        const foundUser = await userModel.getUsersByTwoAttributes('name', name, 'password', password);
        [user] = foundUser;
      }
    } catch ({ message }) {
      return res.status(404).json({ message });
    }
    const token = jwt.sign({ data: user }, this.secret, this.jwtConfig);

    return res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        risk: user.risk,
        funds: user.funds,
      },
      token,
    });
  };
}
module.exports = LoginController;
