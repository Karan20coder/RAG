from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2
import os
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
from werkzeug.utils import secure_filename
import pickle

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Create upload folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Initialize the embedding model (runs locally)
print("Loading embedding model...")
embedder = SentenceTransformer('all-MiniLM-L6-v2')
print("Model loaded successfully!")

# Global storage for document chunks and index
document_store = {
    'chunks': [],
    'embeddings': None,
    'index': None,
    'metadata': []
}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_pdf(pdf_path):
    """Extract text from PDF file"""
    text = ""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page_num, page in enumerate(pdf_reader.pages):
                page_text = page.extract_text()
                if page_text:
                    text += f"\n[Page {page_num + 1}]\n{page_text}"
    except Exception as e:
        print(f"Error extracting text: {e}")
        return None
    return text

def chunk_text(text, chunk_size=500, overlap=50):
    """Split text into overlapping chunks"""
    words = text.split()
    chunks = []
    
    for i in range(0, len(words), chunk_size - overlap):
        chunk = ' '.join(words[i:i + chunk_size])
        if chunk:
            chunks.append(chunk)
    
    return chunks

def create_embeddings(chunks):
    """Create embeddings for text chunks"""
    print(f"Creating embeddings for {len(chunks)} chunks...")
    embeddings = embedder.encode(chunks, show_progress_bar=True)
    return np.array(embeddings).astype('float32')

def build_faiss_index(embeddings):
    """Build FAISS index for similarity search"""
    dimension = embeddings.shape[1]
    index = faiss.IndexFlatL2(dimension)
    index.add(embeddings)
    return index

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok', 'message': 'Backend is running'})

@app.route('/api/upload', methods=['POST'])
def upload_pdf():
    """Upload and process PDF file"""
    global document_store
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'Only PDF files are allowed'}), 400
    
    try:
        # Save the file
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Extract text from PDF
        print(f"Processing PDF: {filename}")
        text = extract_text_from_pdf(filepath)
        
        if not text:
            return jsonify({'error': 'Could not extract text from PDF'}), 400
        
        # Chunk the text
        chunks = chunk_text(text)
        print(f"Created {len(chunks)} chunks")
        
        # Create embeddings
        embeddings = create_embeddings(chunks)
        
        # Build FAISS index
        index = build_faiss_index(embeddings)
        
        # Store in global document store
        document_store['chunks'] = chunks
        document_store['embeddings'] = embeddings
        document_store['index'] = index
        document_store['metadata'] = [{'filename': filename, 'chunk_id': i} for i in range(len(chunks))]
        
        # Clean up uploaded file
        os.remove(filepath)
        
        return jsonify({
            'message': 'PDF processed successfully',
            'filename': filename,
            'chunks_count': len(chunks)
        })
    
    except Exception as e:
        print(f"Error processing PDF: {e}")
        return jsonify({'error': f'Error processing PDF: {str(e)}'}), 500

@app.route('/api/query', methods=['POST'])
def query():
    """Query the document store"""
    global document_store
    
    if not document_store['chunks']:
        return jsonify({'error': 'No documents uploaded yet'}), 400
    
    data = request.get_json()
    question = data.get('question', '')
    
    if not question:
        return jsonify({'error': 'No question provided'}), 400
    
    try:
        # Create embedding for the question
        question_embedding = embedder.encode([question]).astype('float32')
        
        # Search for similar chunks
        k = 5  # Number of chunks to retrieve
        distances, indices = document_store['index'].search(question_embedding, k)
        
        # Get relevant chunks
        relevant_chunks = []
        for i, idx in enumerate(indices[0]):
            if idx < len(document_store['chunks']):
                relevant_chunks.append({
                    'text': document_store['chunks'][idx],
                    'relevance_score': float(1 / (1 + distances[0][i])),  # Convert distance to similarity
                    'metadata': document_store['metadata'][idx]
                })
        
        # Create answer from relevant chunks
        context = "\n\n".join([chunk['text'] for chunk in relevant_chunks])
        
        # Simple answer extraction (finding most relevant sentences)
        answer = extract_answer(question, relevant_chunks)
        
        return jsonify({
            'answer': answer,
            'context': context,
            'relevant_chunks': relevant_chunks[:3]  # Return top 3 chunks
        })
    
    except Exception as e:
        print(f"Error querying: {e}")
        return jsonify({'error': f'Error querying: {str(e)}'}), 500

def extract_answer(question, chunks):
    """Extract answer from relevant chunks - simple keyword-based approach"""
    if not chunks:
        return "No relevant information found in the document."
    
    # Combine top chunks as answer
    answer_parts = []
    for chunk in chunks[:3]:
        text = chunk['text'].strip()
        # Take the first few sentences
        sentences = text.split('.')[:3]
        answer_parts.append('.'.join(sentences) + '.')
    
    answer = "\n\n".join(answer_parts)
    
    return answer

@app.route('/api/reset', methods=['POST'])
def reset():
    """Reset the document store"""
    global document_store
    document_store = {
        'chunks': [],
        'embeddings': None,
        'index': None,
        'metadata': []
    }
    return jsonify({'message': 'Document store reset successfully'})

if __name__ == '__main__':
    print("Starting PDF RAG Backend...")
    print("Embedding model: all-MiniLM-L6-v2 (running locally)")
    app.run(debug=True, host='0.0.0.0', port=5000)
