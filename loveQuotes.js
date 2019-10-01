const express = require('express');

const { getRandomElement, getElementsByAuthor } = require('./utils');

const { loveQuotes } = require('./data');

loveQuotesRouter = express.Router();

//get quote by author or all quotes
loveQuotesRouter.get('/', (req, res) => {
    const person = req.query.person;
    let quotesByAuthor = getElementsByAuthor(loveQuotes, person);
    if(person !== undefined) {
        res.send( {
            quotes: quotesByAuthor
        })
    } else {
        res.send( {
            quotes: loveQuotes
        })
    }
});

//get random
loveQuotesRouter.get('/random', (req, res) => {
    let randomQuote = getRandomElement(loveQuotes);
    res.send({
        quotes: [randomQuote]
    });
});


module.exports = loveQuotesRouter;