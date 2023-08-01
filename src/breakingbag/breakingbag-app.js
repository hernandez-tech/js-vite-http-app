/**
 *
 * @returns {Promise<Object>}
 */

async function fetchQuote() {
  const data = await fetch("https://api.breakingbadquotes.xyz/v1/quotes").then(res => res.json());

  return data[0];
}

/**
 * Renderiza BreakingBad
 * @param {HTMLDivElement} element
 */
export const BreakingBadApp = async (element) => {
  //Selector
  const titleApp = document.querySelector("#app-title");

  titleApp.innerHTML = "BreakingBad APP";
  element.innerHTML = "Loading...";
  
  await fetchQuote();
  
  // Creando elementos HTML
  const labelQuote = document.createElement("p");
  const labelAuthor = document.createElement("h3");
  const btnQuoteNext = document.createElement("button");
  btnQuoteNext.textContent = "Next Quote";

  const render = ({ quote, author }) => {
    labelQuote.innerHTML = quote;
    labelAuthor.innerHTML = author;

    element.replaceChildren(labelQuote, labelAuthor, btnQuoteNext);
  };

  //EventListener
  btnQuoteNext.addEventListener("click", async () => {
    element.innerHTML = "Loading...";
    const quote = await fetchQuote();
    render(quote);
  });

  fetchQuote().then(render);
};
