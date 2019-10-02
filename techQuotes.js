const express = require('express');

const { getRandomElement, getElementsByAuthor, generateId } = require('./utils');

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

//add quote
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


module.exports = techQuotesRouter;