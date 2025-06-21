'use client';

import { useState } from 'react';

interface HabitProps {
  givenXp: number;
}

export default function XPLevel({ givenXp }: HabitProps) {
  const [xp, setXp] = useState(givenXp);

  return (
    <div>
      <p>{xp}</p>
    </div>
  );
}
