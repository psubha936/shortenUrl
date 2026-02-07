# 🔗 URL Shortener Service
### **Enterprise-grade, Scalable, and Analytics-driven API**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 📖 Overview

A high-performance **URL Shortener API** built with a focus on **security**, **observability**, and **resilience**. This service transforms long, cumbersome URLs into optimized aliases while providing granular analytics and dual-layer rate limiting to prevent infrastructure abuse.

Built for developers who need a production-ready solution that prioritizes clean code and architectural integrity.

---

## 🏗 System Architecture

The project follows a **Modular Controller-Service-Repository** pattern. This ensures a strict separation of concerns, making the codebase unit-testable and easy to scale.

### **Design Philosophy**
* **Decoupled Logic:** Controllers handle HTTP concerns, while Services contain the core business logic.
* **Middleware-First Security:** Authentication and Rate Limiting are injected at the routing layer.
* **Data Integrity:** Mongoose schemas ensure strict validation before any write operations.

---

## 🚀 Key Features

* **⚡ High-Speed Redirection:** Optimized database queries for sub-100ms redirects.
* **🛡️ Dual-Layer Rate Limiting:** Separate logic for API consumers vs. end-user clicks.
* **📊 Granular Analytics:** Track engagement with timestamps and total click counts.
* **🔐 API Key Security:** Protects the creation endpoint from unauthorized public use.
* **🧩 Scalable Design:** Ready for containerization and horizontal scaling.

---

## 🚦 Traffic Management (Rate Limiting)

To ensure high availability and prevent "noisy neighbor" issues, the service implements a strict traffic policy:

| Type | Limit | Window | Purpose |
| :--- | :--- | :--- | :--- |
| **API Usage** | 50 Requests | 2 Hours | Prevents API Key / IP scraping & abuse. |
| **Link Clicks** | 5 Clicks | 2 Minutes | Mitigates bot-driven click inflation. |

> [!IMPORTANT]
> Exceeding these limits triggers a **HTTP 429 – Too Many Requests** response to protect system resources.

---

## 📖 API Documentation

### **1. URL Operations**

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/shorten` | Create a shortened URL | **Yes (API Key)** |
| `GET` | `/r/:code` | Redirect to original URL | No |
| `GET` | `/analytics/:code` | Get click-through data | **Yes (API Key)** |
| `PUT` | `/shorten/:code` | Update a shortened URL | **Yes (API Key)** |

#### **Example Request: Shorten URL**
```json
// POST /shorten
// Header: x-api-key: YOUR_KEY
{
  "longUrl": "[https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)"
}
```
---

## 🛠 Tech Stack & Tools

| Component | Technology |
| :--- | :--- |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) (LTS), Express.js |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) via Mongoose ODM |
| **Security** | `express-rate-limit`, `Helmet.js`, API Key Middleware |
| **DevOps/Tools** | Postman, Nodemon, Morgan (Logging) |



---

## ⚙️ Installation & Setup

Follow these steps to get your local development environment up and running.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/url-shortener.git](https://github.com/your-username/url-shortener.git](https://github.com/psubha936/shortenUrl))
cd shortenUrl 

2. Install Dependencies
Bash
npm install
3. Environment Configuration
Create a .env file in the root directory and populate it with the following variables:

Code snippet
# Server Configuration
PORT=xxxxx
BASE_URL=xxxxx

# Database Configuration
MONGO_URI=your_mongodb_connection_string

```
<h2>🧪 Phase 2 – Redis Integration</h2> <p> In the next phase, the system will integrate <strong>Redis</strong> to improve performance, scalability, and traffic handling under high concurrency. </p> <ul> <li>🚦 <strong>Distributed Rate Limiting</strong> across API keys, IPs, and short URLs</li> <li>⚡ <strong>Hot URL Caching</strong> for faster redirection and reduced DB reads</li> <li>📊 <strong>Real-time Analytics Buffering</strong> with batch persistence</li> <li>🔁 <strong>Horizontal Scalability</strong> for multi-instance deployments</li> </ul> <blockquote> <strong>Note:</strong> Redis enables consistent rate limits and analytics even in distributed, high-traffic environments. </blockquote>

<hr/> <h2 align="center">👨‍💻 Crafted By</h2> <p align="center"> <strong>✨ Subhaprakash Nayak ✨</strong><br/> Senior Software Engineer<br/><br/> 🚀 Backend Engineering & API Architecture<br/> 💡 Clean Code • Scalable Systems • Production Mindset </p> <hr/>
