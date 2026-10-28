import { useState } from 'react';
import {
  SlidersHorizontal,
  X,
  Save,
  RotateCcw,
  Check,
  Car,
  Phone,
  MapPin,
  Camera,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';
import { PricingSettings } from '../types';
import { DEFAULT_PRICING_SETTINGS } from '../data/travelData';

interface OwnerPriceEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  pricing: PricingSettings;
  onSavePricing: (newPricing: PricingSettings) => void;
}

export default function OwnerPriceEditorModal({
  isOpen,
  onClose,
  pricing,
  onSavePricing,
}: OwnerPriceEditorModalProps) {
  const [formData, setFormData] = useState<PricingSettings>({ ...pricing });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSavePricing(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleResetDefaults = () => {
    setFormData({ ...DEFAULT_PRICING_SETTINGS });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 border-b border-slate-100 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Owner Control Panel • Pratham Tours &amp; Travels</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 font-serif">Edit Vehicle Rates &amp; Details</h3>
          <p className="text-xs text-slate-500 mt-1">
            Update your cab rates per km, driver allowance, and contact info. Changes immediately reflect across the whole
            website and fare calculators.
          </p>
        </div>

        {savedSuccess ? (
          <div className="py-12 text-center space-y-2">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Rates Saved Successfully!</h4>
            <p className="text-xs text-slate-600">
              Swift Dzire: ₹{formData.swiftDzirePerKm}/km | Ertiga: ₹{formData.ertigaPerKm}/km | Driver: ₹
              {formData.driverBataPerDay}/day.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Rates Card Group */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Car className="w-4 h-4 text-blue-900" />
                <span>1. Cab Rental Per Km Rates (₹/km)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Swift Dzire Rate */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Swift Dzire Rate (₹/km) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                    <input
                      type="number"
                      step="0.5"
                      min="8"
                      max="30"
                      required
                      value={formData.swiftDzirePerKm}
                      onChange={(e) =>
                        setFormData({ ...formData, swiftDzirePerKm: parseFloat(e.target.value) || 0 })
                      }
                      id="owner-edit-dzire-rate"
                      className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 bg-white focus:outline-none focus:border-blue-900"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">Standard requested: ₹11/km</span>
                </div>

                {/* Suzuki Ertiga Rate */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Suzuki Ertiga Rate (₹/km) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                    <input
                      type="number"
                      step="0.5"
                      min="10"
                      max="40"
                      required
                      value={formData.ertigaPerKm}
                      onChange={(e) => setFormData({ ...formData, ertigaPerKm: parseFloat(e.target.value) || 0 })}
                      id="owner-edit-ertiga-rate"
                      className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 bg-white focus:outline-none focus:border-blue-900"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">Standard requested: ₹14/km</span>
                </div>
              </div>

              {/* Driver Bata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Driver Bata / Rent per Day (₹) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                    <input
                      type="number"
                      step="50"
                      min="300"
                      max="1500"
                      required
                      value={formData.driverBataPerDay}
                      onChange={(e) =>
                        setFormData({ ...formData, driverBataPerDay: parseInt(e.target.value) || 0 })
                      }
                      id="owner-edit-driver-bata"
                      className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 bg-white focus:outline-none focus:border-blue-900"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">Requested range: ₹400 - ₹500/day</span>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Minimum Outstation Km / Day
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="50"
                      min="200"
                      max="500"
                      required
                      value={formData.minKmPerDay}
                      onChange={(e) => setFormData({ ...formData, minKmPerDay: parseInt(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 bg-white focus:outline-none focus:border-blue-900"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">km/day</span>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">Karnataka standard: 300 km/day</span>
                </div>
              </div>
            </div>

            {/* Owner Contact Information */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>2. Owner Contact &amp; Booking Numbers</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Calling Phone Number</label>
                  <input
                    type="text"
                    required
                    value={formData.ownerPhone}
                    onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:border-blue-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    required
                    value={formData.ownerWhatsapp}
                    onChange={(e) => setFormData({ ...formData, ownerWhatsapp: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:border-blue-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-500" /> Agency Office Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.agencyAddress}
                  onChange={(e) => setFormData({ ...formData, agencyAddress: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 bg-white focus:outline-none focus:border-blue-900"
                />
              </div>
            </div>

            {/* Vehicle Photos & Commercial Number Plates */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-blue-900" />
                <span>3. Vehicle Real Fleet Photos &amp; Registration Plates</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Swift Dzire Settings */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Swift Dzire (Sedan)</span>
                    <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-mono text-[10px] font-black border border-amber-500">
                      {formData.swiftDzirePlate || 'KA 68 8031'}
                    </span>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Taxi Number Plate
                    </label>
                    <input
                      type="text"
                      value={formData.swiftDzirePlate || 'KA 68 8031'}
                      onChange={(e) => setFormData({ ...formData, swiftDzirePlate: e.target.value })}
                      placeholder="e.g. KA 68 8031"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-mono font-bold bg-white text-slate-900"
                    />
                  </div>

                  {/* Thumbnail & Upload */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-600 block">Vehicle Photo</label>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                        <img
                          src={formData.swiftDzireImage || '/dzire.jpeg'}
                          alt="Swift Dzire"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=300&q=80';
                          }}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="owner-upload-dzire-photo"
                          className="px-3 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-[11px] font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Upload className="w-3 h-3" />
                          <span>Upload dzire.jpeg</span>
                        </label>
                        <input
                          type="file"
                          id="owner-upload-dzire-photo"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const r = new FileReader();
                              r.onload = (ev) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  swiftDzireImage: ev.target?.result as string,
                                }));
                              r.readAsDataURL(file);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Suzuki Ertiga Settings */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Suzuki Ertiga (7-Seater)</span>
                    <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-mono text-[10px] font-black border border-amber-500">
                      {formData.ertigaPlate || 'KA 68 2299'}
                    </span>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Taxi Number Plate
                    </label>
                    <input
                      type="text"
                      value={formData.ertigaPlate || 'KA 68 2299'}
                      onChange={(e) => setFormData({ ...formData, ertigaPlate: e.target.value })}
                      placeholder="e.g. KA 68 2299"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-mono font-bold bg-white text-slate-900"
                    />
                  </div>

                  {/* Thumbnail & Upload */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-600 block">Vehicle Photo</label>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                        <img
                          src={formData.ertigaImage || '/ertiga.jpeg'}
                          alt="Suzuki Ertiga"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=300&q=80';
                          }}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="owner-upload-ertiga-photo"
                          className="px-3 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-[11px] font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Upload className="w-3 h-3" />
                          <span>Upload ertiga.jpeg</span>
                        </label>
                        <input
                          type="file"
                          id="owner-upload-ertiga-photo"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const r = new FileReader();
                              r.onload = (ev) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  ertigaImage: ev.target?.result as string,
                                }));
                              r.readAsDataURL(file);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleResetDefaults}
                className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                title="Reset to default requested ₹11/km and ₹14/km"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Default Rates</span>
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="owner-save-rates-btn"
                  className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Rates</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
