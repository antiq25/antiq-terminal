const terminalContainer = document.getElementById('terminal');
const input = document.getElementById('input');

const term = new Terminal();
term.open(terminalContainer);

input.addEventListener('keydown', handleInput);

function handleInput(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const command = input.value;
    input.value = '';
    executeCommand(command);
  }
}

function executeCommand(command) {
  const output = document.createElement('p');
  output.textContent = `> ${command}`;
  terminalContainer.appendChild(output);

  // Handle different commands here
  switch (command) {
    case 'help':
      displayHelp();
      break;
    case 'date':
      displayCurrentDate();
      break;
    case 'connect':
      connectToSSHServer();
      break;
    default:
      displayUnknownCommand();
      break;
  }

  // Scroll to the bottom of the terminal
  term.scrollToBottom();
}

function displayHelp() {
  const helpText = document.createElement('p');
  helpText.textContent = 'Available commands: help, date, connect';
  terminalContainer.appendChild(helpText);
}

function displayCurrentDate() {
  const currentDate = new Date();
  const dateText = document.createElement('p');
  dateText.textContent = `Current date: ${currentDate}`;
  terminalContainer.appendChild(dateText);
}

function displayUnknownCommand() {
  const unknownCommandText = document.createElement('p');
  unknownCommandText.textContent = 'Unknown command. Type "help" for a list of available commands.';
  terminalContainer.appendChild(unknownCommandText);
}

function connectToSSHServer() {
  // Replace the placeholders with your SSH server details
  const sshServer = 'your-ssh-server';
  const sshUsername = 'your-ssh-username';
  const sshPassword = 'your-ssh-password';

  const sshConnection = new SSHConnection({
    host: sshServer,
    username: sshUsername,
    password: sshPassword,
  });

  sshConnection.connect()
    .then(() => {
      term.attach(sshConnection);
      term._initialized = true;
    })
    .catch((error) => {
      const errorMessage = document.createElement('p');
      errorMessage.textContent = `Failed to connect to SSH server: ${error}`;
      terminalContainer.appendChild(errorMessage);
    });
}
