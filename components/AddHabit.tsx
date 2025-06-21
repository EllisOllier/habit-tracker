'use client';

import { useState } from 'react';

export default function AddHabit({ onHabitAdded }: { onHabitAdded: () => void }) {
  const [habitName, setHabitName] = useState('');
  const [loading, setLoading] = useState(false);

  const addHabit = async () => {
    if (!habitName.trim()) return;

    setLoading(true);

    try {
      const res = await fetch('/api/habits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habit: habitName }),
      });

      if (!res.ok) throw new Error('Failed to add habit');

      setHabitName('');
      onHabitAdded(); // callback to refresh habits list or update UI
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
      className=''
        type="text"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        placeholder="New habit"
        disabled={loading}
      />
      <button onClick={addHabit} disabled={loading}>
        {loading ? 'Adding...' : 'Add Habit'}
      </button>
    </div>
  );
}
