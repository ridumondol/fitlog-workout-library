export interface WorkoutItem {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // minutes
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export const FITLOG_API_DATA: WorkoutItem[] = [
  {
    id: 1,
    name: "BARBELL BENCH PRESS",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800",
    muscleGroups: ["CHEST", "ARMS"],
    equipment: "Barbell, Bench",
    difficulty: "Intermediate",
    duration: 25,
    caloriesBurned: 180,
    sets: 4,
    reps: "6-8",
    rating: 4.8,
    description: "A compound press that builds chest thickness, triceps, and pressing power from a stable bench.",
    instructions: [
      "Lie on the bench with eyes under the bar and feet planted firmly on the floor.",
      "Unrack with locked elbows and lower the bar under control to your mid-chest.",
      "Press up explosively in a slight arc until elbows lock without bouncing off the chest.",
      "Keep your shoulder blades pinched together and maintain a natural arch in your lower back."
    ]
  },
  {
    id: 2,
    name: "PULL-UP",
    image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&q=80&w=800",
    muscleGroups: ["BACK", "ARMS"],
    equipment: "Pull-up Bar",
    difficulty: "Intermediate",
    duration: 15,
    caloriesBurned: 120,
    sets: 4,
    reps: "6-10",
    rating: 4.7,
    description: "Bodyweight vertical pull that hammers lats, biceps, and grip while improving relative upper-body strength.",
    instructions: [
      "Hang from the bar with a shoulder-width overhand grip and full elbow extension.",
      "Brace your core and pull your collarbone toward the bar while driving elbows down.",
      "Pause briefly at the top with chin over the bar, then lower under full control.",
      "Avoid swinging or kipping to maximize back muscle engagement."
    ]
  },
  {
    id: 3,
    name: "BARBELL BACK SQUAT",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
    muscleGroups: ["LEGS", "CORE"],
    equipment: "Barbell, Squat Rack",
    difficulty: "Advanced",
    duration: 30,
    caloriesBurned: 240,
    sets: 5,
    reps: "5-8",
    rating: 4.9,
    description: "The primary lower-body strength movement developing quads, glutes, hamstrings, and core stability.",
    instructions: [
      "Set the bar across your upper traps, unrack, and step back with a shoulder-width stance.",
      "Inhale deep, brace your midline, and sit your hips down and back between your knees.",
      "Descend until your hip crease drops below the top of your knees (parallel or deeper).",
      "Drive hard through the mid-foot to return to standing, locking out hips at top."
    ]
  },
  {
    id: 4,
    name: "OVERHEAD BARBELL PRESS",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800",
    muscleGroups: ["SHOULDERS", "ARMS"],
    equipment: "Barbell",
    difficulty: "Intermediate",
    duration: 20,
    caloriesBurned: 150,
    sets: 4,
    reps: "6-8",
    rating: 4.6,
    description: "Strict vertical press building shoulder width, upper chest thickness, and lock-out power.",
    instructions: [
      "Rest the bar on your front shoulders with forearms vertical and hands just outside shoulders.",
      "Squeeze glutes and abs tight, then press the bar straight up overhead clear of your face.",
      "Lock out overhead with biceps aligned with ears and ribs tucked down.",
      "Lower the weight smoothly back to the front rack position before repeating."
    ]
  },
  {
    id: 5,
    name: "DUMBBELL BICEP CURL",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800",
    muscleGroups: ["ARMS"],
    equipment: "Dumbbells",
    difficulty: "Beginner",
    duration: 12,
    caloriesBurned: 80,
    sets: 3,
    reps: "10-12",
    rating: 4.3,
    description: "Classic isolation move isolating the biceps through full extension and peak contraction.",
    instructions: [
      "Stand tall holding dumbbells at your sides with palms facing forward.",
      "Curl weights upward while keeping upper arms glued close to your torso.",
      "Squeeze biceps hard at peak contraction near shoulder height.",
      "Lower dumbbells slowly under resistance to full arm extension."
    ]
  },
  {
    id: 6,
    name: "HOLLOW-BODY PLANK",
    image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&q=80&w=800",
    muscleGroups: ["CORE"],
    equipment: "Bodyweight",
    difficulty: "Beginner",
    duration: 10,
    caloriesBurned: 60,
    sets: 3,
    reps: "30-45s",
    rating: 4.4,
    description: "Static isometric hold designed to fortify deep abdominal wall stability and posture.",
    instructions: [
      "Place forearms flat on the ground under shoulders with feet hip-width apart.",
      "Tuck your pelvis under slightly to eliminate lower back arching.",
      "Contract glutes, quads, and abdominals as hard as possible.",
      "Maintain steady breathing while keeping hips aligned with shoulders."
    ]
  },
  {
    id: 7,
    name: "BURPEE",
    image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&q=80&w=800",
    muscleGroups: ["FULL BODY"],
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    duration: 12,
    caloriesBurned: 160,
    sets: 4,
    reps: "8-12",
    rating: 4.2,
    description: "High-intensity conditioning dynamic combining a drop-pushup and explosive jump.",
    instructions: [
      "From standing, squat down and plant hands firmly on the floor.",
      "Kick feet back into a high pushup plank and lower chest to ground.",
      "Press up, snap feet forward under hips, and jump explosively upward.",
      "Land softly on bent knees and transition immediately into the next rep."
    ]
  },
  {
    id: 8,
    name: "CONVENTIONAL DEADLIFT",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800",
    muscleGroups: ["BACK", "LEGS"],
    equipment: "Barbell",
    difficulty: "Advanced",
    duration: 28,
    caloriesBurned: 260,
    sets: 4,
    reps: "3-5",
    rating: 4.9,
    description: "Ultimate posterior chain compound movement targeting glutes, hamstrings, lats, and spine.",
    instructions: [
      "Stand with shin 1 inch from bar, step stance hip-width, grip bar outside shins.",
      "Drop hips, wedge chest up, pull slack out of bar, and pack lats tight.",
      "Push floor away with legs until bar clears knees, then lock out hips.",
      "Hinge at hips first to lower bar under control back to platform."
    ]
  },
  {
    id: 9,
    name: "PUSH-UP",
    image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&q=80&w=800",
    muscleGroups: ["CHEST", "ARMS", "CORE"],
    equipment: "Bodyweight",
    difficulty: "Beginner",
    duration: 10,
    caloriesBurned: 90,
    sets: 3,
    reps: "12-15",
    rating: 4.5,
    description: "Essential horizontal bodyweight press strengthening chest, anterior delts, and triceps.",
    instructions: [
      "Set hands slightly wider than shoulders in a rigid top plank posture.",
      "Lower entire body as one unit until chest hovers just off the floor.",
      "Keep elbows tucked at a 45-degree angle relative to torso.",
      "Push firmly back up to full elbow extension without sagging hips."
    ]
  },
  {
    id: 10,
    name: "WALKING LUNGE",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
    muscleGroups: ["LEGS"],
    equipment: "Dumbbells (Optional)",
    difficulty: "Beginner",
    duration: 18,
    caloriesBurned: 170,
    sets: 3,
    reps: "10-12/leg",
    rating: 4.4,
    description: "Unilateral leg builder enhancing quad strength, glute activation, and leg symmetry.",
    instructions: [
      "Step forward with right leg and lower back knee toward the floor.",
      "Keep front shin vertical and torso upright throughout movement.",
      "Drive off right heel to bring feet together or step directly into next stride.",
      "Alternate legs smoothly while maintaining core tension."
    ]
  },
  {
    id: 11,
    name: "RUSSIAN TWIST",
    image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&q=80&w=800",
    muscleGroups: ["CORE"],
    equipment: "Medicine Ball",
    difficulty: "Beginner",
    duration: 8,
    caloriesBurned: 70,
    sets: 3,
    reps: "16-20",
    rating: 4.1,
    description: "Rotational core drill strengthening internal and external obliques under continuous tension.",
    instructions: [
      "Sit on floor with knees bent and feet elevated slightly off ground.",
      "Hold weight with both hands and lean back 45 degrees to engage abs.",
      "Rotate torso to tap weight on floor beside right hip, then left hip.",
      "Keep shoulders relaxed and movement controlled from the core."
    ]
  },
  {
    id: 12,
    name: "KETTLEBELL SWING",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800",
    muscleGroups: ["FULL BODY", "SHOULDERS"],
    equipment: "Kettlebell",
    difficulty: "Intermediate",
    duration: 16,
    caloriesBurned: 200,
    sets: 5,
    reps: "12-15",
    rating: 4.7,
    description: "Explosive ballistic hip hinge developing glute power and cardiovascular capacity.",
    instructions: [
      "Hinge at hips to hike kettlebell between legs with arms loose.",
      "Snap hips forward aggressively to float kettlebell to chest level.",
      "Let kettlebell fall naturally back into hip hinge without squatting.",
      "Maintain flat spine and drive continuously from posterior chain."
    ]
  }
];