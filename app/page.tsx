'use client';

import { useState, useEffect } from 'react';
import Habit from '@/components/Habit';
import AddHabit from '@/components/AddHabit';
import XPLevel from '@/components/XPLevel';

export default function Home() {
  const [habits, setHabits] = useState<any[]>([]);
  const [habitsLoading, setHabitsLoading] = useState(true);
  const [xpLoading, setXpLoading] = useState(true);
  const [xp, setXp] = useState(0);

  const fetchHabits = async () => {
    try {
      const res = await fetch('/api/habits', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch habits');
      const data = await res.json();
      setHabits(data);
    } catch (error) {
      console.error(error);
    } finally {
      setHabitsLoading(false);
    }
  };

  const updateXp = async () => {
    setXpLoading(true);
    try {
      const res = await fetch('/api/xp', {cache : 'no-store' });
      if(!res.ok) throw new Error('Failed to fetch habits');
      const data = await res.json();
      setXp(data);
    } catch(error){
      console.error(error);
    } finally {
      setXpLoading(false);
    }
  }

  useEffect(() => {
    fetchHabits();
    updateXp();
  }, []);

  // Function to remove deleted habit from state
  const handleDelete = (id: string) => {
    setHabits((prev) => prev.filter((habit) => habit._id !== id));
  };

  return (
    <div>
      <header>
        <h1>Habit Tracker</h1>
      </header>
      <h2>Habits:</h2>
      {xpLoading ? (
        <p>Loading XP...</p>
      ) : (
        <XPLevel givenXp={xp}/>
      )}
      
      <AddHabit onHabitAdded={fetchHabits} />
      <div className="habit-container flex flex-col">
        {habitsLoading ? (
          <p>Loading habits...</p>
        ) : habits.length === 0 ? (
          <p>No habits found. Add some!</p>
        ) : (
          habits.map((habit) => (
            <Habit
              key={habit._id}
              id={habit._id}
              name={habit.habit}
              completed={habit.completed}
              xp={habit.xp}
              onDelete={handleDelete}  // Pass delete handler here
              updateXp={updateXp} // Trigger xp update onChange
            />
          ))
        )}
      </div>
    </div>
  );
}
