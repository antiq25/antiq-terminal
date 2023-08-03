
let currentPrompt = "> ";
let lastSearchQuery = "";
let searchPrompt = false;
let linkPrompt = false;
let addingLink = false;
let selectedLinkIndex = 0;

const promptElement = document.getElementById("prompt");
promptElement.innerText = currentPrompt;

function exitPrompt() {
  const terminal = document.getElementById("terminal");
  const inputField = document.querySelector("#commandInput");

  terminal.innerHTML = "";
  inputField.value = "";
  currentPrompt = "> ";
  promptElement.innerText = currentPrompt;
  searchPrompt = false;
  linkPrompt = false;
}

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
  linkElements[selectedLinkIndex].scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function handleInput(event) {
  const inputField = document.querySelector("#commandInput");
  const terminal = document.getElementById("terminal");

  if (event.key === "Enter") {
    if (inputField.value.trim().toLowerCase() === "exit") {
      if (addingLink) {
        // handleInputLinker(event); // make sure this function is defined
        addingLink = false;
      }
      exitPrompt();
      return;
    }

    const selectedLink = terminal.querySelector(".selected-link");

    if (selectedLink) {
      const url = selectedLink.dataset.url;
      terminal.innerHTML += `<div>Opening link: ${selectedLink.textContent}</div>`;
      window.open(url, "_blank");

      // Do not clear terminal before removing class from selectedLink, selectedLink would be null
      selectedLink.classList.remove("selected-link");
      terminal.innerHTML = "";
      inputField.value = "";
      currentPrompt = "> ";
      promptElement.innerText = currentPrompt;
      linkPrompt = false;
    } else if (searchPrompt || linkPrompt) {
      if (searchPrompt) {
        executeSearch(inputField.value.trim());
      } else {
        // Handle other prompts as needed
      }
        
      inputField.value = "";
      currentPrompt = "> ";
      promptElement.innerText = currentPrompt;
      searchPrompt = false;
      linkPrompt = false;
    } else {
      executeCommand(inputField.value.trim());

      inputField.value = "";
    }
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    navigateLinkSelection("up");
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    navigateLinkSelection("down");
  }
}

document.addEventListener("keydown", handleInput);


window.onload = function() {
  const commandInput = document.getElementById('commandInput');
  commandInput.focus();
};