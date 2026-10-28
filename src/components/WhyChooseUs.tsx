import {
  ShieldCheck,
  Compass,
  BadgePercent,
  Headphones,
  CalendarCheck,
  Sparkles,
  MapPin,
  Car,
} from 'lucide-react';
import { PricingSettings } from '../types';

interface WhyChooseUsProps {
  pricing: PricingSettings;
}

export default function WhyChooseUs({ pricing }: WhyChooseUsProps) {
  const features = [
    {
      icon: BadgePercent,
      title: '100% Transparent Pricing',
      description: `No surprise charges or surge rates. Clear per-km billing: Swift Dzire at ₹${pricing.swiftDzirePerKm}/km, Suzuki Ertiga at ₹${pricing.ertigaPerKm}/km, and driver allowance at ₹${pricing.driverBataPerDay}-₹${pricing.driverBataMaxPerDay}/day.`,
      badge: 'Zero Hidden Fees',
    },
    {
      icon: Compass,
      title: 'Customized Tour Itineraries',
      description:
        'Every traveler is unique. We customize temple schedules, family leisure breaks, and romantic halts to match your exact dates, budget, and group pace.',
      badge: 'Personalized Plans',
    },
    {
      icon: Car,
      title: 'Spotless, Sanitized Vehicles',
      description:
        'Our Swift Dzire and Suzuki Ertiga vehicles are meticulously maintained, deeply washed before every trip, equipped with high-efficiency chilled AC and emergency safety kits.',
      badge: 'Safety First',
    },
    {
      icon: MapPin,
      title: 'Local Karnataka Expertise',
      description:
        'Proudly rooted in Ranebennur (Haveri District). Our drivers know every scenic route, Ghat curve, temple darshan timing, and authentic South Indian dining spot.',
      badge: 'Ranebennur Based',
    },
    {
      icon: Headphones,
      title: '24/7 Dedicated Support',
      description:
        `Direct phone and WhatsApp helpline to the owner (${pricing.ownerPhone}) before, during, and after your trip. Instant assistance whenever you need it.`,
      badge: 'Round the Clock',
    },
    {
      icon: ShieldCheck,
      title: 'Verified & Courteous Chauffeurs',
      description:
        'Experienced, non-smoking, polite drivers with verified licenses and 8+ years of highway and hill terrain experience across Karnataka, Goa, and Kerala.',
      badge: 'Police Verified',
    },
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/10 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Pratham Promise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            Why Travelers Across Karnataka Choose Us
          </h2>
          <p className="text-base text-slate-600 mt-2">
            We combine high-standard vehicle maintenance, honest pricing, and genuine hospitality so you can travel
            without worries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-3xl p-7 border border-slate-200/80 hover:border-blue-900/30 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-900 text-amber-400 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-serif group-hover:text-blue-900 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-blue-900">
                  <CalendarCheck className="w-4 h-4 text-emerald-600" />
                  <span>Guaranteed On-Time Pickup</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
