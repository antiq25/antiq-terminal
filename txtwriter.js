// Text file writer functions
function txt() {
    const terminal = document.getElementById("terminal");
  
    // Create a new text input element
    const fileContents = document.createElement("textarea");
    fileContents.setAttribute("id", "file-contents");
  
    // Append the text input element to the terminal
    terminal.appendChild(fileContents);
  
    // Set the focus to the text input element
    fileContents.focus();
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
      <select id="fileSelect">
        ${fileSelectHtml}
      </select>
      <button id="loadButton">Load</button>
    `;
    
    terminal.innerHTML += loadFormHtml;
    
    const fileSelect = document.querySelector("#fileSelect");
    const loadButton = document.querySelector("#loadButton");
    
    loadButton.addEventListener("click", () => {
      const selectedFile = fileSelect.value;
      const selectedCookie = fileCookies.find((cookie) => cookie.substring(14) === selectedFile);
    
      if (!selectedCookie) {
        terminal.innerHTML += "<div>File not found.</div>";
        return;
      }
    
      const fileContent = decodeURIComponent(selectedCookie.split("=")[1]);
      terminal.innerHTML += `<div>${fileContent}</div>`;
    });
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
  }
