
import { NextResponse } from 'next/server';
import { roastEmail } from '@/lib/ai';
import { sendBrevoEmail, createBrevoContact } from '@/lib/brevo';

export async function POST(request) {
    try {
        const { subject, body, email } = await request.json();

        const data = await roastEmail(subject, body);
        if (!data) return NextResponse.json({ error: 'AI Roast Failed' }, { status: 500 });

        if (!email) {
            // TEASER
            return NextResponse.json({
                type: 'teaser',
                score: data.score,
                roast: data.roast,
                spam: data.spam_trigger
            });
        }

        // FULL + EMAIL
        const htmlContent = `
      <div style="font-family: sans-serif; color: #333;">
        <h1>🔥 Your Email Roast Results</h1>
        <h2 style="color:red">Score: ${data.score}/100</h2>
        <p><strong>The Verdict:</strong> ${data.roast}</p>
        
        <hr/>
        <h3>✨ The Fix (Use this instead):</h3>
        <p><strong>Subject:</strong> ${data.fixed_subject}</p>
        <div style="background:#eee; padding:15px; border-radius:5px; white-space: pre-wrap;">${data.fixed_body}</div>
        
        <h3>💡 Top Tips:</h3>
        <ul>${data.tips.map(t => `<li>${t}</li>`).join('')}</ul>
      </div>
    `;

        await sendBrevoEmail({ to: email, subject: `Your Roast Results: ${data.score}/100`, htmlContent });
        await createBrevoContact({ email, attributes: { LEAD_SOURCE: 'Email_Roaster' } });

        return NextResponse.json({ type: 'full', ...data });

    } catch (error) {
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}
