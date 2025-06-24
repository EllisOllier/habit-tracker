"use client";

import { useEffect, useState } from "react";

interface HabitProps {
    id: string;
    name: string;
    completed: boolean;
    xp: number;
    onDelete: (id: string) => void; // new prop for notifying parent
    updateXp: () => void;
    updateHabits: () => void;
}

export default function Habit({
    id,
    name,
    completed,
    onDelete,
    updateXp,
    updateHabits,
}: HabitProps) {
    const [isChecked, setIsChecked] = useState(completed);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);

    const [habitName, setHabitName] = useState("");
    const [habitXp, setHabitXp] = useState(20);

    useEffect(() => {
        if (showForm) setHabitName(name);
    }, [showForm, name]);

    const changeCompleted = async () => {
        const newState = !isChecked;
        setIsChecked(newState);
        try {
            const res = await fetch(`api/habits/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: newState }),
            });
            updateXp();
        } catch (error) {
            console.error("Error updating habit: ", error);
        }
    };

    const editHabit = async () => {
        try {
            const res = await fetch(`api/habits/${id}/edit`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ habit: habitName, xp: habitXp }),
            });
            updateHabits();
        } catch (error) {
            console.error("Error updating habit: ", error);
        }
    };

    const deleteHabit = async () => {
        try {
            const res = await fetch(`/api/habits/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete habit");
            onDelete(id); // Notify parent to update UI
        } catch (error) {
            console.error("Error deleting habit:", error);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        editHabit();
        setShowForm(!showForm);
    };

    // On change, trigger an xp push to the XPLevel component
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
                                placeholder="Edit habit"
                                id="habit-name"
                                name="habit-name"
                            />
                        </label>
                        <label htmlFor="habit-xp" className="mb-4">
                            Task Difficulty:
                            <select
                                className="border border-black w-full px-2 py-1 mt-1"
                                name="habit-xp"
                                id="habit-xp"
                                value={habitXp}
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
                            {loading ? "Adding..." : "Edit Habit"}
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
            <label>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={changeCompleted}
                />
                {name}
            </label>
            <button
                className="border-1 border-black-500 p-1"
                onClick={(e) => setShowForm(!showForm)}
            >
                Edit
            </button>
            <button onClick={deleteHabit} className="bg-red-500">
                Remove
            </button>
        </div>
    );
}
