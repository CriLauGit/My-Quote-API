const { getRandomElement, getElementsByAuthor, generateId, findIndex, deleteQuote } = require('../utils');
const { lifeQuotes } = require('../data');

exports.findQuoteIndex = (req, res, next, id) => {
    const quoteId = id.substr(3);
    
    if(!quoteId) {
        return res.status(400).send();
    } else {
        const index = findIndex(lifeQuotes, id);

        if(index === -1) {
            res.status(404).send();
        } else {
            req.quoteIndex = index;
            next();
        }
    }
}