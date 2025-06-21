import { NextResponse } from "next/server";
import clientPromise from '../../../lib/mongodb'

// GET Function
export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('HabitTracker');
        // Get all habits and put into an array
        const habits = await db.collection('Habits').find({}).toArray(); 
        // Filter habits to only be completd true and push to filteredHabits array
        let xp = 0;
        habits.forEach(habit => {
            if(habit.completed === true){
                xp += habit.xp;
            }
        });


        return NextResponse.json(xp);
    } catch(err){
        console.error(err);
        return NextResponse.json(
            { error : "Failed to fetch habits"},
            { status : 500 }
        );
    }
}