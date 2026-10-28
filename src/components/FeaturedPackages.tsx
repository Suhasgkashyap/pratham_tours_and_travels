import { useState, useMemo } from 'react';
import {
  Compass,
  Star,
  Clock,
  MapPin,
  Heart,
  ChevronRight,
  Filter,
  Search,
  Sparkles,
  ArrowUpDown,
} from 'lucide-react';
import { TourPackage, TripCategory } from '../types';

interface FeaturedPackagesProps {
  packages: TourPackage[];
  wishlist: string[];
  toggleWishlist: (packageId: string) => void;
  onSelectPackage: (pkg: TourPackage) => void;
  onBookPackage: (pkg: TourPackage) => void;
  initialCategory?: TripCategory;
  initialSearchQuery?: string;
}

export default function FeaturedPackages({
  packages,
  wishlist,
  toggleWishlist,
  onSelectPackage,
  onBookPackage,
  initialCategory = 'All',
  initialSearchQuery = '',
}: FeaturedPackagesProps) {
  const [selectedCategory, setSelectedCategory] = useState<TripCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [maxBudget, setMaxBudget] = useState<number>(40000);
  const [durationFilter, setDurationFilter] = useState<'all' | 'short' | 'medium' | 'long'>('all');
  const [regionFilter, setRegionFilter] = useState<'all' | 'Karnataka' | 'South India' | 'North India' | 'International'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories: TripCategory[] = [
    'All',
    'Pilgrimage & Heritage',
    'Beach Vacations',
    'Honeymoon',
    'Family Holidays',
    'Weekend Getaways',
    'Luxury Travel',
  ];

  const filteredPackages = useMemo(() => {
    return packages
      .filter((pkg) => {
        // Category
        if (selectedCategory !== 'All' && pkg.category !== selectedCategory) return false;
        // Region
        if (regionFilter !== 'all' && pkg.region !== regionFilter) return false;
        // Budget
        if (pkg.price > maxBudget) return false;
        // Duration
        if (durationFilter === 'short' && pkg.durationDays > 3) return false;
        if (durationFilter === 'medium' && (pkg.durationDays < 4 || pkg.durationDays > 5)) return false;
        if (durationFilter === 'long' && pkg.durationDays < 6) return false;
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = pkg.title.toLowerCase().includes(q);
          const matchDest = pkg.destination.toLowerCase().includes(q);
          const matchDesc = pkg.description.toLowerCase().includes(q);
          if (!matchTitle && !matchDest && !matchDesc) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [packages, selectedCategory, regionFilter, maxBudget, durationFilter, searchQuery, sortBy]);

  return (
    <section id="packages-section" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Handcrafted Holiday Itineraries</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
              Popular Tour Packages
            </h2>
            <p className="text-base text-slate-600 mt-2 max-w-2xl">
              All inclusive holiday packages with private sanitized cab, handpicked resorts, authentic local meals,
              and doorstep pickup from Ranebennur, Haveri, and across Karnataka.
            </p>
          </div>

          {/* Quick Search and Sort */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destination, temple..."
                className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-none focus:border-blue-900 bg-slate-50"
              />
            </div>

            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-slate-100 text-slate-800 rounded-xl border border-slate-200"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filter ({filteredPackages.length})</span>
            </button>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`cat-pill-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-900 text-white shadow-md shadow-blue-950/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Filters Bar */}
        <div
          className={`bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center ${
            showMobileFilters ? 'block' : 'hidden lg:grid'
          }`}
        >
          {/* Region */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Destination Region
            </label>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value as any)}
              className="w-full bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 p-2 focus:outline-none"
            >
              <option value="all">All Regions</option>
              <option value="Karnataka">Karnataka Specials (Hampi, Coorg, Gokarna)</option>
              <option value="South India">South India (Goa, Mysore, Kerala)</option>
              <option value="North India">North India (Kashmir, Himachal)</option>
              <option value="International">International (Dubai)</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Duration
            </label>
            <select
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value as any)}
              className="w-full bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 p-2 focus:outline-none"
            >
              <option value="all">Any Duration</option>
              <option value="short">Short Getaway (2 - 3 Days)</option>
              <option value="medium">Classic Holiday (4 - 5 Days)</option>
              <option value="long">Extended Journey (6+ Days)</option>
            </select>
          </div>

          {/* Budget Slider */}
          <div>
            <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              <span>Max Budget:</span>
              <span className="text-blue-900 font-extrabold text-xs">₹{maxBudget.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={5000}
              max={50000}
              step={2000}
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-blue-900 cursor-pointer"
            />
          </div>

          {/* Sort By */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 p-2 focus:outline-none"
            >
              <option value="featured">Featured / Best Seller</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated (4.9+ ★)</option>
            </select>
          </div>
        </div>

        {/* Packages Grid */}
        {filteredPackages.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
            <Compass className="w-12 h-12 text-slate-400 mx-auto mb-3 animate-spin" />
            <h3 className="text-lg font-bold text-slate-800">No tour packages match your filters</h3>
            <p className="text-sm text-slate-500 mt-1">Try resetting the filters or searching for another destination.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setRegionFilter('all');
                setMaxBudget(40000);
                setDurationFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => {
              const isWishlisted = wishlist.includes(pkg.id);
              const discountPercent = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);

              return (
                <div
                  key={pkg.id}
                  id={`package-card-${pkg.id}`}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Image Container */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md text-slate-900 shadow-sm">
                        {pkg.category}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(pkg.id);
                        }}
                        id={`wishlist-btn-${pkg.id}`}
                        className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition cursor-pointer shadow-md ${
                          isWishlisted ? 'bg-rose-600 text-white' : 'bg-black/40 text-white hover:bg-rose-500'
                        }`}
                        title="Save to favorites"
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
                      </button>
                    </div>

                    {/* Bottom Image Overlay Tags */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                      <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-semibold">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-500 text-slate-950 font-bold px-2.5 py-1 rounded-lg">
                        <Star className="w-3.5 h-3.5 fill-slate-950" />
                        <span>{pkg.rating}</span>
                        <span className="text-[10px] text-slate-800">({pkg.reviewsCount})</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="truncate">{pkg.destination}</span>
                      </div>
                      <h3
                        onClick={() => onSelectPackage(pkg)}
                        className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors cursor-pointer line-clamp-1 font-serif"
                      >
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{pkg.description}</p>
                    </div>

                    {/* Highlights pill tags */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Trip Highlights:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {pkg.highlights.slice(0, 2).map((hl, i) => (
                          <span
                            key={i}
                            className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium truncate max-w-full"
                          >
                            • {hl}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price and CTA Row */}
                    <div className="pt-4 border-t border-slate-100 flex items-end justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Starting From</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-black text-slate-900 font-serif">
                            ₹{pkg.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-slate-400 line-through">
                            ₹{pkg.originalPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-sm">
                          Save {discountPercent}% • Inc. Cab &amp; Stay
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => onSelectPackage(pkg)}
                          id={`view-details-${pkg.id}`}
                          className="px-3 py-2 rounded-xl text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 transition cursor-pointer"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => onBookPackage(pkg)}
                          id={`book-pkg-${pkg.id}`}
                          className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-indigo-900 transition shadow-xs cursor-pointer flex items-center gap-1"
                        >
                          <span>Book</span>
                          <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
