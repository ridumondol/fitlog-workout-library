'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { WorkoutItem } from '../data/workouts';

interface FitLogContextType {
  plan: WorkoutItem[];
  saved: WorkoutItem[];
  doneIds: number[];
  toastMessage: string | null;
  addToPlan: (workout: WorkoutItem) => void;
  removeFromPlan: (id: number) => void;
  addToSaved: (workout: WorkoutItem) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
  clearToast: () => void;
}

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

export function FitLogProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<WorkoutItem[]>([]);
  const [saved, setSaved] = useState<WorkoutItem[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem('fitlog_plan');
      const storedSaved = localStorage.getItem('fitlog_saved');
      const storedDone = localStorage.getItem('fitlog_done');
      if (storedPlan) setPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
      if (storedDone) setDoneIds(JSON.parse(storedDone));
    } catch (e) {
      console.error('Failed to load local storage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('fitlog_plan', JSON.stringify(plan));
  }, [plan, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('fitlog_saved', JSON.stringify(saved));
  }, [saved, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('fitlog_done', JSON.stringify(doneIds));
  }, [doneIds, isLoaded]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const clearToast = () => {
    setToastMessage(null);
  };

  const addToPlan = (workout: WorkoutItem) => {
    if (plan.some((w) => w.id === workout.id)) {
      showToast(`"${workout.name}" is already in your plan!`);
      return;
    }
    setPlan((prev) => [...prev, workout]);
    showToast(`Added "${workout.name}" to today's plan`);
  };

  const removeFromPlan = (id: number) => {
    const target = plan.find((w) => w.id === id);
    setPlan((prev) => prev.filter((w) => w.id !== id));
    setDoneIds((prev) => prev.filter((item) => item !== id));
    if (target) showToast(`Removed "${target.name}" from today's plan`);
  };

  const addToSaved = (workout: WorkoutItem) => {
    if (saved.some((w) => w.id === workout.id)) {
      showToast(`"${workout.name}" is already saved!`);
      return;
    }
    setSaved((prev) => [...prev, workout]);
    showToast(`Saved "${workout.name}" for later`);
  };

  const removeFromSaved = (id: number) => {
    const target = saved.find((w) => w.id === id);
    setSaved((prev) => prev.filter((w) => w.id !== id));
    if (target) showToast(`Removed "${target.name}" from saved list`);
  };

  const markAsDone = (id: number) => {
    const target = plan.find((w) => w.id === id);
    if (!doneIds.includes(id)) {
      setDoneIds((prev) => [...prev, id]);
      if (target) showToast(`Marked "${target.name}" as completed! 💪`);
    } else {
      setDoneIds((prev) => prev.filter((i) => i !== id));
      if (target) showToast(`Unmarked "${target.name}"`);
    }
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        doneIds,
        toastMessage,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
        markAsDone,
        clearToast,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const ctx = useContext(FitLogContext);
  if (!ctx) throw new Error('useFitLog must be used within FitLogProvider');
  return ctx;
}