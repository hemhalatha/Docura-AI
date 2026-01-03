# Docura AI
### Intelligence for your documents.

Docura AI is a professional document analysis platform designed to transform complex PDF data into structured, actionable intelligence. Built with a "Sapphire & Slate" aesthetic, it provides a high-end experience for researchers, students, and professionals requiring deep document insights.

---

## Final Interface & Workflow (Proof of Work)

### 1. Professional Frontend
The platform features a sophisticated midnight blue palette, custom document selection actions, and a persistent history sidebar for seamless navigation.

<div align="center">
  <img src="./Screenshot 2026-01-03 162418.png" alt="Frontend Interface" width="800">
</div>

### 2. Backend Intelligence Workflow
Docura AI is powered by a robust n8n workflow that orchestrates PDF parsing, Gemini AI analysis, and structured response delivery.

<div align="center">
  <img src="./Screenshot 2026-01-03 162559.png" alt="n8n Workflow" width="800">
</div>

---

## Detailed Workflow Explanation

The Docura AI backend operates through a precisely choreographed sequence in n8n to ensure high-quality analysis:

1.  **Webhook Integration**: The frontend sends a POST request containing the PDF file to a secure n8n webhook endpoint.
2.  **PDF Data Extraction**: The `Extract from File` node processes the binary data, converting the PDF content into sanitized text for analysis.
3.  **Gemini AI Orchestration**: The extracted text is passed to the Google Gemini model (Gemini 1.5 Flash). A specialized system prompt instructs the AI to act as a professional study assistant, generating well-structured, exam-ready Markdown notes.
4.  **Structured Response**: The final intelligence is formatted into a JSON object and delivered back to the frontend via the `Respond to Webhook` node, ensuring immediate availability of insights.

---

## Key Features

- **Sapphire & Slate UI**: A custom-engineered professional dark theme featuring glassmorphism and subtle micro-animations.
- **AI-Powered Insights**: Deep document understanding leveraged through Google Gemini models.
- **Modern Document Actions**: A bespoke file selection experience that replaces standard browser defaults with a professional Cyber-button interface.
- **Markdown-Optimized Output**: Generated notes utilize rich Markdown formatting for maximum readability and structure.
- **Persistent History**: Integrated local storage allows users to archive and revisit previous analyses instantly.
- **Real-time Feedback**: Interactive progress states and fluid transitions powered by Framer Motion.

---

## Technology Stack

- **Frontend**: React.js, Framer Motion, Lucide Icons
- **Styling**: Vanilla CSS (Custom Design System)
- **Backend**: n8n (Workflow Automation)
- **AI Engine**: Google Gemini
- **Processing**: PDF Text Extraction

---

## Getting Started

### Prerequisites
- Node.js environment
- n8n instance with the provided workflow (`Docura_Workflow.json`)

### Installation

1. Clone the repository.
2. Navigate to the project directory:
   ```bash
   cd pdf_to_notes
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Initialize the application:
   ```bash
   npm start
   ```

---

## Project Objective
To deliver a premium, enterprise-grade document analysis utility that combines powerful AI-driven functionality with a refined, intuitive user interface.
