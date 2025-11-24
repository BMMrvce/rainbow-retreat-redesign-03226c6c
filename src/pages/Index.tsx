import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhyRainbow } from "@/components/WhyRainbow";
import { Features } from "@/components/Features";
import { Accommodations } from "@/components/Accommodations";
import { Activities } from "@/components/Activities";
import { Packages } from "@/components/Packages";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <WhyRainbow />
      <Features />
      <Accommodations />
      <Activities />
      <Packages />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
