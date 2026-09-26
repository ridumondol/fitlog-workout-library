"use client";

import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import WorkoutCard from "./components/WorkoutCard";
import { fetchWorkouts, Workout } from "./lib/api";
import "./globals.css";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  // Load API Workouts
  useEffect(() => {
    async function loadData() {
      const data = await fetchWorkouts();
      setWorkouts(data);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0D10] text-white">
      <div className="mx-auto w-full max-w-[1400px] space-y-12 px-4 py-6 sm:px-6 lg:px-8">
        <Hero />

        <section id="library" className="space-y-6 scroll-mt-24">
          {/* Header Section */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[1.1px] text-[#CCFF00]">
              All Workouts
            </p>
            <h2 className="mt-1 text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
              Pick your next lift
            </h2>
          </div>

          {/* Loading & Card Display Grid */}
          {loading ? (
            <div className="rounded-2xl border border-[#222630] bg-[#15171d]/50 py-16 text-center">
              <p className="text-sm text-gray-400">Loading workouts...</p>
            </div>
          ) : workouts.length === 0 ? (
            <div className="rounded-2xl border border-[#222630] bg-[#15171d]/50 py-16 text-center">
              <p className="text-sm text-gray-400">
                No workouts found.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {workouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}