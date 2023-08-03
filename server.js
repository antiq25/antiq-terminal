// Server.js
const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/execute', (req, res) => {
  const command = req.query.command
  res.sendFile(__dirname + '/index.html');


  exec(command, (error, stdout, stderr) => {
    if (error) {
      res.send(stderr);
    } else {
      res.send(stdout);
    }
  });
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
