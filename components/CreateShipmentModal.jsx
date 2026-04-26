import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function CreateShipmentModal({ onClose }) {
  const [formData, setFormData] = useState({
    originLat: '', originLng: '',
    destLat: '', destLng: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const generatedId = `SHP-${Math.floor(1000 + Math.random() * 9000)}`;
      const payload = {
        id: generatedId,
        status: "in_transit",
        progress: 0,
        origin: { lat: parseFloat(formData.originLat), lng: parseFloat(formData.originLng) },
        destination: { lat: parseFloat(formData.destLat), lng: parseFloat(formData.destLng) },
        currentLocation: { lat: parseFloat(formData.originLat), lng: parseFloat(formData.originLng) },
        delay: false,
        route: `Manual Entry`,
        originalDistance: Math.floor(Math.random() * 800) + 200,
      };

      if(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID !== 'mock-project') {
         await addDoc(collection(db, "shipments"), payload);
      } else {
         // Fake delay for demo environments
         await new Promise(r => setTimeout(r, 600));
         alert(`Live DB not connected, but successfully generated payload for ID: ${generatedId}`);
      }
      
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to create shipment. Ensure Firestore is reachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-surface border border-border w-full max-w-md rounded-xl shadow-2xl p-6 relative">
        <h2 className="text-xl font-bold mb-1">Create New Shipment</h2>
        <p className="text-sm text-muted mb-6">Enter coordinates to initialize live tracking.</p>
        
        {error && <div className="p-3 mb-4 rounded bg-red-dim border border-red/30 text-red text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div className="grid grid-cols-2 gap-3">
             <label className="flex flex-col gap-1 text-sm font-medium text-muted">
                Origin Latitude
                <input required type="number" step="any" placeholder="e.g. 19.07" 
                       value={formData.originLat} onChange={e => setFormData(f => ({...f, originLat: e.target.value}))}
                       className="bg-surface2 p-2 rounded border border-border focus:border-accent outline-none text-text" />
             </label>
             <label className="flex flex-col gap-1 text-sm font-medium text-muted">
                Origin Longitude
                <input required type="number" step="any" placeholder="e.g. 72.87" 
                       value={formData.originLng} onChange={e => setFormData(f => ({...f, originLng: e.target.value}))}
                       className="bg-surface2 p-2 rounded border border-border focus:border-accent outline-none text-text" />
             </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <label className="flex flex-col gap-1 text-sm font-medium text-muted">
                Target Latitude
                <input required type="number" step="any" placeholder="e.g. 28.70" 
                       value={formData.destLat} onChange={e => setFormData(f => ({...f, destLat: e.target.value}))}
                       className="bg-surface2 p-2 rounded border border-border focus:border-accent outline-none text-text" />
             </label>
             <label className="flex flex-col gap-1 text-sm font-medium text-muted">
                Target Longitude
                <input required type="number" step="any" placeholder="e.g. 77.10" 
                       value={formData.destLng} onChange={e => setFormData(f => ({...f, destLng: e.target.value}))}
                       className="bg-surface2 p-2 rounded border border-border focus:border-accent outline-none text-text" />
             </label>
          </div>

          <div className="flex gap-3 justify-end mt-4">
             <button type="button" onClick={onClose} className="px-4 py-2 rounded text-sm font-medium hover:bg-surface2 text-muted border border-transparent">
               Cancel
             </button>
             <button type="submit" disabled={loading} className="px-4 py-2 rounded text-sm font-bold bg-accent hover:bg-blue-600 text-white transition-colors disabled:opacity-50 border border-transparent">
               {loading ? 'Initializing...' : 'Add Shipment'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
