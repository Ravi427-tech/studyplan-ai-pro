import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

function uid(session: any) { return (session?.user as any)?.id as string; }

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const exams = await prisma.exam.findMany({ where: { userId: uid(session) }, orderBy: { date: 'asc' } });
  return NextResponse.json(exams);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { name, subject, date } = await req.json();
  const exam = await prisma.exam.create({ data: { userId: uid(session), name, subject, date } });
  return NextResponse.json(exam);
}
