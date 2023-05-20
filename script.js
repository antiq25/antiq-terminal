let currentPrompt = "> ";
let lastSearchQuery = "";
let searchPrompt = false;
let linkPrompt = false;
let selectedLinkIndex = 0;
const promptElement = document.getElementById("prompt");
promptElement.innerText = currentPrompt;

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

function handleInput(event) {
  const inputField = document.querySelector("#commandInput");
  const terminal = document.getElementById("terminal");

  if (event.key === "Enter") {
    if (inputField.value.trim().toLowerCase() === "exit") {
      exitPrompt();
      return;
    }

    const selectedLink = terminal.querySelector(".selected-link");

    if (selectedLink) {
      const url = selectedLink.dataset.url;
      terminal.innerHTML += `<div>Opening link: ${selectedLink.textContent}</div>`;
      window.open(url, "_blank");
      //checks to see if anything has been selected before clearing..
      // Clear the terminal and end the query
      terminal.innerHTML = "";
      inputField.value = "";
      currentPrompt = "> ";
      promptElement.innerText = currentPrompt;
      linkPrompt = false;
      selectedLink.classList.remove("selected-link");
    } else if (searchPrompt || linkPrompt) {
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
    } else {
      executeCommand(inputField.value.trim());

      // Clear the input field
      inputField.value = "";
    }
  } else if (event.key === "ArrowUp") {
    // Handle arrow up key event
    event.preventDefault();
    navigateLinkSelection("up");
  } else if (event.key === "ArrowDown") {
    // Handle arrow down key event
    event.preventDefault();
    navigateLinkSelection("down");
  }
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
    case "help":
      terminal.innerHTML = `
        <div>commands:</div>
        <div>-[search] - google, brave, bing for now. type google to open google, or google <query> to search etc</div>
        <div>-[info]   - displays what terminal can see via platform.js</div>
        <div>-[ip]     - gets ip address</div>
        <div>-[help]   - displays available commands</div>
        <div>-[links]  - links to tools 
        <div>-[txt]    - creates txt edit (lots of work to do still on this)
        <div>-[save]   - saves contents inside of txt editor into local storage
        <div>-[load]   - loads local storage , displays into prompt
        <div> [exit]   - exits + clears prompt. (this is your reset)
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
    case "cls":
      exitPrompt();
      break;
    default:
      terminal.innerHTML += "<div>Unknown command: " + command + "</div>";
      break;
  }
}

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
-- 
type 'help' for info
  `;
}
)
