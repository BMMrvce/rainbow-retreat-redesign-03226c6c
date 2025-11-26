import { MapPin, Sparkles, Activity, Calendar } from "lucide-react";
import { Card } from "./ui/card";

const features = [
  {
    icon: MapPin,
    title: "Prime Location",
    description:
      "Conveniently located in Nettigere, minutes from South Bangalore, surrounded by lush greenery",
  },
  {
    icon: Sparkles,
    title: "Luxury Stays",
    description:
      "Beautifully designed private villas, couple suites, dormitories, and unique tent stays",
  },
  {
    icon: Activity,
    title: "Adventure & Fun",
    description:
      "Swimming, rain dance, zipline, rope activities, indoor & outdoor games, campfire nights",
  },
  {
    icon: Calendar,
    title: "Events & Celebrations",
    description:
      "Perfect venue for weddings, corporate outings, and special occasions with full amenities",
  },
];

export const Features = () => {
  return (
    <section id="why-7colorbow" className="py-20 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Why Choose 7colorbow?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the perfect blend of luxury, nature, and adventure at our resort
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card border-border"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold text-card-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
