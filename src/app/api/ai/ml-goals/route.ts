import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { subjects, grades, targets } = await req.json();

  const prompt = `Act as an advanced predictive AI Study Planner.
The student has requested a set of specific academic goals based on their current grades versus target grades.

Incoming Data:
- Subjects: ${subjects?.join(', ')}
- Current Grades: ${grades?.join(', ')}
- Target Grades: ${targets?.join(', ')}

Please generate exactly 3 concrete, actionable academic goals for this student to reach their target grades, keeping in mind the subjects where the gap between current and target grades is the largest.
Format your output strictly as a JSON array of 3 strings. Example: ["Review algebra formulas daily for 15 mins", "Take 2 full-length mock tests for science this week", "Complete all pending history assignments by friday"]
Respond ONLY with the JSON array. Do not include any markdown formatting wrappers, markdown code block backticks (like \`\`\`json and \`\`\`), or explanations. Just the raw array.`;

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
        temperature: 0.1
      })
    });

    const groqData = await groqRes.json();
    
    if (!groqRes.ok) {
        throw new Error(groqData.error?.message || "Failed to communicate with AI Model");
    }

    let text = groqData.choices[0].message.content.trim();
    if (text.startsWith('```json')) {
      text = text.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (text.startsWith('```')) {
      text = text.replace(/^```/, '').replace(/```$/, '').trim();
    }
    
    return NextResponse.json(JSON.parse(text));
  } catch (err: any) {
    console.error("ML Goals AI Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
