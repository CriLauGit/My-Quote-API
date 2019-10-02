const express = require('express');

const { getRandomElement, getElementsByAuthor } = require('./utils');

const { lifeQuotes } = require('./data');

lifeQuotesRouter = express.Router();

//get quote by author or all quotes
lifeQuotesRouter.get('/', (req, res) => {
    const person = req.query.person;
    let quotesByAuthor = getElementsByAuthor(lifeQuotes, person);
    if(person !== undefined) {
        res.send( {
            quotes: quotesByAuthor
        })
    } else {
        res.send( {
            quotes: lifeQuotes
        })
    }
});

//get random
lifeQuotesRouter.get('/random', (req, res) => {
    let randomQuote = getRandomElement(lifeQuotes);
    res.send({
        quotes: [randomQuote]
    });
});


module.exports = lifeQuotesRouter;