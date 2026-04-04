import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { runCode } from '../judge0';

function CodeEditor() {
  const location = useLocation();
  const navigate = useNavigate();
  const question = location.state?.question;
  const [code, setCode] = useState('// Write your solution here...');
  const [isFirstEdit, setIsFirstEdit] = useState(true);

  const handleCodeChange = (value) => {
  if(isFirstEdit) {
    setCode('');
    setIsFirstEdit(false);
  } else {
    setCode(value);
  }
};  
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  if(!question) {
    return (
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',backgroundColor:'#1e1e2e',color:'white'}}>
        <div style={{textAlign:'center'}}>
          <h2>No question selected!</h2>
          <button
            onClick={() => navigate('/mode')}
            style={{marginTop:'20px',padding:'10px 30px',backgroundColor:'#7c3aed',color:'white',border:'none',borderRadius:'8px',cursor:'pointer'}}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleRun = async () => {
    setLoading(true);
    setOutput('Running...');
    try {
      const result = await runCode(code, language);
      if(result.stdout) setOutput(result.stdout);
      else if(result.stderr) setOutput('Error: ' + result.stderr);
      else if(result.compile_output) setOutput('Compile Error: ' + result.compile_output);
      else setOutput('No output');
    } catch(err) {
      setOutput('Error: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{backgroundColor:'#1e1e2e',minHeight:'100vh',color:'white',fontFamily:'Arial',padding:'30px'}}>

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
        <h1 style={{fontSize:'1.8rem'}}>Interview Lab</h1>
        <button
          onClick={() => navigate('/mode')}
          style={{padding:'8px 20px',backgroundColor:'#444',color:'white',border:'none',borderRadius:'8px',cursor:'pointer'}}>
          Back
        </button>
      </div>

      <div style={{display:'flex',gap:'20px'}}>

        <div style={{flex:1,backgroundColor:'#2d2d3f',borderRadius:'15px',padding:'25px'}}>
          <div style={{display:'flex',gap:'10px',marginBottom:'15px'}}>
            <span style={{backgroundColor:'#7c3aed',padding:'4px 12px',borderRadius:'20px',fontSize:'0.8rem'}}>
              {question.difficulty}
            </span>
            <span style={{backgroundColor:'#444',padding:'4px 12px',borderRadius:'20px',fontSize:'0.8rem'}}>
              {question.topic}
            </span>
          </div>
          <h2 style={{marginBottom:'15px'}}>{question.title}</h2>
          <p style={{color:'#ccc',lineHeight:'1.6'}}>{question.description}</p>

          <div style={{marginTop:'20px',backgroundColor:'#1e1e2e',padding:'15px',borderRadius:'10px'}}>
            <p style={{color:'#888',marginBottom:'5px'}}>Sample Input:</p>
            <p style={{color:'#22c55e'}}>{question.sample_input}</p>
            <p style={{color:'#888',marginTop:'10px',marginBottom:'5px'}}>Sample Output:</p>
            <p style={{color:'#22c55e'}}>{question.sample_output}</p>
          </div>

          <div style={{marginTop:'20px'}}>
            <p style={{color:'#888',marginBottom:'10px'}}>Hints:</p>
            {question.hints.map((hint, i) => (
              <p key={i} style={{color:'#fbbf24',marginBottom:'5px'}}>
                {i+1}. {hint}
              </p>
            ))}
          </div>
        </div>

        <div style={{flex:1,backgroundColor:'#2d2d3f',borderRadius:'15px',padding:'25px'}}>

          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'15px'}}>
            <h3>Write Your Code</h3>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              style={{padding:'8px',borderRadius:'8px',backgroundColor:'#1e1e2e',color:'white',border:'1px solid #7c3aed'}}>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="c">C</option>
            </select>
          </div>

         <Editor
            height="300px"
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

          <div style={{display:'flex',gap:'10px',marginTop:'15px'}}>
            <button
              onClick={handleRun}
              disabled={loading}
              style={{flex:1,padding:'12px',backgroundColor:'#3b82f6',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontSize:'1rem'}}>
              {loading ? 'Running...' : 'Run Code'}
            </button>
            <button
              onClick={() => navigate('/feedback', { state: { code, question, language } })}
              style={{flex:1,padding:'12px',backgroundColor:'#22c55e',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontSize:'1rem'}}>
              Submit
            </button>
          </div>

          <div style={{marginTop:'15px',backgroundColor:'#1e1e2e',borderRadius:'10px',padding:'15px',minHeight:'100px'}}>
            <p style={{color:'#888',marginBottom:'8px'}}>Output:</p>
            <pre style={{color:'#22c55e',margin:0,fontFamily:'monospace'}}>
              {output || 'Click Run Code to see output...'}
            </pre>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CodeEditor;