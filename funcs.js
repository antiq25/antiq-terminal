
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
  <pre>

OS: ${systemInfo.os.toString()}
Browser: ${systemInfo.name} ${systemInfo.version}
CPU Cores: ${navigator.hardwareConcurrency}
Screen Resolution: ${window.screen.width} x  ${window.screen.height}
Platform: ${systemInfo.description}
`;
  const printInfo = document.createElement("div");
  printInfo.innerHTML = infoString;
  const terminal = document.getElementById("terminal");
  terminal.appendChild(printInfo);
  getIPData();
}

document.addEventListener("DOMContentLoaded", function () {
  displayPlatformInfo();
});
