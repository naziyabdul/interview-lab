const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/run', (req, res) => {
  const { code, language } = req.body;

  let filename, command;

  if(language === 'python') {
    filename = 'temp.py';
    command = `python ${filename}`;
  } else if(language === 'javascript') {
    filename = 'temp.js';
    command = `node ${filename}`;
  } else if(language === 'java') {
    filename = 'Main.java';
    command = `javac ${filename} && java Main`;
  } else if(language === 'cpp') {
    filename = 'temp.cpp';
    command = `g++ ${filename} -o temp && temp`;
  } else if(language === 'c') {
    filename = 'temp.c';
    command = `gcc ${filename} -o temp && temp`;
  }

  fs.writeFileSync(filename, code);

  exec(command, { timeout: 10000 }, (error, stdout, stderr) => {
    fs.unlinkSync(filename);
    if(error) {
      res.json({ stderr: stderr || error.message });
    } else {
      res.json({ stdout: stdout });
    }
  });
});

app.listen(5000, () => {
  console.log('Backend running on port 5000');
});