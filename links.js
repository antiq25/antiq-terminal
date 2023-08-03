const linkSections = { 
  'type exit to leave after creating links': [
  ]
}

// Add other sections and their links


function displayLinks() {
  const terminal = document.getElementById("terminal");
  let linksHTML = "";

  // Iterate over link sections and create the links HTML string
  for (const section in linkSections) {
    linksHTML += `<div class="section-title">${section}</div>`;
    linkSections[section].forEach(link => {
      linksHTML += `<div data-url="${link[1]}" class="link">${link[0]}</div>`;
    });
  }

  // Add the links HTML to the terminal
  terminal.innerHTML = linksHTML;

  // Add event listener to each link
  const links = terminal.getElementsByClassName("link");
  for (const link of links) {
    link.addEventListener("keydown", handleInput);
  }
}
function addLink() {
  const terminal = document.getElementById("terminal");
  const inputField = document.querySelector("#commandInput");

  let linkName = prompt("Please enter the name of the link:");
  if (linkName.length === 0) {
    terminal.innerHTML += "<div>Link name cannot be empty.</div>";
    return;
  }

  let linkUrl = prompt("Please enter the URL of the link:");
  if (linkUrl.length === 0) {
    terminal.innerHTML += "<div>Link URL cannot be empty.</div>";
    return;
  }

  let sectionFound = false;
  let foundSection = null;

  // Find the section to add the link or create a new section
  for (const section in linkSections) {
    if (linkSections.hasOwnProperty(section)) {
      const links = linkSections[section];
      for (const link of links) {
        if (link[0].toLowerCase() === linkName.toLowerCase()) {
          link[1] = linkUrl; // Update the link URL
          sectionFound = true;
          foundSection = section;
          break;
        }
      }
      if (sectionFound) {
        break;
      }
    }
  }

  if (!sectionFound) {
    foundSection = "Custom Links"; // Set the section name for user-added links
    if (!linkSections.hasOwnProperty(foundSection)) {
      linkSections[foundSection] = [];
    }
    linkSections[foundSection].push([linkName, linkUrl]);
  }

  terminal.innerHTML += "<div>Link added successfully.</div>";

  // Print the updated links
  displayLinks();
}
