const linkSections = {
  "DNS, CDN, DDOS": [
    ["Cloudflare", "https://www.cloudflare.com", "DNS CDN DDOS"]
  ],
  "Development": [
    ["WebDev", "https://webdevhome.github.io", "Dev Homepage"],
    ["Dev.to", "https://dev.to", "Dev Social"],
    ["DevURLs", "https://devurls.com", "Dev News"],
    ["OpenSource", "https://awesomeopensource.com", "FOSS Dev"],
    ["FreeDev", "https://free-for.dev", "Free Dev"]
    // Add other Development links
  ],
  "Web Server": [
    ["NGINXConf", "https://www.digitalocean.com/community/tools/nginx", "Web Server"],
    ["NGINXDocker", "https://nginxproxymanager.com", "Web Server"],
    ["NGINXGuide", "https://github.com/trimstray/nginx-admins-handbook", "Web Server"]
    // Add other Web Server links
  ],
  "Code": [
    ["svgCode", "red", "-HEAD-"],
    ["Cheat.sh", "https://cheat.sh", "Cheat Sheet"],
    ["CheatSheet", "https://lecoupa.github.io/awesome-cheatsheets/", "Cheat Sheet"],
    ["Cheat-Sheet", "https://lzone.de/cheat-sheet.html", "Cheat Sheet"],
    ["PublicAPI", "https://public-apis.io", "API Info"],
    ["PublicAPI2", "https://github.com/public-apis/public-apis", "API Info"],
    ["DevRoadmap", "https://roadmap.sh", "Learning Guides"],
    ["FastDesign", "https://www.fast.design", "Code Packages"],
    ["Libraries", "https://libraries.io", "Code Packages"],
    ["Word2HTML", "https://word2cleanhtml.com", "HTML Convert"],
    ["RequestBin", "https://requestbin.com", "Dev Tools"],
    ["GeekTool", "https://gf.dev/toolbox", "Dev Tools"],
    ["GitHub", "https://github.com/trending?since=monthly", "Code Colab"],
    ["GitLab", "https://gitlab.com", "Code Colab"],
    ["Repl.it", "https://repl.it", "Code Colab"],
    ["SharePad", "https://www.sharepad.io", "Code Colab"],
    ["3V4L", "https://3v4l.org", "Test Code"],
    ["CodePen", "https://codepen.io", "Explore Code"],
    ["CodeSandbox", "https://codesandbox.io/search", "Explore Code"],
    ["DevDocs", "https://devdocs.io", "WebDev Docs"],
    ["Humans", "https://humans.fyi", "Website Gallery"],
    ["RegEx101", "https://regex101.com", "RegEx"],
    ["FavMatic", "http://www.favicomatic.com", "Favicon"]
  ],
  "Fonts": [
    ["NerdFonts", "https://nerdfonts.com", "Fonts"],
    ["GoogleFont", "https://google-webfonts-helper.herokuapp.com", "Fonts"],
    ["iFonts", "https://ifonts.xyz", "Fonts"],
    ["DFonts", "https://www.dfonts.org", "Fonts"],
    ["DaFont", "https://www.dafont.com", "Fonts"],
    ["GetFont", "https://getfont.herokuapp.com", "Fonts"],
    ["FontGet", "https://www.fontget.com", "Fonts"],
    ["DevFonts", "https://devfonts.gafi.dev", "Fonts"],
    ["Squirrel", "https://www.fontsquirrel.com", "Fonts"],
    ["FontSpace", "https://www.fontspace.com", "Fonts"],
    ["DaFontFree", "https://www.dafontfree.io", "Fonts"]
  ]
};

// Add other sections and their links


function navigateLinkSelection(direction) {   //KEY NAVIGATION // 
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


document.addEventListener("keydown", handleInput);



