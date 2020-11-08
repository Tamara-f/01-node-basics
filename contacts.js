const fs = require('fs');
const { promises: fsPromises } = fs;
const path = require('path');

// fs.writeFile('example.txt', 'first file', err => {
//   if (err) console.log(err);
//});
/// fs.readFile('example.txt', 'utf-8', (err, data) => {
//   console.log(data);
// });

//Создай переменную contactsPath и запиши в нее путь к файлy contacts.json. Для составления пути ипользуй методы модуля path.
//Добавь функции для работы с коллекцией контактов. В функциях используй модуль fs и его методы readFile() и writeFile()
//Сделай экспорт созданных функций через module.exports
//* Раскомментируй и запиши значение

// async function contactsPath() {}
const contactsPath = path.join(__dirname, './db/contacts.json');

// let contacts;
// TODO: задокументировать каждую функцию
function listContacts() {
  return fs.readFileSync(contactsPath, 'utf-8', (err, data) => {});
}

// listContacts();

async function getContactById(contactId) {
  const arr = await JSON.parse(listContacts());
  console.log(arr.find(contact => contact.id === contactId));
}
// getContactById(5);

async function removeContact(contactId) {
  const arr = JSON.parse(listContacts());
  const newArr = arr.filter(contact => contact.id !== contactId);
  await fsPromises.writeFile(contactsPath, JSON.stringify(newArr, null, 2));
}
// removeContact(11);

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
// addContact('May Can', 'may@yahoo.org', '+380555555');
module.exports = { listContacts, addContact, removeContact, getContactById };
