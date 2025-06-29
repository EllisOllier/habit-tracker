import { NextResponse } from "next/server";
import clientPromise from '../../../lib/mongodb'

// GET Function
export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('HabitTracker');
        // Get all habits and put into an array
        // TODO: Get habits by userID when implemented in database
        const habits = await db.collection('Habits').find({}).toArray(); 

        return NextResponse.json(habits);
    } catch(err){
        console.error(err);
        return NextResponse.json(
            { error : "Failed to fetch habits"},
            { status : 500 }
        );
    }
}

// POST Function
export async function POST(req: Request) {
    const body = await req.json();
    const { habit, completed, xp } = body;

    if(!habit){
        return NextResponse.json(
            { error : "Habit Name is required" },
            { status : 400 }
        );
    }
    if(!xp){
        return NextResponse.json(
            { error : "Habit Difficulty is required" },
            { status : 400 }
        );
    }

    try{
        const client = await clientPromise;
        const db = client.db('HabitTracker');
        const collection = db.collection('Habits'); // Add collection

        const result = await collection.insertOne({ habit, completed, xp, createdAt: new Date()});
        return NextResponse.json(
            { message : 'Successfully created habit' },
            { status : 201 }
        );
    } catch(err){
        return NextResponse.json(
            { message : 'Error creating habit' },
            { status : 500 }
        );
    }
}
