"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const checkLogin = async () => {
        setLoading(true);
        setError(""); // Clear previous errors

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: name,
                    email: name,
                    password: password,
                }),
            });

            if (!res.ok) {
                const errorMessage = await res.text();
                setError(errorMessage || "Invalid Username/Email or Password");
                return;
            }

            // Handle successful login (e.g. redirect or update auth state)
            const data = await res.json();
            console.log("Login success:", data);
            // Add code here for sessions and storing login status (i think)

            // Redirect to habit tracker page
            router.push("/");
        } catch (err) {
            console.error("Unexpected error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await checkLogin();
    };

    return (
        <div className="w-screen h-screen flex flex-col justify-center">
            <form
                className="flex flex-col justify-evenly w-90 h-70 border-1 rounded-md p-3 m-auto"
                onSubmit={handleSubmit}
            >
                <h1 className="text-center mb-3 justify-self-start">Login</h1>

                <label className="mb-2">
                    Username/ Email:{" "}
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        className="border border-black rounded-md w-full p-1"
                        required
                    />
                </label>
                <label className="mb-2">
                    Password:{" "}
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        className="border border-black rounded-md w-full p-1"
                        required
                    />
                </label>

                {error && (
                    <p className="text-red-600 text-sm mt-1">{error}</p>
                )}

                {loading ? (
                    <p>Logging in...</p>
                ) : (
                    <button
                        type="submit"
                        className="text-gray-100 bg-green-500 p-2 rounded-md hover:bg-green-400 active:bg-green-300"
                    >
                        Login
                    </button>
                )}

                <p className="mt-2 text-sm">
                    Not got an account?{" "}
                    <Link
                        href={"/signup"}
                        className="text-blue-600 hover:text-blue-500 hover:underline"
                    >
                        Create an account!
                    </Link>
                </p>
            </form>
        </div>
    );
}
