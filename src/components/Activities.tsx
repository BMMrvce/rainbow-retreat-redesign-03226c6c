import { Card } from "./ui/card";
import { Waves, Zap, Trophy, Flame, UtensilsCrossed, Music, ChevronLeft, ChevronRight } from "lucide-react";
// Images are now served from Supabase; do not use local asset fallbacks here.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const activities = [
  {
    icon: Waves,
    title: "Swimming & Rain Dance",
    description: "Enjoy our sparkling pool and exciting rain dance area",
  },
  {
    icon: Zap,
    title: "Adventure Sports",
    description: "Trekking, Zipline, rope activities, and thrilling outdoor challenges",
  },
  {
    icon: Trophy,
    title: "Indoor & Outdoor Games",
    description: "Table tennis, badminton, volleyball, cricket, and more",
  },
  {
    icon: Flame,
    title: "Campfire Nights",
    description: "Memorable evenings under the stars with bonfires",
  },
  {
    icon: UtensilsCrossed,
    title: "Unlimited Buffet",
    description: "Delicious veg & non-veg meals throughout your stay",
  },
  {
    icon: Music,
    title: "Music &  Entertainment",
    description: "Live music and entertainment for special events",
  },
];

export const Activities = () => {
  const [slides, setSlides] = useState<string[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [rawUrls, setRawUrls] = useState<string[]>([]);
  // Hide overlay text and slideshow controls (arrows/dots) per request
  const showOverlayText = false;
  const showSlideshowControls = false;

  useEffect(() => {
    let mounted = true;
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
    const STORAGE_BUCKET = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET;

    async function loadImages() {
      try {
        const res = await supabase
          .from("activity_images")
          .select("url")
          .order("created_at", { ascending: false });

        if (!mounted) return;

        // Log response for debugging
        // eslint-disable-next-line no-console
        console.debug("activity_images select result:", res);

        // Supabase returns { data, error }
        // If there's an error (e.g. RLS or missing key), surface it
        // so you can inspect in browser console and on-page UI.
        // @ts-ignore
        if (res.error) {
          // eslint-disable-next-line no-console
          console.error("Supabase error loading activity_images:", res.error);
          setLoadError(String(res.error.message || res.error));
          return;
        }

        const data = (res.data as { url: string }[]) || [];
        const raw = data.map((r) => r.url).filter(Boolean);
        setRawUrls(raw);

        // Resolve storage paths to public URLs when necessary.
        const resolved = rawUrls.map((u) => {
          if (!u) return u;
          if (u.startsWith('http://') || u.startsWith('https://')) return u;
          // If the DB stores a storage path like "activity_images/xxx.jpg" or just a filename,
          // construct a public URL using the Supabase storage public endpoint and configured bucket.
          if (SUPABASE_URL && STORAGE_BUCKET) {
            return `${SUPABASE_URL.replace(/\/$/, '')}/storage/v1/object/public/${STORAGE_BUCKET}/${u.replace(/^\//, '')}`;
          }
          // Fallback: return original value (may be a relative path or already a full URL)
          return u;
        });

        // Only use images from Supabase — do not fall back to local assets.
        setSlides(resolved);
      } catch (e) {
        // network or unexpected error
        // eslint-disable-next-line no-console
        console.error("Unexpected error loading activity_images:", e);
        setLoadError(String((e as Error).message || e));
      }
    }

    loadImages();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="activities" className="py-20 bg-accent/30">
      <div className="container mx-auto px-4">
        {loadError ? (
          <div className="mb-4 rounded p-3 bg-red-600/10 border border-red-600 text-red-600 text-sm">
            Warning: failed to load images from Supabase: {loadError}
          </div>
        ) : null}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Activities & Amenities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Endless fun and entertainment for everyone at 7colorbow
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            {/* Slideshow: only render images sourced from Supabase */}
            {slides.length > 0 ? (
              <Slideshow images={slides} alt="Resort Activities" showControls={showSlideshowControls} />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted/10">
                <span className="text-muted-foreground">No activity images available</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
              {showOverlayText ? (
                <div className="p-8">
                  <h3 className="text-3xl font-serif font-bold text-foreground mb-2">
                    Adventure Awaits
                  </h3>
                  <p className="text-foreground/90">
                    Create unforgettable memories with our wide range of activities
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          {/* Debug: show raw DB urls and resolved public urls when images fail */}
          {(!slides.length && rawUrls.length > 0) && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 text-sm text-yellow-800 rounded">
              <div className="font-semibold mb-2">Image debug</div>
              <div className="space-y-2">
                {rawUrls.map((r, i) => (
                  <div key={i}>
                    <div className="text-xs text-muted-foreground">raw: <code>{r}</code></div>
                    <div className="text-xs text-muted-foreground">resolved: <code>{slides[i] || '—'}</code></div>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                If resolved URLs are not valid, set `VITE_SUPABASE_STORAGE_BUCKET` to your storage bucket name so the site can construct public URLs for storage paths.
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activities.map((activity, index) => (
              <Card
                key={index}
                className="p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <activity.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-serif font-bold text-card-foreground mb-2">
                  {activity.title}
                </h4>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface SlideshowProps {
  images: string[];
  alt?: string;
  showControls?: boolean;
}

function Slideshow(props: SlideshowProps) {
  const { images, alt, showControls = true } = props;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, [images.length]);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="w-full h-full relative">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={alt ?? `slide-${i}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}

      {showControls ? (
        <>
          <button
            aria-label="previous"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/60 hover:bg-background/80 p-2 rounded-full shadow-md"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          <button
            aria-label="next"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/60 hover:bg-background/80 p-2 rounded-full shadow-md"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>

          <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full ${i === index ? "bg-foreground" : "bg-foreground/40"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
