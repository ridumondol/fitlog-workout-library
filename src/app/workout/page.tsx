"use client";

import { useEffect, useState, useMemo } from "react";
import WorkoutCard from "../components/WorkoutCard";
import FilterBar from "../components/FilterBar";
import { fetchWorkouts, Workout } from "../lib/api";

export default function WorkoutPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [sortBy, setSortBy] = useState("duration");

  // Load API Workouts
  useEffect(() => {
    async function loadData() {
      const data = await fetchWorkouts();
      setWorkouts(data);
      setLoading(false);
    }
    loadData();
  }, []);

  // Filter & Sort Logic
  const processedWorkouts = useMemo(() => {
    let list = [...workouts];

    // Filter Logic for Tab
    if (activeTab === "saved") {
      list = list.filter((w) => w.rating >= 4.7);
    }

    // Sort Logic
    list.sort((a, b) => {
      if (sortBy === "duration") return a.duration - b.duration;
      if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

    return list;
  }, [workouts, activeTab, sortBy]);

  return (
    <main className="min-h-screen bg-[#0B0D10] text-white">
      <div className="mx-auto w-full max-w-[1400px] space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[1.1px] text-[#CCFF00]">
            Workout Library
          </p>
          <h1 className="mt-1 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
            Explore All Exercises
          </h1>
        </div>

        {/* Filter Bar Component */}
        <FilterBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Loading & Grid Display */}
        {loading ? (
          <div className="rounded-2xl border border-[#222630] bg-[#15171d]/50 py-16 text-center">
            <p className="text-sm text-gray-400">Loading workouts...</p>
          </div>
        ) : processedWorkouts.length === 0 ? (
          <div className="rounded-2xl border border-[#222630] bg-[#15171d]/50 py-16 text-center">
            <p className="text-sm text-gray-400">
              No workouts found under this filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {processedWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}