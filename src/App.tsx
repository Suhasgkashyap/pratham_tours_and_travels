import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TravelCategories from './components/TravelCategories';
import FeaturedPackages from './components/FeaturedPackages';
import CarRentalSection from './components/CarRentalSection';
import SpecialOffersBanner from './components/SpecialOffersBanner';
import WhyChooseUs from './components/WhyChooseUs';
import CustomerReviewsSection from './components/CustomerReviewsSection';
import BlogSection from './components/BlogSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

// Modals and Views
import PackageDetailsModal from './components/PackageDetailsModal';
import BookingCheckoutModal from './components/BookingCheckoutModal';
import OwnerPriceEditorModal from './components/OwnerPriceEditorModal';
import WishlistDrawer from './components/WishlistDrawer';
import DestinationsView from './components/DestinationsView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import FAQView from './components/FAQView';

import {
  TOUR_PACKAGES,
  CAR_RENTALS,
  DESTINATIONS,
  BLOG_POSTS,
  CUSTOMER_REVIEWS,
  DEFAULT_PRICING_SETTINGS,
} from './data/travelData';
import { TourPackage, CarRental, PricingSettings, Review, BookingRequest } from './types';
import { MessageCircle, Phone, Heart, Check, Car } from 'lucide-react';

const LOCAL_STORAGE_PRICING = 'pratham_tours_pricing_v1';
const LOCAL_STORAGE_REVIEWS = 'pratham_tours_reviews_v1';
const LOCAL_STORAGE_WISHLIST = 'pratham_tours_wishlist_v1';

