import { useState } from 'react';
import {
  Search,
  Calendar,
  Users,
  MapPin,
  Car,
  Compass,
  ArrowRight,
  ShieldCheck,
  Star,
  Sparkles,
} from 'lucide-react';
import { PricingSettings } from '../types';

interface HeroSectionProps {
  onSearch: (params: {
    destination: string;
    tripType: string;
    travelers: number;
    travelDate: string;
  }) => void;
  onExplorePackages: () => void;
  onBookCab: () => void;
  pricing: PricingSettings;
}

export default function HeroSection({
  onSearch,
  onExplorePackages,
  onBookCab,
  pricing,
}: HeroSectionProps) {
  const [destination, setDestination] = useState('');
  const [tripType, setTripType] = useState('All');
  const [travelers, setTravelers] = useState(2);
  const [travelDate, setTravelDate] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      destination,
      tripType,
      travelers,
      travelDate,
    });
  };

  return (
    <section className="relative min-h-[620px] lg:min-h-[700px] flex flex-col justify-between bg-slate-950 text-white overflow-hidden">
      {/* Immersive Background Image with Multi-layer Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85"
          alt="Scenic Travel Landscapes"
          className="w-full h-full object-cover object-center scale-105 transform animate-pulse duration-1000 opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-blue-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
      </div>

      {/* Subtle Glowing Accents */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Trusted Tour &amp; Cab Operator in Ranebennur, Karnataka</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] font-serif">
            Explore the World.{' '}
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 bg-clip-text text-transparent">
              Create Memories.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
            From the UNESCO temples of Hampi and misty coffee hills of Coorg, to Goa beaches, Kashmir snows, and Dubai
            skylines. Travel in sanitized <strong className="text-white font-semibold">Swift Dzire (₹{pricing.swiftDzirePerKm}/km)</strong> and{' '}
            <strong className="text-white font-semibold">Suzuki Ertiga (₹{pricing.ertigaPerKm}/km)</strong> with experienced Kannada &amp; Hindi speaking chauffeurs.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExplorePackages}
              id="hero-explore-packages-btn"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-base shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition transform active:scale-98 cursor-pointer"
            >
              <Compass className="w-5 h-5 text-slate-950" />
              <span>Explore Tour Packages</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onBookCab}
              id="hero-book-cab-btn"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-base backdrop-blur-md border border-white/20 shadow-md transition transform active:scale-98 cursor-pointer"
            >
              <Car className="w-5 h-5 text-sky-400" />
              <span>Book Swift Dzire / Ertiga</span>
            </button>
          </div>

          {/* Trust Metric Badges */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm text-slate-300 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
              <span>
                <strong className="text-white block font-bold">4.9 / 5 Rating</strong> 600+ Happy Guests
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-sky-400 shrink-0" />
              <span>
                <strong className="text-white block font-bold">Swift Dzire: ₹{pricing.swiftDzirePerKm}/km</strong> Ertiga: ₹{pricing.ertigaPerKm}/km
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong className="text-white block font-bold">Driver: ₹{pricing.driverBataPerDay}/day</strong> No Hidden Charges
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                <strong className="text-white block font-bold">Doorstep Pickup</strong> Across Karnataka
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Interactive Search Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mb-12 sm:-mb-14 w-full">
        <form
          onSubmit={handleSearchSubmit}
          id="hero-search-form"
          className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-5 border border-slate-200/80 text-slate-900 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center"
        >
          {/* Destination */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition border border-slate-100">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-blue-900" /> Destination
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Hampi, Gokarna, Coorg, Goa"
              id="search-input-destination"
              className="w-full bg-transparent text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          {/* Travel Date */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition border border-slate-100">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Calendar className="w-3.5 h-3.5 text-blue-900" /> Travel Dates
            </label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              id="search-input-date"
              className="w-full bg-transparent text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
            />
          </div>

          {/* Travelers Count */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition border border-slate-100">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Users className="w-3.5 h-3.5 text-blue-900" /> Travelers
            </label>
            <select
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value))}
              id="search-select-travelers"
              className="w-full bg-transparent text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value={1}>1 Traveler (Solo)</option>
              <option value={2}>2 Travelers (Couple / Dzire)</option>
              <option value={4}>4 Travelers (Family / Dzire)</option>
              <option value={6}>6-7 Travelers (Ertiga 7-Seater)</option>
              <option value={10}>8+ Travelers (Group Tour)</option>
            </select>
          </div>

          {/* Trip Type */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition border border-slate-100">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Compass className="w-3.5 h-3.5 text-blue-900" /> Trip Type
            </label>
            <select
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              id="search-select-trip-type"
              className="w-full bg-transparent text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="All">All Trip Types</option>
              <option value="Cab Rental">Cab Rental (Dzire/Ertiga)</option>
              <option value="Pilgrimage & Heritage">Temple Pilgrimage</option>
              <option value="Honeymoon">Honeymoon Special</option>
              <option value="Family Holidays">Family Holidays</option>
              <option value="Beach Vacations">Beach Vacation</option>
              <option value="Weekend Getaways">Weekend Getaways</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="w-full">
            <button
              type="submit"
              id="search-submit-btn"
              className="w-full h-[52px] bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900 hover:from-blue-900 hover:to-indigo-800 text-white font-bold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30 transition cursor-pointer"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span>Search Trips</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
