---
trigger: always_on
---

# 🚀 Full-Stack Supply Chain Command Center (Google Solution Challenge)

## 📌 Overview

Convert the existing high-fidelity frontend supply chain prototype into a **scalable full-stack application** using modern cloud-native tools. The system will provide real-time shipment tracking, AI-powered insights, and sustainability analytics aligned with SDGs.

---

## 🏗️ Architecture Requirements

### 🎨 Frontend

* Framework: **Next.js**
* Styling: **Tailwind CSS**
* Maintain:

  * Existing **Command Center UI**
  * CSS variables and design tokens

---

### 🔥 Database (Firebase Firestore)

* Replace static `SHIPMENTS` array with:

  * Real-time Firestore collection (`shipments`)
* Use:

  * `onSnapshot()` for live updates
* Store:

  ```json
  {
    "id": "shipment_001",
    "status": "in_transit",
    "progress": 65,
    "origin": { "lat": 12.97, "lng": 77.59 },
    "destination": { "lat": 28.61, "lng": 77.20 },
    "currentLocation": { "lat": 20.29, "lng": 78.96 },
    "delay": false
  }
  ```

---

### 🗺️ Mapping (Google Maps JavaScript API)

Replace static SVG/Canvas with:

* Dynamic **Google Maps**
* Features:

  * Shipment markers
  * Polyline routes
  * Live position updates

#### Example:

```javascript
const routePath = new google.maps.Polyline({
  path: [origin, destination],
  geodesic: true,
  strokeColor: "#00FFAA",
});
```

---

### 🤖 AI Intelligence (Gemini API via Vertex AI)

#### Purpose:

* Analyze:

  * Shipment delays
  * Weather data
* Generate:

  * AI Insights
  * Alternate routes (coordinates)

#### Function Logic:

```javascript
async function getAIInsights(shipmentData) {
  const response = await fetch("/api/gemini", {
    method: "POST",
    body: JSON.stringify(shipmentData),
  });
  return response.json();
}
```

#### Backend (Cloud Function / API Route):

```javascript
const prompt = `
Shipment delay detected.
Weather: ${weather}
Current Location: ${location}

Suggest optimized reroute coordinates and insights.
`;

const result = await model.generateContent(prompt);
```

---

### 🔐 Authentication (Firebase Auth)

* Role: **Logistics Manager**
* Features:

  * Email/Password login
  * Protected dashboard routes

---

### ⚙️ Backend Logic (Google Cloud Functions)

#### Trigger:

* Firestore `onUpdate`

#### Condition:

```javascript
if (after.status === "delayed" && before.status !== "delayed")
```

#### Actions:

* Send browser notification
* Add entry to `event_feed` collection

---

### 🌱 SDG Impact Feature (Analytics Tab)

#### Goal:

Track sustainability impact

#### Metric:

* CO₂ emissions saved via optimized routing

#### Formula:

```text
CO2 Saved = (Original Distance - Optimized Distance) × Emission Factor
```

#### Display:

* Graphs (weekly/monthly savings)
* Total emissions reduced

---

## 📁 Modular File Structure

```
/project-root
│
├── /app (Next.js App Router)
│   ├── /dashboard
│   ├── /analytics
│   ├── /api
│   │   └── gemini/route.js
│
├── /components
│   ├── Map.jsx
│   ├── ShipmentCard.jsx
│   ├── EventFeed.jsx
│   ├── AIInsights.jsx
│
├── /lib
│   ├── firebase.js
│   ├── firestore.js
│   ├── auth.js
│
├── /hooks
│   ├── useShipments.js
│
├── /services
│   ├── geminiService.js
│   ├── mapService.js
│
├── /functions (Cloud Functions)
│   ├── index.js
│
├── /styles
│   ├── globals.css
│
├── .env.local
├── tailwind.config.js
├── package.json
```

---

## 🔧 Firebase Configuration Setup

### 1. Install Firebase

```bash
npm install firebase
```

### 2. Initialize Firebase (`lib/firebase.js`)

```javascript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "...",
  projectId: "...",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
```

---

### 3. Firestore Real-Time Hook

```javascript
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function useShipments(setShipments) {
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "shipments"), (snapshot) => {
      setShipments(snapshot.docs.map(doc => doc.data()));
    });

    return () => unsub();
  }, []);
}
```

---

## 🤖 Gemini API Integration

### 1. Install SDK

```bash
npm install @google/generative-ai
```

---

### 2. API Route (`/app/api/gemini/route.js`)

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const data = await req.json();

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
  Shipment delay: ${data.delay}
  Weather: ${data.weather}
  Location: ${JSON.stringify(data.location)}

  Suggest optimized reroute and insights.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;

  return Response.json({ text: response.text() });
}
```

---

## 🔔 Cloud Function (Delay Detection)

```javascript
exports.detectDelay = functions.firestore
  .document("shipments/{id}")
  .onUpdate((change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    if (after.status === "delayed" && before.status !== "delayed") {
      // Add event feed entry
      return admin.firestore().collection("event_feed").add({
        message: `Shipment ${context.params.id} delayed`,
        timestamp: new Date(),
      });
    }
  });
```

---

## 📊 Key Features Summary

* ✅ Real-time shipment tracking (Firestore)
* ✅ Interactive maps (Google Maps API)
* ✅ AI-powered logistics insights (Gemini)
* ✅ Authentication (Firebase Auth)
* ✅ Automated backend triggers (Cloud Functions)
* ✅ Sustainability tracking (CO₂ savings)

---

## 🎯 Outcome

A production-ready **AI-powered logistics platform** that:

* Improves delivery efficiency
* Reduces delays
* Supports **UN SDG goals (Climate Action & Industry Innovation)**

---

## 🚀 Next Steps

* Deploy on **Vercel / Firebase Hosting**
* Connect real weather API (OpenWeather)
* Add role-based dashboards (Admin vs Manager)
* Integrate push notifications (Firebase Messaging)

---
