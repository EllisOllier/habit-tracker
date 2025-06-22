import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

// PATCH - Update habit status
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db('HabitTracker');
    const collection = db.collection('Habits');

    const habitId = params.id;
    const body = await req.json();

    if (typeof body.completed !== 'boolean') {
      return NextResponse.json({ error: 'Invalid completed value' }, { status: 400 });
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(habitId) },
      { $set: { completed: body.completed } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Habit not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Habit status updated successfully' });
  } catch (error) {
    console.error('PATCH Error:', error);
    return NextResponse.json({ error: 'Failed to update habit status' }, { status: 500 });
  }
}

// DELETE - Remove a habit
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db('HabitTracker');
    const collection = db.collection('Habits');

    const habitId = (await params).id;

    const result = await collection.deleteOne({ _id: new ObjectId(habitId) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Habit not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Habit deleted successfully' });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete habit' }, { status: 500 });
  }
}
