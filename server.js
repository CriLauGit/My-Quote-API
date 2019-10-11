const express = require('express');
const app = express();

const PORT = process.env.PORT || 4001;
const techQuotesRouter = require('./quotes/techQuotes');
const loveQuotesRouter = require('./quotes/loveQuotes');
const lifeQuotesRouter = require('./quotes/lifeQuotes');

app.use(express.static('public'));

app.use('/api/techQuotes', techQuotesRouter);
app.use('/api/loveQuotes', loveQuotesRouter);
app.use('/api/lifeQuotes', lifeQuotesRouter);

app.listen(PORT);