import React, { useState } from 'react';
import axios from 'axios';

function QueryInterface({ apiUrl }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [isQuerying, setIsQuerying] = useState(false);
  const [error, setError] = useState('');

  const handleQuery = async (e) => {
    e.preventDefault();
    
    if (!question.trim()) {
      return;
    }

    setIsQuerying(true);
    setError('');

    try {
      const response = await axios.post(`${apiUrl}/query`, {
        question: question.trim(),
      });

      setAnswer(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error querying document');
      setAnswer(null);
    } finally {
      setIsQuerying(false);
    }
  };

  return (
    <div className="query-section">
      <h2>Ask Questions About Your PDF</h2>
      
      <form onSubmit={handleQuery} className="query-form">
        <div className="input-group">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question here..."
            className="query-input"
            disabled={isQuerying}
          />
          <button 
            type="submit" 
            className="query-btn"
            disabled={isQuerying || !question.trim()}
          >
            {isQuerying ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div className="error-message">
          <span>⚠️ {error}</span>
        </div>
      )}

      {answer && (
        <div className="answer-section">
          <div className="answer-box">
            <h3>📝 Answer</h3>
            <div className="answer-content">
              {answer.answer}
            </div>
          </div>

          {answer.relevant_chunks && answer.relevant_chunks.length > 0 && (
            <div className="sources-box">
              <h3>📚 Relevant Sections</h3>
              {answer.relevant_chunks.map((chunk, index) => (
                <div key={index} className="source-item">
                  <div className="source-header">
                    <span className="source-label">Source {index + 1}</span>
                    <span className="relevance-score">
                      Relevance: {(chunk.relevance_score * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="source-text">
                    {chunk.text.substring(0, 300)}
                    {chunk.text.length > 300 && '...'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QueryInterface;
