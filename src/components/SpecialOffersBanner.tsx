import { useState } from 'react';
import { Tag, Sparkles, Copy, Check, ArrowRight, Clock, MessageCircle } from 'lucide-react';
import { PricingSettings } from '../types';

interface SpecialOffersBannerProps {
  onExploreDeals: () => void;
  pricing: PricingSettings;
}

export default function SpecialOffersBanner({ onExploreDeals, pricing }: SpecialOffersBannerProps) {
  const [copied, setCopied] = useState(false);
  const promoCode = 'PRATHAM500';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappPromoMsg = encodeURIComponent(
    `Hello Pratham Tours Ranebennur, I want to avail the festive promo deal with code: ${promoCode} for my upcoming trip.`
  );

  return (
    <section className="py-12 bg-slate-900 text-white relative overflow-hidden">
      {/* Visual Ambient Glows */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-10 border border-amber-400/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Text */}
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Limited-Time Season Offer</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-serif tracking-tight">
              Save Up to <span className="text-amber-400">₹1,500</span> on All Karnataka &amp; Goa Tour Packages
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              Book any 3-Day or 4-Day holiday package or outstation cab (Swift Dzire or Suzuki Ertiga) for travel this month
              and enjoy flat discounts plus complimentary breakfast upgrades!
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
                <Clock className="w-3.5 h-3.5" /> Valid till end of this month
              </span>
              <span>•</span>
              <span>Applicable on Outstation Cabs &amp; Holiday Tours</span>
            </div>
          </div>

          {/* Right Coupon & CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
            {/* Promo Code Box */}
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 flex items-center justify-between gap-3 w-full sm:w-auto">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                  Use Coupon Code
                </span>
                <span className="text-lg font-black tracking-widest text-amber-400 font-mono">{promoCode}</span>
              </div>
              <button
                onClick={handleCopyCode}
                id="copy-promo-code-btn"
                className="p-2 bg-white/15 hover:bg-white/25 rounded-xl transition text-white cursor-pointer"
                title="Copy code"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Claim on WhatsApp */}
            <a
              href={`https://wa.me/91${pricing.ownerWhatsapp}?text=${whatsappPromoMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition whitespace-nowrap cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Claim on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
