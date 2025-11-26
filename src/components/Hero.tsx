import { Button } from "./ui/button";
import heroImage from "@/assets/hero-resort.jpg";

export const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat 0.205-hero-image"
        style={{ backgroundImage: `url(${heroImage})` }}>

        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background/70" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight">
            Escape to Paradise
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 max-w-2xl mx-auto">
            Experience luxury, adventure, and tranquility at 7colorbow - Your perfect
            getaway in the heart of nature
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="text-lg px-8" onClick={scrollToContact}>
              Book Your Stay
            </Button>
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Explore Packages
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-2 bg-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};
