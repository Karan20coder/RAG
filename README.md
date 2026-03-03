<h1 align="center">📄 PDF RAG System</h1>
<h3 align="center">Local AI-Powered Semantic Search for PDFs</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Privacy-100%25_Local-success?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Cost-Free_forever-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Offline-Works_Without_Internet-orange?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/AI-Transformer_Model-purple?style=for-the-badge"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React_18-61DAFB?logo=react&style=flat-square"/>
  <img src="https://img.shields.io/badge/Backend-Flask-000000?logo=flask&style=flat-square"/>
  <img src="https://img.shields.io/badge/Vector_Search-FAISS-009688?style=flat-square"/>
  <img src="https://img.shields.io/badge/Embeddings-SentenceTransformers-FF6F00?style=flat-square"/>
  <img src="https://img.shields.io/badge/PDF-PyPDF2-CC0000?style=flat-square"/>
  <img src="https://img.shields.io/github/stars/Karan20coder/RAG?style=social"/>
</p>

<hr/>

<h2>🚀 About The Project</h2>

<p>
PDF RAG System is a powerful full-stack AI application that allows you to upload text-based PDF documents and ask natural language questions about their content using advanced semantic search. The entire system runs 100% locally on your machine with no API keys, no subscriptions, no external servers, and complete data privacy. It combines embeddings, vector search, and transformer-based intelligence to deliver accurate, context-aware answers extracted directly from your documents.
</p>

<hr/>

<h2>🧠 What It Does</h2>

<ul>
  <li>📂 Upload PDF documents instantly</li>
  <li>🧠 Ask natural language questions</li>
  <li>⚡ Get intelligent, context-aware answers</li>
  <li>🔍 View relevance scores for each result</li>
  <li>📑 Extract exact excerpts from documents</li>
  <li>🚫 No keyword matching — fully semantic understanding</li>
</ul>

<hr/>

<h2>⚙️ How It Works</h2>

<pre>
PDF → Text Extraction → Smart Chunking → Embedding Generation 
→ FAISS Vector Index → Semantic Similarity Search 
→ Context Retrieval → Intelligent Response
</pre>

<p>
Instead of basic keyword search, the system converts document text into high-dimensional vector embeddings using a transformer model. When a user asks a question, it generates an embedding of the query and performs similarity search using FAISS to retrieve the most relevant context.
</p>

<hr/>

<h2>🔒 Why Run It Locally?</h2>

<h3>1️⃣ Complete Privacy</h3>
<ul>
  <li>Your documents never leave your computer</li>
  <li>No OpenAI, Google, or third-party servers</li>
  <li>Ideal for legal, medical, financial, and proprietary documents</li>
  <li>No tracking, monitoring, or analytics</li>
</ul>

<h3>2️⃣ Zero Cost</h3>
<ul>
  <li>No API fees</li>
  <li>No per-token billing</li>
  <li>Unlimited usage</li>
  <li>One-time setup, free forever</li>
</ul>

<h3>3️⃣ Works Offline</h3>
<ul>
  <li>Fully functional without internet</li>
  <li>No network latency</li>
  <li>Perfect for remote environments</li>
</ul>

<h3>4️⃣ Full Control</h3>
<ul>
  <li>No rate limits</li>
  <li>No service shutdown risk</li>
  <li>Customize models and pipeline</li>
  <li>Extend or modify anytime</li>
</ul>

<h3>5️⃣ Data Sovereignty</h3>
<ul>
  <li>GDPR & HIPAA friendly architecture</li>
  <li>On-premise compliance</li>
  <li>No third-party data processors</li>
</ul>

<hr/>

<h2>🛠️ Technical Stack</h2>

<table>
<tr><td><strong>Frontend</strong></td><td>React 18</td></tr>
<tr><td><strong>Backend</strong></td><td>Python Flask REST API</td></tr>
<tr><td><strong>PDF Processing</strong></td><td>PyPDF2</td></tr>
<tr><td><strong>Embeddings</strong></td><td>sentence-transformers (all-MiniLM-L6-v2)</td></tr>
<tr><td><strong>Vector Search</strong></td><td>FAISS</td></tr>
<tr><td><strong>AI Model</strong></td><td>Pretrained Transformer (CPU-based)</td></tr>
</table>

<hr/>

<h2>🎯 Use Cases</h2>

<ul>
  <li>⚖️ Legal contract and case file search</li>
  <li>📚 Academic research paper querying</li>
  <li>📊 Business report analysis</li>
  <li>🎓 Study assistant for textbooks and notes</li>
  <li>🏥 Medical record review (with proper authorization)</li>
  <li>📁 Personal document search</li>
</ul>

<hr/>

<h2>💻 System Requirements</h2>

<ul>
  <li>Python 3.8+</li>
  <li>Node.js 14+</li>
  <li>Minimum 2GB RAM (4GB recommended)</li>
  <li>2GB Disk Space</li>
  <li>Windows, macOS, or Linux</li>
</ul>

<hr/>

<h2>⚔️ Comparison</h2>

<table>
<tr>
  <th>Feature</th>
  <th>PDF RAG System</th>
  <th>ChatGPT / Claude API</th>
</tr>
<tr>
  <td>Privacy</td>
  <td>✅ 100% Local</td>
  <td>❌ Uploads to servers</td>
</tr>
<tr>
  <td>Cost</td>
  <td>✅ Free forever</td>
  <td>❌ Pay per request</td>
</tr>
<tr>
  <td>Offline Usage</td>
  <td>✅ Yes</td>
  <td>❌ Internet required</td>
</tr>
<tr>
  <td>Customization</td>
  <td>✅ Full Control</td>
  <td>❌ Limited Options</td>
</tr>
<tr>
  <td>Compliance</td>
  <td>✅ Easier On-Prem</td>
  <td>⚠️ Complex Legal Setup</td>
</tr>
</table>

<hr/>

<h2>📦 Installation</h2>

<p><strong>Clone Repository</strong></p>

<pre>
git clone https://github.com/Karan20coder/RAG.git
cd RAG
</pre>

<p><strong>Backend Setup</strong></p>

<pre>
pip install -r requirements.txt
python app.py
</pre>

<p><strong>Frontend Setup</strong></p>

<pre>
cd client
npm install
npm start
</pre>

<hr/>

<h2>⭐ Why This Project Matters</h2>

<p>
This project demonstrates practical implementation of Retrieval-Augmented Generation (RAG), embedding-based semantic search, vector database indexing, and full-stack AI integration — all deployed locally. It represents a real-world AI system architecture that balances intelligence, privacy, performance, and control.
</p>

<hr/>

<p align="center">
Built with ❤️ by <strong>Karan Mishra</strong><br/>
Full-Stack AI | Local AI Systems | Privacy-First Engineering
</p>
