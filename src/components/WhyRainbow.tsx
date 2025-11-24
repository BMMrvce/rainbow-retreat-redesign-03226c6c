import { Palmtree, Mountain, Sparkles, Heart } from "lucide-react";

export const WhyRainbow = () => {
  const reasons = [
    {
      icon: <Palmtree className="w-12 h-12 text-primary" />,
      title: "Serene Nature Escape",
      description: "Nestled in South Bangalore's lush greenery, offering a peaceful retreat from city life."
    },
    {
      icon: <Mountain className="w-12 h-12 text-primary" />,
      title: "Perfect Location",
      description: "Easy access from Bangalore while being surrounded by natural beauty and tranquility."
    },
    {
      icon: <Sparkles className="w-12 h-12 text-primary" />,
      title: "Luxury Meets Nature",
      description: "Premium accommodations with modern amenities harmoniously blended with natural surroundings."
    },
    {
      icon: <Heart className="w-12 h-12 text-primary" />,
      title: "Memorable Experiences",
      description: "From adventure activities to peaceful relaxation, create lasting memories with loved ones."
    }
  ];

  return (
    <section id="why-rainbow" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Why Choose Rainbow Retreat?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover what makes Rainbow Retreat the perfect destination for your next getaway
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">
                {reason.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
