import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-serif font-bold text-primary">
              7colorbow
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("why-7colorbow")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Why 7colorbow
            </button>
            <button
              onClick={() => scrollToSection("accommodations")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Accommodations
            </button>
            <button
              onClick={() => scrollToSection("activities")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Activities
            </button>
            <button
              onClick={() => scrollToSection("packages")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Packages
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
            <Button onClick={() => scrollToSection("contact")} size="lg">
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 animate-in slide-in-from-top">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-foreground hover:text-primary transition-colors text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("why-7colorbow")}
                className="text-foreground hover:text-primary transition-colors text-left"
              >
                Why 7colorbow
              </button>
              <button
                onClick={() => scrollToSection("accommodations")}
                className="text-foreground hover:text-primary transition-colors text-left"
              >
                Accommodations
              </button>
              <button
                onClick={() => scrollToSection("activities")}
                className="text-foreground hover:text-primary transition-colors text-left"
              >
                Activities
              </button>
              <button
                onClick={() => scrollToSection("packages")}
                className="text-foreground hover:text-primary transition-colors text-left"
              >
                Packages
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-foreground hover:text-primary transition-colors text-left"
              >
                Contact
              </button>
              <Button onClick={() => scrollToSection("contact")} className="w-full">
                Book Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
