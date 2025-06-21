'use client';

import { useState } from 'react';

interface HabitProps {
  id: string;
  name: string;
  completed: boolean;
  xp: number;
  onDelete: (id: string) => void; // new prop for notifying parent
}

export default function Habit({ id, name, completed, onDelete }: HabitProps) {
  const [isChecked, setIsChecked] = useState(completed);

  const handleChange = async () => {
    const newState = !isChecked;
    setIsChecked(newState);

    await fetch(`/api/habits/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: newState }),
    });
  };

  const deleteHabit = async () => {
    try {
      const res = await fetch(`/api/habits/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete habit');
      onDelete(id); // Notify parent to update UI
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  // On change, trigger an xp push to the XPLevel component
  return (
    <div className=''>
      <label>
        <input type="checkbox" checked={isChecked} onChange={handleChange} />
        {name}
      </label>
      <button onClick={deleteHabit} className="bg-red-500 ml-2">
        Remove
      </button>
    </div>
  );
}
