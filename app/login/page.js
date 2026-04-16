"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg relative">
      <div className="w-full max-w-[380px] p-8 px-10 bg-surface border border-border rounded-[14px] z-10 fade-up">
        <div className="flex items-center gap-2.5 font-semibold text-lg tracking-tight justify-center mb-8 text-text">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white text-base">⛓</div>
          ChainGuard AI
        </div>
        
        {error && (
          <div className="mb-4 text-[13px] bg-red-dim border border-red/20 text-red px-3 py-2 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted font-semibold mb-1.5 block">Work Email</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-surface2 border border-border rounded-md px-3.5 py-2.5 text-[13px] text-text outline-none focus:border-accent transition-colors"
              placeholder="manager@chainguard.ai"
              required
            />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted font-semibold mb-1.5 block">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-surface2 border border-border rounded-md px-3.5 py-2.5 text-[13px] text-text outline-none focus:border-accent transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="w-full bg-accent text-white font-medium text-[13.5px] py-[11px] rounded-md mt-2 transition-colors hover:bg-[#3b82f6]">
            Secure Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
