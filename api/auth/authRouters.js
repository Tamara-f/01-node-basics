const { Router } = require('express');
const AuthRouter = Router();

const AuthController = require('./authController');

AuthRouter.post(
  '/register',
  AuthController.validateAuth,
  AuthController.registrationController
);

AuthRouter.post(
  '/login',
  AuthController.validateAuth,
  AuthController.loginController
);

AuthRouter.post(
  '/logout',
  AuthController.authorize,
  AuthController.logoutController
);

module.exports = AuthRouter;
