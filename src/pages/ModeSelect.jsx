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
    navigate('/editor', { state: { question: filtered[random] } });
  };

  const startTopic = () => {
    const filtered = questions.filter(q => q.topic === topic && q.difficulty === topicDifficulty);
    if(filtered.length === 0) { alert('No questions found!'); return; }
    const random = Math.floor(Math.random() * filtered.length);
    navigate('/editor', { state: { question: filtered[random] } });
  };

  const cardStyle = (color) => ({
    backgroundColor:'#2d2d3f',
    padding:'25px',
    borderRadius:'15px',
    width:'210px',
    textAlign:'center',
    border:`2px solid ${color}`,
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    transition:'transform 0.2s ease',
    cursor:'pointer'
  });

  const selectStyle = (color) => ({
    marginTop:'10px',
    padding:'8px',
    borderRadius:'8px',
    backgroundColor:'#1e1e2e',
    color:'white',
    border:`1px solid ${color}`,
    width:'100%'
  });

  const btnStyle = (color, textColor='white') => ({
    marginTop:'15px',
    padding:'10px 20px',
    backgroundColor:color,
    color:textColor,
    border:'none',
    borderRadius:'8px',
    cursor:'pointer',
    width:'100%',
    fontWeight:'600'
  });

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',backgroundColor:'#1e1e2e',color:'white',fontFamily:'Inter, Arial',padding:'20px'}}>

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',maxWidth:'950px',marginBottom:'10px'}}>
        <div>
          <h1 style={{fontSize:'2rem',fontWeight:'700'}}>Select Practice Mode</h1>
          <p style={{color:'#888',marginTop:'5px'}}>Choose how you want to practice today!</p>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          style={{padding:'10px 20px',backgroundColor:'#2d2d3f',color:'white',border:'1px solid #7c3aed',borderRadius:'8px',cursor:'pointer',fontWeight:'600'}}>
          📊 Dashboard
        </button>
      </div>

      <div style={{display:'flex',gap:'20px',flexWrap:'wrap',justifyContent:'center',alignItems:'stretch',marginTop:'30px'}}>

        <div style={cardStyle('#7c3aed')}>
          <div>
            <p style={{fontSize:'2rem'}}>🎲</p>
            <h2 style={{marginBottom:'8px'}}>Random Mode</h2>
            <p style={{color:'#888',fontSize:'0.9rem'}}>Surprise me with any topic!</p>
            <select value={difficulty} onChange={e => setDifficulty(e.target.value)} style={selectStyle('#7c3aed')}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
          <button onClick={startRandom} style={btnStyle('#7c3aed')}>Start Random</button>
        </div>

        <div style={cardStyle('#22c55e')}>
          <div>
            <p style={{fontSize:'2rem'}}>🎯</p>
            <h2 style={{marginBottom:'8px'}}>Topic Mode</h2>
            <p style={{color:'#888',fontSize:'0.9rem'}}>Practice a specific topic!</p>
            <select value={topic} onChange={e => setTopic(e.target.value)} style={selectStyle('#22c55e')}>
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
            <select value={topicDifficulty} onChange={e => setTopicDifficulty(e.target.value)} style={selectStyle('#22c55e')}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
          <button onClick={startTopic} style={btnStyle('#22c55e')}>Start Topic</button>
        </div>

        <div style={cardStyle('#fbbf24')} onClick={() => navigate('/mock')}>
          <div>
            <p style={{fontSize:'2rem'}}>🏆</p>
            <h2 style={{marginBottom:'8px'}}>Mock Interview</h2>
            <p style={{color:'#888',fontSize:'0.9rem'}}>5 questions, increasing difficulty!</p>
            <p style={{color:'#fbbf24',marginTop:'10px',fontSize:'0.85rem',lineHeight:'1.8'}}>
              Round 1 → Easy<br/>
              Round 2 → Easy<br/>
              Round 3 → Medium<br/>
              Round 4 → Medium<br/>
              Round 5 → Hard
            </p>
          </div>
          <button style={btnStyle('#fbbf24','#000')}>Start Mock Interview</button>
        </div>

        <div style={cardStyle('#3b82f6')} onClick={() => navigate('/collab')}>
          <div>
            <p style={{fontSize:'2rem'}}>👥</p>
            <h2 style={{marginBottom:'8px'}}>Collab Mode</h2>
            <p style={{color:'#888',fontSize:'0.9rem'}}>Code together in real time!</p>
            <p style={{color:'#3b82f6',marginTop:'10px',fontSize:'0.85rem',lineHeight:'1.8'}}>
              Create a room<br/>
              Share the ID<br/>
              Code together!
            </p>
          </div>
          <button style={btnStyle('#3b82f6')}>Start Collab</button>
        </div>

      </div>
    </div>
  );
}

export default ModeSelect;