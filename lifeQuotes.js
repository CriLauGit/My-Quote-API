const express = require('express');

const { getRandomElement, getElementsByAuthor, generateId } = require('./utils');

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

//add quote
lifeQuotesRouter.post('/', (req, res)=> {
    if(req.query.quote && req.query.person) {
        const newQuote = {
            id: generateId(lifeQuotes, 'LF'),
            quote: req.query.quote,
            person: req.query.person,
        };
        lifeQuotes.push(newQuote);
        res.send({
            quote: newQuote
        })
    } else {
        res.status(400).send();
    }

})
module.exports = lifeQuotesRouter;