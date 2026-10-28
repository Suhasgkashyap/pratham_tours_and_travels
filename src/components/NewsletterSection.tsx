import { useState } from 'react';
import { Mail, CheckCircle2, Send, Sparkles } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-md border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Exclusive Karnataka &amp; Holiday Deals</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif tracking-tight">
          Get Travel Inspiration and Exclusive Deals
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl mx-auto leading-relaxed">
          Sign up with your email to receive secret weekend itineraries, seasonal festival discounts on Swift Dzire &amp;
          Ertiga rentals, and newly launched tour packages.
        </p>

        {subscribed ? (
          <div className="mt-8 p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl max-w-md mx-auto flex items-center justify-center gap-2 text-emerald-300 text-sm font-semibold animate-in zoom-in-95">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Thank you for subscribing! Check your inbox for ₹500 travel voucher.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:border-amber-400 backdrop-blur-md"
              />
            </div>
            <button
              type="submit"
              id="newsletter-subscribe-btn"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-slate-400 mt-3">
          We respect your privacy. Zero spam, unsubscribe anytime with 1-click.
        </p>
      </div>
    </section>
  );
}
