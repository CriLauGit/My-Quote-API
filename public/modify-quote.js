const modifyQuoteButton = document.getElementById("modifyQuoteButton");

const quoteContainer = document.getElementById("quote-container");

const resetQuotes = () => {
    quoteContainer.innerHTML = '';
  }

const renderError = response => {
    newQuoteContainer.innerHTML = `
    <p class="presentation">Your request returned an error from the server: </p>
    <p class="presentation">Code: ${response.status} </p>
    <p class="presentation">${response.statusText}
    `;
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

/**
 * The function finds the quote id using the theme selected and entered number
 * @param {string} theme 
 * @param {number} number 
 */
const findID = (theme, number) => {
    let id = "";
    console.log(number);
    if(theme === "techonology") {
        id = `T${number}`;
    } else if (theme === "love") {
        id = `LV${number}`;
    } else {
        id = `LF${number}`;;
    }
    return id;
} 

modifyQuoteButton.addEventListener("click", () => {
    const theme = document.getElementById("theme").value;
    const quoteNumber = document.getElementById("id").value;
    const quoteText = document.getElementById("quote").value;
    const quoteAuthor = document.getElementById("author").value;
    const id = findID(theme, quoteNumber);
    const router = selectRouter(theme);

    fetch(`${router}/:${id}?quote=${quoteText}&person=${quoteAuthor}`, {
        method: 'PUT'
    })
    .then(response => {
        if(response.ok) {
            quoteContainer.innerHTML = `
            <p class="presentation">Congrats! The ${theme} quote number ${quoteNumber} was updated.</p>
            <p class="details">Go to the <a href="index.html">home page</a> to request and view all quotes.</p>`;
        } else if(response.status === 404){
            quoteContainer.innerHTML = `
            <p class="presentation">Your request was denied!</p>
            <p class="details">There is no ${theme} quote number ${quoteNumber} in the database.</p>
            <p class="details">Go to the <a href="index.html">home page</a> to request and view all quotes.</p>`;
        } else if(response.status === 400){
            quoteContainer.innerHTML = `
            <p class="presentation">Your request was denied!</p>
            <p class="details">Please make sure to enter a quote number that exists in the database and the desired update to that quote.</p>
            <p class="details">Go to the <a href="index.html">home page</a> to request and view all quotes.</p>`;
        } else {
            renderError();
        }
    }) 
})
