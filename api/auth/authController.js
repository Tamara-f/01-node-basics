const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();
const path = require('path');

const IMG_DIR = path.join(process.cwd(), 'public', 'images', '/');

const UsersModel = require('./userModel');
const { UnauthorizedError } = require('../helpers/errors.constructor');

class AuthController {
  getUserController = async (req, res, next) => {
    const user = req.user;
    const { email, password, subscription, token } = user;
    const userForResponse = { email, subscription };
    return res.status(200).json(userForResponse);
  };
  updateUser = async (req, res, next) => {
    try {
      const user = req.user;

      await UsersModel.logout(user._id);
      res.status(204).send('No Content');
    } catch (e) {
      next(e);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const { id, ...data } = req.user;
      // console.log('id, data', id, data);
      const updateUser = await UsersModel.updateUser(id, data);
      res.status(200).json(updateUser);
    } catch (e) {
      next(e);
    }
  };

  updateAvatar = async (req, res, next) => {
    try {
      const user = req.user;

      const string = req.user.avatarURL;

      await UsersModel.updateUser(user._id, {
        avatarURL: `localhost:3000/images/${req.file.filename}`,
      });
      const fileName = string.slice(21);

      await fs.unlink(path.join(IMG_DIR, fileName), err => {
        if (err) {
          console.error(err);
          return;
        }
      });
      res
        .status(200)
        .json(`avatarUrl: 'localhost:3000/images/${req.file.filename}'`);
    } catch (e) {
      next(e);
    }
  };

  registrationController = async (req, res, next) => {
    try {
      const { email } = req.body;
      const checkEmail = await UsersModel.findByEmail(email);
      if (checkEmail) {
        return res.status(409).send("'message': 'Email in use'");
      }
      const newUser = await UsersModel.createUser(req.body);
      res.status(201).json(newUser);
    } catch (e) {
      next(e);
    }
  };

  loginController = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await UsersModel.findByEmail(email);
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!user || !isPasswordValid) {
        return res.status(401).send('Email or password is wrong');
      }

      const token = await UsersModel.login(user);
      res.status(200).json(`token: ${token}, user: ${user}`);
    } catch (e) {
      next(e);
    }
  };

  logoutController = async (req, res, next) => {
    try {
      const user = req.user;

      await UsersModel.logout(user._id);
      res.status(204).send('No Content');
    } catch (e) {
      next(e);
    }
  };

  authorize = async (req, res, next) => {
    try {
      const authorizationHeader = req.get('Authorization') || '';
      const token = authorizationHeader.replace('Bearer ', '');
      let userId;

      try {
        userId = await jwt.verify(token, process.env.JWT_SECRET_KEY).id;
      } catch (e) {
        console.log('error', e);
        next(res.status(401).json({ message: 'Not authorized' }));
      }

      const user = await UsersModel.findById(userId);
      if (!user || user.token !== token) {
        throw new UnauthorizedError('Not authorized');
      }
      req.user = user;
      req.token = token;
      next();
    } catch (err) {
      next(err);
    }
  };

  validateAuth = (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    const validationRes = schema.validate(req.body);

    if (validationRes.error) {
      return res
        .status(400)
        .send('missing required name field', validationRes.error);
    }
    next();
  };
}

module.exports = new AuthController();
