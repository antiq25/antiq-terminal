
function getIPData() {
  let t = new XMLHttpRequest();
  t.open("GET", "https://icanhazip.com", true),
  (t.onload = function () {
      if (200 <= t.status && 400 > t.status) {
          let e = t.responseText;
          const ipOutput = document.createElement("div"); // Create a new div element to hold the IP address
          ipOutput.innerHTML = '<a href="https://ipleak.net/"  target="_blank"> ' + e + "</a>";
          document.getElementById("terminal").appendChild(ipOutput); // Append the new div element to the terminal
      } 
  }),
  (t.onerror = function () { }),
  t.send();
}

function clearInput() {
  const inputField = document.getElementById("commandInput");
  inputField.value = "";
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

function displayPlatformInfo() {
  if (typeof platform === "undefined") {
    console.error("platform.js library is not loaded.");
    return;
  }

  const systemInfo = platform.parse(navigator.userAgent);
  console.log(systemInfo);

  function parseUserNameFromUserAgent(userAgent) {
    const match = /Mozilla\/\d\.\d.*?\((.*?)[\);]/.exec(userAgent);
    if (match) {
      const tokens = match[1].split(";").map((token) => token.trim());
      for (const token of tokens) {
        if (token.startsWith("Mac OS X")) {
          return token.replace("Mac OS X ", "");
        } else if (token.startsWith("Windows")) {
          return token.replace("Windows ", "");
        } else if (token.startsWith("Linux")) {
          return token.replace("Linux ", "");
        }
      }
    }
    return "Unknown User";
  }

  const userName = parseUserNameFromUserAgent(navigator.userAgent);
  const infoString = `
    <div>Information for ${userName}</div>
    <div>OS: ${systemInfo.os.toString()}</div>
    <div>Browser: ${systemInfo.name} ${systemInfo.version}</div>
    <div>CPU Cores: ${navigator.hardwareConcurrency}</div>
    <div>Screen Resolution: ${window.screen.width} x ${window.screen.height}</div>
    <div>Platform: ${systemInfo.description}</div>
  `;
  const printInfo = document.createElement("div");
  printInfo.innerHTML = infoString;
  const terminal = document.getElementById("terminal");
  getIPData()

  // Get the user's geolocation
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude.toFixed(6);
        const longitude = position.coords.longitude.toFixed(6);
        const locationString = `
          <div>Latitude: ${latitude}</div>
          <div>Longitude: ${longitude}</div>
        `;
        const locationInfo = document.createElement("div");
        locationInfo.innerHTML = locationString;
        printInfo.appendChild(locationInfo);
        terminal.appendChild(printInfo);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          terminal.innerHTML += "<div>Unable to fetch location.</div>";
        } else {
          console.error(error);
        }
        terminal.appendChild(printInfo);
      }
    );
  } else {
    terminal.appendChild(printInfo);
  }
}




