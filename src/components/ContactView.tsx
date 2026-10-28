import { useState } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { PricingSettings } from '../types';

interface ContactViewProps {
  pricing: PricingSettings;
}

export default function ContactView({ pricing }: ContactViewProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Tour Package Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    // Trigger WhatsApp prefill
    const waText = encodeURIComponent(
      `*MESSAGE FROM WEBSITE INQUIRY*\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Subject: ${subject}\n` +
        `Message: ${message || 'Please provide quotation.'}`
    );
    window.open(`https://wa.me/91${pricing.ownerWhatsapp}?text=${waText}`, '_blank');

    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/10 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>We are Always Available</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-serif tracking-tight">
          Contact Pratham Tours &amp; Travels
        </h1>
        <p className="text-base text-slate-600 mt-2">
          Call or WhatsApp us 24/7 for instant cab quotes, outstation bookings, or custom holiday packages from
          Ranebennur, Karnataka.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Direct Helpline Card */}
          <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 p-6 sm:p-7 rounded-3xl text-white shadow-xl space-y-4 border border-blue-900/40">
            <div className="inline-flex items-center gap-1.5 bg-amber-500 text-slate-950 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Phone className="w-3 h-3" />
              <span>Direct Owner Line</span>
            </div>

            <div>
              <span className="text-xs text-slate-300 block">Call Anytime 24/7:</span>
              <a
                href={`tel:${pricing.ownerPhone}`}
                className="text-2xl sm:text-3xl font-black text-amber-400 font-mono hover:underline block mt-1"
              >
                +91 {pricing.ownerPhone}
              </a>
            </div>

            <div>
              <span className="text-xs text-slate-300 block">WhatsApp Instant Booking:</span>
              <a
                href={`https://wa.me/91${pricing.ownerWhatsapp}?text=${encodeURIComponent(
                  'Hello Pratham Tours Ranebennur, I want to book a cab / tour.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 mt-1"
              >
                <MessageCircle className="w-5 h-5" />
                <span>+91 {pricing.ownerWhatsapp}</span>
              </a>
            </div>

            <div className="pt-2 border-t border-white/10 text-xs text-slate-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Open 24 Hours • 7 Days a Week • 365 Days</span>
            </div>
          </div>

          {/* Office Address Card */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-serif">Office Address</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>Pratham Tours and Travels</strong>
              <br />
              Near Railway Station Road &amp; PB Road,
              <br />
              Ranebennur, Haveri District,
              <br />
              Karnataka - 581115, India.
            </p>
            <div className="text-xs text-slate-500 pt-1">
              📍 Landmark: Close to Ranebennur Railway Station &amp; Old Bus Stand.
            </div>
          </div>

          {/* Rates Quick Reference */}
          <div className="bg-amber-50/70 p-6 rounded-3xl border border-amber-200/70 space-y-2 text-xs text-amber-950">
            <h4 className="font-bold uppercase tracking-wider text-[11px] text-amber-900">
              Transparent Outstation Rates:
            </h4>
            <div className="flex justify-between">
              <span>Maruti Swift Dzire (Sedan):</span>
              <strong className="font-bold">₹{pricing.swiftDzirePerKm} / km</strong>
            </div>
            <div className="flex justify-between">
              <span>Suzuki Ertiga (7-Seater):</span>
              <strong className="font-bold">₹{pricing.ertigaPerKm} / km</strong>
            </div>
            <div className="flex justify-between pt-1 border-t border-amber-200/60">
              <span>Driver Allowance:</span>
              <strong className="font-bold">₹{pricing.driverBataPerDay}-₹{pricing.driverBataMaxPerDay} / day</strong>
            </div>
          </div>
        </div>

        {/* Contact Inquiry Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-3xl border border-slate-200 shadow-md">
          <div className="mb-6">
            <h3 className="text-2xl font-black text-slate-900 font-serif">Send Us a Message</h3>
            <p className="text-xs text-slate-500 mt-1">
              Fill the details below and we will revert immediately with vehicle options and exact prices.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
              <h4 className="text-xl font-bold text-slate-900">Inquiry Sent!</h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                WhatsApp chat opened with owner (+91 {pricing.ownerWhatsapp}). We will answer your question right away.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Basavaraj"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-blue-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit number"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-blue-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Inquiry Type *</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-blue-900 bg-white"
                >
                  <option value="Swift Dzire Cab Booking">Swift Dzire Cab Booking (₹11/km)</option>
                  <option value="Suzuki Ertiga Cab Booking">Suzuki Ertiga 7-Seater Cab Booking (₹14/km)</option>
                  <option value="Hampi & Badami Tour Package">Hampi &amp; Badami Tour Package</option>
                  <option value="Gokarna & Murudeshwar Beach Tour">Gokarna &amp; Murudeshwar Beach Tour</option>
                  <option value="Karnataka Temple Pilgrimage Circuit">Karnataka Temple Pilgrimage Circuit</option>
                  <option value="Coorg & Wayanad Honeymoon Package">Coorg &amp; Wayanad Honeymoon Package</option>
                  <option value="Bengaluru / Hubli Airport Drop">Bengaluru / Hubli Airport Drop</option>
                  <option value="Custom Tour Plan Inquiry">Custom Tour Plan Inquiry</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Trip Details / Question *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mention your travel dates, number of people, pickup location, and destinations..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:border-blue-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="contact-form-submit-btn"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-indigo-900 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>Send Message (Connect on WhatsApp / Call)</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
