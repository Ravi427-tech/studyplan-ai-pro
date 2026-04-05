import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

function uid(session: any) { return (session?.user as any)?.id as string; }

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const grades = await prisma.grade.findMany({ where: { userId: uid(session) } });
  return NextResponse.json(grades);
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { subject, currentGrade, targetGrade } = await req.json();
  
  const grade = await prisma.grade.upsert({
    where: { userId_subject: { userId: uid(session), subject } },
    update: { currentGrade: currentGrade ?? undefined, targetGrade: targetGrade ?? undefined },
    create: { userId: uid(session), subject, currentGrade: currentGrade || 'B', targetGrade: targetGrade || 'A' }
  });
  return NextResponse.json(grade);
}
