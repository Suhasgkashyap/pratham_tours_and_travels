export type TripCategory =
  | 'All'
  | 'Honeymoon'
  | 'Family Holidays'
  | 'Adventure'
  | 'Beach Vacations'
  | 'Luxury Travel'
  | 'Weekend Getaways'
  | 'Pilgrimage & Heritage';

export interface DayItinerary {
  day: number;
  title: string;
  description: string;
  meals?: string;
  stay?: string;
}

export interface TourPackage {
  id: string;
  title: string;
  slug: string;
  destination: string;
  stateOrCountry: string;
  region: 'Karnataka' | 'South India' | 'North India' | 'International';
  duration: string;
  durationDays: number;
  durationNights: number;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  category: TripCategory;
  featured: boolean;
  image: string;
  gallery: string[];
  description: string;
  highlights: string[];
  itinerary: DayItinerary[];
  inclusions: string[];
  exclusions: string[];
  pickupLocation: string;
  availableCabOptions: ('Swift Dzire' | 'Suzuki Ertiga' | 'Tempo Traveller')[];
}

export interface CarRental {
  id: string;
  name: string;
  model: string;
  brand: string;
  category: 'Sedan' | 'MUV / SUV' | 'Minibus';
  seats: string;
  luggage: string;
  ac: boolean;
  fuelType: string;
  pricePerKm: number;
  driverBataPerDay: number;
  image: string;
  plateNumber?: string;
  features: string[];
  description: string;
  idealFor: string;
  minKmPerDay: number;
}

export interface Destination {
  id: string;
  name: string;
  stateOrCountry: string;
  tag: string;
  image: string;
  packageCount: number;
  bestTimeToVisit: string;
  description: string;
  popularSpots: string[];
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  serviceUsed: string;
  comment: string;
  verified: boolean;
  userSubmitted?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  summary: string;
  content: string[];
  popularRoute?: string;
}

export interface PricingSettings {
  swiftDzirePerKm: number;
  ertigaPerKm: number;
  driverBataPerDay: number;
  driverBataMaxPerDay: number;
  minKmPerDay: number;
  nightHaltCharge: number;
  ownerName: string;
  ownerPhone: string;
  ownerWhatsapp: string;
  agencyAddress: string;
  swiftDzireImage?: string;
  ertigaImage?: string;
  swiftDzirePlate?: string;
  ertigaPlate?: string;
}

export interface BookingRequest {
  id: string;
  type: 'package' | 'cab';
  packageId?: string;
  carId?: string;
  packageName?: string;
  carName?: string;
  pickupCity: string;
  dropCity?: string;
  tripType: 'one-way' | 'round-trip' | 'tour-package';
  startDate: string;
  endDate: string;
  estimatedKm?: number;
  travelers: number;
  name: string;
  phone: string;
  email?: string;
  specialRequests?: string;
  estimatedPrice: number;
  timestamp: string;
}
