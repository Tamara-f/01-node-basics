const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
require('dotenv').config();

const contactRouter = require('./contacts/contactRouters');

module.exports = class ContactServer {
  constructor() {
    this.server = null;
  }
  start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    this.startListening();
  }
  initServer() {
    this.server = express();
  }
  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors({ origin: 'http://localhost:3000' }));
    this.server.use(morgan('dev'));
  }
  initRoutes() {
    this.server.use('/contacts', contactRouter);
  }

  startListening() {
    this.server.listen(process.env.PORT, () => {
      console.log(`start listening on port ${process.env.PORT}`);
    });
  }
};
