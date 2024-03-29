/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const validationErrors = require('celebrate').errors;
const cors = require('cors');

const { NODE_ENV = 'development', SECRET_KEY = 'secretdevkey' } = process.env;

module.exports = {
  express,
  mongoose,
  cookieParser,
  helmet,
  validationErrors,
  cors,
  NODE_ENV,
  SECRET_KEY,
};
