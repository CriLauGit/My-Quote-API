const express = require('express');

const { getRandomElement, getElementsByAuthor, generateId } = require('./utils');

const { loveQuotes } = require('./data');

loveQuotesRouter = express.Router();

//get quote by author or all quotes if the request is made without a query
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

//get a random quote
loveQuotesRouter.get('/random', (req, res) => {
    let randomQuote = getRandomElement(loveQuotes);
    res.send({
        quotes: [randomQuote]
    });
});

//add a quote
loveQuotesRouter.post('/', (req, res)=> {
    if(req.query.quote && req.query.person) {
        const newQuote = {
            id: generateId(loveQuotes, 'LV'),
            quote: req.query.quote,
            person: req.query.person,
        };
        loveQuotes.push(newQuote);
        res.send({
            quote: newQuote
        })
    } else {
        res.status(400).send();
    }
})

module.exports = loveQuotesRouter;