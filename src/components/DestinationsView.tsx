import { MapPin, Calendar, Compass, ArrowRight, Sparkles } from 'lucide-react';
import { Destination, TourPackage } from '../types';

interface DestinationsViewProps {
  destinations: Destination[];
  onSelectDestination: (destName: string) => void;
}

export default function DestinationsView({ destinations, onSelectDestination }: DestinationsViewProps) {
  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* View Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/10 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Travel Circuits</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-serif tracking-tight">
          Explore Handpicked Destinations
        </h1>
        <p className="text-base text-slate-600 mt-3 leading-relaxed">
          From the sacred heritage stones of Hampi and coastal shores of Gokarna to royal hill stations and international
          marvels. Choose where you want to go, and let us drive you there in comfort.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            onClick={() => onSelectDestination(dest.name)}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            {/* Image */}
            <div className="relative h-60 w-full overflow-hidden bg-slate-900">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 shadow-md">
                  {dest.tag}
                </span>
              </div>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold mb-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{dest.stateOrCountry}</span>
                </div>
                <h3 className="text-xl font-bold font-serif">{dest.name}</h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{dest.description}</p>

                {/* Popular spots */}
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Popular Sightseeing Spots:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.popularSpots.map((spot, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md"
                      >
                        {spot}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-900" />
                  <span>
                    <strong>Best Season:</strong> {dest.bestTimeToVisit}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500">{dest.packageCount} Tour Packages Available</span>
                <span className="text-blue-900 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>View Trips</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
