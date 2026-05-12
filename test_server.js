fetch('http://localhost:5000/')
  .then(r => r.text())
  .then(d => console.log('Server response:', d.substring(0, 200)))
  .catch(e => console.log('Error:', e));