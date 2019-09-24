const express = require('express');
const app = express();

const PORT = process.env.PORT || 4001;

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

app.use(express.static('public'));

app.listen(PORT);