import { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, User, X, MapPin, Sparkles } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  blogs: BlogPost[];
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  return (
    <section id="blog-section" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/10 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Travel Inspiration &amp; Insights</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
              Road Trips &amp; Destination Guides
            </h2>
            <p className="text-base text-slate-600 mt-2 max-w-2xl">
              Curated travel guides, road condition updates, route plans starting from Ranebennur, and insider tips
              from our expert chauffeurs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedBlog(post)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-slate-900 shadow-sm">
                    {post.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <span className="flex items-center gap-1 font-semibold">
                    <Clock className="w-3 h-3 text-amber-400" /> {post.readTime}
                  </span>
                  <span className="text-slate-300">{post.date}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {post.popularRoute && (
                    <span className="text-[11px] font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md inline-block truncate max-w-full">
                      📍 {post.popularRoute}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors font-serif line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{post.summary}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-900">
                  <span className="flex items-center gap-1 text-slate-500 font-medium">
                    <User className="w-3.5 h-3.5" /> {post.author}
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read Guide &rarr;
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Read Blog Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 max-h-[85vh] overflow-y-auto space-y-5">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
              <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-slate-950 text-xs font-bold mb-2 inline-block">
                  {selectedBlog.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-serif leading-tight">{selectedBlog.title}</h3>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
              <span>By {selectedBlog.author}</span>
              <span>{selectedBlog.date} • {selectedBlog.readTime}</span>
            </div>

            {selectedBlog.popularRoute && (
              <div className="p-3 bg-blue-50 text-blue-900 rounded-xl text-xs font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0 text-rose-500" />
                <span>
                  <strong>Recommended Route:</strong> {selectedBlog.popularRoute}
                </span>
              </div>
            )}

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {selectedBlog.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedBlog(null)}
                className="px-5 py-2.5 bg-blue-900 text-white font-bold text-xs rounded-xl hover:bg-blue-800 transition cursor-pointer"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
