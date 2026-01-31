import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import FileUpload from './components/FileUpload';
import QueryInterface from './components/QueryInterface';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (file) => {
    setIsProcessing(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadedFile({
        filename: response.data.filename,
        chunks_count: response.data.chunks_count,
      });
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error uploading file');
      setUploadedFile(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = async () => {
    try {
      await axios.post(`${API_URL}/reset`);
      setUploadedFile(null);
      setError('');
    } catch (err) {
      setError('Error resetting');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📄 PDF RAG System</h1>
        <p className="subtitle">Local Search & Extract - No AI APIs</p>
      </header>

      <div className="container">
        {error && (
          <div className="error-message">
            <span>⚠️ {error}</span>
          </div>
        )}

        {!uploadedFile ? (
          <FileUpload 
            onFileUpload={handleFileUpload} 
            isProcessing={isProcessing} 
          />
        ) : (
          <div className="content-area">
            <div className="file-info">
              <div className="file-info-content">
                <span className="file-icon">📎</span>
                <div>
                  <strong>{uploadedFile.filename}</strong>
                  <p className="file-stats">
                    Processed into {uploadedFile.chunks_count} searchable chunks
                  </p>
                </div>
              </div>
              <button onClick={handleReset} className="reset-btn">
                Upload New PDF
              </button>
            </div>

            <QueryInterface apiUrl={API_URL} />
          </div>
        )}
      </div>

      <footer className="footer">
        <p>Powered by local embeddings (all-MiniLM-L6-v2) + FAISS vector search</p>
      </footer>
    </div>
  );
}

export default App;
