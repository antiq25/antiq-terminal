function displaySearchOptions() {
  const terminal = document.getElementById("terminal");

  // Display search engine options
  terminal.innerHTML += `
    <div>Select search engine:</div>
    <div>- Google</div>
    <div>- Brave</div>
    <div>- Bing</div>
  `;

  // If last search query exists, show it as a placeholder
  const placeholderText = lastSearchQuery ? `(${lastSearchQuery})` : "";
  currentPrompt = `Enter search engine name and query ${placeholderText}: `;
  promptElement.innerText = currentPrompt;

  // Set the searchPrompt flag to true
  searchPrompt = true;
}

function handleInput(event) {
    const inputField = document.querySelector("#commandInput");
    const terminal = document.getElementById("terminal");
  
    if (event.key === "Enter") {
      const selectedLink = terminal.querySelector(".selected-link");
      if (selectedLink) {
        const url = selectedLink.dataset.url;
        terminal.innerHTML += `<div>Opening link: ${selectedLink.textContent}</div>`;
        window.open(url, "_blank");
  
        // Clear the terminal and end the query
        terminal.innerHTML = "";
        inputField.value = "";
        currentPrompt = "> ";
        promptElement.innerText = currentPrompt;
        linkPrompt = false;
        selectedLink.classList.remove("selected-link");
      } else if (searchPrompt) {
        executeSearch(inputField.value.trim());
  
        // Clear the input field
        inputField.value = "";
        currentPrompt = "> ";
        promptElement.innerText = currentPrompt;
        searchPrompt = false;
      } else {
        executeCommand(inputField.value.trim());
  
        // Clear the input field
        inputField.value = "";
      }
    }
  }


document.getElementById("commandInput").addEventListener("keydown", handleInput);

function executeSearch(query) {
  const terminal = document.getElementById("terminal");

  // Get the search engine name and query
  const [engineName, ...searchTerms] = query.split(" ");

  // Perform search based on the search engine
  switch (engineName.toLowerCase()) {
    case "google":
      terminal.innerHTML += `<div>Searching Google for "${searchTerms.join(" ")}"</div>`;
      window.open(`https://www.google.com/search?q=${searchTerms.join("+")}`, "_blank");
      break;
    case "brave":
      terminal.innerHTML += `<div>Searching Brave Search for "${searchTerms.join(" ")}"</div>`;
      window.open(`https://search.brave.com/search?q=${searchTerms.join("+")}`, "_blank");
      break;
    case "bing":
      terminal.innerHTML += `<div>Searching Bing for "${searchTerms.join(" ")}"</div>`;
      window.open(`https://www.bing.com/search?q=${searchTerms.join("+")}`, "_blank");
      break;
    default:
      terminal.innerHTML += `<div>Invalid search engine. Try again with a valid search engine:</div>`;
      currentPrompt = `Enter search engine name and query (${lastSearchQuery}): `;
      promptElement.innerText = currentPrompt;
      break;
  }
}
