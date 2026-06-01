import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { subject, difficulty, contextData } = await req.json();
  const level = difficulty <= 2 ? 'easy' : difficulty <= 4 ? 'medium' : 'hard';

  if (!process.env.GROQ_API_KEY) {
    // Fallback if no API key
    return NextResponse.json([{
      question: `What is the most important concept in ${subject}?`,
      options: ['Foundation theory', 'Advanced application', 'Historical context', 'Practical implementation'],
      correct: 0,
      explanation: 'Understanding the foundation is crucial for mastering any subject.'
    }]);
  }

  try {
    const isKannada = subject.toLowerCase().includes('kannada');
    const isHindi = subject.toLowerCase().includes('hindi');
    const langRule = isKannada ? 'Output all question text, options, and explanations in the Kannada script.' : (isHindi ? 'Output all question text, options, and explanations in the Hindi script.' : 'Output in English.');
    const contextStr = contextData ? `Curriculum Context: ${JSON.stringify(contextData)}` : '';
    const seed = Math.floor(Math.random() * 1000000);
    
    const prompt = `Generate 5 unique ${level} MCQs for ${subject}. ${contextStr} ${langRule}
    Seed: ${seed}.
    You MUST return ONLY a JSON array. No markdown, no "Certainly!", no introductory or concluding text.
    Format: [{"question":"...","options":["...","...","...","..."],"correct":0,"explanation":"..."}]`;
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 3000,
        temperature: 0.6,
        messages: [
          { role: 'system', content: 'You are a quiz-only API. You output raw JSON arrays with NO other text or markdown formatting. Your response MUST start with "[" and end with "]".' },
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
    
    // Improved JSON extraction logic: Look for the first '[' and last ']'
    const startIdx = text.indexOf('[');
    const endIdx = text.lastIndexOf(']');
    
    if (startIdx !== -1 && endIdx !== -1) {
      text = text.substring(startIdx, endIdx + 1);
    } else {
      // Clean standard markdown if indices fail
      text = text.replace(/```json|```/g, '').trim();
    }

    try {
        let parsed = JSON.parse(text);
        if (!Array.isArray(parsed)) parsed = [parsed]; 
        return NextResponse.json(parsed);
    } catch (parseError) {
        console.error("JSON Parse Error on text:", text);
        return NextResponse.json({ error: 'AI returned invalid data format' }, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate question from Groq' }, { status: 500 });
  }
}
