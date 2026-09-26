'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchWorkoutById } from '../../lib/api';
import { WorkoutItem } from '../../data/workouts';
import { useFitLog } from '../../context/FitLogContext';

export default function WorkoutDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const [workout, setWorkout] = useState<WorkoutItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { addToPlan, addToSaved, plan } = useFitLog();

  useEffect(() => {
    async function loadWorkout() {
      setIsLoading(true);
      if (!isNaN(id)) {
        const data = await fetchWorkoutById(String(id));
        setWorkout(data);
      }
      setIsLoading(false);
    }
    loadWorkout();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center space-y-4 text-zinc-400">
        <div className="w-12 h-12 border-4 border-zinc-800 border-t-[#ccff00] rounded-full animate-spin" />
        <p className="text-xs font-bold uppercase tracking-widest animate-pulse">
          Loading workout specs…
        </p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-black text-white uppercase">Workout Not Found</h2>
        <p className="text-xs text-zinc-400 mt-2">The requested lift does not exist in our library.</p>
        <Link
          href="/"
          className="mt-6 px-6 py-3 bg-[#ccff00] text-zinc-950 text-xs font-black rounded-xl uppercase tracking-wider hover:bg-[#b8e600]"
        >
          Return to Library
        </Link>
      </div>
    );
  }

  const isAlreadyInPlan = plan.some((p) => p.id === workout.id);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-[#ccff00] uppercase tracking-wider transition-colors"
        >
          <span>←</span> Back to Workouts
        </Link>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          
          {/* Left Side — Visual */}
          <div className="relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 min-h-[340px] lg:min-h-[480px]">
            <img
              src={workout.image}
              alt={workout.name}
              className="w-full h-full object-cover filter brightness-90"
            />
          </div>

          {/* Right Side — Specs & Details */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              
              <div className="flex flex-wrap gap-2">
                {workout.muscleGroups.map((group) => (
                  <span
                    key={group}
                    className="px-3 py-1 bg-zinc-950 text-[#ccff00] border border-zinc-800 rounded-md text-xs font-black uppercase tracking-wider"
                  >
                    {group}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                {workout.name}
              </h1>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {workout.description}
              </p>

              {/* Key Specs Table */}
              <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 divide-y divide-zinc-800/80 text-xs">
                <div className="flex justify-between py-2">
                  <span className="text-zinc-500 font-bold uppercase">EQUIPMENT</span>
                  <span className="font-semibold text-zinc-200">{workout.equipment}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-zinc-500 font-bold uppercase">DIFFICULTY</span>
                  <span className="font-semibold text-[#ccff00]">{workout.difficulty}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-zinc-500 font-bold uppercase">SETS / REPS</span>
                  <span className="font-semibold text-zinc-200">{workout.sets} sets × {workout.reps}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-zinc-500 font-bold uppercase">DURATION</span>
                  <span className="font-semibold text-zinc-200">{workout.duration} min</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-zinc-500 font-bold uppercase">CALORIES</span>
                  <span className="font-semibold text-zinc-200">{workout.caloriesBurned} kcal</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-zinc-500 font-bold uppercase">RATING</span>
                  <span className="font-bold text-amber-400">★ {workout.rating}</span>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-3 pt-2">
                <h2 className="text-xs font-black text-zinc-400 uppercase tracking-widest">
                  INSTRUCTIONS
                </h2>
                <ol className="space-y-2 text-xs text-zinc-300">
                  {workout.instructions.map((step, idx) => (
                    <li key={idx} className="flex gap-3 items-start bg-zinc-950/40 p-2.5 rounded-lg border border-zinc-800/50">
                      <span className="w-5 h-5 rounded-full bg-[#ccff00]/10 text-[#ccff00] font-black flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="pt-0.5 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-zinc-800">
              <button
                onClick={() => addToPlan(workout)}
                className={`flex-1 py-3.5 px-5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isAlreadyInPlan
                    ? 'bg-zinc-800 text-zinc-500'
                    : 'bg-[#ccff00] hover:bg-[#b8e600] text-zinc-950 shadow-lg shadow-[#ccff00]/15'
                }`}
              >
                <span>➕</span>
                <span>{isAlreadyInPlan ? "In Today's Plan" : "Add to today's plan"}</span>
              </button>

              <button
                onClick={() => addToSaved(workout)}
                className="flex-1 py-3.5 px-5 rounded-xl font-bold text-xs uppercase tracking-wider border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 flex items-center justify-center gap-2 transition-all"
              >
                <span>🔖</span>
                <span>Save for later</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}