
export async function sendBrevoEmail({ to, subject, htmlContent }) {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) return false;

    await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: { 'api-key': apiKey, 'content-type': 'application/json' },
        body: JSON.stringify({
            sender: { name: 'Email Roaster', email: process.env.SENDER_EMAIL || 'roast@signalengines.com' },
            to: [{ email: to }],
            subject: subject,
            htmlContent: htmlContent
        })
    });
}

export async function createBrevoContact({ email, attributes = {} }) {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) return false;

    const body = { email, updateEnabled: true, attributes };
    if (process.env.BREVO_LIST_ID) body.listIds = [parseInt(process.env.BREVO_LIST_ID)];

    await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: { 'api-key': apiKey, 'content-type': 'application/json' },
        body: JSON.stringify(body)
    });
}
