import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const packages = [
  {
    name: "DayOut Package",
    price: "999 INR/person",
    description: "Extended relaxation with comfortable day-use amenities",
    features: [
      "All Day Out package features",
      "Day-use cabanas or resting areas",
      "Food & beverages throughout the day",
      "Extended access to pool & activities",
      "24/7 security & assistance",
      "Complimentary parking",
    ],
    popular: true,
   }
];

export const Packages = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="packages" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Our Packages
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect package for your getaway or special event
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`p-8 hover:shadow-2xl transition-all duration-300 relative flex flex-col items-center ${
                pkg.popular ? "ring-2 ring-primary scale-105" : ""
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-serif font-bold text-card-foreground mb-2">
                  {pkg.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>
                <div className="text-3xl font-bold text-primary">{pkg.price}</div>
              </div>

              <ul className="w-full max-w-[34rem] sm:max-w-[28rem] mx-auto flex flex-col items-center space-y-3 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-card-foreground text-sm text-center">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={pkg.popular ? "default" : "outline"}
                onClick={scrollToContact}
              >
                Book Now
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
