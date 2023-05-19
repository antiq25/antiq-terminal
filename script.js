let currentPrompt = "> ";
let lastSearchQuery = "";
let searchPrompt = false;
let linkPrompt = false;
let txtMode = false;

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
        }

        // Clear the input field
        inputField.value = "";
        currentPrompt = "> ";
        promptElement.innerText = currentPrompt;
        searchPrompt = false;
        linkPrompt = false;
      }
    } else if (txtMode) {
      processTextModeInput(inputField.value.trim());

      // Clear the input field
      inputField.value = "";
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
  txtMode = false;

  // Re-enable the input field
  inputField.disabled = false;
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
      enterTextMode();
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

function executeSearch(searchEngineQuery) {
  const terminal = document.getElementById("terminal");

  // Split the search engine and the query
  const [searchEngine, ...queryParts] = searchEngineQuery.split(" ");
  const query = queryParts.join(" ");

  let url;
  switch (searchEngine.toLowerCase()) {
    case 'google':
      url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      break;
    case 'brave':
      url = `https://search.brave.com/search?q=${encodeURIComponent(query)}`;
      break;
    case 'bing':
      url = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
      break;
    default:
      terminal.innerHTML += `<div>Unknown search engine: ${searchEngine}</div>`;
      return;
  }

  // If we're here, we have a valid search engine and query
  terminal.innerHTML += `<div>Searching ${searchEngine} for: ${query}</div>`;
  window.open(url, "_blank");
  lastSearchQuery = query;  // Save the query for future use
}

function displaySearchOptions() {
  const terminal = document.getElementById("terminal");

  // Display search engine options
  terminal.innerHTML += `
    <div>Select search engine: ie . google nameofsearch</div>
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

function enterTextMode() {
  txtMode = true; // Enter text mode
  const terminal = document.getElementById("terminal");
  const inputField = document.querySelector("#commandInput");

  // Disable the input field
  inputField.disabled = true;

  // Clear the terminal before creating a new text input element
  terminal.innerHTML = "";

  // Create a new text input element
  const fileContents = document.createElement("textarea");
  fileContents.setAttribute("id", "file-contents");

  // Add a keydown event listener that stops event propagation
  fileContents.addEventListener("keydown", function (event) {
    event.stopPropagation();
  });

  // Append the text input element to the terminal
  terminal.appendChild(fileContents);

  // Set the focus to the text input element
  fileContents.focus();

  // Display the text mode message in the prompt
  currentPrompt = "Entering text mode. Type 'exit' or click 'Exit' to exit.";
  promptElement.innerText = currentPrompt;

  // Create the exit button
  const exitButton = document.createElement("button");
  exitButton.textContent = "Exit";
  exitButton.addEventListener("click", exitTextMode);
  terminal.appendChild(exitButton);
}

function processTextModeInput(input) {
  if (input === "exit") {
    exitTextMode();
  } else {
    // Handle text mode input as needed
    // Example: Display the input in the terminal
    const terminal = document.getElementById("terminal");
    terminal.innerHTML += `<div>${input}</div>`;
  }
}

function exitTextMode() {
  const terminal = document.getElementById("terminal");
  const inputField = document.querySelector("#commandInput");

  // Clear the terminal and end the query
  terminal.innerHTML = "";
  inputField.value = "";
  currentPrompt = "> ";
  promptElement.innerText = currentPrompt;
  searchPrompt = false;
  linkPrompt = false;
  txtMode = false;

  // Re-enable the input field
  inputField.disabled = false;
}

function saveToFile() {
  const terminal = document.getElementById("terminal");

  // Prompt the user to enter a name for the file
  const fileName = prompt("Enter a name for the file:");

  if (!fileName) {
    terminal.innerHTML += "<div>File save cancelled.</div>";
    return;
  }

  // Get the file contents from the textarea
  const fileContents = document.getElementById("file-contents").value.trim();

  // Save the file contents to a cookie with the specified name
  document.cookie = `terminal-file-${fileName}=${encodeURIComponent(fileContents)}`;

  // Display a confirmation message
  terminal.innerHTML += `<div>File "${fileName}" saved.</div>`;
}

function loadFromFile() {
  const terminal = document.querySelector("#terminal");

  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  const fileCookies = cookies.filter((cookie) => cookie.startsWith("terminal-file-"));

  if (fileCookies.length === 0) {
    terminal.innerHTML += "<div>No saved files found.</div>";
    return;
  }

  const fileList = fileCookies.map((cookie) => cookie.substring(14));
  const fileSelectHtml = fileList.map((file) => `<option value="${file}">${file}</option>`).join('');
  const loadFormHtml = `
      <div>Files:</div>
      <select class="fileSelect">
        ${fileSelectHtml}
      </select>
      <button class="loadButton">Load</button>
    `;

  // Check if the file select element and "Load" button already exist
  const existingFileSelect = document.querySelector(".fileSelect");
  const existingLoadButton = document.querySelector(".loadButton");

  if (existingFileSelect && existingLoadButton) {
    existingFileSelect.innerHTML = fileSelectHtml;
  } else {
    terminal.innerHTML += loadFormHtml;
  }

  const fileSelect = document.querySelector(".fileSelect:last-of-type");
  const loadButton = document.querySelector(".loadButton:last-of-type");

  const loadHandler = () => {
    const selectedFile = fileSelect.value;
    const selectedCookie = fileCookies.find((cookie) => cookie.substring(14) === selectedFile);

    if (!selectedCookie) {
      terminal.innerHTML += "<div>File not found.</div>";
      return;
    }

    // Clear the terminal before loading the selected file
    terminal.innerHTML = "";

    const fileContent = decodeURIComponent(selectedCookie.split("=")[1]);
    terminal.innerHTML += `<div>${fileContent}</div>`;
  };

  loadButton.addEventListener("click", loadHandler);
  txtMode = false; // We're exiting the txt mode
}

function deleteFileCookies() {
  // Get all cookies that start with "terminal-file-"
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  const fileCookies = cookies.filter((cookie) => cookie.startsWith("terminal-file-"));

  // Delete each file cookie
  for (const cookie of fileCookies) {
    const cookieName = cookie.split("=")[0];
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  // Display a confirmation message
  const terminal = document.getElementById("terminal");
  terminal.innerHTML += "<div>All saved files deleted.</div>";
  txtMode = false; // We're exiting the txt mode
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
  `;
});
