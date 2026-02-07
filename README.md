<div align="center">

![logo](https://github.com/alonso-fernandezr/Multi-Agent-Medical-Assistant/blob/main/assets/logo_rounded.png)

<h1 align="center"><strong>Multi-Agent Medical Assistant</strong></h1>
<h4 align="center">AI-powered multi-agentic system for medical diagnosis and clinical assistance</h4>

![Python - Version](https://img.shields.io/badge/PYTHON-3.11+-blue?style=for-the-badge&logo=python&logoColor=white)
![LangGraph - Version](https://img.shields.io/badge/LangGraph-0.3+-teal?style=for-the-badge&logo=langgraph)
![LangChain - Version](https://img.shields.io/badge/LangChain-0.3+-teal?style=for-the-badge&logo=langchain)
![Qdrant Client - Version](https://img.shields.io/badge/Qdrant-1.13+-red?style=for-the-badge&logo=qdrant)
![Pydantic - Version](https://img.shields.io/badge/Pydantic-2.10+-red?style=for-the-badge&logo=pydantic)
![FastAPI - Version](https://img.shields.io/badge/FastAPI-0.115+-teal?style=for-the-badge&logo=fastapi)
![Docling - Version](https://img.shields.io/badge/Docling-3.1+-orange?style=for-the-badge&logo=docling)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge)](LICENSE)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg?style=for-the-badge)

</div>

---

> [!IMPORTANT]
> **Version Updates — v2.0 → v2.1 and beyond:**
> 1. **Document Processing Upgrade**: Unstructured.io has been replaced with Docling for document parsing and extraction of text, tables, and images to be embedded.
> 2. **Enhanced RAG References**: Links to source documents and reference images present in reranked retrieved chunks are now included at the bottom of RAG responses.
>
> To use the Unstructured.io-based solution, refer to release [v2.0](https://github.com/alonso-fernandezr/Multi-Agent-Medical-Assistant/tree/v2.0).

## Table of Contents

- [Overview](#overview)
- [Demo](#demo)
- [Technical Architecture](#technical-flowchart)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Installation and Setup](#installation-setup)
  - [Using Docker](#docker-setup)
  - [Manual Installation](#manual-setup)
- [Usage](#usage)
- [Contributing](#contributions)
- [License](#license)
- [Citation](#citing)
- [Contact](#contact)

---

## Overview <a name="overview"></a>

The **Multi-Agent Medical Assistant** is a production-grade AI chatbot system designed to support medical diagnosis, research, and clinical interaction workflows. It integrates multiple specialized AI agents orchestrated through a structured graph-based workflow engine.

**Core system capabilities:**

- **Large Language Models (LLMs)** for reasoning and response synthesis
- **Computer Vision Models** for medical imaging analysis
- **Retrieval-Augmented Generation (RAG)** backed by a vector database with hybrid retrieval
- **Real-time Web Search** for up-to-date medical literature
- **Human-in-the-Loop Validation** for AI-generated diagnostic outputs

This project demonstrates practical patterns for production-ready multi-agent systems including: multi-agent orchestration with graph-based workflows, advanced RAG with hybrid retrieval and semantic chunking, confidence-based routing and agent handoff, and modular design with robust exception handling.

Refer to [`agents/README.md`](agents/README.md) for a detailed breakdown of the agentic workflow.

---

## Demo <a name="demo"></a>

https://github.com/user-attachments/assets/d27d4a2e-1c7d-45e2-bbc5-b3d95ccd5b35

For a more detailed walkthrough, see [`Multi-Agent-Medical-Assistant-v1.9`](assets/Multi-Agent-Medical-Assistant-v1.9_Compressed.mp4).

---

## Technical Architecture <a name="technical-flowchart"></a>

![Technical Flow Chart](assets/final_medical_assistant_flowchart_light_rounded.png)

---

## Key Features <a name="key-features"></a>

**Multi-Agent Architecture**
Specialized agents working in coordination to handle diagnosis, information retrieval, reasoning, and validation.

**Advanced Agentic RAG Pipeline**
- Docling-based parsing to extract text, tables, and images from PDF documents
- Embedding of markdown-formatted text, tables, and LLM-generated image summaries
- LLM-based semantic chunking with structural boundary awareness
- LLM-based query expansion with related medical domain terms
- Qdrant hybrid search combining BM25 sparse keyword search with dense embedding vector search
- HuggingFace Cross-Encoder reranking of retrieved chunks for improved LLM response quality
- Input/output guardrails ensuring safe and topically relevant responses
- Source document and image references appended to RAG responses
- Confidence-based agent handoff between RAG and Web Search to minimize hallucinations

**Medical Imaging Analysis**
- Brain Tumor Detection (in progress)
- Chest X-ray Disease Classification
- Skin Lesion Segmentation

**Real-time Research Integration**
Web search agent that retrieves current medical research papers and clinical findings.

**Confidence-Based Verification**
Log-probability analysis for accuracy assurance in medical recommendations.

**Voice Interaction**
Speech-to-text and text-to-speech capabilities via Eleven Labs API.

**Human-in-the-Loop Oversight**
Medical professional validation step before finalizing diagnostic outputs.

**Guardrail System**
Input and output filtering to ensure safe, unbiased, and clinically appropriate responses.

> [!NOTE]
> Upcoming features:
> 1. Brain Tumor computer vision model integration.
> 2. Open to suggestions and contributions.

---

## Technology Stack <a name="technology-stack"></a>

| Component | Technologies |
|-----------|-------------|
| **Backend Framework** | FastAPI |
| **Agent Orchestration** | LangGraph |
| **Document Parsing** | Docling |
| **Knowledge Storage** | Qdrant Vector Database |
| **Medical Imaging** | Computer Vision Models |
| | Brain Tumor: Object Detection (PyTorch) |
| | Chest X-ray: Image Classification (PyTorch) |
| | Skin Lesion: Semantic Segmentation (PyTorch) |
| **Guardrails** | LangChain |
| **Speech Processing** | Eleven Labs API |
| **Frontend** | HTML, CSS, JavaScript |
| **Deployment** | Docker, GitHub Actions CI/CD |

---

## Installation & Setup <a name="installation-setup"></a>

## Option 1: Docker <a name="docker-setup"></a>

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your system
- API keys for the required services

### 1. Clone the Repository

```bash
git clone https://github.com/alonso-fernandezr/Multi-Agent-Medical-Assistant.git
cd Multi-Agent-Medical-Assistant
```

### 2. Create Environment File

Create a `.env` file in the root directory with the following variables:

> [!NOTE]
> You may use any LLM and embedding model of your choice.
> 1. If using Azure OpenAI, no modification is required.
> 2. If using direct OpenAI, modify the LLM and embedding model definitions in `config.py` and provide the appropriate environment variables.
> 3. If using local models, code changes may be required throughout `agents/`.

> [!WARNING]
> Ensure API keys are correct and have the required permissions. No trailing whitespace after variable names.

```bash
# LLM Configuration (Azure OpenAI — gpt-4o used in development)
deployment_name=
model_name=gpt-4o
azure_endpoint=
openai_api_key=
openai_api_version=

# Embedding Model Configuration (Azure OpenAI — text-embedding-ada-002 used in development)
embedding_deployment_name=
embedding_model_name=text-embedding-ada-002
embedding_azure_endpoint=
embedding_openai_api_key=
embedding_openai_api_version=

# Speech API Key (Eleven Labs)
ELEVEN_LABS_API_KEY=

# Web Search API Key (Tavily)
TAVILY_API_KEY=

# HuggingFace Token — reranker model "ms-marco-TinyBERT-L-6"
HUGGINGFACE_TOKEN=

# (Optional) Qdrant server — local mode does not require an API key
QDRANT_URL=
QDRANT_API_KEY=
```

### 3. Build the Docker Image

```bash
docker build -t medical-assistant .
```

### 4. Run the Container

```bash
docker run -d --name medical-assistant-app -p 8000:8000 --env-file .env medical-assistant
```

The application will be available at: [http://localhost:8000](http://localhost:8000)

### 5. Ingest Data into the Vector DB

Ingest a single document:

```bash
docker exec medical-assistant-app python ingest_rag_data.py --file ./data/raw/brain_tumors_ucni.pdf
```

Ingest all documents from a directory:

```bash
docker exec medical-assistant-app python ingest_rag_data.py --dir ./data/raw
```

### Container Management

```bash
# Stop
docker stop medical-assistant-app

# Start
docker start medical-assistant-app

# View logs
docker logs medical-assistant-app

# Remove
docker rm medical-assistant-app

# Health check
docker inspect --format='{{.State.Health.Status}}' medical-assistant-app
```

---

## Option 2: Manual Installation <a name="manual-setup"></a>

### 1. Clone the Repository

```bash
git clone https://github.com/alonso-fernandezr/Multi-Agent-Medical-Assistant.git
cd Multi-Agent-Medical-Assistant
```

### 2. Create and Activate a Virtual Environment

Using conda:

```bash
conda create --name <environment-name> python=3.11
conda activate <environment-name>
```

Using Python venv:

```bash
python -m venv <environment-name>
source <environment-name>/bin/activate   # macOS/Linux
<environment-name>\Scripts\activate      # Windows
```

### 3. Install Dependencies

> [!IMPORTANT]
> `ffmpeg` is required for the speech service.

Using conda:

```bash
conda install -c conda-forge ffmpeg
pip install -r requirements.txt
```

Using Python venv:

```bash
winget install ffmpeg
pip install -r requirements.txt
```

### 4. Configure API Keys

Create a `.env` file with the variables shown in Option 1.

### 5. Run the Application

```bash
python app.py
```

The application will be available at: [http://localhost:8000](http://localhost:8000)

### 6. Ingest Data into the Vector DB

```bash
# Single document
python ingest_rag_data.py --file ./data/raw/brain_tumors_ucni.pdf

# All documents in a directory
python ingest_rag_data.py --dir ./data/raw
```

---

## Usage <a name="usage"></a>

> [!NOTE]
> 1. The first run may be slow due to model downloads (YOLO/Tesseract OCR, CV agent models, cross-encoder reranker, etc.). Check the console for progress.
> 2. Retry after initial downloads complete — subsequent runs are stable and fully tested.

- Upload medical images for AI-based diagnosis. Use images from the `sample_images/` folder to test the computer vision agents.
- Submit medical queries to leverage RAG (from the knowledge base) or web search (for current literature).
- Use voice interaction via the speech-to-text and text-to-speech interface.
- Review AI-generated outputs through the human-in-the-loop validation interface.

---

## Contributing <a name="contributions"></a>

Contributions are welcome. Please open an [issue](https://github.com/alonso-fernandezr/Multi-Agent-Medical-Assistant/issues) to report bugs or propose features before submitting a pull request.

---

## License <a name="license"></a>

This project is licensed under the **Apache 2.0 License**. See the [LICENSE](LICENSE) file for details.

---

## Citation <a name="citing"></a>

```bibtex
@misc{MultiAgentMedicalAssistant2025,
  Title        = {Multi-Agent Medical Assistant},
  Year         = {2025},
  Publisher    = {GitHub},
  Journal      = {GitHub repository},
  Howpublished = {\url{https://github.com/alonso-fernandezr/Multi-Agent-Medical-Assistant}}
}
```

---

## Contact <a name="contact"></a>

For questions, bug reports, or collaboration inquiries, please open an [issue](https://github.com/alonso-fernandezr/Multi-Agent-Medical-Assistant/issues) or start a [discussion](https://github.com/alonso-fernandezr/Multi-Agent-Medical-Assistant/discussions).

<p align="right">
  <a href="#top"><b>Back to top</b></a>
</p>

---
