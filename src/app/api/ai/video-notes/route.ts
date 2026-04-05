import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { title, channel } = await req.json();

  const prompt = `Act as an expert AI Study Assistant.
The student is watching a masterclass video titled "${title}" by "${channel}".
Please generate a comprehensive, highly-structured set of study notes for this specific topic as if you just watched the video yourself.

Include:
1. A brief conceptual overview of the topic.
2. 3-4 Key Takeaways or Definitions.
3. Important formulas, dates, or core principles (if applicable).
4. One common mistake students make regarding this topic.

Format the response in clean Markdown. Keep it strictly educational and concise.`;

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [{ role: 'system', content: prompt }],
        temperature: 0.3
      })
    });

    const groqData = await groqRes.json();
    
    if (!groqRes.ok) {
        throw new Error(groqData.error?.message || "Failed to communicate with AI Model");
    }

    const text = groqData.choices[0].message.content.trim();
    return NextResponse.json({ notes: text });
  } catch (err: any) {
    console.error("Video Notes AI Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
