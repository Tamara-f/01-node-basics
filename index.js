const express = require('express');
const yargs = require('yargs');
const argv = require('yargs').argv;

const contacts = require('./contacts.js');

//Сделай импорт модуля contacts.js в файле index.js
// и проверь работоспособность функций для работы с контактами.

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      console.log(contacts.listContacts());
      break;

    case 'get':
      console.log(contacts.getContactById(id));
      break;

    case 'add':
      console.log(contacts.addContact(name, email, phone));
      break;

    case 'remove':
      console.log(contacts.removeContact(id));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
