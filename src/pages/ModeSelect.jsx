import React from 'react';
import { useNavigate } from 'react-router-dom';

function ModeSelect() {
  const navigate = useNavigate();
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh',backgroundColor:'#1e1e2e',color:'white',fontFamily:'Arial'}}>
      <h1 style={{fontSize:'2.5rem',marginBottom:'10px'}}>Select Practice Mode</h1>
      <p style={{color:'#888',marginBottom:'40px'}}>Choose how you want to practice today!</p>
      <div style={{display:'flex',gap:'30px'}}>

        <div style={{backgroundColor:'#2d2d3f',padding:'30px',borderRadius:'15px',width:'220px',textAlign:'center',cursor:'pointer',border:'2px solid #7c3aed'}}>
          <h2>Random Mode</h2>
          <p style={{color:'#888'}}>Surprise me with any topic!</p>
          <select style={{marginTop:'15px',padding:'8px',borderRadius:'8px',backgroundColor:'#1e1e2e',color:'white',border:'1px solid #7c3aed',width:'100%'}}>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <button onClick={() => navigate('/editor')} style={{marginTop:'15px',padding:'10px 20px',backgroundColor:'#7c3aed',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',width:'100%'}}>
            Start Random
          </button>
        </div>

        <div style={{backgroundColor:'#2d2d3f',padding:'30px',borderRadius:'15px',width:'220px',textAlign:'center',cursor:'pointer',border:'2px solid #22c55e'}}>
          <h2>Topic Mode</h2>
          <p style={{color:'#888'}}>Practice a specific topic!</p>
          <select style={{marginTop:'15px',padding:'8px',borderRadius:'8px',backgroundColor:'#1e1e2e',color:'white',border:'1px solid #22c55e',width:'100%'}}>
            <option>Arrays</option>
            <option>Strings</option>
            <option>Trees</option>
            <option>Graphs</option>
            <option>Dynamic Programming</option>
          </select>
          <select style={{marginTop:'10px',padding:'8px',borderRadius:'8px',backgroundColor:'#1e1e2e',color:'white',border:'1px solid #22c55e',width:'100%'}}>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <button onClick={() => navigate('/editor')} style={{marginTop:'15px',padding:'10px 20px',backgroundColor:'#22c55e',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',width:'100%'}}>
            Start Topic
          </button>
        </div>

      </div>
    </div>
  );
}

export default ModeSelect;