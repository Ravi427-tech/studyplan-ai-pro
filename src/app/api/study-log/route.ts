import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

function uid(session: any) { return (session?.user as any)?.id as string; }

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const logs = await prisma.studyLog.findMany({ where: { userId: uid(session) }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json(logs);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { date, subject, hours } = await req.json();
  const log = await prisma.studyLog.create({ data: { userId: uid(session), date, subject, hours: parseFloat(hours) } });
  return NextResponse.json(log);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Id required' }, { status: 400 });
  await prisma.studyLog.delete({ where: { id, userId: uid(session) } });
  return NextResponse.json({ success: true });
}

