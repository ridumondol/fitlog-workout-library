'use client';

import React, { useEffect } from 'react';
import { useFitLog } from '../context/FitLogContext';

export default function Toast() {
  const { toastMessage, clearToast } = useFitLog();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        clearToast();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, clearToast]);

  if (!toastMessage) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 flex items-center gap-3 rounded-xl border border-[#ccff00]/60 bg-zinc-900 px-4 py-3 text-zinc-100 shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-bottom-5 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:px-5 sm:py-3.5">
      <div className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#ccff00] animate-pulse" />
      <p className="flex-1 text-xs font-semibold tracking-wide uppercase sm:flex-none">{toastMessage}</p>
      <button
        onClick={clearToast}
        className="ml-1 flex-shrink-0 text-sm font-bold text-zinc-400 transition-colors hover:text-white sm:ml-3"
      >
        ✕
      </button>
    </div>
  );
}