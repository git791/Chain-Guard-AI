"use client";

import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';
import { useMemo } from 'react';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 21.14,
  lng: 79.08 // Central India roughly
};

export default function Map({ shipments = [] }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  });

  const routes = useMemo(() => {
    return shipments.filter(s => s.origin && s.destination).map(s => ({
      id: s.id,
      path: [
        { lat: s.origin.lat, lng: s.origin.lng },
        { lat: s.currentLocation?.lat, lng: s.currentLocation?.lng },
        { lat: s.destination.lat, lng: s.destination.lng }
      ].filter(Boolean),
      color: s.status === 'delayed' || s.status === 'at_risk' ? '#f87171' : (s.status === 'rerouted' ? '#34d399' : '#4f9cf9')
    }));
  }, [shipments]);

  if (loadError || !process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY === 'MOCK_MAPS_KEY') {
    return (
      <div className="w-full h-full bg-surface2 relative overflow-hidden flex items-center justify-center border border-border">
        <div className="text-muted text-xs absolute flex items-center justify-center inset-0 z-10 flex-col gap-2">
          <span>Map requires valid Google Maps API Key</span>
        </div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
      </div>
    );
  }

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4.5}
        options={{
          disableDefaultUI: true,
          styles: darkMapStyles
        }}
      >
        {routes.map(r => (
           <div key={r.id}>
             <Polyline
               path={r.path}
               options={{
                 strokeColor: r.color,
                 strokeOpacity: 0.8,
                 strokeWeight: 2,
                 geodesic: true
               }}
             />
             {r.path.map((pos, i) => (
                <Marker key={`${r.id}-${i}`} position={pos} icon={{
                  path: 0, // google.maps.SymbolPath.CIRCLE
                  scale: i === 1 ? 4 : 2,
                  fillColor: r.color,
                  fillOpacity: 0.9,
                  strokeWeight: 0
                }}/>
             ))}
           </div>
        ))}
      </GoogleMap>
  ) : <div className="w-full h-full bg-surface2 animate-pulse" />
}

const darkMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#1a1e26" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a1e26" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#6b7280" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0c0e12" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#13161c" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#0c0e12" }] }
];
