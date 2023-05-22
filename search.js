function executeSearch(query) {
    
    const terminal = document.getElementById("terminal");
  
    // Parse the search engine from the query
    const [engine, ...searchTerms] = query.split(" ");
    const searchTerm = searchTerms.join(" ");
  
    let searchUrl = "";
    switch (engine.toLowerCase()) {
      case "google":
        searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
        break;
      case "brave":
        searchUrl = `https://search.brave.com/search?q=${encodeURIComponent(searchTerm)}`;
        break;
      case "bing":
        searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(searchTerm)}`;
        break;
      default:
        terminal.innerHTML += "<div>Unknown search engine: " + engine + "</div>";
        return;
    }
  
    // Open the search URL in a new tab
    window.open(searchUrl, "_blank");
  
    // Save the last search query
    lastSearchQuery = searchTerm;
  }
  
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
  
  