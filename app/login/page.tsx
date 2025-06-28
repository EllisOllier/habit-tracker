"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Login() {
    const checkLogin = async () => {
        // Check user credentials against database
    };

    const handleSubmit = async () => {
        // Run functions to handle the submission of the form
        console.log("Handling submission!")
    };

    return (
        <div className='w-screen h-screen flex flex-col justify-center'>
            <form 
            className='flex flex-col w-90 h-60 border-1 rounded-md p-3 m-auto'
            onSubmit={handleSubmit}
            >
                <h1 className="text-center mb-3 justify-self-start">Login</h1>

                <label className="mb-2">Username/ Email: <input className="border border-black rounded-md" type="text"/></label>
                <label className="mb-2">Password: <input className="border border-black rounded-md" type="password"/></label>

                <button type="submit" className="text-gray-100 bg-green-500 p-2 rounded-md hover:bg-green-400 active:bg-green-300">Login</button>
                <p className=''>
                    Not got an account?{" "}
                    <Link
                        href={"/signup"}
                        className='text-blue-600 hover:text-blue-500 hover:underline'
                    >
                        Create an account!
                    </Link>
                </p>
            </form>
        </div>
    );
}
