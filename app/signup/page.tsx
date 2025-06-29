"use client";

import { useState } from "react";
import Link from "next/link";

export default function Signup() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const createAccount = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, username, password }),
            });

            if (!res.ok) {
                const errorMessage = await res.text();
                setError(errorMessage || "Failed to create account.");
                return;
            }

            const data = await res.json();
            console.log("Signup success:", data);
            // Optional: redirect or auto-login
        } catch (err) {
            console.error("Unexpected error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createAccount();
    };

    return (
        <div className="w-screen h-screen flex flex-col justify-center">
            <form
                className="flex flex-col justify-evenly w-90 h-90 border border-black rounded-md p-3 m-auto max-w-sm"
                onSubmit={handleSubmit}
            >
                <h1 className="text-center mb-3">Sign up</h1>

                <label className="mb-2">
                    Email:{" "}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-black rounded-md w-full p-1"
                        required
                    />
                </label>
                <label className="mb-2">
                    Username:{" "}
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-black rounded-md w-full p-1"
                        required
                    />
                </label>
                <label className="mb-2">
                    Password:{" "}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-black rounded-md w-full p-1"
                        required
                    />
                </label>

                {error && (
                    <p className="text-red-600 text-sm mt-1">{error}</p>
                )}

                {loading ? (
                    <p>Creating account...</p>
                ) : (
                    <button
                        type="submit"
                        className="text-gray-100 bg-green-500 p-2 rounded-md hover:bg-green-400 active:bg-green-300"
                    >
                        Sign up
                    </button>
                )}

                <p className="mt-2 text-sm">
                    Already got an account?{" "}
                    <Link
                        href="/login"
                        className="text-blue-600 hover:text-blue-500 hover:underline"
                    >
                        Login here!
                    </Link>
                </p>
            </form>
        </div>
    );
}
