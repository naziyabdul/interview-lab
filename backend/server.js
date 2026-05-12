const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI('AIzaSyALrLJRhdestpbXrcTuBw4uHJ82TQwrZ_I');

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

  console.log('Feedback request received!');
  console.log('Code:', req.body.code); {
  const { code, language, question } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a coding interview evaluator. Evaluate this code solution:

Question: ${question.title}
Description: ${question.description}
Language: ${language}
Code: ${code}

Please provide your response ONLY as a JSON object with no extra text:
{
  "score": 8,
  "good": "What is good about the code",
  "improve": "What can be improved",
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "optimizedSolution": "optimized code here"
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const clean = text.replace(/```json|```/g, '').trim();
    const feedback = JSON.parse(clean);
    res.json(feedback);

  } catch(err) {
    console.error('AI feedback error:', err);
    res.json({
      score: 0,
      good: 'Could not evaluate code',
      improve: 'Please try again',
      timeComplexity: 'N/A',
      spaceComplexity: 'N/A',
      optimizedSolution: ''
    });
  }
});

app.listen(5000, () => {
  console.log('Backend running on port 5000');
});