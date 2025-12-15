
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function roastEmail(subject, body) {
    if (!process.env.OPENAI_API_KEY) {
        // Mock
        return {
            score: 42,
            spam_trigger: "High",
            ego_check: "Fail",
            roast: "This email is so boring it put my spam filter to sleep. You used 'I' 15 times. Do you think the prospect cares about your life story?",
            fixed_subject: "Quick question about {Company}",
            fixed_body: "Hi {Name},\n\nSaw you're scaling fast. We help agencies like yours save 10h/week with automation.\n\nOpen to a 5-min chat?\n\nBest,\nKen",
            tips: ["Shorten your subject line", "Focus on THEIR pain, not your product"]
        }
    }

    const prompt = `
    Analyze this cold email.
    Subject: "${subject}"
    Body: "${body}"

    Act as a brutal, cynical Sales Director who hates bad emails.
    
    Return JSON:
    - score (0-100, where 0 is trash, 100 is god tier)
    - spam_trigger (Low/Medium/High)
    - ego_check (Pass/Fail) - Fail if too many "I/We".
    - roast (A 2-sentence savage critique of why it sucks)
    - fixed_subject (A high-converting alternative)
    - fixed_body (A complete rewrite using a framework like PAS or AIDA, keep it short)
    - tips (3 bullet points to improve)
  `;

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-4-turbo-preview",
            response_format: { type: "json_object" },
        });
        return JSON.parse(completion.choices[0].message.content);
    } catch (e) {
        console.error("AI Error", e);
        return null;
    }
}
