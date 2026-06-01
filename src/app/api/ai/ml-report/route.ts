import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { data, avgCurrent, avgTarget } = await req.json();

  const prompt = `Act as an advanced predictive AI Study Planner and Machine Learning diagnostic model. 
The student has requested a highly accurate "Detailed ML Insight Report" based on their current academic trajectory.

Incoming Data:
- Subjects: ${data.subjects.join(', ')}
- Current Grades: ${data.grades.join(', ')}
- Target Grades: ${data.targets.join(', ')}
- Predicted Current GPA Score: ${avgCurrent.toFixed(2)}/10
- Target GPA Score: ${avgTarget.toFixed(2)}/10

Instructions for Prediction Model:
1. Perform a predictive analysis on where they will fail tracking to their goal if they don't change their habits. Identify the weakest links.
2. Provide 3 specific, data-driven optimization strategies (Cognitive routing) to improve accuracy of hitting their goals.
3. Suggest a 7-day tactical intervention.
4. Keep the tone highly analytical, intelligent, and precise (e.g. "Model confidence is 94.2%...", "Predictive divergence detected in...").

Output the data as a clean JSON object containing:
{
  "confidenceScore": "numerical percentage string e.g. '94.2%'",
  "weakestLink": "subject name",
  "analysis": "1 paragraph of high-level predictive diagnostic",
  "strategies": ["strategy 1 text", "strategy 2 text", "strategy 3 text"],
  "tacticalIntervention": "short string with 7-day advice"
}

Respond ONLY with the JSON object. Do not include any markdown formatting wrappers or explanations.`;

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Using openai/gpt-oss-120b for state-of-the-art reasoning and prediction accuracy
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'system', content: prompt }],
        temperature: 0.1 // Extremely low temperature for highest precision/accuracy
      })
    });

    const groqData = await groqRes.json();
    
    if (!groqRes.ok) {
        throw new Error(groqData.error?.message || "Failed to communicate with AI Model");
    }

    let text = groqData.choices[0].message.content.trim();
    
    // Strip markdown formatting if the model still accidentally included it
    if (text.startsWith('\`\`\`json')) {
      text = text.replace(/^\`\`\`json/, '').replace(/\`\`\`$/, '').trim();
    } else if (text.startsWith('\`\`\`')) {
      text = text.replace(/^\`\`\`/, '').replace(/\`\`\`$/, '').trim();
    }
    
    return NextResponse.json(JSON.parse(text));
  } catch (err: any) {
    console.error("ML Report AI Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
