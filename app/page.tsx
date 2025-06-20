// app/page.tsx (server component by default)

import Habit from "@/components/Habit";

async function getHabits() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/habits`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error("Failed to fetch habits");
  return res.json();
}

export default async function Home() {
  const habits = await getHabits(); // Array of habits from database

  return (
    <div>
      <header>
        <h1>Habit Tracker</h1>
      </header>
      <h2>Habits:</h2>
      <div className="habit-container">
        {habits.map((habit: any) => (
          <Habit key={habit._id} name={habit.habit} />
        ))}
      </div>
    </div>
  );
}
