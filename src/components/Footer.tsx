import {
  Compass,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Car,
  ShieldCheck,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { PricingSettings } from '../types';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  openPriceEditor: () => void;
  pricing: PricingSettings;
}

export default function Footer({ setCurrentTab, openPriceEditor, pricing }: FooterProps) {
  const whatsappUrl = `https://wa.me/91${pricing.ownerWhatsapp}?text=${encodeURIComponent(
    'Hello Pratham Tours Ranebennur, I want to inquire about bookings.'
  )}`;

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => {
                setCurrentTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center text-amber-400 shadow-md">
                <Compass className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white font-serif">
                  PRATHAM TOURS &amp; TRAVELS
                </span>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Ranebennur, Karnataka, India
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Your trusted partner for comfortable, safe, and transparent domestic &amp; international tours, family
              holidays, honeymoon packages, and sanitized outstation cab rentals across Karnataka, Goa, and South India.
            </p>

            {/* Cab Rate Highlights */}
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
              <div className="text-amber-400 font-bold flex items-center gap-1.5">
                <Car className="w-4 h-4 text-sky-400" />
                <span>Our Fleet &amp; Standard Rates:</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Maruti Swift Dzire (Sedan):</span>
                <strong className="text-white">₹{pricing.swiftDzirePerKm} / km</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Suzuki Ertiga (7-Seater):</span>
                <strong className="text-white">₹{pricing.ertigaPerKm} / km</strong>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px] pt-1 border-t border-slate-800">
                <span>Driver Allowance:</span>
                <span className="text-amber-300">₹{pricing.driverBataPerDay} - ₹{pricing.driverBataMaxPerDay} / day</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'home', label: 'Home' },
                { id: 'cabs', label: 'Swift Dzire & Ertiga Cabs' },
                { id: 'packages', label: 'All Tour Packages' },
                { id: 'destinations', label: 'Destinations Guide' },
                { id: 'about', label: 'About Our Agency' },
                { id: 'reviews', label: 'Customer Testimonials' },
                { id: 'blog', label: 'Travel Blog' },
                { id: 'faq', label: 'Booking FAQ' },
                { id: 'contact', label: 'Contact & Location' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      setCurrentTab(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-slate-400 hover:text-amber-400 transition cursor-pointer flex items-center gap-1"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Popular Tour Routes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Popular Trips</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• Hampi &amp; Badami Heritage (3D/2N)</li>
              <li>• Gokarna &amp; Murudeshwar Beach (4D/3N)</li>
              <li>• Coorg &amp; Wayanad Romantic Hills (4D/3N)</li>
              <li>• Sacred Karnataka Temple Circuit (4D/3N)</li>
              <li>• Goa Beach Vacation from Ranebennur</li>
              <li>• Mysore Palace &amp; Ooty Nilgiris (5D/4N)</li>
              <li>• Bengaluru Airport / Outstation Drops</li>
              <li>• Dandeli White River Rafting &amp; Jungle</li>
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Office &amp; Bookings</h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Near Railway Station Road &amp; PB Road, Ranebennur, Haveri District, Karnataka - 581115
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`tel:${pricing.ownerPhone}`} className="hover:text-amber-400 font-bold text-sm text-white">
                  +91 {pricing.ownerPhone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 font-bold text-emerald-400"
                >
                  WhatsApp: +91 {pricing.ownerWhatsapp}
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={openPriceEditor}
                  className="text-xs text-amber-300 hover:text-amber-200 underline font-semibold cursor-pointer"
                >
                  Owner: Edit Rates &amp; Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Pratham Tours and Travels, Ranebennur, Karnataka. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <span>Made for Travelers in Karnataka</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </span>
            <span>•</span>
            <button
              onClick={() => {
                setCurrentTab('faq');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-slate-300 cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setCurrentTab('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-slate-300 cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
