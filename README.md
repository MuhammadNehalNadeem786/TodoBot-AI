# 🤖 AI‑Powered Todo Chatbot (Phase III)

A conversational AI task manager that enables users to manage todos using natural language.
This project combines **AI agents, tool calling, and MCP server architecture** to deliver a scalable, production‑ready backend system.

---

## 🚀 Project Overview

The **AI‑Powered Todo Chatbot** allows users to manage their tasks conversationally:

* ✅ Create tasks
* ✅ Update tasks
* ✅ Delete tasks
* ✅ View tasks

Instead of traditional forms or buttons, users simply **chat with the AI**. The system interprets intent and executes real database operations behind the scenes.

Although the API is fully **stateless**, conversation history and task state are persistently stored in the database — ensuring scalability without sacrificing context.

---

## 🎯 Objective

To design and implement a conversational task management system powered by AI agents that dynamically call backend tools through an **MCP (Model Context Protocol) server**.

---

## 🧩 Key Features

* Natural‑language task management
* Stateless chat endpoint
* Persistent conversation memory
* MCP‑based tool architecture
* Dynamic AI agent tool calling
* Secure token‑based authentication
* Scalable FastAPI backend design

---

## 🏗 System Architecture

```
User → Chat UI → AI Agent → MCP Server → FastAPI → Database
```

### 🔄 Request Flow

1. User sends a message
2. AI Agent interprets the intent
3. Agent selects the appropriate tool via MCP
4. FastAPI executes the operation
5. Database updates the state
6. AI responds conversationally to the user

This separation ensures clean architecture and clear responsibility between AI reasoning and backend execution.

---

## 🧠 Tech Stack

### 🎨 Frontend

* OpenAI ChatKit

### ⚙ Backend

* Python FastAPI

### 🤖 AI Layer

* OpenAI Agents SDK

### 🔌 MCP Layer

* Official MCP SDK

### 🗄 Database

* Neon Serverless PostgreSQL

### 🧩 ORM

* SQLModel

### 🔐 Authentication

* Better Auth

---

## 🔐 Authentication & Security

* Token‑based authentication
* User‑scoped task isolation
* Secure backend validation

Each user can only access and manage their own tasks.

---

## 🧪 How the AI Works Internally

The chatbot **does not directly access the database**.

Instead, it follows a tool‑based execution pattern:

```
AI → Understands intent → Calls MCP tool → Backend executes → Result returned → AI replies
```

### Example

**User:** "Remind me to study at 9pm"
**AI:** Calls `create_task` tool
**Backend:** Stores task in database
**AI:** Confirms task creation conversationally

This architecture ensures modularity, scalability, and clean AI‑backend separation.

---

## 🗄 Database Design

The database persists:

* Users
* Tasks
* Conversation history

By storing conversation state, the backend remains stateless while the system retains contextual continuity.

---

## 🧰 MCP Tools Exposed

The MCP server exposes backend functionality as structured tools:

* `create_task`
* `update_task`
* `delete_task`
* `list_tasks`

The AI agent dynamically selects and invokes these tools based on user intent.

---

## 🐳 Docker Support (Optional)

Both frontend and backend can be containerized independently using Docker for consistent development and deployment environments.

---

## 📡 API Concept

### `POST /chat`

* Stateless endpoint
* Accepts user message
* AI processes intent
* Calls MCP tools when needed
* Returns conversational response

---

## 📚 Key Learnings

This project strengthened my understanding of:

* AI agent orchestration
* Tool‑calling architectures
* MCP server design patterns
* Stateless backend systems
* Production‑ready API development
* Scalable database integration

---

## 🚀 Future Improvements

* ⏰ Smart task reminders
* 🔔 Real‑time notifications
* 🎙 Voice interaction support
* 🤝 Multi‑agent collaboration
* 🧠 Advanced task planning & reasoning

---

## 👤 Author

Built as a portfolio and learning project to explore modern AI‑driven backend architectures and intelligent systems design.

---

## ⭐ Support

If you found this project useful, consider giving it a star ⭐ and connecting to exchange ideas about AI agents and MCP architectures.
