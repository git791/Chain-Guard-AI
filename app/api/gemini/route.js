import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI;
if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MOCK_GEMINI_KEY') {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

export async function POST(req) {
  if (!genAI) {
    return Response.json({
      text: "<strong>Mock Insight:</strong> Please configure GEMINI_API_KEY to receive real Vertex AI suggestions.",
      color: "var(--color-yellow)"
    });
  }

  try {
    const data = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    Supply Chain Context:
    Shipments delayed: ${data.delays || 'None'}
    Weather info: ${data.weather || 'Normal'}
    Active risks: ${data.risks || 'None'}

    Provide 1 optimized rerouting suggestion and 1 key operational insight (max 2 short sentences each). Format it to use simple strong HTML tags for emphasis.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return Response.json({ text: response.text(), color: 'var(--color-accent)' });
  } catch(e) {
    console.error('Gemini error:', e);
    return Response.json({ text: '<strong>Error</strong> unable to fetch AI insights at this moment.', color: 'var(--color-red)' }, { status: 500 });
  }
}
