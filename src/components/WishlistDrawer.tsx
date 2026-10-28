import { X, Trash2, ChevronRight, Heart, Compass } from 'lucide-react';
import { TourPackage } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  allPackages: TourPackage[];
  onRemoveFromWishlist: (id: string) => void;
  onSelectPackage: (pkg: TourPackage) => void;
  onBookPackage: (pkg: TourPackage) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistIds,
  allPackages,
  onRemoveFromWishlist,
  onSelectPackage,
  onBookPackage,
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  const savedPackages = allPackages.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-rose-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">Saved Tour Packages</h3>
              <span className="text-xs text-slate-500">{savedPackages.length} packages in your wishlist</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Saved Items */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {savedPackages.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h4 className="text-base font-bold text-slate-800">Your wishlist is empty</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Click the heart icon on any tour package card to save it for later review or booking.
              </p>
            </div>
          ) : (
            savedPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="p-4 rounded-2xl border border-slate-200 hover:border-blue-900/30 transition flex gap-3 group relative bg-white shadow-2xs"
              >
                <img src={pkg.image} alt={pkg.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">
                    {pkg.category}
                  </span>
                  <h4
                    onClick={() => {
                      onSelectPackage(pkg);
                      onClose();
                    }}
                    className="text-xs font-bold text-slate-900 truncate hover:text-blue-900 cursor-pointer"
                  >
                    {pkg.title}
                  </h4>
                  <div className="text-xs font-black text-slate-900 font-serif">
                    ₹{pkg.price.toLocaleString('en-IN')}
                    <span className="text-[10px] font-normal text-slate-500"> / person</span>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => {
                        onBookPackage(pkg);
                        onClose();
                      }}
                      className="px-2.5 py-1 bg-blue-900 text-white rounded-lg text-[10px] font-bold hover:bg-blue-800 transition cursor-pointer flex items-center gap-1"
                    >
                      <span>Book Now</span>
                      <ChevronRight className="w-3 h-3 text-amber-400" />
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(pkg.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50">
          <button
            onClick={onClose}
            className="w-full py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}
