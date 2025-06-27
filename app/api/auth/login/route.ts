import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import bcrypt from "bcrypt";

// POST function
export async function POST(req: Request) {
    const body = await req.json();
    const { username, email, password } = body;

    // Validate inputs
    if (!username && !email) {
        return NextResponse.json(
            { error: "Username or Email is required" },
            { status: 400 }
        );
    }

    if (!password) {
        return NextResponse.json(
            { error: "User password is required" },
            { status: 400 }
        );
    }

    try {
        const client = await clientPromise;
        const db = client.db("HabitTracker");
        const usersCollection = db.collection("Users");

        // Look up user by username or email
        const user = await usersCollection.findOne({
            $or: [{ username: username || null }, { email: email || null }],
        });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid username/email or password" },
                { status: 401 }
            );
        }

        console.log("Request password:", password);
        console.log("Stored user password:", user.password);

        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json(
                { error: "Invalid username/email or password" },
                { status: 401 }
            );
        }

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json(
            {
                message: `Login successful`,
                user: userWithoutPassword,
            },
            { status: 200 }
        );
    } catch (err) {
        console.error("Login error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
