const ContactDb = require('./contactsModel');

const getContactsController = async (req, res, next) => {
  try {
    const contacts = await ContactDb.getContacts();
    res.json(contacts);
  } catch (e) {
    next(e);
  }
};

const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log('params req ', req.params);
    const contact = await ContactDb.getContactById(contactId);
    console.log('contact', contact);
    res.json(contact);
  } catch (e) {
    next(e);
  }
};

const createContactController = async (req, res, next) => {
  try {
    const { body } = req;
    const newContact = await ContactDb.createContact(body);
    res.status(201).json(newContact);
  } catch (e) {
    next(e);
  }
};

const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await ContactDb.deleteContact(contactId);
    res.end();
  } catch (e) {
    next(e);
  }
};
const updateContactController = async (req, res, next) => {
  try {
    const { id, ...data } = req.body;
    const updateContact = await ContactDb.updateContact(id, data);
    res.status(200).json(updateContact);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
};
