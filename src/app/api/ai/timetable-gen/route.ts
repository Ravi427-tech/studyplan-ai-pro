import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { subjects, slotsCount } = await req.json();

  const prompt = `You are an expert academic scheduler. Build a balanced study timetable for a week (6 days: Mon-Sat, 0-5) with ${slotsCount} slots per day.
  Subjects available: ${subjects.join(', ')}.
  
  Rules:
  1. Distribute subjects evenly based on their importance.
  2. Ensure no subject repeats too many times in a single day.
  3. Return ONLY a JSON array of objects with { dayIndex: number, slotIndex: number, subject: string }.
  4. Total entries should be exactly ${6 * slotsCount}.
  `;

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'system', content: prompt }],
        temperature: 0.5
      })
    });

    const data = await groqRes.json();
    const text = data.choices[0].message.content;
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) throw new Error("AI returned invalid data");
    
    return NextResponse.json(JSON.parse(match[0]));
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
