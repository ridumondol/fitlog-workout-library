"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFitLog } from "../../context/FitLogContext";

type SortKey = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const { plan, saved, doneIds, removeFromPlan, removeFromSaved, markAsDone } =
    useFitLog();
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  // Tab dynamic selection & Sorting logic — sourced from real plan/saved state
  const currentList = useMemo(() => {
    const list = [...(activeTab === "today" ? plan : saved)];

    list.sort((a, b) => {
      if (sortBy === "duration") return a.duration - b.duration;
      if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

    return list;
  }, [activeTab, plan, saved, sortBy]);

  // Dynamic Calculation based on active tab list
  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((acc, w) => acc + w.duration, 0);
  const totalCalories = currentList.reduce((acc, w) => acc + w.caloriesBurned, 0);

  return (
    <main className="min-h-screen bg-[#0B0D10] text-white">
      <div className="mx-auto w-full max-w-[1400px] space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
            My Plan
          </h1>
          <p className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-400">
            CAP OF FIVE LIFTS FOR TODAY. FINISH THEM, THEN LOAD MORE.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#222630] bg-[#15171d]/80 p-6 text-center">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Exercises
            </p>
            <p className="mt-2 text-4xl font-black text-[#CCFF00]">{totalExercises}</p>
          </div>

          <div className="rounded-2xl border border-[#222630] bg-[#15171d]/80 p-6 text-center">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Minutes
            </p>
            <p className="mt-2 text-4xl font-black text-white">{totalMinutes}</p>
          </div>

          <div className="rounded-2xl border border-[#222630] bg-[#15171d]/80 p-6 text-center">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Calories
            </p>
            <p className="mt-2 text-4xl font-black text-white">{totalCalories}</p>
          </div>
        </div>

        {/* Integrated Navigation Tabs & Sort By Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#222630] pb-4">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab("today")}
              className={`pb-2 text-sm font-black uppercase tracking-wider transition-all ${
                activeTab === "today"
                  ? "border-b-2 border-[#CCFF00] text-[#CCFF00]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Today&apos;s Plan ({plan.length})
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`pb-2 text-sm font-black uppercase tracking-wider transition-all ${
                activeTab === "saved"
                  ? "border-b-2 border-[#CCFF00] text-[#CCFF00]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Saved ({saved.length})
            </button>
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
            <span>Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="rounded-xl border border-[#222630] bg-[#15171d] px-3 py-1.5 text-xs font-bold uppercase text-white focus:outline-none focus:ring-1 focus:ring-[#CCFF00]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Workout Cards Display */}
        {currentList.length === 0 ? (
          <div className="rounded-2xl border border-[#222630] bg-[#15171d]/50 py-16 text-center">
            <h3 className="text-lg font-black uppercase tracking-wide text-white">
              Nothing here yet
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-xl bg-[#CCFF00] px-6 py-3 text-xs font-black uppercase tracking-wider text-black transition-colors hover:bg-[#b8e600]"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {currentList.map((workout) => {
              const isDone = doneIds.includes(workout.id);
              return (
                <div
                  key={workout.id}
                  className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#222630] bg-[#15171d] p-4 sm:flex-row sm:items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-zinc-800">
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3
                        className={`text-lg font-black uppercase ${
                          isDone ? "text-gray-500 line-through" : "text-white"
                        }`}
                      >
                        {workout.name}
                      </h3>
                      <p className="text-xs text-gray-400">
                        Equipment: {workout.equipment || "Bodyweight"}
                      </p>
                      <div className="mt-1 flex items-center gap-3 text-xs font-semibold text-gray-300">
                        <span>⏱ {workout.duration} min</span>
                        <span>🔥 {workout.caloriesBurned} kcal</span>
                        <span className="text-[#CCFF00]">★ {workout.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto sm:flex-nowrap sm:gap-3">
                    <Link
                      href={`/workouts/${workout.id}`}
                      className="rounded-xl border border-[#222630] bg-[#1f222e] px-3 py-2 text-xs font-bold uppercase text-white transition-colors hover:bg-zinc-700 sm:px-4"
                    >
                      View Details
                    </Link>

                    {activeTab === "today" && (
                      <button
                        onClick={() => markAsDone(workout.id)}
                        className={`rounded-xl px-3 py-2 text-xs font-bold uppercase transition-colors sm:px-4 ${
                          isDone
                            ? "bg-[#CCFF00] text-black"
                            : "bg-[#222630] text-white hover:bg-[#CCFF00] hover:text-black"
                        }`}
                      >
                        {isDone ? "✓ Done" : "✓ Mark as Done"}
                      </button>
                    )}

                    <button
                      onClick={() =>
                        activeTab === "today"
                          ? removeFromPlan(workout.id)
                          : removeFromSaved(workout.id)
                      }
                      aria-label={`Remove ${workout.name}`}
                      className="px-1 text-lg leading-none text-gray-500 transition-colors hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
