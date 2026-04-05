import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

function uid(session: any) { return (session?.user as any)?.id as string; }

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const chapters = await prisma.chapterStatus.findMany({ where: { userId: uid(session) } });
  return NextResponse.json(chapters);
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { subject, chapterNumber, status } = await req.json();
  const chapter = await prisma.chapterStatus.upsert({
    where: { userId_subject_chapterNumber: { userId: uid(session), subject, chapterNumber } },
    update: { status },
    create: { userId: uid(session), subject, chapterNumber, status }
  });
  return NextResponse.json(chapter);
}
