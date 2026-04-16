"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Static mock shipments data from the original HTML
export const MOCK_SHIPMENTS = [
  { id:'SHP-4821', route:'Mumbai → Delhi',      origin:{lat:19.07,lng:72.87}, destination:{lat:28.70,lng:77.10}, currentLocation:{lat: 25.1, lng: 75.8}, loc:'Currently in Jaipur',           status:'in_transit', progress:72, eta:'06h 40m', delay: false },
  { id:'SHP-3307', route:'Chennai → Kolkata',   origin:{lat:13.08,lng:80.27}, destination:{lat:22.57,lng:88.36}, currentLocation:{lat: 17.6, lng: 83.2}, loc:'Waiting at Visakhapatnam',      status:'delayed',    progress:45, eta:'14h 20m', delay: true },
  { id:'SHP-6140', route:'Bengaluru → Hyderabad',origin:{lat:12.97,lng:77.59}, destination:{lat:17.38,lng:78.48}, currentLocation:{lat: 14.6, lng: 77.6}, loc:'En route via NH-44',           status:'in_transit', progress:88, eta:'01h 55m', delay: false },
  { id:'SHP-2956', route:'Delhi → Ahmedabad',   origin:{lat:28.70,lng:77.10}, destination:{lat:23.02,lng:72.57}, currentLocation:{lat: 25.0, lng: 73.0}, loc:'Risk zone: weather system',     status:'at_risk',    progress:31, eta:'09h 10m', delay: false },
  { id:'SHP-7703', route:'Pune → Nagpur',        origin:{lat:18.52,lng:73.85}, destination:{lat:21.14,lng:79.08}, currentLocation:{lat: 19.8, lng: 75.3}, loc:'Rerouted via NH-53',           status:'rerouted',   progress:60, eta:'05h 30m', delay: false },
];

export function useShipments() {
  const [shipments, setShipments] = useState(MOCK_SHIPMENTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID === "mock-project" || !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      setShipments(MOCK_SHIPMENTS);
      setLoading(false);
      
      const interval = setInterval(() => {
        setShipments(prev => prev.map(s => {
          if (s.status === 'in_transit') {
            return { ...s, progress: Math.min(100, s.progress + Math.floor(Math.random() * 3)) };
          }
          return s;
        }));
      }, 9000);
      
      return () => clearInterval(interval);
    }

    try {
      const unsub = onSnapshot(collection(db, "shipments"), (snapshot) => {
        if (!snapshot.empty) {
          setShipments(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
        } else {
          setShipments(MOCK_SHIPMENTS);
        }
        setLoading(false);
      }, (err) => {
        console.error("Firestore error:", err);
        setShipments(MOCK_SHIPMENTS);
        setLoading(false);
      });

      return () => unsub();
    } catch (e) {
      console.error("Error setting up shipment snapshot:", e);
      setShipments(MOCK_SHIPMENTS);
      setLoading(false);
    }
  }, []);

  return { shipments, loading };
}