export default function App() {
  // Navigation tab state
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Search filter query from Hero
  const [searchFilter, setSearchFilter] = useState<{
    destination: string;
    tripType: string;
    travelers: number;
    travelDate: string;
  }>({
    destination: '',
    tripType: 'All',
    travelers: 2,
    travelDate: '',
  });

  // Dynamic Pricing state (Owner can edit ₹11/km Dzire, ₹14/km Ertiga, driver ₹400-500)
  const [pricing, setPricing] = useState<PricingSettings>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PRICING);
      return saved ? { ...DEFAULT_PRICING_SETTINGS, ...JSON.parse(saved) } : DEFAULT_PRICING_SETTINGS;
    } catch {
      return DEFAULT_PRICING_SETTINGS;
    }
  });

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_REVIEWS);
      return saved ? JSON.parse(saved) : CUSTOMER_REVIEWS;
    } catch {
      return CUSTOMER_REVIEWS;
    }
  });

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_WISHLIST);
      return saved ? JSON.parse(saved) : ['pkg-1', 'pkg-3'];
    } catch {
      return ['pkg-1', 'pkg-3'];
    }
  });

  // Active Modals state
  const [selectedPackageForModal, setSelectedPackageForModal] = useState<TourPackage | null>(null);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);

  const [checkoutModalData, setCheckoutModalData] = useState<{
    isOpen: boolean;
    bookingType: 'package' | 'cab';
    selectedPackage?: TourPackage | null;
    selectedCar?: CarRental | null;
    initialTravelers?: number;
    initialCabName?: string;
    initialFare?: number;
  }>({
    isOpen: false,
    bookingType: 'cab',
  });

  const [isPriceEditorOpen, setIsPriceEditorOpen] = useState(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save changes to localStorage
  const handleSavePricing = (newPricing: PricingSettings) => {
    setPricing(newPricing);
    localStorage.setItem(LOCAL_STORAGE_PRICING, JSON.stringify(newPricing));
    showToast(`Rates updated: Swift Dzire ₹${newPricing.swiftDzirePerKm}/km, Ertiga ₹${newPricing.ertigaPerKm}/km`);
  };

  const handleAddReview = (newReviewData: Omit<Review, 'id' | 'date' | 'verified' | 'userSubmitted'>) => {
    const newRev: Review = {
      ...newReviewData,
      id: 'rev-user-' + Date.now(),
      date: 'Just now',
      verified: true,
      userSubmitted: true,
    };
    const updated = [newRev, ...reviews];
    setReviews(updated);
    localStorage.setItem(LOCAL_STORAGE_REVIEWS, JSON.stringify(updated));
    showToast('Your review was successfully submitted and published!');
  };

  const handleToggleWishlist = (id: string) => {
    setWishlistIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem(LOCAL_STORAGE_WISHLIST, JSON.stringify(next));
      showToast(prev.includes(id) ? 'Removed from Wishlist' : 'Saved to Wishlist');
      return next;
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Trigger package detail modal
  const handleOpenPackageDetails = (pkg: TourPackage) => {
    setSelectedPackageForModal(pkg);
    setIsPackageModalOpen(true);
  };

  // Trigger package booking checkout
  const handleBookPackage = (pkg: TourPackage, travelers: number = 2, cabName: string = 'Swift Dzire') => {
    setIsPackageModalOpen(false);
    setCheckoutModalData({
      isOpen: true,
      bookingType: 'package',
      selectedPackage: pkg,
      initialTravelers: travelers,
      initialCabName: cabName,
      initialFare: pkg.price * travelers,
    });
  };

  // Trigger cab booking checkout
  const handleBookCab = (car: CarRental, initialFare?: number) => {
    setCheckoutModalData({
      isOpen: true,
      bookingType: 'cab',
      selectedCar: car,
      initialCabName: car.name,
      initialFare: initialFare || (car.name.includes('Ertiga') ? 300 * pricing.ertigaPerKm + pricing.driverBataPerDay : 300 * pricing.swiftDzirePerKm + pricing.driverBataPerDay),
    });
  };

  // Handle search from hero
  const handleSearchTrips = (criteria: {
    destination: string;
    travelDates: string;
    travelers: number;
    tripType: string;
  }) => {
    setSearchFilter({
      destination: criteria.destination,
      tripType: criteria.tripType,
      travelers: criteria.travelers,
      travelDate: criteria.travelDates,
    });

    if (currentTab !== 'packages' && currentTab !== 'home') {
      setCurrentTab('packages');
    }

    // Scroll smoothly to package section
    const elem = document.getElementById('featured-packages-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter destination from Category click
  const handleSelectCategory = (catName: string) => {
    setSearchFilter((prev) => ({
      ...prev,
      tripType: catName === 'All Tours' ? 'All' : catName,
    }));
    setCurrentTab('packages');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDestination = (destName: string) => {
    setSearchFilter((prev) => ({
      ...prev,
      destination: destName,
    }));
    setCurrentTab('packages');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappDirectUrl = `https://wa.me/91${pricing.ownerWhatsapp}?text=${encodeURIComponent(
    'Hello Pratham Tours Ranebennur, I need assistance booking a tour / cab.'
  )}`;

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 right-5 sm:bottom-6 sm:right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-4">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        wishlistCount={wishlistIds.length}
        openWishlist={() => setIsWishlistDrawerOpen(true)}
        openBookingModal={() => setCheckoutModalData({ isOpen: true, bookingType: 'cab' })}
        openPriceEditor={() => setIsPriceEditorOpen(true)}
        pricing={pricing}
      />

      {/* Main Content Render based on Current Tab */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <>
            {/* 1. Hero Section + Live Search Bar */}
            <HeroSection
              onSearch={(params) => {
                setSearchFilter({
                  destination: params.destination,
                  tripType: params.tripType,
                  travelers: params.travelers,
                  travelDate: params.travelDate,
                });
                const elem = document.getElementById('featured-packages-section');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              onExplorePackages={() => {
                setCurrentTab('packages');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBookCab={() => {
                const elem = document.getElementById('car-rental-calculator');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                else setCurrentTab('cabs');
              }}
              pricing={pricing}
            />

            {/* 2. Swift Dzire & Suzuki Ertiga Showcase + Live Fare Calculator */}
            <CarRentalSection
              pricing={pricing}
              onSelectCarForBooking={handleBookCab}
              openPriceEditor={() => setIsPriceEditorOpen(true)}
              onUpdatePricing={handleSavePricing}
            />

            {/* 3. Travel Categories */}
            <TravelCategories onSelectCategory={handleSelectCategory} />

            {/* 4. Featured Tour Packages */}
            <FeaturedPackages
              packages={TOUR_PACKAGES}
              wishlist={wishlistIds}
              toggleWishlist={handleToggleWishlist}
              onSelectPackage={handleOpenPackageDetails}
              onBookPackage={(pkg) => handleBookPackage(pkg, 2)}
              initialSearchQuery={searchFilter.destination}
            />

            {/* 5. Special Promotional Deals Banner */}
            <SpecialOffersBanner
              onExploreDeals={() => {
                setCurrentTab('packages');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              pricing={pricing}
            />

            {/* 6. Why Choose Us (Trust & Chauffeur safety) */}
            <WhyChooseUs pricing={pricing} />

            {/* 7. Verified Customer Reviews & Add Review Modal */}
            <CustomerReviewsSection
              reviews={reviews}
              onAddReview={handleAddReview}
              openPriceEditor={() => setIsPriceEditorOpen(true)}
            />

            {/* 8. Travel Inspiration & Blog Guides */}
            <BlogSection blogs={BLOG_POSTS} />

            {/* 9. Newsletter Signup */}
            <NewsletterSection />
          </>
        )}

        {/* Tab: Dedicated Tour Packages Page */}
        {currentTab === 'packages' && (
          <div className="py-8">
            <FeaturedPackages
              packages={TOUR_PACKAGES}
              wishlist={wishlistIds}
              toggleWishlist={handleToggleWishlist}
              onSelectPackage={handleOpenPackageDetails}
              onBookPackage={(pkg) => handleBookPackage(pkg, 2)}
              initialSearchQuery={searchFilter.destination}
            />
          </div>
        )}

        {/* Tab: Swift Dzire & Ertiga Cabs Page */}
        {currentTab === 'cabs' && (
          <div className="py-8">
            <CarRentalSection
              pricing={pricing}
              onSelectCarForBooking={handleBookCab}
              openPriceEditor={() => setIsPriceEditorOpen(true)}
              onUpdatePricing={handleSavePricing}
            />
          </div>
        )}

        {/* Tab: Destinations Guide */}
        {currentTab === 'destinations' && (
          <DestinationsView
            destinations={DESTINATIONS}
            onSelectDestination={handleSelectDestination}
          />
        )}

        {/* Tab: Customer Reviews & Ratings */}
        {currentTab === 'reviews' && (
          <div className="py-8">
            <CustomerReviewsSection
              reviews={reviews}
              onAddReview={handleAddReview}
              openPriceEditor={() => setIsPriceEditorOpen(true)}
            />
          </div>
        )}

        {/* Tab: About Us */}
        {currentTab === 'about' && (
          <AboutView
            pricing={pricing}
            onBookCab={() => {
              setCurrentTab('cabs');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Tab: Travel Blog */}
        {currentTab === 'blog' && (
          <div className="py-8">
            <BlogSection blogs={BLOG_POSTS} />
          </div>
        )}

        {/* Tab: Booking FAQ */}
        {currentTab === 'faq' && <FAQView pricing={pricing} />}

        {/* Tab: Contact & Location */}
        {currentTab === 'contact' && <ContactView pricing={pricing} />}
      </main>

      {/* Floating Action Buttons for Easy Contact (Mobile & Desktop) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {/* Wishlist quick bubble if items exist */}
        {wishlistIds.length > 0 && (
          <button
            onClick={() => setIsWishlistDrawerOpen(true)}
            className="w-12 h-12 rounded-full bg-white text-rose-600 border border-rose-200 shadow-xl flex items-center justify-center hover:scale-105 transition cursor-pointer relative"
            title="View Wishlist"
          >
            <Heart className="w-5 h-5 fill-rose-600" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white rounded-full text-[10px] font-black flex items-center justify-center">
              {wishlistIds.length}
            </span>
          </button>
        )}

        {/* Direct Call Button */}
        <a
          href={`tel:${pricing.ownerPhone}`}
          className="w-12 h-12 rounded-full bg-blue-900 text-white shadow-xl flex items-center justify-center hover:bg-blue-800 hover:scale-105 transition cursor-pointer"
          title={`Call ${pricing.ownerPhone}`}
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* WhatsApp Direct Chat Button */}
        <a
          href={whatsappDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl flex items-center gap-2 font-bold text-xs sm:text-sm hover:scale-105 transition cursor-pointer group"
          title="Chat with Owner on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">WhatsApp Booking</span>
        </a>
      </div>

      {/* Modal: Detailed Tour Package View */}
      <PackageDetailsModal
        packageData={selectedPackageForModal}
        isOpen={isPackageModalOpen}
        onClose={() => setIsPackageModalOpen(false)}
        onBook={handleBookPackage}
        isWishlisted={selectedPackageForModal ? wishlistIds.includes(selectedPackageForModal.id) : false}
        onToggleWishlist={handleToggleWishlist}
        pricing={pricing}
      />

      {/* Modal: Booking & Checkout Flow */}
      <BookingCheckoutModal
        isOpen={checkoutModalData.isOpen}
        onClose={() => setCheckoutModalData((prev) => ({ ...prev, isOpen: false }))}
        bookingType={checkoutModalData.bookingType}
        selectedPackage={checkoutModalData.selectedPackage}
        selectedCar={checkoutModalData.selectedCar}
        initialTravelers={checkoutModalData.initialTravelers}
        initialCabName={checkoutModalData.initialCabName}
        initialFare={checkoutModalData.initialFare}
        pricing={pricing}
        onBookingConfirmed={(req: BookingRequest) => {
          showToast(`Booking ${req.id} confirmed! We will contact you at ${req.phone}.`);
        }}
      />

      {/* Modal: Owner Price & Rate Editor */}
      <OwnerPriceEditorModal
        isOpen={isPriceEditorOpen}
        onClose={() => setIsPriceEditorOpen(false)}
        pricing={pricing}
        onSavePricing={handleSavePricing}
      />

      {/* Drawer: Wishlist / Saved Trips */}
      <WishlistDrawer
        isOpen={isWishlistDrawerOpen}
        onClose={() => setIsWishlistDrawerOpen(false)}
        wishlistIds={wishlistIds}
        allPackages={TOUR_PACKAGES}
        onRemoveFromWishlist={handleToggleWishlist}
        onSelectPackage={(pkg) => {
          setSelectedPackageForModal(pkg);
          setIsPackageModalOpen(true);
        }}
        onBookPackage={(pkg) => handleBookPackage(pkg, 2)}
      />

      {/* Global Footer */}
      <Footer
        setCurrentTab={setCurrentTab}
        openPriceEditor={() => setIsPriceEditorOpen(true)}
        pricing={pricing}
      />
    </div>
  );
}
