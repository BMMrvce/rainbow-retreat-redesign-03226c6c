import { Card } from "./ui/card";
import { Waves, Zap, Trophy, Flame, UtensilsCrossed, Music } from "lucide-react";
import poolImage from "@/assets/pool-activities.jpg";

const activities = [
  {
    icon: Waves,
    title: "Swimming & Rain Dance",
    description: "Enjoy our sparkling pool and exciting rain dance area",
  },
  {
    icon: Zap,
    title: "Adventure Sports",
    description: "Zipline, rope activities, and thrilling outdoor challenges",
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
    title: "DJ & Entertainment",
    description: "Live music and entertainment for special events",
  },
];

export const Activities = () => {
  return (
    <section id="activities" className="py-20 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Activities & Amenities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Endless fun and entertainment for everyone at 7colourbow
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={poolImage}
              alt="Resort Activities"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
              <div className="p-8">
                <h3 className="text-3xl font-serif font-bold text-foreground mb-2">
                  Adventure Awaits
                </h3>
                <p className="text-foreground/90">
                  Create unforgettable memories with our wide range of activities
                </p>
              </div>
            </div>
          </div>

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
