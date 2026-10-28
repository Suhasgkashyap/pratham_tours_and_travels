import { Heart, Users, Compass, Umbrella, Crown, Calendar, Sparkles } from 'lucide-react';
import { TripCategory } from '../types';

interface TravelCategoriesProps {
  onSelectCategory: (category: TripCategory) => void;
}

export default function TravelCategories({ onSelectCategory }: TravelCategoriesProps) {
  const categories = [
    {
      id: 'Honeymoon' as TripCategory,
      title: 'Honeymoon Trips',
      subtitle: 'Romantic retreats, mist hills & private candlelights',
      icon: Heart,
      color: 'from-rose-500 to-pink-600',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-700',
      image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80',
      destinations: 'Coorg, Wayanad, Ooty, Kashmir',
    },
    {
      id: 'Family Holidays' as TripCategory,
      title: 'Family Holidays',
      subtitle: 'Spacious 7-seater Ertiga journeys with safety & comfort',
      icon: Users,
      color: 'from-blue-600 to-indigo-700',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
      destinations: 'Mysore, Bandipur, Kerala, Jog Falls',
    },
    {
      id: 'Pilgrimage & Heritage' as TripCategory,
      title: 'Pilgrimage & Heritage',
      subtitle: 'Sacred darshan circuits & UNESCO architectural marvels',
      icon: Crown,
      color: 'from-amber-600 to-orange-700',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-800',
      image: 'https://images.unsplash.com/photo-1627916607164-7b20241db935?auto=format&fit=crop&w=600&q=80',
      destinations: 'Hampi, Badami, Kollur, Kukke, Sringeri',
    },
    {
      id: 'Beach Vacations' as TripCategory,
      title: 'Beach Vacations',
      subtitle: 'Sun-kissed sands, mangrove cruises & coastal cafes',
      icon: Umbrella,
      color: 'from-cyan-500 to-teal-600',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-700',
      image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=600&q=80',
      destinations: 'Gokarna, Murudeshwar, Goa, Malpe',
    },
    {
      id: 'Adventure' as TripCategory,
      title: 'Adventure & Wildlife',
      subtitle: 'White-water rafting, jungle safaris & mountain treks',
      icon: Compass,
      color: 'from-emerald-600 to-green-700',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
      destinations: 'Dandeli, Kali River, Kudremukh, Wayanad',
    },
    {
      id: 'Weekend Getaways' as TripCategory,
      title: 'Weekend Getaways',
      subtitle: 'Quick 2 to 3 days road trips right from Ranebennur',
      icon: Calendar,
      color: 'from-purple-600 to-indigo-700',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80',
      destinations: 'Goa, Sirsi, Chikmagalur, Badami',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/10 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-900" />
            <span>Travel Your Way</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            Find Trips by Travel Style
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Whether you want a peaceful romantic weekend in Coorg, a holy family darshan to Kukke Subramanya in an Ertiga,
            or beach waves in Goa, we have the ideal package.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                id={`cat-card-${cat.id.replace(/\s+/g, '-').toLowerCase()}`}
                className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Background Image Container */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

                  {/* Icon badge floating */}
                  <div className="absolute top-4 left-4">
                    <div className={`w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md flex items-center justify-center shadow-md ${cat.textColor}`}>
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                  </div>

                  {/* Title over image */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold font-serif">{cat.title}</h3>
                  </div>
                </div>

                {/* Subtitle & details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed">{cat.subtitle}</p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 truncate max-w-[190px]">
                      <strong>Top:</strong> {cat.destinations}
                    </span>
                    <span className="font-bold text-blue-900 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                      Explore &rarr;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
