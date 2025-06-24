"use client";

import { use, useState } from "react";

export default function AddHabit({
    onHabitAdded,
}: {
    onHabitAdded: () => void;
}) {
    // Habit Properties
    const [habitName, setHabitName] = useState("");
    const [habitCompleted, setHabitCompleted] = useState(false);
    const [habitXp, setHabitXp] = useState(20);

    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const addHabit = async () => {

        if (!habitName.trim()) return;

        setLoading(true);

        try {
            const res = await fetch("/api/habits", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ habit: habitName, completed: habitCompleted, xp: habitXp }),
            });

            if (!res.ok) throw new Error("Failed to add habit");

            setHabitName("");
            onHabitAdded(); // callback to refresh habits list or update UI
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addHabit();
    }

    return (
        <div>
            {showForm && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <form
                        className="flex flex-col w-[20rem] p-4 bg-white rounded shadow-lg border border-black"
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="habit-name" className="mb-2">
                            Habit:
                            <input
                                className="border border-black w-full px-2 py-1 mt-1"
                                type="text"
                                value={habitName}
                                onChange={(e) => setHabitName(e.target.value)}
                                placeholder="New habit"
                                id="habit-name"
                                name="habit-name"
                            />
                        </label>

                        <label htmlFor="habit-completed" className="mb-2">
                            Completed:
                            <input
                                className="ml-2"
                                type="checkbox"
                                id="habit-completed"
                                name="habit-completed"
                                onChange={(e) =>
                                    setHabitCompleted(e.target.checked)
                                }
                            />
                        </label>

                        <label htmlFor="habit-xp" className="mb-4">
                            Task Difficulty:
                            <select
                                className="border border-black w-full px-2 py-1 mt-1"
                                name="habit-xp"
                                id="habit-xp"
                                onChange={(e) =>
                                    setHabitXp(Number(e.target.value))
                                }
                            >
                                <option value={20}>Easy</option>
                                <option value={30}>Medium</option>
                                <option value={40}>Hard</option>
                            </select>
                        </label>

                        <button
                            className="border-1 border-black-500 p-1 mb-2"
                            disabled={loading}
                            type="submit"
                        >
                            {loading ? "Adding..." : "Add Habit"}
                        </button>
                        <button
                            className="border-1 border-black-500 p-1"
                            onClick={(e) => setShowForm(!showForm)}
                        >
                            {"Close"}
                        </button>
                    </form>
                </div>
            )}

            <button
                className="border-1 border-black-500 p-1"
                onClick={(e) => setShowForm(!showForm)}
                disabled={loading}
            >
                {loading ? "Adding..." : "Add Habit"}
            </button>
        </div>
    );
}
