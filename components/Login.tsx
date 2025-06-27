import { useState } from "react";

export default function Login() {
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add function to handle api/auth/login
        setShowForm(!showForm);
    }

    return (
        <div>
            {showForm && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <form
                        className="flex flex-col w-[20rem] p-4 bg-white rounded shadow-lg border border-black"
                        onSubmit={handleSubmit}
                    >
                        <label>Username: <input className="border border-black" type="text"/></label>
                        <label>E-Mail: <input className="border border-black" type="text"/></label>
                        <label>Password: <input className="border border-black" type="password"/></label>

                        <button
                            className="border-1 border-black-500 p-1 mb-2"
                            disabled={loading}
                            type="submit"
                        >
                            {loading ? "Loggin in..." : "Login"}
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
            >
                Login
            </button>
        </div>
    );
}