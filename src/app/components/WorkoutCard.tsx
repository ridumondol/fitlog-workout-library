'use client';

import Link from 'next/link';

export interface Workout {
  id: number | string;
  name?: string;
  title?: string;
  image?: string;
  muscleGroups?: string[];
  category?: string[];
  equipment?: string;
  duration?: number;
  caloriesBurned?: number;
  calories?: number;
  rating?: number;
}

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  // API Property Fallbacks
  const workoutTitle = workout.name || workout.title || 'Workout Item';
  const imageUrl = workout.image || '/banner.png';
  
  // Category / Muscle groups array handling
  const tags = Array.isArray(workout.muscleGroups) && workout.muscleGroups.length > 0
    ? workout.muscleGroups
    : Array.isArray(workout.category) && workout.category.length > 0
    ? workout.category
    : ['WORKOUT'];

  const duration = workout.duration || 12;
  const calories = workout.caloriesBurned || workout.calories || 80;
  const rating = workout.rating || 4.3;

  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#121318] transition-all hover:border-zinc-700 hover:shadow-xl"
    >
      {/* Top Banner Image */}
      <div className="relative h-56 w-full overflow-hidden bg-zinc-900">
        <img
          src={imageUrl}
          alt={workoutTitle}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category / Muscle Group Pill Badges */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-[#ccff00] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-black"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title & Equipment */}
        <div className="mt-4">
          <h3 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-[#ccff00]">
            {workoutTitle}
          </h3>
          <p className="mt-1 text-xs font-medium text-zinc-400">
            {workout.equipment || 'Standard'}
          </p>
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="mt-6 border-t border-zinc-800/80 pt-3" />

        {/* Bottom Metadata Bar */}
        <div className="flex items-center gap-5 text-xs font-medium text-zinc-400">
          <div className="flex items-center gap-1.5">
            <svg
              className="h-3.5 w-3.5 text-zinc-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>{duration} min</span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg
              className="h-3.5 w-3.5 text-zinc-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.69l.34.34a13.3 13.3 0 013.79 8.23c0 4.15-3.36 7.51-7.5 7.51a7.48 7.48 0 01-7.5-7.51c0-2.83 1.57-5.32 3.91-6.6l.46-.25.19.49a5.1 5.1 0 004.7 3.25c.3 0 .6-.03.89-.08l.58-.1-.17-.57a11.13 11.13 0 01-.19-4.71z" />
            </svg>
            <span>{calories} kcal</span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg
              className="h-3.5 w-3.5 text-zinc-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}