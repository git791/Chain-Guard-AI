"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useAuth } from "@/lib/AuthContext";

export default function SettingsPage() {
  const { profile, updateProfile } = useAuth();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile?.name) {
      setName(profile.name);
    }
  }, [profile]);

  const handleSave = () => {
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      updateProfile({ name });
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 600);
  };

  return (
    <div className="grid grid-cols-[220px_1fr] grid-rows-[auto_1fr] min-h-screen max-md:grid-cols-1">
      <Sidebar />
      <div className="flex flex-col min-h-0 bg-[var(--color-bg)]">
        <Header />
        <main className="p-8 flex flex-col gap-6 max-md:p-4.5">
          <h1 className="text-2xl font-bold">Settings</h1>
          <div className="bg-surface border border-border rounded-[14px] p-6 text-sm text-text">
            <h2 className="text-lg font-semibold mb-4 border-b border-border pb-2">Profile & Preferences</h2>
            <div className="flex flex-col gap-4 max-w-lg">
              <label className="flex flex-col gap-1.5 font-medium text-muted">
                Display Name
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="bg-surface2 p-2.5 rounded-md border border-border outline-none focus:border-accent text-text" 
                />
              </label>
              
              <label className="flex flex-col gap-1.5 font-medium text-muted">
                Email Address
                <input type="email" defaultValue="admin@chainguard.ai" disabled className="bg-surface2 p-2.5 rounded-md border border-border outline-none focus:border-accent text-text opacity-70 cursor-not-allowed" />
              </label>

              <label className="flex gap-3 items-center font-medium mt-2">
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-accent" />
                Enable Email Notifications for Delays
              </label>
              
              <div className="flex items-center gap-4 mt-4">
                <button 
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-accent hover:bg-opacity-90 text-white font-semibold py-2.5 px-4 rounded-md transition-colors w-max disabled:opacity-70"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                {saved && <span className="text-green text-sm font-medium">Changes saved successfully!</span>}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
