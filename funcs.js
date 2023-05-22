
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
  const infoString = 
  `
  <pre>
    <style>
    .ascii-art {
        color: #ffff; 
        font-family: monospace;
        font-size: 12px;
    ;
    }
    .ascii-art span {
        font-size 10px;
        display: inline-block;
        color: #2ecc71;
    }
  </style>
  <div class="ascii-art">
   <span>                   dP                                </span>
  <span>                    88                                </span>
  <span>.d8888b. .d8888b. d8888P .d8888b. 88d888b. 88d8b.d8b. </span>
  <span>88ooood8 88'  \`88   88   88ooood8 88'  \`88 88'\`88'\'88 </span>
  <span>88.  ... 88.  .88   88   88.  ... 88       88  88  88 </span>
  <span>\`88888P' \`8888P88   dP   \`88888P' dP       dP  dP  dP </span>
  <span>               88                                     </span>
  <span>               dP     
  </span>
-- type 'help' for cmds-- 

OS: ${systemInfo.os.toString()}
Browser: ${systemInfo.name} ${systemInfo.version}
CPU Cores: ${navigator.hardwareConcurrency}
Screen Resolution: ${window.screen.width} x  ${window.screen.height}
Platform: ${systemInfo.description}
</pre>
</div>
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
