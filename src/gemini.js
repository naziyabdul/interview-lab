export const getAIFeedback = async (code, language, question) => {
  
  // Simulate AI thinking time
  await new Promise(resolve => setTimeout(resolve, 2000));

  const lines = code.split('\n').length;
  
  let score = 7;
  if(lines > 10) score = 8;
  if(lines > 20) score = 9;
  if(code.includes('def ') || code.includes('function')) score += 1;
  if(score > 10) score = 10;

  return {
    score: score,
    good: `Your solution for "${question.title}" is well structured and readable. Good use of ${language} syntax and proper variable naming.`,
    improve: `Consider adding input validation and error handling. You could also add comments to explain your logic for better readability.`,
    timeComplexity: lines > 10 ? 'O(n)' : 'O(n²)',
    spaceComplexity: code.includes('set') || code.includes('Set') ? 'O(n)' : 'O(1)',
    optimizedSolution: `# Optimized solution in ${language}\n# Your approach was good!\n# Keep practicing!`
  };
};