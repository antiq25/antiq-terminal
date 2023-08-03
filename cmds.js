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
      <pre>
        <div>commands:
        <div> [search] - google, brave, bing for now. type google to open google, or google <query> to search etc</div>
        <div> [info]   - displays what terminal can see via platform.js</div>
        <div> [ip]     - gets ip address</div>
        <div> [help]   - displays available commands</div>
        <div> [links]  -  displays links + your links </div> 
        <div> [link.add] - prompts you to create a link, then adds it to link tree.</div>
        <div> [txt]    - creates txt edit (lots of work to do still on this)</div>
        <div> [save]   - saves contents inside of txt editor into local storage</div>
        <div> [load]   - loads local storage , displays into prompt</div>
        <div> [cls]   - exits + clears prompt. (this is your reset)</div>
        </pre>

        </div>

        created by antiq [github.com/antiq25]
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
      displayPlatformInfo();
      break;
    case "link.add":
    addLink()
    break;
    default:
      terminal.innerHTML += "<div>Unknown command: " + command + "</div>";
      break;
  }
}
