# 🔗 URL Shortener Service

A production-ready **URL Shortener API** that converts long URLs into short, reliable links and redirects users seamlessly to the original destination.  
The system supports **API key–based access**, **detailed analytics**, and **strict rate limiting** to ensure security, performance, and fair usage.

---

## 🚀 Key Features

- Generate a **shortened URL** from a long URL
- Redirect short URLs to the original URL
- **API key–based access control**
- **Analytics tracking** for each shortened URL
  - Total clicks
  - Timestamp-based usage data
- **Rate limiting** to prevent abuse
- Scalable and clean controller–service architecture

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Language:** JavaScript  
- **Security:** API Key, Rate Limiter  
- **Tools:** Postman, Nodemon  

---
Redirect Shortened URL

GET /:shortCode

➡️ Redirects to the original long URL and records analytics.

📊 Analytics

Each shortened URL tracks:

Total number of clicks

Click timestamps

Usage patterns per short URL

This data helps monitor traffic and detect misuse.

🚦 Rate Limiting Rules
1️⃣ API Usage Rate Limiter

A user can hit any link up to 50 times within 2 hours

Enforced using API key and IP-based tracking

2️⃣ Link Click Rate Limiter

The same shortened link can be clicked only 5 times within 2 minutes

Prevents automated or abusive repeated clicks

If limits are exceeded, the API responds with a 429 Too Many Requests error.


👨‍💻 Author

Subhaprakash Nayak
Senior Software Engineer
