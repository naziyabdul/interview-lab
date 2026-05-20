const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI('AIzaSyALrLJRhdestpbXrcTuBw4uHJ82TQwrZ_I');

app.post('/run', (req, res) => {
  const { code, language } = req.body;
  let filename, command;

  if(language === 'python') { filename = 'temp.py'; command = `python ${filename}`; }
  else if(language === 'javascript') { filename = 'temp.js'; command = `node ${filename}`; }
  else if(language === 'java') { filename = 'Main.java'; command = `javac ${filename} && java Main`; }
  else if(language === 'cpp') { filename = 'temp.cpp'; command = `g++ ${filename} -o temp && temp`; }
  else if(language === 'c') { filename = 'temp.c'; command = `gcc ${filename} -o temp && temp`; }

  fs.writeFileSync(filename, code);
  exec(command, { timeout: 10000 }, (error, stdout, stderr) => {
    fs.unlinkSync(filename);
    if(error) res.json({ stderr: stderr || error.message });
    else res.json({ stdout: stdout });
  });
});

app.post('/feedback', async (req, res) => {
  const { code, language, question } = req.body;
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `Evaluate this code solution:
Question: ${question.title}
Language: ${language}
Code: ${code}
Respond ONLY with JSON:
{
  "score": 8,
  "good": "what is good",
  "improve": "what to improve",
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "optimizedSolution": "better code"
}`;
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const clean = text.replace(/```json|```/g, '').trim();
    res.json(JSON.parse(clean));
  } catch(err) {
    res.json({ score: 0, good: 'Error', improve: 'Try again', timeComplexity: 'N/A', spaceComplexity: 'N/A', optimizedSolution: '' });
  }
});

const rooms = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    if(!rooms[roomId]) rooms[roomId] = { code: '', users: [] };
    rooms[roomId].users.push(socket.id);
    socket.emit('room-joined', { code: rooms[roomId].code, users: rooms[roomId].users.length });
    io.to(roomId).emit('user-count', rooms[roomId].users.length);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on('code-change', ({ roomId, code }) => {
    if(rooms[roomId]) rooms[roomId].code = code;
    socket.to(roomId).emit('code-update', code);
  });

  socket.on('disconnect', () => {
    Object.keys(rooms).forEach(roomId => {
      rooms[roomId].users = rooms[roomId].users.filter(id => id !== socket.id);
      io.to(roomId).emit('user-count', rooms[roomId].users.length);
    });
    console.log('User disconnected:', socket.id);
  });
});

server.listen(5000, () => {
  console.log('Backend running on port 5000');
});