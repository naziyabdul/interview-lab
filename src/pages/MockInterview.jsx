import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import Timer from '../components/Timer';
import { getAIFeedback } from '../gemini';
import questions from '../data/questions.json';

function MockInterview() {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [isFirstEdit, setIsFirstEdit] = useState(true);

  const difficulties = ['Easy', 'Easy', 'Medium', 'Medium', 'Hard'];
  const topics = ['Arrays', 'Strings', 'Trees', 'Graphs', 'Dynamic Programming'];

  const mockQuestions = difficulties.map((diff, i) => {
    const filtered = questions.filter(q => q.difficulty === diff && q.topic === topics[i]);
    if(filtered.length === 0) {
      return questions.filter(q => q.difficulty === diff)[0];
    }
    return filtered[Math.floor(Math.random() * filtered.length)];
  });

  const currentQuestion = mockQuestions[currentRound];

  const handleCodeChange = (value) => {
    if(isFirstEdit) {
      setCode('');
      setIsFirstEdit(false);
    } else {
      setCode(value);
    }
  };

  const handleSubmitRound = async () => {
    setLoading(true);
    const feedback = await getAIFeedback(code, language, currentQuestion);
    setScores(prev => [...prev, { 
      question: currentQuestion, 
      score: feedback.score,
      code: code
    }]);
    setLoading(false);

    if(currentRound < 4) {
      setCurrentRound(prev => prev + 1);
      setCode('// Write your solution here...');
      setIsFirstEdit(true);
    } else {
      setFinished(true);
    }
  };

  const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
  const averageScore = scores.length > 0 ? (totalScore / scores.length).toFixed(1) : 0;

  if(!started) {
    return (
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh',backgroundColor:'#1e1e2e',color:'white',fontFamily:'Arial'}}>
        <h1 style={{fontSize:'2.5rem',marginBottom:'10px'}}>Mock Interview Mode</h1>
        <p style={{color:'#888',marginBottom:'10px',fontSize:'1.1rem'}}>5 Questions • Increasing Difficulty • AI Evaluation</p>
        <div style={{backgroundColor:'#2d2d3f',borderRadius:'15px',padding:'25px',marginBottom:'30px',width:'400px'}}>
          <h3 style={{marginBottom:'15px',color:'#fbbf24'}}>Interview Structure:</h3>
          <p style={{color:'#ccc',marginBottom:'8px'}}>Round 1 → Easy → Arrays</p>
          <p style={{color:'#ccc',marginBottom:'8px'}}>Round 2 → Easy → Strings</p>
          <p style={{color:'#ccc',marginBottom:'8px'}}>Round 3 → Medium → Trees</p>
          <p style={{color:'#ccc',marginBottom:'8px'}}>Round 4 → Medium → Graphs</p>
          <p style={{color:'#ccc',marginBottom:'8px'}}>Round 5 → Hard → Dynamic Programming</p>
        </div>
        <button
          onClick={() => setStarted(true)}
          style={{padding:'15px 40px',fontSize:'1.2rem',backgroundColor:'#7c3aed',color:'white',border:'none',borderRadius:'10px',cursor:'pointer'}}>
          Start Mock Interview 🚀
        </button>
        <button
          onClick={() => navigate('/mode')}
          style={{marginTop:'15px',padding:'10px 30px',backgroundColor:'#444',color:'white',border:'none',borderRadius:'8px',cursor:'pointer'}}>
          Back
        </button>
      </div>
    );
  }

  if(finished) {
    return (
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',backgroundColor:'#1e1e2e',color:'white',fontFamily:'Arial',padding:'30px'}}>
        <h1 style={{fontSize:'2.5rem',marginBottom:'10px'}}>Interview Complete!</h1>
        <div style={{textAlign:'center',marginBottom:'30px'}}>
          <p style={{color:'#888',marginBottom:'5px'}}>Average Score</p>
          <p style={{fontSize:'4rem',fontWeight:'bold',color: averageScore >= 7 ? '#22c55e' : averageScore >= 5 ? '#fbbf24' : '#ef4444'}}>
            {averageScore}/10
          </p>
        </div>

        <div style={{width:'600px',marginBottom:'30px'}}>
          {scores.map((s, i) => (
            <div key={i} style={{backgroundColor:'#2d2d3f',borderRadius:'10px',padding:'15px',marginBottom:'10px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <p style={{color:'white',fontWeight:'bold'}}>Round {i+1}: {s.question.title}</p>
                <p style={{color:'#888',fontSize:'0.9rem'}}>{s.question.difficulty} • {s.question.topic}</p>
              </div>
              <p style={{fontSize:'1.5rem',fontWeight:'bold',color: s.score >= 7 ? '#22c55e' : s.score >= 5 ? '#fbbf24' : '#ef4444'}}>
                {s.score}/10
              </p>
            </div>
          ))}
        </div>

        <div style={{display:'flex',gap:'15px'}}>
          <button
            onClick={() => navigate('/mode')}
            style={{padding:'12px 30px',backgroundColor:'#7c3aed',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontSize:'1rem'}}>
            Practice Again
          </button>
          <button
            onClick={() => {
              setStarted(false);
              setFinished(false);
              setCurrentRound(0);
              setScores([]);
              setCode('');
            }}
            style={{padding:'12px 30px',backgroundColor:'#22c55e',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontSize:'1rem'}}>
            Retry Interview
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{backgroundColor:'#1e1e2e',minHeight:'100vh',color:'white',fontFamily:'Arial',padding:'30px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
        <h1 style={{fontSize:'1.8rem'}}>Mock Interview</h1>
        <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
          <span style={{backgroundColor:'#2d2d3f',padding:'8px 15px',borderRadius:'8px'}}>
            Round {currentRound + 1} / 5
          </span>
          <Timer
            duration={30}
            onTimeUp={handleSubmitRound}
          />
        </div>
      </div>

      <div style={{display:'flex',gap:'20px'}}>
        <div style={{flex:1,backgroundColor:'#2d2d3f',borderRadius:'15px',padding:'25px'}}>
          <div style={{display:'flex',gap:'10px',marginBottom:'15px'}}>
            <span style={{backgroundColor:'#7c3aed',padding:'4px 12px',borderRadius:'20px',fontSize:'0.8rem'}}>
              {currentQuestion?.difficulty}
            </span>
            <span style={{backgroundColor:'#444',padding:'4px 12px',borderRadius:'20px',fontSize:'0.8rem'}}>
              {currentQuestion?.topic}
            </span>
          </div>
          <h2 style={{marginBottom:'15px'}}>{currentQuestion?.title}</h2>
          <p style={{color:'#ccc',lineHeight:'1.6'}}>{currentQuestion?.description}</p>
          <div style={{marginTop:'20px',backgroundColor:'#1e1e2e',padding:'15px',borderRadius:'10px'}}>
            <p style={{color:'#888',marginBottom:'5px'}}>Sample Input:</p>
            <p style={{color:'#22c55e'}}>{currentQuestion?.sample_input}</p>
            <p style={{color:'#888',marginTop:'10px',marginBottom:'5px'}}>Sample Output:</p>
            <p style={{color:'#22c55e'}}>{currentQuestion?.sample_output}</p>
          </div>
          <div style={{marginTop:'20px'}}>
            <p style={{color:'#888',marginBottom:'10px'}}>Hints:</p>
            {currentQuestion?.hints.map((hint, i) => (
              <p key={i} style={{color:'#fbbf24',marginBottom:'5px'}}>{i+1}. {hint}</p>
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
            height="350px"
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

          <button
            onClick={handleSubmitRound}
            disabled={loading}
            style={{marginTop:'15px',padding:'12px',backgroundColor: loading ? '#444' : '#22c55e',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontSize:'1rem',width:'100%'}}>
            {loading ? 'Evaluating...' : currentRound < 4 ? 'Submit & Next Round →' : 'Submit & Finish 🏆'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MockInterview;