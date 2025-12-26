const { signupService, loginService, refreshTokenService } = require("../services/user.service");

const signup = async (req, res, next) => {
  try {
    const user = await signupService(req.body);
    res.status(201).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const tokenData = await loginService(req.body);
    res.status(200).json({ success: true, ...tokenData });
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const newToken = await refreshTokenService(req.body.refreshToken);
    res.status(200).json({ success: true, token: newToken });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login, refreshToken };
