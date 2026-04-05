import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

function uid(session: any) { return (session?.user as any)?.id as string; }

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const timetable = await prisma.timetable.findMany({ where: { userId: uid(session) } });
  return NextResponse.json(timetable);
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { dayIndex, slotIndex, subject } = await req.json();
  const entry = await prisma.timetable.upsert({
    where: { userId_dayIndex_slotIndex: { userId: uid(session), dayIndex, slotIndex } },
    update: { subject },
    create: { userId: uid(session), dayIndex, slotIndex, subject }
  });
  return NextResponse.json(entry);
}export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !uid(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { entries, clearAll } = await req.json();

  if (clearAll) {
    await prisma.timetable.deleteMany({ where: { userId: uid(session) } });
  }

  if (entries && Array.isArray(entries)) {
    for (const en of entries) {
       await prisma.timetable.upsert({
         where: { userId_dayIndex_slotIndex: { userId: uid(session), dayIndex: en.dayIndex, slotIndex: en.slotIndex } },
         update: { subject: en.subject },
         create: { userId: uid(session), dayIndex: en.dayIndex, slotIndex: en.slotIndex, subject: en.subject }
       });
    }
  }

  return NextResponse.json({ success: true });
}
