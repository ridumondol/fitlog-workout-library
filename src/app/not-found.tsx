'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 rounded-3xl bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] font-black text-4xl flex items-center justify-center mb-6">
        404
      </div>
      <h1 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
        LIFT NOT FOUND
      </h1>
      <p className="text-xs sm:text-sm text-zinc-400 max-w-md mt-2 leading-relaxed">
        You seem to have strayed off the training platform. The route you requested does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 px-8 py-3.5 bg-[#ccff00] hover:bg-[#b8e600] text-zinc-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#ccff00]/10"
      >
        Return to Home Library
      </Link>
    </div>
  );
}