import { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Car,
  Compass,
  MapPin,
  Heart,
  Menu,
  X,
  SlidersHorizontal,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { PricingSettings } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  wishlistCount: number;
  openWishlist: () => void;
  openBookingModal: () => void;
  openPriceEditor: () => void;
  pricing: PricingSettings;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  wishlistCount,
  openWishlist,
  openBookingModal,
  openPriceEditor,
  pricing,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'cabs', label: 'Cabs & Car Rental', badge: '₹11/km' },
    { id: 'packages', label: 'Tour Packages' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'about', label: 'About Us' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'blog', label: 'Travel Guide' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Pratham Tours & Travels, I want to inquire about tour packages / cab booking from Ranebennur.`
  );

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100 transition-all">
      {/* Top Notification & Quick Rates Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1 text-amber-400 font-semibold tracking-wide">
              <MapPin className="w-3.5 h-3.5" /> Ranebennur, Haveri Dist, Karnataka
            </span>
            <span className="hidden sm:inline-block text-slate-600">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
              <Car className="w-3.5 h-3.5 text-sky-400" />
              Swift Dzire: <strong className="text-white">₹{pricing.swiftDzirePerKm}/km</strong> &amp; Ertiga:{' '}
              <strong className="text-white">₹{pricing.ertigaPerKm}/km</strong> (Driver: ₹{pricing.driverBataPerDay}/day)
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Sanitized &amp; Verified Chauffeurs
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={openPriceEditor}
              id="nav-edit-rates-btn"
              className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-medium transition cursor-pointer text-xs"
              title="Owner: Edit cab rates & package prices"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Edit Rates / Admin</span>
            </button>
            <span className="text-slate-600">|</span>
            <a
              href={`https://wa.me/91${pricing.ownerWhatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition font-medium"
              id="top-bar-whatsapp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: {pricing.ownerWhatsapp}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href={`tel:${pricing.ownerPhone}`}
              className="flex items-center gap-1 text-sky-300 hover:text-sky-200 transition font-medium"
              id="top-bar-call"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {pricing.ownerPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="nav-brand-logo"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-950 flex items-center justify-center text-amber-400 shadow-md shadow-blue-950/20 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-900 transition-colors font-serif">
                  PRATHAM
                </span>
                <span className="text-xs bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                  Karnataka
                </span>
              </div>
              <p className="text-[11px] font-semibold tracking-wider uppercase text-slate-500">
                Tours &amp; Travels • Ranebennur
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-blue-900 bg-blue-50 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-blue-900 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] bg-amber-500/15 text-amber-700 font-extrabold px-1.5 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Wishlist Button */}
            <button
              onClick={openWishlist}
              id="nav-wishlist-btn"
              className="relative p-2.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
              title="Saved Tour Packages"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Quick WhatsApp Contact */}
            <a
              href={`https://wa.me/91${pricing.ownerWhatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              id="nav-whatsapp-btn"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition shadow-2xs"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span className="hidden lg:inline">WhatsApp</span>
            </a>

            {/* Book Now Primary Button */}
            <button
              onClick={openBookingModal}
              id="nav-book-now-btn"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white text-sm font-bold rounded-xl shadow-md shadow-blue-950/20 hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Book Cab / Tour</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={openWishlist}
              className="relative p-2 text-slate-600 hover:text-rose-600 rounded-lg"
              title="Saved Tour Packages"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="p-2 text-slate-700 hover:text-blue-900 hover:bg-slate-100 rounded-xl transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <div className="bg-slate-50 p-2.5 rounded-lg text-xs">
              <span className="text-slate-500 block">Dzire Rate:</span>
              <strong className="text-blue-900 font-bold">₹{pricing.swiftDzirePerKm}/km</strong>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg text-xs">
              <span className="text-slate-500 block">Ertiga Rate:</span>
              <strong className="text-blue-900 font-bold">₹{pricing.ertigaPerKm}/km</strong>
            </div>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`mobile-nav-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
                  currentTab === link.id
                    ? 'text-blue-900 bg-blue-50 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] bg-amber-500/20 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                openPriceEditor();
                setMobileMenuOpen(false);
              }}
              id="mobile-edit-rates-btn"
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-50 text-amber-900 border border-amber-200 font-bold text-sm rounded-xl"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Owner: Edit Rates &amp; Details</span>
            </button>

            <button
              onClick={() => {
                openBookingModal();
                setMobileMenuOpen(false);
              }}
              id="mobile-book-now-btn"
              className="w-full flex items-center justify-center gap-2 py-3 bg-blue-900 text-white font-bold text-sm rounded-xl shadow-md"
            >
              <Car className="w-4 h-4" />
              <span>Book Cab / Tour Package</span>
            </button>

            <div className="flex gap-2">
              <a
                href={`tel:${pricing.ownerPhone}`}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-100 text-slate-800 font-semibold text-xs rounded-xl"
              >
                <Phone className="w-3.5 h-3.5 text-blue-900" />
                <span>Call {pricing.ownerPhone}</span>
              </a>
              <a
                href={`https://wa.me/91${pricing.ownerWhatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-emerald-600 text-white font-semibold text-xs rounded-xl"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
