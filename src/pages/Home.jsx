import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../firebase';

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate('/mode');
    } catch(err) {
      setError('Login failed! Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      minHeight:'100vh',
      backgroundColor:'#1e1e2e',
      color:'white',
      fontFamily:'Inter, Arial'
    }}>
      <div style={{textAlign:'center',maxWidth:'600px',padding:'20px'}}>

        <div style={{fontSize:'4rem',marginBottom:'20px'}}>👨‍💻</div>

        <h1 style={{
          fontSize:'3.5rem',
          fontWeight:'700',
          marginBottom:'15px',
          background:'linear-gradient(135deg, #7c3aed, #22c55e)',
          WebkitBackgroundClip:'text',
          WebkitTextFillColor:'transparent'
        }}>
          Interview Lab
        </h1>

        <p style={{
          fontSize:'1.2rem',
          color:'#888',
          marginBottom:'40px',
          lineHeight:'1.6'
        }}>
          Practice coding interviews with AI feedback,
          real-time collaboration and performance tracking!
        </p>

        <div style={{display:'flex',gap:'20px',justifyContent:'center',marginBottom:'40px',flexWrap:'wrap'}}>
          <div style={{backgroundColor:'#2d2d3f',borderRadius:'12px',padding:'15px 20px',textAlign:'center',minWidth:'120px'}}>
            <p style={{fontSize:'1.5rem'}}>🤖</p>
            <p style={{color:'#888',fontSize:'0.9rem',marginTop:'5px'}}>AI Feedback</p>
          </div>
          <div style={{backgroundColor:'#2d2d3f',borderRadius:'12px',padding:'15px 20px',textAlign:'center',minWidth:'120px'}}>
            <p style={{fontSize:'1.5rem'}}>👥</p>
            <p style={{color:'#888',fontSize:'0.9rem',marginTop:'5px'}}>Collab Mode</p>
          </div>
          <div style={{backgroundColor:'#2d2d3f',borderRadius:'12px',padding:'15px 20px',textAlign:'center',minWidth:'120px'}}>
            <p style={{fontSize:'1.5rem'}}>📊</p>
            <p style={{color:'#888',fontSize:'0.9rem',marginTop:'5px'}}>Dashboard</p>
          </div>
          <div style={{backgroundColor:'#2d2d3f',borderRadius:'12px',padding:'15px 20px',textAlign:'center',minWidth:'120px'}}>
            <p style={{fontSize:'1.5rem'}}>⏱️</p>
            <p style={{color:'#888',fontSize:'0.9rem',marginTop:'5px'}}>Timer</p>
          </div>
        </div>

        {error && (
          <p style={{color:'#ef4444',marginBottom:'20px',backgroundColor:'#2d2d3f',padding:'10px',borderRadius:'8px'}}>
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            padding:'15px 50px',
            fontSize:'1.2rem',
            fontWeight:'600',
            background:'linear-gradient(135deg, #7c3aed, #22c55e)',
            color:'white',
            border:'none',
            borderRadius:'12px',
            cursor:'pointer',
            boxShadow:'0 4px 15px rgba(124, 58, 237, 0.4)'
          }}>
          {loading ? '⏳ Logging in...' : '🚀 Get Started with Google'}
        </button>

        <p style={{color:'#555',marginTop:'20px',fontSize:'0.9rem'}}>
          Free • No credit card required • Start practicing now!
        </p>
      </div>
    </div>
  );
}

export default Home;