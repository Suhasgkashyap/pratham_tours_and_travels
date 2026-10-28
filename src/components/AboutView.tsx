import {
  ShieldCheck,
  Compass,
  MapPin,
  Car,
  Phone,
  MessageCircle,
  Users,
  Award,
  Clock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { PricingSettings } from '../types';
import { CAR_RENTALS } from '../data/travelData';

interface AboutViewProps {
  pricing: PricingSettings;
  onBookCab: () => void;
}

export default function AboutView({ pricing, onBookCab }: AboutViewProps) {
  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Hero Intro */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/10 text-blue-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Rooted in Ranebennur, Haveri, Karnataka</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-serif leading-tight">
            Pratham Tours &amp; Travels
          </h1>

          <p className="text-base text-slate-600 leading-relaxed">
            Founded with a vision to deliver genuine hospitality, punctuality, and stress-free travel,{' '}
            <strong className="text-slate-900 font-semibold">Pratham Tours and Travels</strong> has grown to become
            one of Central Karnataka’s most trusted cab operators and tour planners.
          </p>

          <p className="text-sm text-slate-600 leading-relaxed">
            Headquartered in <strong className="text-slate-900">Ranebennur (Haveri District)</strong>, we connect
            families, pilgrims, newlyweds, and corporate travelers with every corner of Karnataka, Goa, Maharashtra,
            Kerala, and North India.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
            <div>
              <span className="text-2xl sm:text-3xl font-black text-blue-900 font-serif block">10+</span>
              <span className="text-xs text-slate-500 font-medium">Years of Driving Trust</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-blue-900 font-serif block">5,000+</span>
              <span className="text-xs text-slate-500 font-medium">Completed Trips</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-amber-600 font-serif block">4.9★</span>
              <span className="text-xs text-slate-500 font-medium">Customer Rating</span>
            </div>
          </div>
        </div>

        {/* Visual Card */}
        <div className="lg:col-span-5 relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative group">
            <img
              src="https://images.unsplash.com/photo-1600100397608-f010f443b782?auto=format&fit=crop&w=800&q=80"
              alt="Karnataka Heritage"
              className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Our Headquarters</span>
              <h3 className="text-xl font-bold font-serif">Ranebennur, Karnataka</h3>
              <p className="text-xs text-slate-300">
                Railway Station Road &amp; PB Road, Haveri District - 581115
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fleet Spotlight Section */}
      <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/80 space-y-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1">
            Our Dedicated Fleet
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
            Swift Dzire &amp; Suzuki Ertiga — Maintained to Perfection
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Every vehicle in our garage is company-owned, rigorously inspected, non-smoking, and air-conditioned with
            hygienic seat covers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CAR_RENTALS.map((car, idx) => (
            <div key={car.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="h-52 overflow-hidden relative">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-blue-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Car #{idx + 1}: {car.name}
                </div>
                <div className="absolute bottom-3 right-3 bg-amber-500 text-slate-950 text-xs font-black px-3 py-1 rounded-lg">
                  ₹{idx === 0 ? pricing.swiftDzirePerKm : pricing.ertigaPerKm} / km
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 font-serif">{car.name} ({car.model})</h3>
                <p className="text-xs text-slate-600">{car.description}</p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Driver Allowance: ₹{pricing.driverBataPerDay}-₹{pricing.driverBataMaxPerDay}/day</span>
                  <span className="font-bold text-blue-900">{car.seats}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Owner Contact Spotlight */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
            Direct Owner Communication
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
            Talk to Us Directly. No Call-Center Waiting.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            When you contact Pratham Tours, you speak directly with our core operational team in Ranebennur. We ensure
            transparent quotations, zero surge surprises, and drivers who prioritize your family’s comfort and safety.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <a
            href={`tel:${pricing.ownerPhone}`}
            className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition"
          >
            <Phone className="w-4 h-4 text-blue-900" />
            <span>Call: {pricing.ownerPhone}</span>
          </a>

          <a
            href={`https://wa.me/91${pricing.ownerWhatsapp}?text=${encodeURIComponent(
              'Hello Pratham Tours Ranebennur, I want to talk about custom tour and cab booking.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
