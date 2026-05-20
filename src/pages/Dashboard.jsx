import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

function Dashboard() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('interviewSessions');
    if(saved) setSessions(JSON.parse(saved));
  }, []);

  const totalSessions = sessions.length;
  const averageScore = sessions.length > 0
    ? (sessions.reduce((sum, s) => sum + s.score, 0) / sessions.length).toFixed(1)
    : 0;
  const bestScore = sessions.length > 0
    ? Math.max(...sessions.map(s => s.score))
    : 0;

  const topicStats = sessions.reduce((acc, s) => {
    if(!acc[s.topic]) acc[s.topic] = { topic: s.topic, total: 0, count: 0 };
    acc[s.topic].total += s.score;
    acc[s.topic].count += 1;
    acc[s.topic].avg = (acc[s.topic].total / acc[s.topic].count).toFixed(1);
    return acc;
  }, {});

  const topicData = Object.values(topicStats);
  const weakTopics = topicData.filter(t => t.avg < 6);

  return (
    <div style={{backgroundColor:'#1e1e2e',minHeight:'100vh',color:'white',fontFamily:'Arial',padding:'30px'}}>

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'30px'}}>
        <h1 style={{fontSize:'1.8rem'}}>📊 Performance Dashboard</h1>
        <button
          onClick={() => navigate('/mode')}
          style={{padding:'8px 20px',backgroundColor:'#444',color:'white',border:'none',borderRadius:'8px',cursor:'pointer'}}>
          Practice
        </button>
      </div>

      {sessions.length === 0 ? (
        <div style={{textAlign:'center',padding:'60px'}}>
          <p style={{color:'#888',fontSize:'1.2rem'}}>No sessions yet!</p>
          <p style={{color:'#555',marginTop:'10px'}}>Complete a practice session to see your stats here!</p>
          <button
            onClick={() => navigate('/mode')}
            style={{marginTop:'20px',padding:'12px 30px',backgroundColor:'#7c3aed',color:'white',border:'none',borderRadius:'8px',cursor:'pointer'}}>
            Start Practicing!
          </button>
        </div>
      ) : (
        <>
          <div style={{display:'flex',gap:'20px',marginBottom:'30px'}}>
            <div style={{flex:1,backgroundColor:'#2d2d3f',borderRadius:'15px',padding:'25px',textAlign:'center'}}>
              <p style={{color:'#888',marginBottom:'5px'}}>Total Sessions</p>
              <p style={{fontSize:'2.5rem',fontWeight:'bold',color:'#7c3aed'}}>{totalSessions}</p>
            </div>
            <div style={{flex:1,backgroundColor:'#2d2d3f',borderRadius:'15px',padding:'25px',textAlign:'center'}}>
              <p style={{color:'#888',marginBottom:'5px'}}>Average Score</p>
              <p style={{fontSize:'2.5rem',fontWeight:'bold',color:'#22c55e'}}>{averageScore}/10</p>
            </div>
            <div style={{flex:1,backgroundColor:'#2d2d3f',borderRadius:'15px',padding:'25px',textAlign:'center'}}>
              <p style={{color:'#888',marginBottom:'5px'}}>Best Score</p>
              <p style={{fontSize:'2.5rem',fontWeight:'bold',color:'#fbbf24'}}>{bestScore}/10</p>
            </div>
          </div>

          <div style={{display:'flex',gap:'20px',marginBottom:'30px'}}>
            <div style={{flex:1,backgroundColor:'#2d2d3f',borderRadius:'15px',padding:'25px'}}>
              <h3 style={{marginBottom:'20px'}}>📈 Score Progress</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={sessions.map((s, i) => ({ session: i+1, score: s.score }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="session" stroke="#888" />
                  <YAxis domain={[0, 10]} stroke="#888" />
                  <Tooltip contentStyle={{backgroundColor:'#2d2d3f',border:'none'}} />
                  <Line type="monotone" dataKey="score" stroke="#7c3aed" strokeWidth={2} dot={{fill:'#7c3aed'}} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{flex:1,backgroundColor:'#2d2d3f',borderRadius:'15px',padding:'25px'}}>
              <h3 style={{marginBottom:'20px'}}>📊 Score by Topic</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={topicData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="topic" stroke="#888" tick={{fontSize:10}} />
                  <YAxis domain={[0, 10]} stroke="#888" />
                  <Tooltip contentStyle={{backgroundColor:'#2d2d3f',border:'none'}} />
                  <Bar dataKey="avg" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {weakTopics.length > 0 && (
            <div style={{backgroundColor:'#2d2d3f',borderRadius:'15px',padding:'25px',marginBottom:'30px'}}>
              <h3 style={{marginBottom:'15px',color:'#ef4444'}}>⚠️ Weak Topics</h3>
              <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                {weakTopics.map((t, i) => (
                  <div key={i} style={{backgroundColor:'#1e1e2e',borderRadius:'10px',padding:'10px 20px',border:'1px solid #ef4444'}}>
                    <p style={{color:'white'}}>{t.topic}</p>
                    <p style={{color:'#ef4444',fontSize:'0.9rem'}}>Avg: {t.avg}/10</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{backgroundColor:'#2d2d3f',borderRadius:'15px',padding:'25px'}}>
            <h3 style={{marginBottom:'15px'}}>📋 Session History</h3>
            {sessions.slice().reverse().map((s, i) => (
              <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px',backgroundColor:'#1e1e2e',borderRadius:'10px',marginBottom:'10px'}}>
                <div>
                  <p style={{color:'white',fontWeight:'bold'}}>{s.question}</p>
                  <p style={{color:'#888',fontSize:'0.9rem'}}>{s.topic} • {s.difficulty} • {s.language} • {s.date}</p>
                </div>
                <p style={{fontSize:'1.3rem',fontWeight:'bold',color: s.score >= 7 ? '#22c55e' : s.score >= 5 ? '#fbbf24' : '#ef4444'}}>
                  {s.score}/10
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;