import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

// PATCH - Update habit status
export async function PATCH(
  req: NextRequest,
  // Must be a promise otherwise it throws an error on vercel deployment
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db('HabitTracker');
    const collection = db.collection('Habits');

    // Must await otherwise it throws an error on vercel deployment
    const habitId = (await params).id;
    const body = await req.json();

    const result = await collection.updateOne(
      { _id: new ObjectId(habitId) },
      { $set: { habit: body.habit, xp: body.xp } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Habit not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Habit updated successfully' });
  } catch (error) {
    console.error('PATCH Error:', error);
    return NextResponse.json({ error: 'Failed to update habit' }, { status: 500 });
  }
}