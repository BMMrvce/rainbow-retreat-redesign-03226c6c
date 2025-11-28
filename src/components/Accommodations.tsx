import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Users, Heart, Tent } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import villaImage from "@/assets/villa.png";
import coupleRoomImage from "@/assets/couple-room.jpg";
import dormitoryImage from "@/assets/dormitory.jpg";
import tentImage from "@/assets/tent.jpeg";

const accommodations = [
  {
    icon: Home,
    title: "A/C Villas",
    description: "Luxurious private villas with modern amenities and beautiful garden views",
    image: villaImage,
    capacity: "6-8 guests",
    price: "₹3,499/person/night",
    details: "Our private villas offer the ultimate luxury experience with spacious living areas, fully equipped kitchens, private gardens, and modern amenities. Perfect for families or groups looking for privacy and comfort. Features include air conditioning, Wi-Fi, smart TV, and 24/7 room service.",
    amenities: ["King-size beds", "Private kitchen", "Garden view", "Air conditioning"],
  },
  {
    icon: Heart,
    title: "Couple Suites",
    description: "Romantic suites perfect for couples seeking a peaceful retreat",
    image: coupleRoomImage,
    capacity: "2 guests",
    price: "₹2799/person/night",
    details: "Designed for romance and intimacy, our couple suites provide a serene escape with premium furnishings, cozy ambiance, and stunning views. Each suite includes a comfortable seating area, modern bathroom, and private balcony perfect for morning coffee or evening relaxation.",
    amenities: ["King-size bed", "Private balcony","Air Cooler", "Premium toiletries", "Romantic lighting"],
  },
  {
    icon: Users,
    title: "Dormitories",
    description: "Comfortable shared accommodations ideal for groups and budget travelers",
    image: dormitoryImage,
    capacity: "8-12 guests",
    price: "₹2499/person/night",
    details: "Our well-maintained dormitories are perfect for groups, teams, or budget-conscious travelers. Each dormitory features comfortable bunk beds, shared bathrooms, lockers for personal belongings, and common areas for socializing. Great for corporate outings, school trips, or group adventures.",
    amenities: ["Queen size beds", "Shared bathrooms", "Lockers", "Common area", "Fan/AC options", "Hot water"],
  },
  {
    icon: Tent,
    title: "Tent Stays",
    description: "Unique glamping experience under the stars with all essential comforts",
    image: tentImage,
    capacity: "1-2 guests",
    price: "₹1799/person/night",
    details: "Experience nature without compromising comfort in our luxury tents. Each tent is equipped with comfortable beds, electricity, and attached bathrooms. Wake up to the sounds of nature and enjoy stargazing at night. Perfect for adventurous couples or small families seeking a unique stay experience.",
    amenities: ["Comfortable beds", "Common bathroom", "Electricity", "Outdoor seating", "Campfire access","Lighting" ],
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
  const [selectedAccommodation, setSelectedAccommodation] = useState<typeof accommodations[0] | null>(null);

  return (
    <>
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
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                      {accommodation.capacity}
                    </div>
                    <div className="bg-background/95 backdrop-blur-sm text-foreground px-4 py-2 rounded-full text-sm font-bold">
                      {accommodation.price}
                    </div>
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
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setSelectedAccommodation(accommodation)}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedAccommodation} onOpenChange={() => setSelectedAccommodation(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedAccommodation && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <DialogTitle className="text-3xl font-serif">
                      {selectedAccommodation.title}
                    </DialogTitle>
                    <DialogDescription className="text-base">
                      Capacity: {selectedAccommodation.capacity}
                    </DialogDescription>
                  </div>
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg">
                    <span className="text-lg font-bold">
                      {selectedAccommodation.price}
                    </span>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-4">
                <img
                  src={selectedAccommodation.image}
                  alt={selectedAccommodation.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                
                <div>
                  <h4 className="font-semibold text-lg mb-2">About</h4>
                  <p className="text-muted-foreground">{selectedAccommodation.details}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2">Amenities</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {selectedAccommodation.amenities.map((amenity, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => window.open("https://wa.me/919900808691?text=Hi..i%20have%20an%20enquiry", "_blank")}
                >
                  Book Now
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
