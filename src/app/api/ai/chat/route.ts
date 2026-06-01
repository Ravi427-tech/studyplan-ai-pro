import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { message, subject, history } = await req.json();
  
  if (!process.env.GROQ_API_KEY) {
    // Fallback if no API key
    return NextResponse.json({ 
      text: `(Mock) Great question about ${subject}! This concept is important for your exams. Let me break it down: the key idea is to understand the fundamentals and practice applying them to different problems. Would you like me to give you a specific example?` 
    });
  }

  try {
    const langRule = subject.toLowerCase().includes('kannada') ? 'Respond entirely in the Kannada script language.' : (subject.toLowerCase().includes('hindi') ? 'Respond entirely in the Hindi script language.' : 'Use simple, conversational English.');
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 500,
        messages: [
          { role: 'system', content: `You are a helpful, friendly study tutor for Indian students studying ${subject}. Keep answers concise (2-4 sentences), clear, and educational. ${langRule} If the student asks about a concept, explain it simply. If they ask a problem, solve it step by step briefly. Be encouraging!` },
          ...history,
          { role: 'user', content: message }
        ]
      })
    });
    
    const data = await response.json();
    if (!response.ok) {
        console.error("Groq API Error:", data);
        return NextResponse.json({ error: data.error?.message || 'API Error' }, { status: 500 });
    }
    
    return NextResponse.json({ text: data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch from Groq API' }, { status: 500 });
  }
}
