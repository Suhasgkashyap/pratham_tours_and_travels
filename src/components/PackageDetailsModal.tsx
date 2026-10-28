import { useState } from 'react';
import {
  X,
  Star,
  Clock,
  MapPin,
  Check,
  Ban,
  Car,
  Users,
  Calendar,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  Heart,
} from 'lucide-react';
import { TourPackage, PricingSettings } from '../types';

interface PackageDetailsModalProps {
  packageData: TourPackage | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (pkg: TourPackage, travelers: number, selectedCab: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  pricing: PricingSettings;
}

export default function PackageDetailsModal({
  packageData,
  isOpen,
  onClose,
  onBook,
  isWishlisted,
  onToggleWishlist,
  pricing,
}: PackageDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'gallery'>('itinerary');
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [selectedCab, setSelectedCab] = useState<'Swift Dzire' | 'Suzuki Ertiga'>('Swift Dzire');
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  if (!isOpen || !packageData) return null;

  const images = packageData.gallery.length > 0 ? packageData.gallery : [packageData.image];
  const activeImage = images[selectedImageIdx] || packageData.image;

  // Calculate pricing based on travelers and selected car
  const perPersonBase = packageData.price;
  const calculatedTotal = perPersonBase * travelersCount;

  const whatsappMessage = encodeURIComponent(
    `Hello Pratham Tours Ranebennur, I want to book the tour package: "${packageData.title}".\n` +
      `Duration: ${packageData.duration}\n` +
      `Preferred Vehicle: ${selectedCab} (Swift Dzire / Suzuki Ertiga)\n` +
      `Number of Travelers: ${travelersCount}\n` +
      `Total Estimated Cost: ₹${calculatedTotal.toLocaleString('en-IN')}\n` +
      `Please share availability and customized itinerary.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 relative my-8 animate-in zoom-in-95 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Image & Gallery Showcase */}
          <div className="relative h-72 sm:h-96 w-full bg-slate-900 overflow-hidden">
            <img src={activeImage} alt={packageData.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950">
                {packageData.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-slate-900">
                {packageData.region}
              </span>
            </div>

            {/* Bottom Floating Title Info */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{packageData.destination}</span>
                <span>•</span>
                <Clock className="w-3.5 h-3.5" />
                <span>{packageData.duration}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-serif leading-tight">{packageData.title}</h2>
              <div className="flex items-center gap-3 mt-2 text-xs">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-bold">{packageData.rating}</span>
                  <span className="text-slate-300">({packageData.reviewsCount} reviews)</span>
                </div>
                <span>•</span>
                <span className="text-slate-300">Pickup: {packageData.pickupLocation}</span>
              </div>
            </div>
          </div>

          {/* Gallery Thumbnails if multiple */}
          {images.length > 1 && (
            <div className="flex gap-2 p-3 bg-slate-100 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                    selectedImageIdx === idx ? 'border-blue-900 scale-105' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Content Layout Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Main Column: Itinerary & Inclusions (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Short description */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Trip Overview</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{packageData.description}</p>
              </div>

              {/* Highlights List */}
              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/60 space-y-2">
                <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">Key Trip Highlights:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-900">
                  {packageData.highlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="border-b border-slate-200 flex gap-4">
                <button
                  onClick={() => setActiveTab('itinerary')}
                  className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
                    activeTab === 'itinerary'
                      ? 'border-blue-900 text-blue-900'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Day-by-Day Itinerary ({packageData.itinerary.length} Days)
                </button>
                <button
                  onClick={() => setActiveTab('inclusions')}
                  className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
                    activeTab === 'inclusions'
                      ? 'border-blue-900 text-blue-900'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Inclusions &amp; Exclusions
                </button>
              </div>

              {/* Tab: Itinerary */}
              {activeTab === 'itinerary' && (
                <div className="space-y-4">
                  {packageData.itinerary.map((day) => (
                    <div
                      key={day.day}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-lg bg-blue-900 text-white text-[11px] font-bold">
                          Day {day.day}
                        </span>
                        {day.meals && (
                          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                            🍽️ {day.meals}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{day.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{day.description}</p>
                      {day.stay && (
                        <div className="text-[11px] text-slate-500 pt-1">
                          🏨 <strong>Hotel / Stay:</strong> {day.stay}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: Inclusions & Exclusions */}
              {activeTab === 'inclusions' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Inclusions */}
                  <div className="space-y-3 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                    <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>What is Included</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-emerald-900">
                      {packageData.inclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exclusions */}
                  <div className="space-y-3 bg-rose-50/50 p-4 rounded-2xl border border-rose-100">
                    <h4 className="text-xs font-bold text-rose-950 uppercase tracking-wider flex items-center gap-1.5">
                      <Ban className="w-4 h-4 text-rose-500" />
                      <span>What is Excluded</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-rose-900">
                      {packageData.exclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Pricing & Booking Widget (4 Cols) */}
            <div className="lg:col-span-4 bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Price Display */}
                <div>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-bold">
                    Per Person Package Cost
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900 font-serif">
                      ₹{packageData.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      ₹{packageData.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1">
                    All Taxes &amp; Cab Transport Included
                  </span>
                </div>

                {/* Travelers count selection */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Number of Travelers:
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setTravelersCount(Math.max(1, travelersCount - 1))}
                      className="w-10 h-10 rounded-xl bg-white border border-slate-300 font-bold text-slate-700 flex items-center justify-center cursor-pointer hover:bg-slate-100"
                    >
                      -
                    </button>
                    <span className="flex-1 py-2 text-center bg-white border border-slate-300 rounded-xl font-bold text-sm text-slate-900">
                      {travelersCount} {travelersCount === 1 ? 'Guest' : 'Guests'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTravelersCount(travelersCount + 1)}
                      className="w-10 h-10 rounded-xl bg-white border border-slate-300 font-bold text-slate-700 flex items-center justify-center cursor-pointer hover:bg-slate-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Vehicle Selection for package */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Select Cab for this Tour:
                  </label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCab('Swift Dzire')}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition cursor-pointer flex items-center justify-between ${
                        selectedCab === 'Swift Dzire'
                          ? 'border-blue-900 bg-blue-50/80 font-bold text-blue-900'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <div>
                        <span>Swift Dzire (Sedan)</span>
                        <span className="block text-[10px] text-slate-500 font-normal">₹{pricing.swiftDzirePerKm}/km • Ideal 2-4 pax</span>
                      </div>
                      <Check className={`w-4 h-4 ${selectedCab === 'Swift Dzire' ? 'opacity-100' : 'opacity-0'}`} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedCab('Suzuki Ertiga')}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition cursor-pointer flex items-center justify-between ${
                        selectedCab === 'Suzuki Ertiga'
                          ? 'border-blue-900 bg-blue-50/80 font-bold text-blue-900'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <div>
                        <span>Suzuki Ertiga (7-Seater)</span>
                        <span className="block text-[10px] text-slate-500 font-normal">₹{pricing.ertigaPerKm}/km • Ideal 5-7 pax</span>
                      </div>
                      <Check className={`w-4 h-4 ${selectedCab === 'Suzuki Ertiga' ? 'opacity-100' : 'opacity-0'}`} />
                    </button>
                  </div>
                </div>

                {/* Total estimation */}
                <div className="p-3 bg-white rounded-2xl border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-500">
                    <span>Package ({travelersCount} pax):</span>
                    <span className="font-semibold text-slate-900">₹{calculatedTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Dedicated Cab:</span>
                    <span className="font-semibold text-blue-900">{selectedCab}</span>
                  </div>
                  <div className="pt-1.5 border-t border-slate-100 flex justify-between font-bold text-sm text-slate-900">
                    <span>Estimated Total:</span>
                    <span className="text-amber-600 font-black">₹{calculatedTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4">
                <button
                  onClick={() => onBook(packageData, travelersCount, selectedCab)}
                  id="package-modal-book-btn"
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                >
                  <span>Book Package Online</span>
                  <ChevronRight className="w-4 h-4 text-amber-400" />
                </button>

                <a
                  href={`https://wa.me/91${pricing.ownerWhatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire on WhatsApp (7483089583)</span>
                </a>

                <button
                  type="button"
                  onClick={() => onToggleWishlist(packageData.id)}
                  className="w-full py-2 text-xs font-bold text-slate-500 hover:text-rose-600 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
                  <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
