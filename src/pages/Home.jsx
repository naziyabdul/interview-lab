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
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh',backgroundColor:'#1e1e2e',color:'white',fontFamily:'Arial'}}>
      <h1 style={{fontSize:'3rem',marginBottom:'10px'}}>Interview Lab</h1>
      <p style={{fontSize:'1.2rem',marginBottom:'40px',color:'#888'}}>
        Practice coding interviews with AI feedback!
      </p>
      {error && <p style={{color:'red',marginBottom:'20px'}}>{error}</p>}
      <button
        onClick={handleLogin}
        disabled={loading}
        style={{padding:'15px 40px',fontSize:'1.2rem',backgroundColor:'#7c3aed',color:'white',border:'none',borderRadius:'10px',cursor:'pointer',display:'flex',alignItems:'center',gap:'10px'}}>
        {loading ? 'Logging in...' : 'Login with Google'}
      </button>
    </div>
  );
}

export default Home;