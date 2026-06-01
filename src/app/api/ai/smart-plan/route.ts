import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { SECMAP } from '@/lib/secmap';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { examDate, hoursPerDay, weakSubjects, sectionLabel, allSubjects, intensity, technique } = await req.json();
  const diff = new Date(examDate).getTime() - Date.now();
  const days = Math.min(5, Math.ceil(diff / 86400000));
  const studyDays = days <= 0 ? 1 : days;
  
  if (!process.env.GROQ_API_KEY) {
    // Fallback if no API key
    const fallbackPlan = Array.from({ length: studyDays }, (_, i) => ({
      day: i + 1,
      date: `Day ${i + 1}`,
      tasks: allSubjects.slice(0, 4).map((sub: string) => ({
        subject: sub,
        topic: 'Important Concepts & Revision',
        hours: (hoursPerDay / 4)
      }))
    }));
    return NextResponse.json(fallbackPlan);
  }

  try {
    const seed = Math.floor(Math.random() * 1000000);
    const prompt = `Create a ${studyDays}-day study schedule for a ${sectionLabel} student. 
    Hours/Day: ${hoursPerDay}. Priority Subjects: ${weakSubjects.join(', ')}. 
    Intensity: ${intensity}. Technique: ${technique}. Seed: ${seed}.
    You MUST return ONLY a JSON array of objects: [{"day":1,"date":"Oct 14","tasks":[{"subject":"Math","topic":"Algebra","hours":2}]}]
    No markdown, just the array. Max 5 days.`;
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 1500,
        temperature: 0.6,
        messages: [
          { role: 'system', content: 'You are a scheduling API. Output ONLY a raw JSON array.' },
          { role: 'user', content: prompt }
        ]
      })
    });
    
    const data = await response.json();
    if (!response.ok) {
        console.error("Groq API Error:", data);
        return NextResponse.json({ error: data.error?.message || 'API Error' }, { status: 500 });
    }

    let text = data.choices?.[0]?.message?.content || '[]';
    
    // Robust extraction: find the first '[' and last ']'
    const startIdx = text.indexOf('[');
    const endIdx = text.lastIndexOf(']');
    
    if (startIdx !== -1 && endIdx !== -1) {
      text = text.substring(startIdx, endIdx + 1);
    } else {
      text = text.replace(/```json|```/g, '').trim();
    }
    
    try {
      const parsed = JSON.parse(text);
      return NextResponse.json(parsed);
    } catch (parseError) {
      console.error("JSON Parse Error in Smart Plan:", text);
      return NextResponse.json({ error: 'AI returned invalid plan format' }, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate plan from Groq' }, { status: 500 });
  }
}

