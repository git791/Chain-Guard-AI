# 🦾 ChainGuard AI: The Future of Autonomous Logistics

![ChainGuard Banner](https://img.shields.io/badge/Google_Solution_Challenge-2026-blue?style=for-the-badge&logo=google)
![Built with Gemini](https://img.shields.io/badge/Built_with-Gemini_AI-orange?style=for-the-badge&logo=googlegemini)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)

## 🌍 Overview
**ChainGuard AI** is a state-of-the-art, AI-powered Command Center designed to revolutionize the global supply chain. Built for the **Google Solution Challenge 2026**, our platform addresses the critical challenges of logistics: unpredictability, carbon footprints, and inefficiency.

By leveraging Google's cutting-edge AI and cloud infrastructure, ChainGuard AI provides real-time visibility and intelligent decision-making capabilities to logistics managers worldwide, ensuring that goods move faster, smarter, and greener.

---

## 👥 The Team
We are a dedicated team of student innovators participating in the Google Solution Challenge:
- **Mohammed Ayaan Adil Ahmed**
- **Mohith B S**
- **Yashwanth R**
- **Desai Sri Koundinya**

---

## 🚀 What is ChainGuard AI? (For Beginners)
Imagine a massive control room where you can see every single delivery truck, ship, or plane in the world on one map. Now, imagine that control room has a "super-brain" (AI) that can:
1. **Predict the Future**: Tells you if a storm or a traffic jam will delay your package before it even happens.
2. **Suggest Better Paths**: Automatically finds a faster or more fuel-efficient route.
3. **Save the Planet**: Calculates exactly how much CO2 you're saving by being efficient.

That's **ChainGuard AI**. It's a "Command Center" for the modern world, making sure everything from medicine to food arrives on time while minimizing the impact on our environment.

---

## ✨ Key Features
- **Real-Time Command Center**: A high-fidelity dashboard that tracks shipments globally using live data.
- **AI-Powered Insights**: Gemini AI analyzes delays, weather patterns, and traffic to suggest optimized reroutes.
- **Dynamic Mapping**: Interactive Google Maps integration with live shipment markers and polyline route visualization.
- **Sustainability Analytics (SDG Impact)**: A dedicated dashboard tracking CO2 emissions saved through AI-optimized routing.
- **Instant Alerts**: Real-time notifications when a shipment's status changes or a delay is detected.

---

## 🛠️ The Tech Stack (Google Ecosystem)
Our solution is built entirely on the **Google Cloud Ecosystem** to ensure scalability and performance:

- **AI Model**: [Gemini AI](https://deepmind.google/technologies/gemini/) (via Vertex AI) for generating logistics logic and reroute coordinates.
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore) for real-time synchronization of shipment states.
- **Authentication**: [Firebase Auth](https://firebase.google.com/docs/auth) for secure login of logistics managers.
- **Maps**: [Google Maps JavaScript API](https://developers.google.com/maps) for high-performance spatial visualization.
- **Serverless**: [Google Cloud Functions](https://cloud.google.com/functions) for automated background tasks and delay detection.
- **Frontend**: [Next.js](https://nextjs.org/) (React) with Tailwind CSS for a premium, responsive UI.

---

## 🌿 Sustainable Development Goals (SDGs)
ChainGuard AI is built with a purpose. We align with the following UN SDGs:
- **Goal 9: Industry, Innovation, and Infrastructure**: Building resilient infrastructure through AI.
- **Goal 12: Responsible Consumption and Production**: Optimizing supply chains to reduce waste.
- **Goal 13: Climate Action**: Directly measuring and reducing CO2 emissions in transport.

---

## 🏗️ Implementation Details
### How it Works:
1. **Data Ingestion**: Shipment data is stored in **Firestore**. Any change in position or status is instantly pushed to the frontend using `onSnapshot()`.
2. **Intelligence Layer**: When a delay is detected (e.g., severe weather), a **Google Cloud Function** triggers. It sends the shipment's context to **Gemini API**.
3. **AI Reasoning**: Gemini processes the data and returns suggested alternate coordinates and a risk assessment.
4. **Visualization**: The **Google Maps API** draws the original route vs. the AI-optimized route, providing a clear visual for the manager to approve.

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18+)
- A Google Cloud Project (with Vertex AI enabled)
- A Firebase Project

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ChainGuard.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your credentials:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_key
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
   GEMINI_API_KEY=your_key
   # ... add other required keys
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
5. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## Alternatively, deployed on:
https://chainguard-ai-618427654461.us-central1.run.app/ on Google Cloud run

---

## 📜 License
This project is developed for the **Google Solution Challenge 2026**.

*"Empowering Global Trade with Artificial Intelligence."*
