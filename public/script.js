const author = document.getElementById("author");
const theme = document.getElementById("theme");

const fetchByAuthorButton = document.getElementById('fetchByAuthor');
const fetchByThemeButton = document.getElementById('fetchByTheme');
const fetchRandomByThemeButton = document.getElementById('fetchRandomByTheme');

const quoteContainer = document.getElementById('quote-container');

const resetQuotes = () => {
    quoteContainer.innerHTML = '';
  }

const renderError = response => {
    quoteContainer.innerHTML = `
    <p class="presentation">Your request returned an error from the server: </p>
    <p class="presentation">Code: ${response.status} </p>
    <p class="presentation">${response.statusText}
    `;
}

const presentationLine = () => {
    quoteContainer.innerHTML = '<p class="presentation">Enjoy your requested quotes:</p>';
}

const renderQuotes = (quotes = []) => {
    resetQuotes();
    if(quotes.length > 0) {
        presentationLine();
        quotes.forEach(quote => {
            const newQuote = document.createElement('div');
            newQuote.className = 'single-quote';
            newQuote.innerHTML = `
            <div class="quote-text">${quote.id}. ${quote.quote}</d>
            <div class="attribution">${quote.person}</div>
            `;
            quoteContainer.appendChild(newQuote);
        });
    } else {
        quoteContainer.innerHTML = '<p class="presentation">Your request returned no quotes.</p>'
    }
}

/**
 * Function to fetch the quotes of the author indicated by the user
 * in all the database
 */ 
async function fetchURLs() {
    const author = document.getElementById('author').value;
    let quotesByAuthor = [];

    var data = await Promise.all([
        fetch(`/api/techQuotes?person=${author}`)
            .then(response => {if(response.ok) { return response.json();} else { return response.status;}}),
        fetch(`/api/loveQuotes?person=${author}`)
            .then(response => {if(response.ok) { return response.json();} else { return response.status;}}),
        fetch(`/api/lifeQuotes?person=${author}`)
            .then(response => {if(response.ok) { return response.json();} else { return response.status;}})
        ]);

    for(let i of data) {
        for(let j=0; j<i.quotes.length; j++) {
            if(i.quotes[j] !== undefined) {
                quotesByAuthor.push(i.quotes[j]);
            }
        }
    }
    
    if(quotesByAuthor) {
        renderQuotes(quotesByAuthor);
        } else {
        renderError();
        }       
    }

fetchByAuthorButton.addEventListener('click', fetchURLs)

/**
 * The function selects the router for the fetchByThemeButton and the
 * fetchRandomByThemeButton using the theme selected by the user 
 * @param {string} theme 
 */
const selectRouter = (theme) => {
    let router = "";
    if(theme === "techonology") {
        router = "/api/techQuotes";
    } else if (theme === "love") {
        router = "/api/loveQuotes";
    } else {
        router = "/api/lifeQuotes";
    }
    return router;
}

fetchByThemeButton.addEventListener('click', () => {
    const theme = document.getElementById('theme').value;
    const router = selectRouter(theme);

    fetch(router)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        renderError(response);
      }
    })
    .then(response => {
      renderQuotes(response.quotes);
    });
  }
);

fetchRandomByThemeButton.addEventListener('click', ()=> {
    const theme = document.getElementById('theme').value;
    const router = selectRouter(theme);
    
    fetch(`${router}/random`)
        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                renderError(response);
            }
        }).then(response => {
            renderQuotes(response.quotes);
        })
    })