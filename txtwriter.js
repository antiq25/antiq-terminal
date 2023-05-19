function txt() {
  if (txtMode) {
    // Exiting txt mode
    const terminal = document.getElementById("terminal");
    const inputField = document.querySelector("#commandInput");

    // Remove the textarea element
    const fileContents = document.getElementById("file-contents");
    if (fileContents) {
      terminal.removeChild(fileContents);
    }

    // Re-enable the input field
    inputField.disabled = false;

    // Reset the txtMode flag
    txtMode = false;
  } else {
    // Entering txt mode
    txtMode = true;
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
    fileContents.addEventListener("keydown", function(event) {
      event.stopPropagation();
    });

    // Append the text input element to the terminal
    terminal.appendChild(fileContents);

    // Set the focus to the text input element
    fileContents.focus();
  }
}


function saveToFile() {
  const terminal = document.getElementById("terminal");
  const inputField = document.querySelector("#commandInput");

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

  // Re-enable the input field
  inputField.disabled = false;
  txtMode = false; // We're exiting the txt mode
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
