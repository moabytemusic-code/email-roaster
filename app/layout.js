
import './globals.css';
export const metadata = {
    title: 'Cold Email Roaster™ | Fix Your Outreach',
    description: 'AI-powered cold email audit. Get roasted, get fixed, get clients.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
                <script src="https://cdn.tailwindcss.com"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      dark: '#09090b',
                      roast: '#b91c1c', 
                      accent: '#f59e0b',
                    }
                  }
                }
              }
            `
                    }}
                />
            </head>
            <body className="antialiased bg-dark text-slate-100">{children}</body>
        </html>
    )
}
