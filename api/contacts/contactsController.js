const Joi = require('joi');
const contacts = require('../../db/contacts.json');

class ContactController {
  //getters
  get updateContact() {
    return this._updateContact.bind(this);
  }
  get deleteContact() {
    return this._deleteContact.bind(this);
  }
  get getById() {
    return this._getById.bind(this);
  }
  //methods

  getContacts(req, res, next) {
    return res.json(contacts);
  }

  _getById(req, res, next) {
    try {
      const targetContact = this.findContactById(req.params.id);
      console.log(contacts[targetContact]);
      return res
        .status(200)
        .send(` "Found contact", ${JSON.stringify(contacts[targetContact])}`);
    } catch (error) {
      next(error);
    }
  }

  addContact(req, res, next) {
    const newContact = {
      ...req.body,
      id: Math.max(...contacts.map(el => el.id)) + 1,
    };
    contacts.push(newContact);
    console.log(contacts);
    return res.status(201).send('contact Added');
  }

  _updateContact(req, res, next) {
    try {
      const targetContactIndex = this.findContactById(req.params.id);

      contacts[targetContactIndex] = {
        ...contacts[targetContactIndex],
        ...req.body,
      };
      console.log(contacts);
      return res.status(200).send('updated');
    } catch (error) {
      next(error);
    }
  }

  _deleteContact(req, res, next) {
    try {
      const targetContactIndex = this.findContactById(req.params.id);

      contacts.splice(targetContactIndex, 1);
      console.log(contacts);
      return res.status(200).send('contact deleted');
    } catch (error) {
      next(error);
    }
  }

  findContactById(contactId) {
    const id = parseInt(contactId);
    console.log(id);
    const targetContactIndex = contacts.findIndex(contact => contact.id === id);
    if (targetContactIndex === -1) {
      throw new NotFoundError('Contact not found');
    }
    // console.log('targetContactIndex', targetContactIndex);
    return targetContactIndex;
  }

  //validation

  validateAddContact(req, res, next) {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    });
    const validationRes = schema.validate(req.body);
    if (validationRes.error) {
      return res
        .status(400)
        .send('"message": "missing required name field"', validationRes.error);
    }
    next();
  }
  validateUpdateContact(req, res, next) {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
    });
    const validationRes = schema.validate(req.body);
    if (validationRes.error) {
      return res.status(400).send(body, 'missing fields', validationRes.error);
    }
    next();
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
    delete this.stack;
  }
}

module.exports = new ContactController();
