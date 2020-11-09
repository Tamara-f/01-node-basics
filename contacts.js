const fs = require('fs');
const { promises: fsPromises } = fs;
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

function listContacts() {
  return fs.readFileSync(contactsPath, 'utf-8', (err, data) => {});
}

async function getContactById(contactId) {
  const arr = await JSON.parse(listContacts());
  console.log(arr.find(contact => contact.id === contactId));
}

async function removeContact(contactId) {
  const arr = JSON.parse(listContacts());
  const newArr = arr.filter(contact => contact.id !== contactId);
  await fsPromises.writeFile(contactsPath, JSON.stringify(newArr, null, 2));
}

async function addContact(name, email, phone) {
  const arr = JSON.parse(listContacts());
  const nextId = arr.length + 1;

  const newContact = {
    id: nextId,
    name: name,
    email: email,
    phone: phone,
  };

  console.log(newContact);
  arr.push(newContact);
  console.log(arr);
  await fsPromises.writeFile(contactsPath, JSON.stringify(arr, null, 2));
}

module.exports = { listContacts, addContact, removeContact, getContactById };
