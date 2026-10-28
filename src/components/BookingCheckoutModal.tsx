import { useState } from 'react';
import {
  X,
  CheckCircle2,
  Calendar,
  Users,
  MapPin,
  Car,
  Phone,
  MessageCircle,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';
import { BookingRequest, PricingSettings, TourPackage, CarRental } from '../types';

interface BookingCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingType: 'package' | 'cab';
  selectedPackage?: TourPackage | null;
  selectedCar?: CarRental | null;
  initialTravelers?: number;
  initialCabName?: string;
  initialFare?: number;
  pricing: PricingSettings;
  onBookingConfirmed: (req: BookingRequest) => void;
}

export default function BookingCheckoutModal({
  isOpen,
  onClose,
  bookingType,
  selectedPackage,
  selectedCar,
  initialTravelers = 2,
  initialCabName = 'Swift Dzire',
  initialFare = 0,
  pricing,
  onBookingConfirmed,
}: BookingCheckoutModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pickupCity, setPickupCity] = useState('Ranebennur, Karnataka');
  const [dropCity, setDropCity] = useState(
    selectedPackage?.destination || (bookingType === 'cab' ? 'Goa / Bengaluru' : '')
  );
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState(initialTravelers);
  const [selectedCabChoice, setSelectedCabChoice] = useState(initialCabName);
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRefId, setBookingRefId] = useState('');

  if (!isOpen) return null;

  // Calculate fare
  let estimatedTotal = initialFare;
  if (bookingType === 'package' && selectedPackage) {
    estimatedTotal = selectedPackage.price * travelers;
  } else if (bookingType === 'cab' && initialFare === 0) {
    const rate = selectedCabChoice.includes('Ertiga') ? pricing.ertigaPerKm : pricing.swiftDzirePerKm;
    estimatedTotal = 300 * rate + pricing.driverBataPerDay; // 1 day standard min
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const ref = 'PRT-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRefId(ref);

    const bookingPayload: BookingRequest = {
      id: ref,
      type: bookingType,
      packageId: selectedPackage?.id,
      carId: selectedCar?.id,
      packageName: selectedPackage?.title,
      carName: selectedCabChoice,
      pickupCity,
      dropCity,
      tripType: bookingType === 'package' ? 'tour-package' : 'round-trip',
      startDate,
      endDate: endDate || startDate,
      travelers,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      specialRequests: specialRequests.trim(),
      estimatedPrice: estimatedTotal,
      timestamp: new Date().toISOString(),
    };

    onBookingConfirmed(bookingPayload);
    setIsSuccess(true);
  };

  const formattedWhatsAppUrl = () => {
    const msg = encodeURIComponent(
      `*NEW BOOKING ENQUIRY - Pratham Tours & Travels*\n` +
        `Ref ID: ${bookingRefId}\n` +
        `Type: ${bookingType === 'package' ? 'Tour Package' : 'Cab Rental'}\n` +
        `Item: ${selectedPackage?.title || selectedCabChoice}\n` +
        `Guest Name: ${name}\n` +
        `Contact Phone: ${phone}\n` +
        `Pickup Location: ${pickupCity}\n` +
        `Destination: ${dropCity}\n` +
        `Travel Date: ${startDate} to ${endDate || 'TBD'}\n` +
        `Travelers: ${travelers} pax\n` +
        `Estimated Total: ₹${estimatedTotal.toLocaleString('en-IN')}\n` +
        (specialRequests ? `Special Note: ${specialRequests}\n` : '') +
        `Please confirm my reservation.`
    );
    return `https://wa.me/91${pricing.ownerWhatsapp}?text=${msg}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 relative my-6 animate-in zoom-in-95 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* Confirmation State */
          <div className="p-8 text-center space-y-5 my-auto">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
                Booking Request Received
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-serif mt-2">
                Thank You, {name}!
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                Your booking reference is <strong className="text-slate-900 font-mono text-sm">{bookingRefId}</strong>.
                Our owner will call you at <strong className="text-blue-900">{phone}</strong> shortly to confirm
                the cab and driver details.
              </p>
            </div>

            {/* Quick Summary Card */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-left space-y-2 max-w-sm mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <span className="font-bold text-slate-900">{selectedPackage?.title || selectedCabChoice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pickup:</span>
                <span className="font-semibold text-slate-900">{pickupCity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date:</span>
                <span className="font-semibold text-slate-900">{startDate}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm">
                <span>Estimated Fare:</span>
                <span className="text-amber-600 font-serif text-base">₹{estimatedTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Direct WhatsApp Confirmation Button */}
            <div className="space-y-2 max-w-sm mx-auto">
              <a
                href={formattedWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Booking Details to WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Done / Back to Website
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div className="overflow-y-auto p-6 sm:p-8">
            <div className="mb-6 border-b border-slate-100 pb-4">
              <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Pratham Tours &amp; Travels • Ranebennur
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-serif mt-1">
                {bookingType === 'package' ? 'Book Tour Package' : 'Reserve Swift Dzire / Ertiga'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Selected: <strong className="text-slate-900">{selectedPackage?.title || selectedCar?.name || initialCabName}</strong>
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Patil"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Mobile Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-900"
                  />
                </div>
              </div>

              {/* Pickup & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Pickup City / Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={pickupCity}
                    onChange={(e) => setPickupCity(e.target.value)}
                    placeholder="Ranebennur, Haveri, Hubli..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Destination / Drop Location
                  </label>
                  <input
                    type="text"
                    value={dropCity}
                    onChange={(e) => setDropCity(e.target.value)}
                    placeholder="e.g. Goa, Gokarna, Bengaluru"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-900"
                  />
                </div>
              </div>

              {/* Travel Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Travel Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Return Date (if round trip)
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-900"
                  />
                </div>
              </div>

              {/* Passengers & Car Choice */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Number of Travelers *
                  </label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-900 bg-white"
                  >
                    <option value={1}>1 Guest (Solo)</option>
                    <option value={2}>2 Guests (Couple)</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests (Dzire capacity)</option>
                    <option value={5}>5 Guests (Ertiga recommended)</option>
                    <option value={6}>6 Guests (Ertiga capacity)</option>
                    <option value={7}>7 Guests (Ertiga capacity)</option>
                    <option value={10}>8+ Guests (Group Tour)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Preferred Cab *
                  </label>
                  <select
                    value={selectedCabChoice}
                    onChange={(e) => setSelectedCabChoice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-900 bg-white"
                  >
                    <option value="Swift Dzire">Swift Dzire (Sedan ₹{pricing.swiftDzirePerKm}/km)</option>
                    <option value="Suzuki Ertiga">Suzuki Ertiga (7-Seater ₹{pricing.ertigaPerKm}/km)</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Special Notes / Temple Darshan timings (Optional)
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Need early morning 4 AM pickup, senior citizen in family, extra luggage..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-900"
                />
              </div>

              {/* Fare Summary Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Selected Option:</span>
                  <span className="font-bold text-slate-900">{selectedPackage?.title || selectedCabChoice}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Vehicle Rate / Day:</span>
                  <span className="font-semibold text-blue-900">
                    {selectedCabChoice.includes('Ertiga')
                      ? `Ertiga ₹${pricing.ertigaPerKm}/km + ₹${pricing.driverBataPerDay} Bata`
                      : `Dzire ₹${pricing.swiftDzirePerKm}/km + ₹${pricing.driverBataPerDay} Bata`}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-bold text-sm">
                  <span className="text-slate-900">Estimated Total:</span>
                  <span className="text-amber-600 text-lg font-black font-serif">
                    ₹{estimatedTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Submit & Guarantee */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  id="checkout-submit-booking-btn"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-indigo-900 text-white font-bold text-sm shadow-md transition cursor-pointer"
                >
                  Confirm Booking (No Advance Needed to Inquire)
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>24/7 Helpline Support: 7483089583 • Karnataka Ranebennur</span>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
