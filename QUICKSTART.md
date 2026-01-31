# 🚀 QUICK START GUIDE

## Method 1: Automatic Setup (Recommended)

### On Mac/Linux:
```bash
chmod +x start.sh
./start.sh
```

### On Windows:
```bash
start.bat
```

The script will:
1. Check if Python and Node.js are installed
2. Set up virtual environment and install dependencies
3. Start both backend and frontend servers
4. Open the app at http://localhost:3000

## Method 2: Manual Setup

### Step 1: Start Backend

```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Mac/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt --break-system-packages

# Start server
python app.py
```

Backend will run on http://localhost:5000

### Step 2: Start Frontend (in a new terminal)

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will open at http://localhost:3000

## Usage

1. **Upload PDF**: Drag & drop or click to upload a PDF file
2. **Process**: Click "Process PDF" button
3. **Ask Questions**: Type your question and click "Search"
4. **View Results**: See answers with relevant excerpts from your PDF

## System Requirements

- Python 3.8 or higher
- Node.js 14 or higher
- 2GB RAM minimum (4GB recommended)
- Internet connection (first-time model download only)

## Troubleshooting

**Backend won't start:**
- Ensure port 5000 is not in use
- Try: `pip install -r requirements.txt --break-system-packages`

**Frontend won't start:**
- Ensure port 3000 is not in use
- Try deleting `node_modules` and running `npm install` again

**Model download slow:**
- First run downloads ~80MB model (one-time only)
- Subsequent runs will use cached model

## Features

✅ 100% Local - No API keys needed  
✅ No OpenAI or external AI services  
✅ Fast semantic search with FAISS  
✅ Beautiful drag-and-drop interface  
✅ Relevance scoring for results  

Enjoy your local PDF RAG system! 🎉
