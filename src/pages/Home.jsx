import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh',backgroundColor:'#1e1e2e',color:'white',fontFamily:'Arial'}}>
      <h1 style={{fontSize:'3rem',marginBottom:'10px'}}>Interview Lab</h1>
      <p style={{fontSize:'1.2rem',marginBottom:'40px',color:'#888'}}>Practice coding interviews with AI feedback!</p>
      <button onClick={() => navigate('/mode')} style={{padding:'15px 40px',fontSize:'1.2rem',backgroundColor:'#7c3aed',color:'white',border:'none',borderRadius:'10px',cursor:'pointer'}}>
        Start Practice
      </button>
    </div>
  );
}

export default Home;