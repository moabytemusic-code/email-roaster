
"use client";
import { useState } from 'react';
import { Flame, Mail, Send, AlertTriangle, CheckCircle, RefreshCw, CircleHelp, X } from 'lucide-react';
import './globals.css';

export default function Home() {
    const [step, setStep] = useState('input');
    const [showHelp, setShowHelp] = useState(false);
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const analyze = async (withEmail = false) => {
        if (!subject || !body) return alert("Fill in the email first!");
        setLoading(true);
        const res = await fetch('/api/roast-email', {
            method: 'POST',
            body: JSON.stringify({ subject, body, email: withEmail ? email : null })
        });
        const result = await res.json();
        setData(result);
        setStep(withEmail ? 'success' : 'teaser');
        setLoading(false);
    };

    return (
        <main className="min-h-screen py-10 px-4 flex flex-col items-center">

            {/* HEADER */}
            <div className="text-center mb-10">
                <div className="flex justify-center mb-4">
                    <div className="bg-red-500/10 p-4 rounded-full border border-red-500/30">
                        <Flame className="text-red-500 w-12 h-12 animate-pulse" />
                    </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-black mb-2 fire-text uppercase tracking-tighter">Cold Email Roaster</h1>
                <p className="text-slate-400 max-w-lg mx-auto">Stop sending trash. Let our AI Sales Director roast your outreach and rewrite it for conversion.</p>
            </div>

            {/* INPUT STAGE */}
            {step === 'input' && (
                <div className="w-full max-w-2xl roast-card p-6 md:p-10 rounded-2xl">
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-slate-400 mb-2 uppercase">Subject Line</label>
                        <input
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 p-4 rounded text-white focus:border-red-500 outline-none transition"
                            placeholder="e.g. Quick Question..."
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-400 mb-2 uppercase">Email Body</label>
                        <textarea
                            value={body}
                            onChange={e => setBody(e.target.value)}
                            className="w-full h-48 bg-black/50 border border-white/10 p-4 rounded text-white focus:border-red-500 outline-none transition font-mono text-sm"
                            placeholder="Hi [Name], I wanted to reach out because..."
                        />
                    </div>

                    <button
                        onClick={() => analyze(false)}
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50"
                    >
                        {loading ? <RefreshCw className="animate-spin" /> : <><Flame size={20} /> Roast My Email</>}
                    </button>
                </div>
            )}

            {/* TEASER STAGE */}
            {step === 'teaser' && data && (
                <div className="w-full max-w-2xl roast-card p-8 rounded-2xl text-center animate-fade-in relative overflow-hidden">

                    <div className="flex justify-center mb-6 relative z-10">
                        <div className="w-32 h-32 rounded-full border-4 border-red-600 flex items-center justify-center bg-black">
                            <div>
                                <span className="text-4xl font-black text-white">{data.score}</span>
                                <span className="block text-xs text-red-500 font-bold uppercase">Trash Score</span>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">The Verdict</h3>
                    <p className="text-red-400 italic text-lg mb-8 max-w-md mx-auto">"{data.roast}"</p>

                    {/* Blurred Content */}
                    <div className="bg-black/50 border border-white/10 p-6 rounded-xl mb-8 relative overflow-hidden text-left">
                        <div className="absolute inset-0 backdrop-blur-md bg-black/60 z-20 flex flex-col items-center justify-center p-6 text-center">
                            <LockIcon />
                            <h4 className="text-xl font-bold text-white mb-2">Unlock the Fix</h4>
                            <p className="text-sm text-slate-400 mb-4">See the rewritten version that actually books meetings.</p>

                            <div className="flex w-full gap-2 max-w-sm">
                                <input
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="bg-zinc-900 border border-zinc-700 text-white p-3 rounded flex-1 text-sm"
                                />
                                <button onClick={() => analyze(true)} className="bg-white text-black font-bold px-4 rounded hover:bg-slate-200">Unlock</button>
                            </div>
                        </div>

                        {/* Fake Blurred Text */}
                        <div className="text-white/20 select-none blur-sm pointer-events-none">
                            <p className="mb-2 w-3/4 bg-white/20 h-4 rounded"></p>
                            <p className="mb-2 w-full bg-white/20 h-4 rounded"></p>
                            <p className="mb-2 w-5/6 bg-white/20 h-4 rounded"></p>
                            <p className="w-1/2 bg-white/20 h-4 rounded"></p>
                        </div>
                    </div>
                </div>
            )}

            {/* SUCCESS STAGE */}
            {step === 'success' && data && (
                <div className="w-full max-w-2xl roast-card p-8 rounded-2xl animate-fade-in">
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                        <CheckCircle className="text-green-500 w-8 h-8" />
                        <div>
                            <h3 className="text-xl font-bold text-white">The Fixed Version</h3>
                            <p className="text-slate-400 text-sm">Sent to {email}</p>
                        </div>
                    </div>

                    <div className="bg-green-500/5 border border-green-500/20 p-6 rounded-xl mb-8">
                        <div className="mb-4">
                            <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Subject</span>
                            <p className="text-white font-medium">{data.fixed_subject}</p>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Body</span>
                            <p className="text-slate-300 whitespace-pre-wrap mt-1">{data.fixed_body}</p>
                        </div>
                    </div>

                    <h4 className="font-bold text-white mb-4">Why this works better:</h4>
                    <ul className="space-y-3 mb-8">
                        {data.tips.map((tip, i) => (
                            <li key={i} className="flex gap-3 text-sm text-slate-300">
                                <span className="text-red-500 font-bold">{i + 1}.</span> {tip}
                            </li>
                        ))}
                    </ul>

                    {/* MONETIZATION */}
                    <div className="bg-zinc-900 p-6 rounded-xl text-center border border-zinc-800">
                        <p className="text-sm font-bold text-slate-400 mb-4">SCALE YOUR OUTREACH WITH</p>
                        <div className="grid grid-cols-2 gap-4">
                            <a href="https://www.lemlist.com" target="_blank" className="bg-black hover:border-red-500 border border-zinc-700 p-3 rounded font-bold transition block">Lemlist 💌</a>
                            <a href="https://instantly.ai" target="_blank" className="bg-black hover:border-red-500 border border-zinc-700 p-3 rounded font-bold transition block">Instantly ⚡️</a>
                        </div>
                        <button onClick={() => setStep('input')} className="mt-6 text-xs text-slate-500 hover:text-white transition">Roast Another Email</button>
                    </div>
                </div>
            )}

            {/* Help Button */}
            <button
                onClick={() => setShowHelp(true)}
                className="fixed top-4 right-4 text-slate-400 hover:text-white transition flex items-center gap-2"
            >
                <span className="font-bold text-sm">How To Use</span> <CircleHelp size={24} />
            </button>

            {/* Help Modal */}
            {showHelp && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                    <div className="bg-zinc-900 ring-1 ring-red-900 p-6 rounded-xl max-w-sm w-full relative">
                        <button
                            onClick={() => setShowHelp(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Flame size={24} className="text-red-500" /> How it Works
                        </h3>

                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="bg-black border border-red-900 w-8 h-8 rounded-full flex items-center justify-center font-bold text-red-500 shrink-0">1</div>
                                <div><strong className="text-white block">Paste Draft</strong><p className="text-slate-400 text-sm">Enter your raw cold email Subject & Body.</p></div>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-black border border-red-900 w-8 h-8 rounded-full flex items-center justify-center font-bold text-red-500 shrink-0">2</div>
                                <div><strong className="text-white block">Get Roasted</strong><p className="text-slate-400 text-sm">AI rates it on Spam, Ego & Impact.</p></div>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-black border border-red-900 w-8 h-8 rounded-full flex items-center justify-center font-bold text-red-500 shrink-0">3</div>
                                <div><strong className="text-white block">Unlock Fix</strong><p className="text-slate-400 text-sm">Get a rewritten, high-converting version.</p></div>
                            </div>
                        </div>

                        <button onClick={() => setShowHelp(false)} className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded mt-6 w-full">Got it</button>
                    </div>
                </div>
            )}
        </main>
    );
}

function LockIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white mb-2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
    )
}
