import { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageCircle, Sparkles } from 'lucide-react';
import { FAQS } from '../data/travelData';
import { PricingSettings } from '../types';

interface FAQViewProps {
  pricing: PricingSettings;
}

export default function FAQView({ pricing }: FAQViewProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/10 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-serif tracking-tight">
          Everything You Need to Know
        </h1>
        <p className="text-base text-slate-600 mt-2">
          Clear answers about our outstation cab rentals, Dzire &amp; Ertiga rates, driver allowances, and holiday
          packages in Ranebennur, Karnataka.
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen ? 'bg-white border-blue-900/40 shadow-md' : 'bg-slate-50 border-slate-200 hover:bg-white'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="font-bold text-sm sm:text-base text-slate-900 font-serif">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-900' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Have more questions banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-blue-950 to-indigo-950 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h3 className="text-xl font-bold font-serif">Have a question not answered here?</h3>
          <p className="text-xs text-slate-300 mt-1">
            Give us a call directly or drop a quick WhatsApp message. We respond within minutes!
          </p>
        </div>

        <div className="flex gap-3 shrink-0">
          <a
            href={`tel:${pricing.ownerPhone}`}
            className="px-4 py-2.5 bg-white text-slate-900 font-bold text-xs rounded-xl flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-blue-900" />
            <span>Call: {pricing.ownerPhone}</span>
          </a>
          <a
            href={`https://wa.me/91${pricing.ownerWhatsapp}?text=${encodeURIComponent(
              'Hello Pratham Tours Ranebennur, I have a question regarding cab booking.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
