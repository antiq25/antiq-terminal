let currentPrompt = "> ";
let lastSearchQuery = "";
let searchPrompt = false;
let linkPrompt = false;
let addingLink = false;
let selectedLinkIndex = 0;
const promptElement = document.getElementById("prompt");
promptElement.innerText = currentPrompt;

//EXIT AND LEAVE PROMPTS /
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

//KEY ARROWS FOR LINK SEARCHES ETC// 
function navigateLinkSelection(direction) {    
  const terminal = document.getElementById("terminal");
  const linkElements = terminal.querySelectorAll(".link");

  if (linkElements.length === 0) return;

  linkElements[selectedLinkIndex].classList.remove("selected-link");

  if (direction === "up") {
    selectedLinkIndex = (selectedLinkIndex - 1 + linkElements.length) % linkElements.length;
  } else if (direction === "down") {
    selectedLinkIndex = (selectedLinkIndex + 1) % linkElements.length;
  }

  linkElements[selectedLinkIndex].classList.add("selected-link");
  linkElements[selectedLinkIndex].scrollIntoView({ behavior: "smooth", block: "nearest" }); //make the screen follow when selecting links
}


//KEYS PRESSED + KEYS REGISTERED//  THERE MUST BE A SIMPLER WAY TO DO THIS ... 
function handleInput(event) {
  const inputField = document.querySelector("#commandInput");
  const terminal = document.getElementById("terminal");
  if (event.key === "Enter") {
    if (inputField.value.trim().toLowerCase() === "exit") {
      if (addingLink) {
        handleInputLinker(event);
      exitPrompt();
      return;
      }
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

document.addEventListener("keydown", handleInput);

