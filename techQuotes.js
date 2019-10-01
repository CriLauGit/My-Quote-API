const express = require('express');

const { getRandomElement, getElementsByAuthor } = require('./utils');

const { techQuotes } = require('./data');

techQuotesRouter = express.Router();

//get quote by author or all quotes
techQuotesRouter.get('/', (req, res) => {
    const person = req.query.person;
    let quotesByAuthor = getElementsByAuthor(techQuotes, person);
    if(person !== undefined) {
        res.send( {
            quotes: quotesByAuthor
        })
    } else {
        res.send( {
            quotes: techQuotes
        })
    }
});

//get random
techQuotesRouter.get('/random', (req, res) => {
    let randomQuote = getRandomElement(techQuotes);
    res.send({
        quotes: [randomQuote]
    });
});


module.exports = techQuotesRouter;