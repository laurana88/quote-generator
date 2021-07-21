// Global
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loaderAnimation = document.getElementById('loader');


let apiQuote = {};

//Show Loading
function showLoadingSpinner() {
    loaderAnimation.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function removeLoadingSpinner() {
    loaderAnimation.hidden = true;
    quoteContainer.hidden = false;
}

// Show New Quote
function newQuote() {
    showLoadingSpinner();
    // Pick a random quote from APIQuotes[] - this is from the old API
    // const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    //Check if Author field is blank and replace it with 'unknown'
    if (!apiQuote.character.name) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = apiQuote.character.name;
    }

    // Check quote length to determine the styling
    if (apiQuote.sentence.length > 75) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    //Set Quote, Hide Loader
    quoteText.textContent = apiQuote.sentence;
    removeLoadingSpinner();
}

// Get Quotes from API
async function getQuotes() {
    showLoadingSpinner();
    const apiURL = 'https://game-of-thrones-quotes.herokuapp.com/v1/random';
    try {
        const response = await fetch(apiURL);
        apiQuote = await response.json();
        newQuote();
    } catch (err) {
        // Catch Error here
        alert(error);
    }
}

//Tweet Quote
const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text="${quoteText.textContent}" - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);


// On Load
getQuotes();
