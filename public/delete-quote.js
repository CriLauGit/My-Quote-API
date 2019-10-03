const quoteContainer = document.getElementById("quote-container");
const deleteQuoteButton = document.getElementById("delete-quote");

const resetQuotes = () => {
    quoteContainer.innerHTML = "";
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

deleteQuoteButton.addEventListener("click", ()=>{
    const theme = document.getElementById("theme").value;
    const number = document.getElementById("number").value;
    const id = findID(theme, number);
    const router = selectRouter(theme);

    resetQuotes();
    
    fetch(`${router}/:${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if(response.ok) {
            quoteContainer.innerHTML = `
            <p class="presentation">Congrats! The ${theme} quote number ${number} was deleted.</p>
            <p class="details">Go to the <a href="index.html">home page</a> to request and view all quotes.</p>`;
        } else {
            quoteContainer.innerHTML = `
            <p class="presentation">Your request was denied!</p>
            <p class="details">There is no ${theme} quote number ${number} to delete.</p>`;
        }
    })
})