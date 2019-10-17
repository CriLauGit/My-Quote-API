const express = require('express');

const { getRandomElement, getElementsByAuthor, generateId, findIndex, deleteQuote } = require('../utils');

const { loveQuotes } = require('../data');

loveQuotesRouter = express.Router();

//get quote by author or all quotes if the request is made without a query
loveQuotesRouter.get('/', (req, res) => {
    const person = req.query.person;
    let quotesByAuthor = getElementsByAuthor(loveQuotes, person);
    const quotes = person ? quotesByAuthor : loveQuotes;
    res.send({ quotes: quotes });
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

//delete quote
loveQuotesRouter.delete('/:id', (req, res)=> {
    const id = req.params.id;
    const index = findIndex(loveQuotes, id);

    if(index === -1) {
        res.status(404).send();
    } else {
        deleteQuote(loveQuotes, index);
        res.status(200).send();
    }
})

//modify quote
loveQuotesRouter.put('/:id', (req, res)=> {
    const id = req.params.id;
    const quoteText = req.query.quote;
    const quotePerson = req.query.person;

    const index = findIndex(loveQuotes, id);
   
    if(!id || !quoteText && !quotePerson) {
        res.status(400).send();
    } else if(index === -1) {
        res.status(404).send();
    } else {
        if(quoteText) {
            loveQuotes[index].quote = quoteText;
        }
        if(quotePerson) {
            loveQuotes[index].person = quotePerson;
        }
        res.status(200).send();
    }
})

module.exports = loveQuotesRouter;