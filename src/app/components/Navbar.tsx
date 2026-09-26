'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFitLog } from '../context/FitLogContext';

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();
  const [menuOpen, setMenuOpen] = useState(false);

  const isWorkoutActive =
    pathname === '/' ||
    pathname.startsWith('/workouts') ||
    pathname === '/workout';

  const isPlanActive = pathname.startsWith('/my-plan');

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-900 bg-[#09090b]">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-12">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5 sm:gap-3">
          <div className="relative h-7 w-9 flex-shrink-0 transition-transform group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="FITLOG Logo"
              fill
              priority
              sizes="36px"
              className="object-contain"
            />
          </div>

          <span className="text-lg font-black uppercase tracking-wider text-white sm:text-xl">
            FITLOG
          </span>
        </Link>

        {/* Desktop center nav */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          <Link
            href="/"
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
              isWorkoutActive
                ? 'bg-[#1c2e05] text-[#ccff00]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan/1"
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
              isPlanActive
                ? 'bg-[#1c2e05] text-[#ccff00]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Desktop right side */}
        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          <Link
            href="/my-plan/1"
            className="flex items-center gap-3 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            <span>Plan</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ccff00] text-xs font-bold text-black">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan/1"
            className="flex items-center gap-3 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            <span>Saved</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-zinc-300 ring-1 ring-zinc-700">
              {saved.length}
            </span>
          </Link>
        </div>

        {/* Mobile / tablet controls: plan badge + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/my-plan/1"
            onClick={closeMenu}
            aria-label={`Today's plan, ${plan.length} items`}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ccff00] text-xs font-bold text-black"
          >
            {plan.length}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-200 transition-colors hover:border-zinc-700 hover:text-white"
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile / tablet dropdown panel */}
      {menuOpen && (
        <div className="border-t border-zinc-900 bg-[#09090b] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={closeMenu}
              className={`rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                isWorkoutActive
                  ? 'bg-[#1c2e05] text-[#ccff00]'
                  : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              Workouts
            </Link>
            <Link
              href="/my-plan/1"
              onClick={closeMenu}
              className={`rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                isPlanActive
                  ? 'bg-[#1c2e05] text-[#ccff00]'
                  : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              My Plan
            </Link>
          </nav>

          <div className="mt-3 flex items-center gap-6 border-t border-zinc-900 pt-3">
            <Link
              href="/my-plan/1"
              onClick={closeMenu}
              className="flex items-center gap-3 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              <span>Plan</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ccff00] text-xs font-bold text-black">
                {plan.length}
              </span>
            </Link>

            <Link
              href="/my-plan/1"
              onClick={closeMenu}
              className="flex items-center gap-3 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              <span>Saved</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-zinc-300 ring-1 ring-zinc-700">
                {saved.length}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
