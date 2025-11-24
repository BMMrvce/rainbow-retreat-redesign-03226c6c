import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Users, Heart, Tent, Bed } from "lucide-react";
import villaImage from "@/assets/villa.jpg";
import coupleSuiteImage from "@/assets/couple-suite.jpg";

const accommodations = [
  {
    icon: Home,
    title: "Private Villas",
    description: "Luxurious private villas with modern amenities and beautiful garden views",
    image: villaImage,
    capacity: "4-6 guests",
  },
  {
    icon: Heart,
    title: "Couple Suites",
    description: "Romantic suites perfect for couples seeking a peaceful retreat",
    image: coupleSuiteImage,
    capacity: "2 guests",
  },
  {
    icon: Users,
    title: "Dormitories",
    description: "Comfortable shared accommodations ideal for groups and budget travelers",
    image: villaImage,
    capacity: "8-12 guests",
  },
  {
    icon: Tent,
    title: "Tent Stays",
    description: "Unique glamping experience under the stars with all essential comforts",
    image: coupleSuiteImage,
    capacity: "2-4 guests",
  },
];

function Home(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export const Accommodations = () => {
  return (
    <section id="accommodations" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Luxury Accommodations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our range of beautifully designed stays, each offering a unique experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {accommodations.map((accommodation, index) => (
            <Card
              key={index}
              className="overflow-hidden group hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={accommodation.image}
                  alt={accommodation.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                  {accommodation.capacity}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <accommodation.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-card-foreground">
                    {accommodation.title}
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">{accommodation.description}</p>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
