import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import questions from '../data/questions.json';

function ModeSelect() {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState('Easy');
  const [topic, setTopic] = useState('Arrays');
  const [topicDifficulty, setTopicDifficulty] = useState('Easy');

  const startRandom = () => {
    const filtered = questions.filter(q => q.difficulty === difficulty);
    const random = Math.floor(Math.random() * filtered.length);
    const question = filtered[random];
    navigate('/editor', { state: { question } });
  };

  const startTopic = () => {
    const filtered = questions.filter(q => q.topic === topic && q.difficulty === topicDifficulty);
    if(filtered.length === 0) {
      alert('No questions found for this topic and difficulty!');
      return;
    }
    const random = Math.floor(Math.random() * filtered.length);
    const question = filtered[random];
    navigate('/editor', { state: { question } });
  };

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',backgroundColor:'#1e1e2e',color:'white',fontFamily:'Arial',padding:'20px'}}>
      <h1 style={{fontSize:'2.5rem',marginBottom:'10px'}}>Select Practice Mode</h1>
      <p style={{color:'#888',marginBottom:'40px'}}>Choose how you want to practice today!</p>

      <div style={{display:'flex',gap:'20px',flexWrap:'wrap',justifyContent:'center',alignItems:'stretch'}}>

        {/* Random Mode */}
        <div style={{backgroundColor:'#2d2d3f',padding:'30px',borderRadius:'15px',width:'220px',textAlign:'center',border:'2px solid #7c3aed',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
          <div>
            <h2>🎲 Random Mode</h2>
            <p style={{color:'#888'}}>Surprise me with any topic!</p>
            <select
              value={difficulty}
              onChange={e => setDifficulty(e.target.value)}
              style={{marginTop:'15px',padding:'8px',borderRadius:'8px',backgroundColor:'#1e1e2e',color:'white',border:'1px solid #7c3aed',width:'100%'}}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
          <button
            onClick={startRandom}
            style={{marginTop:'15px',padding:'10px 20px',backgroundColor:'#7c3aed',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',width:'100%'}}>
            Start Random
          </button>
        </div>

        {/* Topic Mode */}
        <div style={{backgroundColor:'#2d2d3f',padding:'30px',borderRadius:'15px',width:'220px',textAlign:'center',border:'2px solid #22c55e',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
          <div>
            <h2>🎯 Topic Mode</h2>
            <p style={{color:'#888'}}>Practice a specific topic!</p>
            <select
              value={topic}
              onChange={e => setTopic(e.target.value)}
              style={{marginTop:'15px',padding:'8px',borderRadius:'8px',backgroundColor:'#1e1e2e',color:'white',border:'1px solid #22c55e',width:'100%'}}>
              <option>Arrays</option>
              <option>Strings</option>
              <option>Trees</option>
              <option>Graphs</option>
              <option>Dynamic Programming</option>
              <option>Linked Lists</option>
              <option>Stacks</option>
              <option>Sorting</option>
              <option>Searching</option>
              <option>Numbers</option>
            </select>
            <select
              value={topicDifficulty}
              onChange={e => setTopicDifficulty(e.target.value)}
              style={{marginTop:'10px',padding:'8px',borderRadius:'8px',backgroundColor:'#1e1e2e',color:'white',border:'1px solid #22c55e',width:'100%'}}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
          <button
            onClick={startTopic}
            style={{marginTop:'15px',padding:'10px 20px',backgroundColor:'#22c55e',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',width:'100%'}}>
            Start Topic
          </button>
        </div>

        {/* Mock Interview Mode */}
        <div
          onClick={() => navigate('/mock')}
          style={{backgroundColor:'#2d2d3f',padding:'30px',borderRadius:'15px',width:'220px',textAlign:'center',border:'2px solid #fbbf24',cursor:'pointer',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
          <div>
            <h2>🏆 Mock Interview</h2>
            <p style={{color:'#888'}}>5 questions, increasing difficulty!</p>
            <p style={{color:'#fbbf24',marginTop:'15px',fontSize:'0.9rem'}}>
              Round 1 → Easy<br/>
              Round 2 → Easy<br/>
              Round 3 → Medium<br/>
              Round 4 → Medium<br/>
              Round 5 → Hard
            </p>
          </div>
          <button
            style={{marginTop:'15px',padding:'10px 20px',backgroundColor:'#fbbf24',color:'black',border:'none',borderRadius:'8px',cursor:'pointer',width:'100%'}}>
            Start Mock Interview
          </button>
        </div>

      </div>
    </div>
  );
}

export default ModeSelect;