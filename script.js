let currentPrompt = "> ";
let lastSearchQuery = "";
let searchPrompt = false;
let linkPrompt = false;
const promptElement = document.getElementById("prompt");
promptElement.innerText = currentPrompt;

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
    } else if (searchPrompt || linkPrompt) {
      if (inputField.value.trim() === "exit") {
        exitPrompt();
      } else {
        if (searchPrompt) {
          executeSearch(inputField.value.trim());
        } else {
          // Handle other prompts as needed
        }

        // Clear the input field
        inputField.value = "";
        currentPrompt = "> ";
        promptElement.innerText = currentPrompt;
        searchPrompt = false;
        linkPrompt = false;
      }
    } else {
      executeCommand(inputField.value.trim());

      // Clear the input field
      inputField.value = "";
    }
  }
}

function exitPrompt() {
  const terminal = document.getElementById("terminal");
  const inputField = document.querySelector("#commandInput");

  // Clear the terminal and end the query
  terminal.innerHTML = "";
  inputField.value = "";
  currentPrompt = "> ";
  promptElement.innerText = currentPrompt;
  searchPrompt = false;
  linkPrompt = false;
}

function executeCommand(command) {
  const terminal = document.getElementById("terminal");

  switch (command) {
    case "search":
      displaySearchOptions();
      break;
    case "info":
      displayPlatformInfo();
      break;
    case "ip":
      getIPData();
      break;
    case "cls":
      terminal.innerText = "";
      break;
    case "help":
      terminal.innerHTML = `
        <div>commands:</div>
        <div>- [search] - google, brave, bing for now. type google to open google, or google <query> to search etc</div>
        <div>- [info]   - displays what terminal can see via platform.js</div>
        <div>- [ip]     - gets ip address</div>
        <div>- [cls]    - clears terminal</div>
        <div>- [help]   - displays available commands</div>
        <div>- [links]  - links to tools 
        <div>- [txt]    - creates txt edit (lots of work to do still on this)
        <div>- [save]   - saves contents inside of txt editor into local storage
        <div>- [load]   - loads local storage , displays into prompt
        <div>- [exit]   - exits + clears prompt. 
      `;
      break;
    case "links":
      displayLinks();
      break;
    case "txt":
      txt();
      break;
    case "save":
      saveToFile();
      break;
    case "load":
      loadFromFile();
      break;
    case "delete":
      deleteFileCookies();
      break;
    case "exit":
      exitPrompt();
      break;
    default:
      terminal.innerHTML += "<div>Unknown command: " + command + "</div>";
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

  // If last search query exists, show it as a placeholder
  const placeholderText = lastSearchQuery ? `(${lastSearchQuery})` : "";
  currentPrompt = `Enter search engine name and query ${placeholderText}: `;
  promptElement.innerText = currentPrompt;

  // Set the searchPrompt flag to true
  searchPrompt = true;
}

function displayLinks() {
  const terminal = document.getElementById("terminal");

  // Display predetermined links
  terminal.innerHTML += `
    <div>Available links:</div>
    <div data-url="https://link3.com">- Remove PNG</div>
    <div data-url="https://link2.com">- Link 2</div>
    <div data-url="https://link1.com">- Displays</div>
  `;

  // Set the initial selected link index
  let selectedLinkIndex = 0;

  // Function to handle link selection
  function selectLink(index) {
    const linkElements = terminal.querySelectorAll("div[data-url]");
    if (linkElements.length === 0) return;

    // Normalize index within range
    selectedLinkIndex = (index + linkElements.length) % linkElements.length;

    // Remove "selected-link" class from all links
    linkElements.forEach((link) => {
      link.classList.remove("selected-link");
    });

    // Add "selected-link" class to the currently selected link
    const selectedLink = linkElements[selectedLinkIndex];
    selectedLink.classList.add("selected-link");
  }

  // Handle keydown events for arrow navigation
  function handleKeydown(event) {
    if (event.key === "ArrowUp") {
      selectLink(selectedLinkIndex - 1);
    } else if (event.key === "ArrowDown") {
      selectLink(selectedLinkIndex + 1);
    }
  }

  // Attach keydown event listener to the document
  document.addEventListener("keydown", handleKeydown);

  // If last search query exists, show it as a placeholder in the prompt
  const placeholderText = lastSearchQuery ? `(${lastSearchQuery})` : "";
  currentPrompt = `Use arrow keys to select a link and press Enter to open ${placeholderText}`;
  promptElement.innerText = currentPrompt;

  // Set the linkPrompt flag to true
  linkPrompt = true;
}

document.addEventListener("keydown", handleInput);

document.addEventListener("DOMContentLoaded", function () {
  const terminal = document.getElementById("terminal");
  terminal.innerHTML += `
     <pre>
                    dP                                
                    88                                
.d8888b. .d8888b. d8888P .d8888b. 88d888b. 88d8b.d8b. 
88ooood8 88'  \`88   88   88ooood8 88'  \`88 88'\`88'\'88 
88.  ... 88.  .88   88   88.  ... 88       88  88  88 
\`88888P' \`8888P88   dP   \`88888P' dP       dP  dP  dP 
               88                                     
               dP  
      </pre>




eqterm -- 
type 'help' for info
  `;}
)
