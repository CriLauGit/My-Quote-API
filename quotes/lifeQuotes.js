const express = require('express');

const { getRandomElement, getElementsByAuthor, generateId, findIndex, deleteQuote } = require('../utils');

const myService = require('../quotes/myService');

const { lifeQuotes } = require('../data');

lifeQuotesRouter = express.Router();

//get quote by author or all quotes if the request is made without a query
lifeQuotesRouter.get('/', (req, res) => {
    const person = req.query.person;
    let quotesByAuthor = getElementsByAuthor(lifeQuotes, person);
    const quotes = person ? quotesByAuthor : lifeQuotes;
    res.send({ quotes: quotes });
});

//get a random quote
lifeQuotesRouter.get('/random', (req, res) => {
    let randomQuote = getRandomElement(lifeQuotes);
    res.send({
        quotes: [randomQuote]
    });
});

//add a quote 
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

//function that performs the lookup of the id and attach the index to the req object in subsequent middleware 
lifeQuotesRouter.param('id', myService.findQuoteIndex);

//delete quote
lifeQuotesRouter.delete('/:id', (req, res)=> {
        deleteQuote(lifeQuotes, req.quoteIndex);
        res.status(200).send();
    })

//modify quote
lifeQuotesRouter.put('/:id', (req, res)=> {
    const quoteText = req.query.quote;
    const quotePerson = req.query.person;
   
    if(!quoteText && !quotePerson) {
        res.status(400).send();
    } else {
        if(quoteText) {
            lifeQuotes[req.quoteIndex].quote = quoteText;
        }
        if(quotePerson) {
            lifeQuotes[req.quoteIndex].person = quotePerson;
        }
        res.status(200).send();
    }
})

module.exports = lifeQuotesRouter;