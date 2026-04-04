export const runCode = async (code, language) => {
  try {
    const response = await fetch('http://localhost:5000/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language })
    });

    const data = await response.json();
    console.log('Response:', data);

    if(data.stdout) return { stdout: data.stdout };
    if(data.stderr) return { stderr: data.stderr };
    return { stdout: 'No output' };

  } catch(err) {
    console.error('Run error:', err);
    return { stderr: err.message };
  }
};