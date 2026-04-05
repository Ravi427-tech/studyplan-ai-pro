import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

function uid(session: any) { return (session?.user as any)?.id as string; }

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const section = searchParams.get('section') || '10';
  const cards = await prisma.flashCard.findMany({ where: { userId: uid(session), section } });
  return NextResponse.json(cards);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { question, answer, section } = await req.json();
  const card = await prisma.flashCard.create({ data: { userId: uid(session), section, question, answer } });
  return NextResponse.json(card);
}
