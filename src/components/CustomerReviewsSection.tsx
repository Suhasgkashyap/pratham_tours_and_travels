import { useState } from 'react';
import { Star, MessageSquarePlus, ShieldCheck, CheckCircle2, User, MapPin, X, ThumbsUp } from 'lucide-react';
import { Review } from '../types';

interface CustomerReviewsSectionProps {
  reviews: Review[];
  onAddReview: (newReview: Omit<Review, 'id' | 'date' | 'verified' | 'userSubmitted'>) => void;
  openPriceEditor: () => void;
}

export default function CustomerReviewsSection({
  reviews,
  onAddReview,
  openPriceEditor,
}: CustomerReviewsSectionProps) {
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New review form state
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('Ranebennur, Karnataka');
  const [rating, setRating] = useState(5);
  const [serviceUsed, setServiceUsed] = useState('Suzuki Ertiga (7-Seater) - Temple Trip');
  const [comment, setComment] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const filteredReviews = reviews.filter((r) => {
    if (filterRating === 'all') return true;
    return r.rating === filterRating;
  });

  const averageRating = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    onAddReview({
      author: author.trim(),
      city: city.trim() || 'Karnataka',
      rating,
      serviceUsed,
      comment: comment.trim(),
    });

    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowAddModal(false);
      setAuthor('');
      setComment('');
    }, 1500);
  };

  return (
    <section id="reviews-section" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Verified Guest Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
              What Our Travelers Say
            </h2>
            <p className="text-base text-slate-600 mt-2 max-w-2xl">
              Real reviews from families, couples, and pilgrims who travelled in our Swift Dzire and Suzuki Ertiga
              from Ranebennur and nearby cities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Average Rating Badge */}
            <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 font-black text-xl flex items-center justify-center font-serif">
                {averageRating}
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-slate-500 font-semibold block mt-0.5">
                  Based on {reviews.length} reviews
                </span>
              </div>
            </div>

            {/* Write a review button */}
            <button
              onClick={() => setShowAddModal(true)}
              id="open-add-review-modal-btn"
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-indigo-900 text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 text-amber-400" />
              <span>Write a Customer Review</span>
            </button>
          </div>
        </div>

        {/* Rating Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          <span className="text-xs font-bold text-slate-500 mr-1">Filter:</span>
          <button
            onClick={() => setFilterRating('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filterRating === 'all' ? 'bg-blue-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border'
            }`}
          >
            All Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setFilterRating(5)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
              filterRating === 5 ? 'bg-blue-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border'
            }`}
          >
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>5 Stars</span>
          </button>
          <button
            onClick={() => setFilterRating(4)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
              filterRating === 4 ? 'bg-blue-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border'
            }`}
          >
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>4 Stars</span>
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Traveler</span>
                  </span>
                </div>

                {/* Service Tag */}
                <div className="bg-slate-50 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-100 truncate">
                  🚗 {rev.serviceUsed}
                </div>

                {/* Review Text */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Author & City */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center">
                    {rev.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{rev.author}</h4>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" /> {rev.city}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Review Modal Dialog */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>Share Your Experience</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-serif">Write a Review</h3>
              <p className="text-xs text-slate-500 mt-1">
                Help other travelers from Karnataka know about your trip with Pratham Tours and Travels.
              </p>
            </div>

            {submitSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="text-lg font-bold text-slate-900">Thank You!</h4>
                <p className="text-xs text-slate-600">Your review has been published on the website.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Anand Patil"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-blue-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Your Town / City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Ranebennur, Haveri"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-blue-900"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Star Rating *</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-blue-900 bg-white"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 Stars - Excellent)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 Stars - Very Good)</option>
                      <option value={3}>⭐⭐⭐ (3 Stars - Average)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Service / Vehicle Used *</label>
                  <select
                    value={serviceUsed}
                    onChange={(e) => setServiceUsed(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-blue-900 bg-white"
                  >
                    <option value="Swift Dzire - Outstation Trip">Swift Dzire (Sedan ₹11/km) - Outstation Trip</option>
                    <option value="Suzuki Ertiga - Family Temple Tour">Suzuki Ertiga (7-Seater ₹14/km) - Temple Tour</option>
                    <option value="Swift Dzire - Airport Drop (Hubli/BLR)">Swift Dzire - Airport Drop</option>
                    <option value="Hampi & Badami Heritage Package">Hampi &amp; Badami Heritage Tour Package</option>
                    <option value="Gokarna & Murudeshwar Beach Tour">Gokarna &amp; Murudeshwar Beach Tour</option>
                    <option value="Coorg & Wayanad Honeymoon Trip">Coorg &amp; Wayanad Honeymoon Trip</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Review / Comments *</label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share how your driver was, car cleanliness, punctuality, and pricing..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-900"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    id="submit-new-review-btn"
                    className="flex-1 py-3 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-md cursor-pointer"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
