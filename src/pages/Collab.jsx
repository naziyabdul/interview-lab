import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { db, ref, onValue, set } from '../firebase';

function Collab() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [joined, setJoined] = useState(false);
  const [code, setCode] = useState('// Collaborative coding session!\n// Share the room ID with your friend!');
  const [userCount, setUserCount] = useState(1);
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!joined) return;

    const codeRef = ref(db, `rooms/${roomId}/code`);
    const unsubscribe = onValue(codeRef, (snapshot) => {
      const data = snapshot.val();
      if(data !== null) setCode(data);
    });

    const usersRef = ref(db, `rooms/${roomId}/users`);
    const unsubscribeUsers = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if(data !== null) setUserCount(Object.keys(data).length);
    });

    const userId = Math.random().toString(36).substring(2, 8);
    set(ref(db, `rooms/${roomId}/users/${userId}`), true);

    return () => {
      unsubscribe();
      unsubscribeUsers();
    };
  }, [joined, roomId]);

  const createRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomId(newRoomId);
    setJoined(true);
  };

  const joinRoom = () => {
    if(!roomId) return alert('Please enter a room ID!');
    setJoined(true);
  };

  const handleCodeChange = (value) => {
    setCode(value);
    set(ref(db, `rooms/${roomId}/code`), value);
  };

  const handleRun = async () => {
    setLoading(true);
    setOutput('Running...');
    try {
      const response = await fetch('http://localhost:5000/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language })
      });
      const data = await response.json();
      if(data.stdout) setOutput(data.stdout);
      else if(data.stderr) setOutput('Error: ' + data.stderr);
      else setOutput('No output');
    } catch(err) {
      setOutput('Run Code only works locally!');
    }
    setLoading(false);
  };

  if(!joined) {
    return (
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh',backgroundColor:'#1e1e2e',color:'white',fontFamily:'Inter, Arial'}}>
        <h1 style={{fontSize:'2.5rem',marginBottom:'10px'}}>👥 Collaborative Coding</h1>
        <p style={{color:'#888',marginBottom:'40px'}}>Code together in real time!</p>

        <div style={{backgroundColor:'#2d2d3f',borderRadius:'15px',padding:'30px',width:'400px',textAlign:'center'}}>
          <button
            onClick={createRoom}
            style={{width:'100%',padding:'12px',backgroundColor:'#7c3aed',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontSize:'1rem',marginBottom:'20px',fontWeight:'600'}}>
            Create New Room
          </button>

          <p style={{color:'#888',marginBottom:'15px'}}>OR join existing room:</p>

          <input
            value={roomId}
            onChange={e => setRoomId(e.target.value.toUpperCase())}
            placeholder="Enter Room ID"
            style={{width:'100%',padding:'12px',backgroundColor:'#1e1e2e',color:'white',border:'1px solid #444',borderRadius:'8px',fontSize:'1rem',marginBottom:'15px',boxSizing:'border-box'}}
          />

          <button
            onClick={joinRoom}
            style={{width:'100%',padding:'12px',backgroundColor:'#22c55e',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontSize:'1rem',fontWeight:'600'}}>
            Join Room
          </button>
        </div>

        <button
          onClick={() => navigate('/mode')}
          style={{marginTop:'20px',padding:'10px 30px',backgroundColor:'#444',color:'white',border:'none',borderRadius:'8px',cursor:'pointer'}}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div style={{backgroundColor:'#1e1e2e',minHeight:'100vh',color:'white',fontFamily:'Inter, Arial',padding:'30px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
        <h1 style={{fontSize:'1.8rem'}}>👥 Collaborative Coding</h1>
        <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
          <span style={{backgroundColor:'#2d2d3f',padding:'8px 15px',borderRadius:'8px',fontSize:'0.9rem'}}>
            Room: <strong>{roomId}</strong>
          </span>
          <span style={{backgroundColor: userCount > 1 ? '#22c55e' : '#444',padding:'8px 15px',borderRadius:'8px',fontSize:'0.9rem'}}>
            👥 {userCount} User{userCount > 1 ? 's' : ''}
          </span>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            style={{padding:'8px',borderRadius:'8px',backgroundColor:'#2d2d3f',color:'white',border:'1px solid #7c3aed'}}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
          </select>
          <button
            onClick={() => navigate('/mode')}
            style={{padding:'8px 20px',backgroundColor:'#444',color:'white',border:'none',borderRadius:'8px',cursor:'pointer'}}>
            Back
          </button>
        </div>
      </div>

      <div style={{backgroundColor:'#2d2d3f',borderRadius:'15px',padding:'25px',marginBottom:'20px'}}>
        <p style={{color:'#888',marginBottom:'10px',fontSize:'0.9rem'}}>
          Share Room ID <strong style={{color:'#7c3aed'}}>{roomId}</strong> with your friend to code together!
        </p>
        <Editor
          height="400px"
          language={language}
          value={code}
          onChange={handleCodeChange}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>

      <div style={{display:'flex',gap:'10px',marginBottom:'20px'}}>
        <button
          onClick={handleRun}
          disabled={loading}
          style={{flex:1,padding:'12px',backgroundColor:'#3b82f6',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontSize:'1rem',fontWeight:'600'}}>
          {loading ? 'Running...' : 'Run Code'}
        </button>
      </div>

      <div style={{backgroundColor:'#2d2d3f',borderRadius:'15px',padding:'20px'}}>
        <p style={{color:'#888',marginBottom:'8px'}}>Output:</p>
        <pre style={{color:'#22c55e',margin:0,fontFamily:'monospace'}}>
          {output || 'Click Run Code to see output...'}
        </pre>
      </div>
    </div>
  );
}

export default Collab;