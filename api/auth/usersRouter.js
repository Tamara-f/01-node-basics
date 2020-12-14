const { Router } = require('express');
const upload = require('../helpers/multer.js');
const moveFileToPublic = require('../helpers/moveFile');

const AuthController = require('./authController');
const userModel = require('./userModel.js');

const UserRouter = Router();

UserRouter.get(
  '/current',
  AuthController.authorize,
  AuthController.getUserController
);

UserRouter.patch(
  '/avatar',
  AuthController.authorize,
  upload.single('avatar'),
  moveFileToPublic,
  AuthController.updateAvatar
);

module.exports = UserRouter;
