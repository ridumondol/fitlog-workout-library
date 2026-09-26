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
      throw new Error("Failed to fetch workouts");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return [];
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
    console.error(`Error fetching workout ${id}:`, error);
  }

  // The single-item endpoint currently returns { error: "Not found" }
  // for every id, so fall back to the full list and find it there.
  try {
    const all = await fetchWorkouts();
    return all.find((w) => String(w.id) === String(id)) ?? null;
  } catch (error) {
    console.error(`Fallback lookup failed for workout ${id}:`, error);
    return null;
  }
}