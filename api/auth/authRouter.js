const { Router } = require('express');

const { registrationController } = require('./authController');

const authRouter = Router();

authRouter.post('/registration', registrationController);

module.exports = authRouter;
