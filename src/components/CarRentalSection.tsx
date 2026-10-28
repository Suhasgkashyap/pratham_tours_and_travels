import { useState, useRef } from 'react';
import {
  Car,
  Users,
  Briefcase,
  Wind,
  ShieldCheck,
  CheckCircle2,
  Calculator,
  Phone,
  MessageCircle,
  SlidersHorizontal,
  ChevronRight,
  Info,
  MapPin,
  Clock,
  Camera,
  Upload,
  Sparkles,
} from 'lucide-react';
import { CarRental, PricingSettings } from '../types';
import { CAR_RENTALS, POPULAR_ROUTES } from '../data/travelData';

interface CarRentalSectionProps {
  pricing: PricingSettings;
  onSelectCarForBooking: (car: CarRental, calculatedFare?: number) => void;
  openPriceEditor: () => void;
  onUpdatePricing?: (newPricing: PricingSettings) => void;
}

export default function CarRentalSection({
  pricing,
  onSelectCarForBooking,
  openPriceEditor,
  onUpdatePricing,
}: CarRentalSectionProps) {
  // Calculator state
  const [selectedCarId, setSelectedCarId] = useState<'swift-dzire' | 'suzuki-ertiga'>('swift-dzire');
  const [selectedRouteIndex, setSelectedRouteIndex] = useState<number>(0);
  const [customDistance, setCustomDistance] = useState<number>(POPULAR_ROUTES[0].roundTripKm);
  const [tripDays, setTripDays] = useState<number>(POPULAR_ROUTES[0].days);
  const [isCustomRoute, setIsCustomRoute] = useState<boolean>(false);
  const [tripNature, setTripNature] = useState<'round-trip' | 'one-way'>('round-trip');
  const [uploadToast, setUploadToast] = useState<string | null>(null);
  const [dragOverCarId, setDragOverCarId] = useState<string | null>(null);

  const handleFileUpload = (carId: string, file?: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) return;

      const isDzire = carId === 'swift-dzire';
      const updatedPricing: PricingSettings = {
        ...pricing,
        swiftDzireImage: isDzire ? dataUrl : pricing.swiftDzireImage,
        ertigaImage: !isDzire ? dataUrl : pricing.ertigaImage,
      };

      try {
        localStorage.setItem('pratham_tours_pricing_v1', JSON.stringify(updatedPricing));
      } catch (err) {
        console.error('Failed to save to localStorage:', err);
      }

      if (onUpdatePricing) {
        onUpdatePricing(updatedPricing);
      }

      setUploadToast(`${isDzire ? 'Swift Dzire' : 'Suzuki Ertiga'} photo updated!`);
      setTimeout(() => setUploadToast(null), 3000);
    };
    reader.readAsDataURL(file);
  };

  // Rates from dynamic pricing
  const currentRatePerKm = selectedCarId === 'swift-dzire' ? pricing.swiftDzirePerKm : pricing.ertigaPerKm;
  const driverBataPerDay = pricing.driverBataPerDay;

  // Calculation math
  const effectiveDistance = isCustomRoute ? customDistance : POPULAR_ROUTES[selectedRouteIndex].roundTripKm;
  const baseKmCharge = effectiveDistance * currentRatePerKm;
  const totalDriverBata = tripDays * driverBataPerDay;
  const estimatedTotalFare = baseKmCharge + totalDriverBata;

  const handleRouteChange = (index: number) => {
    setSelectedRouteIndex(index);
    setIsCustomRoute(false);
    setCustomDistance(POPULAR_ROUTES[index].roundTripKm);
    setTripDays(POPULAR_ROUTES[index].days);
  };

  const selectedCarName = selectedCarId === 'swift-dzire' ? 'Swift Dzire' : 'Suzuki Ertiga';
  const routeName = isCustomRoute
    ? `Custom Trip (${effectiveDistance} km)`
    : `${POPULAR_ROUTES[selectedRouteIndex].from} to ${POPULAR_ROUTES[selectedRouteIndex].to}`;

  const whatsappInquiryMessage = encodeURIComponent(
    `Hello Pratham Tours Ranebennur, I want to book ${selectedCarName} for ${routeName}.\n` +
      `Estimated Distance: ${effectiveDistance} km (${tripDays} Days)\n` +
      `Rate: ₹${currentRatePerKm}/km | Driver Allowance: ₹${driverBataPerDay}/day\n` +
      `Estimated Fare: ₹${estimatedTotalFare.toLocaleString('en-IN')}\n` +
      `Please confirm availability.`
  );

  return (
    <section id="cabs-section" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Photo Upload Toast */}
      {uploadToast && (
        <div className="fixed top-24 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{uploadToast}</span>
        </div>
      )}

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/10 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Car className="w-3.5 h-3.5" />
              <span>Ranebennur Cab &amp; Outstation Taxi Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
              Premium Fleet: Swift Dzire &amp; Suzuki Ertiga
            </h2>
            <p className="text-base text-slate-600 mt-2 max-w-2xl">
              100% transparent pricing with no hidden charges. Doorstep pickup across Ranebennur, Haveri, Byadgi,
              Harihar, and Davanagere for local drops, airport transfers, temple tours, and outstation holiday trips.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openPriceEditor}
              id="car-section-edit-rates-btn"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition border border-amber-300/80 cursor-pointer shadow-2xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Edit Car Rates (Owner)</span>
            </button>
            <a
              href={`tel:${pricing.ownerPhone}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call 7483089583</span>
            </a>
          </div>
        </div>

        {/* Cars Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {CAR_RENTALS.map((car, idx) => {
            const isDzire = car.id === 'swift-dzire';
            const liveRate = isDzire ? pricing.swiftDzirePerKm : pricing.ertigaPerKm;
            const isSelectedInCalc = selectedCarId === car.id;
            const currentImage = isDzire
              ? pricing.swiftDzireImage || '/dzire.jpeg'
              : pricing.ertigaImage || '/ertiga.jpeg';
            const plateNumber = isDzire
              ? pricing.swiftDzirePlate || 'KA 68 8031'
              : pricing.ertigaPlate || 'KA 68 2299';
            const fallbackUnsplash = isDzire
              ? 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80'
              : 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=80';
            const isDragTarget = dragOverCarId === car.id;

            return (
              <div
                key={car.id}
                id={`car-card-${car.id}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverCarId(car.id);
                }}
                onDragLeave={() => setDragOverCarId(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOverCarId(null);
                  if (e.dataTransfer.files?.[0]) {
                    handleFileUpload(car.id, e.dataTransfer.files[0]);
                  }
                }}
                className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 shadow-md hover:shadow-xl flex flex-col relative ${
                  isDragTarget
                    ? 'border-amber-500 ring-4 ring-amber-400/30'
                    : isSelectedInCalc
                    ? 'border-blue-900 ring-2 ring-blue-900/10'
                    : 'border-slate-200'
                }`}
              >
                {/* Car Image with Badges & Upload Control */}
                <div className="relative h-64 sm:h-72 w-full bg-slate-900 overflow-hidden group">
                  <img
                    src={currentImage}
                    alt={car.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = fallbackUnsplash;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-black/40" />

                  {/* Top Badges & Real Taxi Plate */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 shadow-md">
                        {idx === 0 ? 'Sedan #1 Pick' : '7-Seater MPV #1 Pick'}
                      </span>
                      {/* Authentic Karnataka Yellow Commercial Taxi Number Plate */}
                      <div className="inline-flex items-center rounded-md border-2 border-slate-950 bg-amber-400 px-2.5 py-0.5 shadow-md font-mono text-xs font-black tracking-wider text-slate-950">
                        <span className="text-[9px] text-blue-900 font-sans font-black mr-1.5 border-r border-slate-900/30 pr-1">IND</span>
                        <span>{plateNumber}</span>
                      </div>
                    </div>

                    {/* Quick Upload / Replace Vehicle Photo Button */}
                    <div>
                      <label
                        htmlFor={`upload-car-${car.id}`}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer border border-white/20 shadow-md hover:border-amber-400"
                        title="Upload or change vehicle photo"
                      >
                        <Camera className="w-3.5 h-3.5 text-amber-400" />
                        <span className="hidden sm:inline">Upload Photo</span>
                      </label>
                      <input
                        type="file"
                        id={`upload-car-${car.id}`}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(car.id, e.target.files?.[0])}
                      />
                    </div>
                  </div>

                  {/* Drop Overlay Hint */}
                  {isDragTarget && (
                    <div className="absolute inset-0 bg-amber-500/80 backdrop-blur-xs flex flex-col items-center justify-center text-slate-950 font-bold z-20">
                      <Upload className="w-10 h-10 mb-2 animate-bounce" />
                      <p className="text-sm">Drop your photo here to update {car.name}!</p>
                    </div>
                  )}

                  {/* Price Banner Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-amber-300 font-bold uppercase tracking-wider">{car.model}</p>
                        {isDzire ? (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/80 text-white font-medium">
                            Garland Ready
                          </span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/80 text-white font-medium">
                            Roof Carrier Equipped
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold font-serif">{car.name}</h3>
                    </div>
                    <div className="text-right bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20">
                      <div className="text-2xl sm:text-3xl font-black text-amber-400 font-serif">
                        ₹{liveRate}
                        <span className="text-xs font-normal text-slate-300">/km</span>
                      </div>
                      <span className="text-[10px] text-slate-300 block">
                        Driver: ₹{pricing.driverBataPerDay}-₹{pricing.driverBataMaxPerDay}/day
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                  {/* Quick Specs Pill Row */}
                  <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center text-xs text-slate-700">
                    <div className="flex flex-col items-center justify-center p-1">
                      <Users className="w-4 h-4 text-blue-900 mb-1" />
                      <span className="font-bold text-slate-900">{car.seats}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-1 border-x border-slate-200">
                      <Briefcase className="w-4 h-4 text-blue-900 mb-1" />
                      <span className="font-bold text-slate-900">{car.luggage}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-1">
                      <Wind className="w-4 h-4 text-blue-900 mb-1" />
                      <span className="font-bold text-slate-900">AC with Rear Vents</span>
                    </div>
                  </div>

                  {/* Description & Ideal For */}
                  <div className="space-y-2 text-sm text-slate-600">
                    <p className="leading-relaxed">{car.description}</p>
                    <div className="text-xs bg-blue-50 text-blue-900 p-2.5 rounded-xl font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                      <span>
                        <strong>Best For:</strong> {car.idealFor}
                      </span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Features Included:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                      {car.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={() => {
                        setSelectedCarId(car.id as 'swift-dzire' | 'suzuki-ertiga');
                        const calcCard = document.getElementById('fare-calculator-card');
                        calcCard?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      id={`car-calc-btn-${car.id}`}
                      className="flex-1 py-3 px-4 rounded-xl border border-blue-900 text-blue-900 hover:bg-blue-50 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <Calculator className="w-4 h-4" />
                      <span>Calculate Trip Fare</span>
                    </button>

                    <button
                      onClick={() => onSelectCarForBooking(car, liveRate * 300 + pricing.driverBataPerDay)}
                      id={`car-book-now-btn-${car.id}`}
                      className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-indigo-900 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition cursor-pointer"
                    >
                      <span>Book {car.name.split(' ').slice(-1)}</span>
                      <ChevronRight className="w-4 h-4 text-amber-400" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Live Fare Calculator Box */}
        <div
          id="fare-calculator-card"
          className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-slate-800 relative overflow-hidden"
        >
          {/* Header */}
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-400/20">
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              <span>Instant Transparent Price Estimator</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              Calculate Your Exact Trip Fare from Ranebennur
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Select your vehicle, choose a popular destination or enter custom km. No surprise charges, guaranteed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Calculator Controls (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Select Car */}
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                  1. Choose Vehicle:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedCarId('swift-dzire')}
                    id="calc-choose-dzire"
                    className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                      selectedCarId === 'swift-dzire'
                        ? 'bg-blue-900/40 border-amber-400 shadow-md ring-1 ring-amber-400/50'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-white">Swift Dzire</span>
                      <span className="text-xs font-extrabold text-amber-400">₹{pricing.swiftDzirePerKm}/km</span>
                    </div>
                    <span className="text-xs text-slate-400 block">Sedan • 4+1 Seater • AC</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedCarId('suzuki-ertiga')}
                    id="calc-choose-ertiga"
                    className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                      selectedCarId === 'suzuki-ertiga'
                        ? 'bg-blue-900/40 border-amber-400 shadow-md ring-1 ring-amber-400/50'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-white">Suzuki Ertiga</span>
                      <span className="text-xs font-extrabold text-amber-400">₹{pricing.ertigaPerKm}/km</span>
                    </div>
                    <span className="text-xs text-slate-400 block">MUV • 6+1 Seater • Dual AC</span>
                  </button>
                </div>
              </div>

              {/* Step 2: Route Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    2. Select Route or Custom Km:
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCustomRoute(!isCustomRoute)}
                    className="text-xs text-amber-400 hover:underline font-semibold cursor-pointer"
                  >
                    {isCustomRoute ? 'Switch to Popular Routes' : 'Enter Custom Distance (km)'}
                  </button>
                </div>

                {!isCustomRoute ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                    {POPULAR_ROUTES.map((route, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleRouteChange(idx)}
                        className={`p-3 rounded-xl border text-left text-xs transition cursor-pointer ${
                          selectedRouteIndex === idx
                            ? 'bg-amber-500/20 border-amber-400 text-white font-bold'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="truncate max-w-[170px] text-white font-medium">{route.to}</span>
                          <span className="text-amber-400 font-bold shrink-0">{route.roundTripKm} km</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block truncate">{route.days} Days • {route.description}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Total Estimated Distance (Round Trip / Drop):</span>
                        <strong className="text-amber-400 text-sm">{customDistance} km</strong>
                      </div>
                      <input
                        type="range"
                        min={100}
                        max={2000}
                        step={20}
                        value={customDistance}
                        onChange={(e) => setCustomDistance(Number(e.target.value))}
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Or type km:</span>
                      <input
                        type="number"
                        min={50}
                        max={5000}
                        value={customDistance}
                        onChange={(e) => setCustomDistance(Math.max(1, Number(e.target.value)))}
                        className="w-28 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/20 text-white text-sm font-bold focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3: Trip Days */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                    Trip Duration (Days):
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setTripDays(Math.max(1, tripDays - 1))}
                      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-lg flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 bg-slate-900 border border-white/20 rounded-xl text-white font-bold text-sm min-w-[70px] text-center">
                      {tripDays} {tripDays === 1 ? 'Day' : 'Days'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTripDays(tripDays + 1)}
                      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-lg flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                    Pickup Location:
                  </label>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 flex items-center gap-2 text-xs text-slate-300">
                    <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                    <span className="font-semibold text-white">Doorstep Ranebennur / Haveri</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Pricing Summary Box (5 Cols) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-blue-950 p-6 sm:p-7 rounded-3xl border border-white/15 shadow-xl space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
                  Trip Fare Breakdown
                </span>
                <h4 className="text-xl font-extrabold text-white mt-1 font-serif">{selectedCarName}</h4>
                <p className="text-xs text-slate-400">{routeName}</p>
              </div>

              {/* Line Items */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Distance:</span>
                  <span className="font-semibold text-white">{effectiveDistance} km</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Rate per km:</span>
                  <span className="font-semibold text-amber-400">₹{currentRatePerKm} / km</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Base Running Fare:</span>
                  <span className="font-semibold text-white">₹{baseKmCharge.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">
                    Driver Bata ({tripDays} {tripDays === 1 ? 'day' : 'days'} × ₹{driverBataPerDay}):
                  </span>
                  <span className="font-semibold text-white">₹{totalDriverBata.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">Estimated Total Fare:</span>
                  <div className="text-right">
                    <span className="text-3xl font-black text-amber-400 font-serif">
                      ₹{estimatedTotalFare.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-400 block">*Tolls &amp; Parking at actuals</span>
                  </div>
                </div>
              </div>

              {/* Booking Actions */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={`https://wa.me/91${pricing.ownerWhatsapp}?text=${whatsappInquiryMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="calc-whatsapp-book-btn"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Book on WhatsApp (7483089583)</span>
                </a>

                <button
                  onClick={() => {
                    const carObj = CAR_RENTALS.find((c) => c.id === selectedCarId)!;
                    onSelectCarForBooking(carObj, estimatedTotalFare);
                  }}
                  id="calc-online-book-btn"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                >
                  <Car className="w-4 h-4 text-slate-950" />
                  <span>Confirm Booking Online</span>
                </button>
              </div>

              {/* Security guarantee */}
              <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-2 border-t border-white/10">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero advance cancellation penalty • Pay during your trip</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
