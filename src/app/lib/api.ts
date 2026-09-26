import { FITLOG_API_DATA } from "../data/workouts";

export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

const API_BASE =
  "https://api.abcz.workers.dev/api/fitlog";

export async function fetchWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch(API_BASE);

    if (!res.ok) {
      throw new Error(`Failed to fetch workouts: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    // Guard against the API returning something unexpected (e.g. an
    // error object) instead of an array — that would otherwise silently
    // render as "No workouts found."
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("API returned no workouts, falling back to local data");
    }

    return data;
  } catch (error) {
    // On Vercel/Netlify this is most often a CORS rejection from the
    // worker (it only allowed the localhost origin) rather than the
    // data actually being empty. Fall back to the bundled dataset so
    // the UI never shows a false "No workouts found."
    console.warn("Error fetching workouts, using local fallback data:", error);
    return FITLOG_API_DATA;
  }
}

export async function fetchWorkoutById(
  id: string
): Promise<Workout | null> {
  try {
    const res = await fetch(`${API_BASE}/${id}`);

    if (res.ok) {
      const data = await res.json();
      if (!data.error) return data;
    }
  } catch (error) {
    console.warn(`Error fetching workout ${id}, falling back to full list:`, error);
  }

  // The single-item endpoint currently returns { error: "Not found" }
  // for every id, so fall back to the full list and find it there.
  try {
    const all = await fetchWorkouts();
    return all.find((w) => String(w.id) === String(id)) ?? null;
  } catch (error) {
    console.warn(`Fallback lookup failed for workout ${id}:`, error);
    return null;
  }
}