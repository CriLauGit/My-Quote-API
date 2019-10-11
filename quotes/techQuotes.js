const express = require('express');

const { getRandomElement, getElementsByAuthor, generateId, findIndex, deleteQuote } = require('../utils');

const { techQuotes } = require('../data');

techQuotesRouter = express.Router();

//get quote by author or all quotes if the request is made without a query
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

//get a random quote
techQuotesRouter.get('/random', (req, res) => {
    let randomQuote = getRandomElement(techQuotes);
    res.send({
        quotes: [randomQuote]
    });
});

//add a quote
techQuotesRouter.post('/', (req, res)=> {
    if(req.query.quote && req.query.person) {
        const newQuote = {
            id: generateId(techQuotes, 'T'),
            quote: req.query.quote,
            person: req.query.person,
        };
        techQuotes.push(newQuote);
        res.send({
            quote: newQuote
        })
    } else {
        res.status(400).send();
    }
})

//delete quote
techQuotesRouter.delete('/:id', (req, res)=> {
    const id = req.params.id;
    const index = findIndex(techQuotes, id);

    if(index === -1) {
        res.status(404).send();
    } else {
        deleteQuote(techQuotes, index);
        res.status(200).send();
    }
})

//modify quote
techQuotesRouter.put('/:id', (req, res)=> {
    const id = req.params.id;
    const quoteText = req.query.quote;
    const quotePerson = req.query.person;

    const index = findIndex(techQuotes, id);
   
    if(!id || !quoteText && !quotePerson) {
        res.status(400).send();
    } else if(index === -1) {
        res.status(404).send();
    } else {
        if(quoteText) {
            techQuotes[index].quote = quoteText;
        }
        if(quotePerson) {
            techQuotes[index].person = quotePerson;
        }
        res.status(200).send();
    }
})

module.exports = techQuotesRouter;