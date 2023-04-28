let currentPrompt = "> ";
let lastSearchQuery = "";
let searchPrompt = false;
const promptElement = document.getElementById("prompt");
promptElement.innerText = currentPrompt;

function handleInput(event) {
  if (event.key !== "Enter") {
    return;
  }

  const inputField = document.getElementById("commandInput");
  const input = inputField.value.trim();

  // Clear the input field
  inputField.value = "";

  const terminal = document.getElementById("terminal");

  if (searchPrompt) {
    const inputArray = input.split(" ");

    if (inputArray.length > 1) {
      const query = inputArray.slice(1).join(" ");
      lastSearchQuery = query;

      switch (inputArray[0].toLowerCase()) {
        case "google":
          terminal.innerHTML += `<div>Searching Google for "${query}"</div>`;
          window.open(`https://www.google.com/search?q=${query}`, '_blank');
          currentPrompt = "> ";
          promptElement.innerText = currentPrompt;
          searchPrompt = false;
          break;
        case "brave":
          terminal.innerHTML += `<div>Searching Brave Search for "${query}"</div>`;
          window.open(`https://search.brave.com/search?q=${query}`, '_blank');
          currentPrompt = "> ";
          promptElement.innerText = currentPrompt;
          searchPrompt = false;
          break;
        case "bing":
          terminal.innerHTML += `<div>Searching Bing for "${query}"</div>`;
          window.open(`https://www.bing.com/search?q=${query}`, '_blank');
          currentPrompt = "> ";
          promptElement.innerText = currentPrompt;
          searchPrompt = false;
          break;
        default:
          terminal.innerHTML += `<div>Invalid search engine. Try again with a valid search engine:</div>`;
          currentPrompt = `Enter search engine name and query (${lastSearchQuery}): `;
          promptElement.innerText = currentPrompt;
          break;
      }
    } else if (inputArray[0].toLowerCase() === "exit") {
      terminal.innerHTML += "<div>Left search prompt.</div>";
      currentPrompt = "> ";
      promptElement.innerText = currentPrompt;
      searchPrompt = false;
    } else {
      terminal.innerHTML += "<div>No search query specified</div>";
    }
  } else {
    executeCommand(input);
  }
}

document.getElementById("commandInput").addEventListener("keydown", handleInput);

function executeCommand(command) {
  const terminal = document.getElementById("terminal");

  switch (command) {
    case "search":
      displaySearchOptions();
      break;
    case "info":
    displayPlatformInfo()
      break;
    case "ip":
      getIPData();
      break;
    case "cls":
      terminal.innerText = "";
      break;
    case "help": 
    const displayHelp = document.createElement("div");
    terminal.innerText = "cmds = search - ip - info - cls"
    break;
    default:
      const unknownCommandOutput = document.createElement("div");
      unknownCommandOutput.innerText = "Unknown command: " + command;
      terminal.appendChild(unknownCommandOutput);
      break;
  }
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

  // If last search query exists, show it as a placeholder in the prompt
  const placeholderText = lastSearchQuery ? `(${lastSearchQuery})` : "";
  currentPrompt = `Enter search engine name and query ${placeholderText}: `;
  promptElement.innerText = currentPrompt;

  // Set the searchPrompt flag to true
  searchPrompt = true;
}