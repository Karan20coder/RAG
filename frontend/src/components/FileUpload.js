import React, { useState } from 'react';

function FileUpload({ onFileUpload, isProcessing }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
      } else {
        alert('Please upload a PDF file');
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
      } else {
        alert('Please upload a PDF file');
      }
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  return (
    <div className="upload-section">
      <div
        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          accept=".pdf"
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        
        <div className="upload-content">
          <div className="upload-icon">📄</div>
          <h2>Upload Your PDF</h2>
          <p>Drag and drop your PDF here, or click to browse</p>
          <label htmlFor="file-upload" className="upload-btn">
            Choose PDF File
          </label>
        </div>
      </div>

      {selectedFile && (
        <div className="selected-file">
          <p>Selected: <strong>{selectedFile.name}</strong></p>
          <button 
            onClick={handleSubmit} 
            className="process-btn"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Process PDF'}
          </button>
        </div>
      )}

      {isProcessing && (
        <div className="processing-indicator">
          <div className="spinner"></div>
          <p>Extracting text and creating embeddings...</p>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
