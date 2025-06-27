import { NextResponse } from "next/server";
import clientPromise from '../../../../lib/mongodb'
import bcrypt from 'bcrypt';

// POST Function
export async function POST(req: Request) {

    // Delcare body and expected fields
    const body = await req.json();
    // Body must have unhashedPassword and not password
    const { username, email, unhashedPassword } = body;

    // Check for missing fields in body
    if(!username){
        return NextResponse.json(
            { error : "User username is required" },
            { status : 400 }
        );
    }
    if(!email){
        return NextResponse.json(
            { error : "User email is required" },
            { status : 400 }
        );
    }
    if(!unhashedPassword){
        return NextResponse.json(
            { error : "User password is required" },
            { status : 400 }
        );
    }

    // Create user and add it to the database
    try{
        const client = await clientPromise;
        const db = client.db('HabitTracker');
        const collection = db.collection('Users'); // Add collection

        // password - hashed password
        const password = await bcrypt.hash(unhashedPassword, 10);
        const result = await collection.insertOne({ username, email, password, createdAt: new Date()});
        return NextResponse.json(
            { message : 'Successfully created user' },
            { status : 201 }
        );
    } catch(err){
        return NextResponse.json(
            { message : 'Error creating user' },
            { status : 500 }
        );
    }
}