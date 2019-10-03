const submitButton = document.getElementById("submit-quote");
const newQuoteContainer = document.getElementById("quote-container");

const resetQuotes = () => {
    newQuoteContainer.innerHTML = '';
  }

/**
 * The function selects the router using the theme selected by the user
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

submitButton.addEventListener('click', ()=> {
    const quote = document.getElementById("quote").value;
    const author = document.getElementById("author").value;
    const theme = document.getElementById("theme").value;
    const router = selectRouter(theme);
    resetQuotes();

    fetch(`${router}?quote=${quote}&person=${author}`, {
            method: "POST",
        })
        .then(response => response.json())
        .then(({quote}) => {
            const newQuote = document.createElement('div');
            newQuote.innerHTML = `
            <p class="presentation">Congrats! Your quote was added.</p>
            <div class="quote-text">${quote.id}. ${quote.quote}</d>
            <div class="attribution">${quote.person}</div>
            <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>`;
            newQuoteContainer.appendChild(newQuote);
        })
})