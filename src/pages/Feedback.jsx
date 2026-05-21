import { getAIFeedback } from '../gemini';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Feedback() {
  const location = useLocation();
  const navigate = useNavigate();
  const { code, question, language } = location.state || {};
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeedback = async () => {
      try {
        const data = await getAIFeedback(code, language, question);
        setFeedback(data);

        const session = {
           question: question.title,
           topic: question.topic,
           difficulty: question.difficulty,
           language: language,
           score: data.score,
           date: new Date().toLocaleDateString()
       };
       const existing = JSON.parse(localStorage.getItem('interviewSessions') || '[]');
       localStorage.setItem('interviewSessions', JSON.stringify([...existing, session]));
      } catch(err) {
        console.error('Feedback error:', err);
      }
      setLoading(false);
    };
    getFeedback();
   }, [code, language, question]);

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
          <h2 style={{marginBottom:'20px'}}>🤖 AI Feedback</h2>

          {loading ? (
            <div style={{textAlign:'center',padding:'40px'}}>
              <p style={{color:'#888',fontSize:'1.1rem'}}>🤖 AI is evaluating your code...</p>
              <p style={{color:'#555',marginTop:'10px'}}>Please wait a moment!</p>
            </div>
          ) : feedback ? (
            <div>
              <div style={{textAlign:'center',marginBottom:'20px'}}>
                <p style={{color:'#888',marginBottom:'5px'}}>Score</p>
                <p style={{fontSize:'3rem',fontWeight:'bold',color: feedback.score >= 7 ? '#22c55e' : feedback.score >= 5 ? '#fbbf24' : '#ef4444'}}>
                  {feedback.score}/10
                </p>
              </div>

              <div style={{backgroundColor:'#1e1e2e',borderRadius:'10px',padding:'15px',marginBottom:'15px'}}>
                <p style={{color:'#22c55e',marginBottom:'5px'}}>✅ What is Good:</p>
                <p style={{color:'#ccc'}}>{feedback.good}</p>
              </div>

              <div style={{backgroundColor:'#1e1e2e',borderRadius:'10px',padding:'15px',marginBottom:'15px'}}>
                <p style={{color:'#fbbf24',marginBottom:'5px'}}>💡 Improvements:</p>
                <p style={{color:'#ccc'}}>{feedback.improve}</p>
              </div>

              <div style={{display:'flex',gap:'10px',marginBottom:'15px'}}>
                <div style={{flex:1,backgroundColor:'#1e1e2e',borderRadius:'10px',padding:'15px',textAlign:'center'}}>
                  <p style={{color:'#888',fontSize:'0.8rem'}}>Time Complexity</p>
                  <p style={{color:'#7c3aed',fontWeight:'bold'}}>{feedback.timeComplexity}</p>
                </div>
                <div style={{flex:1,backgroundColor:'#1e1e2e',borderRadius:'10px',padding:'15px',textAlign:'center'}}>
                  <p style={{color:'#888',fontSize:'0.8rem'}}>Space Complexity</p>
                  <p style={{color:'#7c3aed',fontWeight:'bold'}}>{feedback.spaceComplexity}</p>
                </div>
              </div>

              {feedback.optimizedSolution && (
                <div style={{backgroundColor:'#1e1e2e',borderRadius:'10px',padding:'15px'}}>
                  <p style={{color:'#888',marginBottom:'5px'}}>🚀 Optimized Solution:</p>
                  <pre style={{color:'#22c55e',fontSize:'0.9rem',overflow:'auto'}}>
                    {feedback.optimizedSolution}
                  </pre>
                </div>
              )}
            </div>
          ) : (
            <p style={{color:'#ef4444'}}>Could not get feedback. Please try again!</p>
          )}

          <button
            onClick={() => navigate('/mode')}
            style={{marginTop:'20px',padding:'12px',backgroundColor:'#7c3aed',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontSize:'1rem',width:'100%'}}>
            Practice Again 🚀
          </button>
        </div>

      </div>
    </div>
  );
}

export default Feedback;