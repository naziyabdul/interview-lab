import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Feedback() {
  const location = useLocation();
  const navigate = useNavigate();
  const { code, question, language } = location.state || {};

  return (
    <div style={{backgroundColor:'#1e1e2e',minHeight:'100vh',color:'white',fontFamily:'Arial',padding:'30px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'30px'}}>
        <h1 style={{fontSize:'1.8rem'}}>Interview Lab</h1>
        <button
          onClick={() => navigate('/mode')}
          style={{padding:'8px 20px',backgroundColor:'#444',color:'white',border:'none',borderRadius:'8px',cursor:'pointer'}}>
          Practice Again
        </button>
      </div>

      <div style={{display:'flex',gap:'20px'}}>

        <div style={{flex:1,backgroundColor:'#2d2d3f',borderRadius:'15px',padding:'25px'}}>
          <h2 style={{marginBottom:'20px'}}>Your Submission</h2>
          <div style={{marginBottom:'15px'}}>
            <p style={{color:'#888',marginBottom:'5px'}}>Question:</p>
            <p style={{color:'white',fontSize:'1.1rem'}}>{question?.title}</p>
          </div>
          <div style={{marginBottom:'15px'}}>
            <p style={{color:'#888',marginBottom:'5px'}}>Language:</p>
            <p style={{color:'#7c3aed',textTransform:'uppercase'}}>{language}</p>
          </div>
          <div>
            <p style={{color:'#888',marginBottom:'5px'}}>Your Code:</p>
            <pre style={{backgroundColor:'#1e1e2e',padding:'15px',borderRadius:'10px',color:'#22c55e',overflow:'auto',fontSize:'0.9rem'}}>
              {code}
            </pre>
          </div>
        </div>

        <div style={{flex:1,backgroundColor:'#2d2d3f',borderRadius:'15px',padding:'25px'}}>
          <h2 style={{marginBottom:'20px'}}>AI Feedback</h2>
          <div style={{backgroundColor:'#1e1e2e',borderRadius:'10px',padding:'20px',textAlign:'center'}}>
            <p style={{color:'#888',fontSize:'1.1rem'}}>
              AI Feedback coming soon!
            </p>
            <p style={{color:'#555',marginTop:'10px'}}>
              We will add AI evaluation in Day 9!
            </p>
          </div>

          <div style={{marginTop:'20px'}}>
            <h3 style={{marginBottom:'15px'}}>Quick Stats</h3>
            <div style={{display:'flex',gap:'10px'}}>
              <div style={{flex:1,backgroundColor:'#1e1e2e',borderRadius:'10px',padding:'15px',textAlign:'center'}}>
                <p style={{color:'#888',fontSize:'0.8rem'}}>Lines of Code</p>
                <p style={{color:'#22c55e',fontSize:'1.5rem',fontWeight:'bold'}}>
                  {code?.split('\n').length || 0}
                </p>
              </div>
              <div style={{flex:1,backgroundColor:'#1e1e2e',borderRadius:'10px',padding:'15px',textAlign:'center'}}>
                <p style={{color:'#888',fontSize:'0.8rem'}}>Difficulty</p>
                <p style={{color:'#7c3aed',fontSize:'1.5rem',fontWeight:'bold'}}>
                  {question?.difficulty || 'N/A'}
                </p>
              </div>
              <div style={{flex:1,backgroundColor:'#1e1e2e',borderRadius:'10px',padding:'15px',textAlign:'center'}}>
                <p style={{color:'#888',fontSize:'0.8rem'}}>Topic</p>
                <p style={{color:'#fbbf24',fontSize:'1rem',fontWeight:'bold'}}>
                  {question?.topic || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/mode')}
            style={{marginTop:'20px',padding:'12px',backgroundColor:'#7c3aed',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontSize:'1rem',width:'100%'}}>
            Practice Again
          </button>
        </div>

      </div>
    </div>
  );
}

export default Feedback;