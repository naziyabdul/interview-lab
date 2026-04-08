import React, { useState, useEffect } from 'react';

function Timer({ duration, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if(prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isWarning = timeLeft <= 300;

  return (
    <div style={{
      padding: '10px 20px',
      borderRadius: '10px',
      backgroundColor: isWarning ? '#ef4444' : '#2d2d3f',
      color: 'white',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      textAlign: 'center',
      transition: 'background-color 0.3s'
    }}>
      {isWarning && '⚠️ '}
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      {isWarning && ' ⚠️'}
    </div>
  );
}

export default Timer;