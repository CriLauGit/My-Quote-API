const express = require('express');

const { getRandomElement, getElementsByAuthor, generateId, findIndex, deleteQuote } = require('../utils');

const { lifeQuotes } = require('../data');

lifeQuotesRouter = express.Router();

//get quote by author or all quotes if the request is made without a query
lifeQuotesRouter.get('/', (req, res) => {
    const person = req.query.person;
    const quotes = person !== undefined ? getElementsByAuthor(lifeQuotes, person) : lifeQuotes;
    res.send( {quotes: quotes});
    /*let quotesByAuthor = getElementsByAuthor(lifeQuotes, person);
    if(person !== undefined) {
        res.send( {
            quotes: quotesByAuthor
        });
    } else {
        res.send( {
            quotes: lifeQuotes
        })
    }*/
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

//delete quote
lifeQuotesRouter.delete('/:id', (req, res)=> {
    const id = req.params.id;
    const index = findIndex(lifeQuotes, id);

    if(index === -1) {
        res.status(404).send();
    } else {
        deleteQuote(lifeQuotes, index);
        res.status(200).send();
    }
})

//modify quote
lifeQuotesRouter.put('/:id', (req, res)=> {
    const id = req.params.id;
    const quoteText = req.query.quote;
    const quotePerson = req.query.person;

    const index = findIndex(lifeQuotes, id);
   
    if(!id || !quoteText && !quotePerson) {
        res.status(400).send();
    } else if(index === -1) {
        res.status(404).send();
    } else {
        if(quoteText) {
            lifeQuotes[index].quote = quoteText;
        }
        if(quotePerson) {
            lifeQuotes[index].person = quotePerson;
        }
        res.status(200).send();
    }
})

module.exports = lifeQuotesRouter;