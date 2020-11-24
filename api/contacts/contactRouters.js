const { Router } = require('express');
// const contactsController = require('./contactsController');

const {
  getContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} = require('./controlMongo');
const ContactRouter = Router();

ContactRouter.get('/', getContactsController);

ContactRouter.get('/:contactId', getContactByIdController);

ContactRouter.post('/', createContactController);

ContactRouter.delete('/:contactId', deleteContactController);

ContactRouter.patch('/', updateContactController);

module.exports = ContactRouter;
