import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

function uid(session: any) { return (session?.user as any)?.id as string; }

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sessions = await prisma.timerSession.findMany({ 
    where: { userId: uid(session), createdAt: { gte: today } } 
  });
  const allSessions = await prisma.timerSession.count({ where: { userId: uid(session), mode: 'WORK' } });
  return NextResponse.json({ todaySessions: sessions.filter((s: any) => s.mode === 'WORK').length, totalSessions: allSessions });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { subject, durationMinutes, mode } = await req.json();
  const entry = await prisma.timerSession.create({ 
    data: { userId: uid(session), subject, durationMinutes, mode } 
  });
  return NextResponse.json(entry);
}
