const submitButton = document.getElementById("submit-quote");
const newQuoteContainer = document.getElementById("quote-container");

const resetQuotes = () => {
    newQuoteContainer.innerHTML = '';
  }

submitButton.addEventListener('click', ()=> {
    const quote = document.getElementById("quote").value;
    const author = document.getElementById("author").value;
    const theme = document.getElementById("theme").value;
    let router = "";
    resetQuotes();

    if(theme === "techonology") {
        router = "/api/techQuotes";
    } else if (theme === "love") {
        router = "/api/loveQuotes";
    } else {
        router = "/api/lifeQuotes";
    }

    fetch(`${router}?quote=${quote}&person=${author}`, {
            method: "POST",
        })
        .then(response => response.json())
        .then(({quote}) => {
            const newQuote = document.createElement('div');
            newQuote.innerHTML = `
            <h3>Congrats! Your quote was added.</h3>
            <div class="quote-text">${quote.id}. ${quote.quote}</d>
            <div class="attribution">${quote.person}</div>
            <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>`;
            newQuoteContainer.appendChild(newQuote);
        })
})