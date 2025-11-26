import { Facebook, Instagram, Mail, MessageCircle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">7colorbow</h3>
            <p className="text-secondary-foreground/80">
              Your perfect escape to luxury, nature, and adventure in South Bangalore.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#accommodations"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Accommodations
                </a>
              </li>
              <li>
                <a
                  href="#activities"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Activities
                </a>
              </li>
              <li>
                <a
                  href="#packages"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Packages
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li>Nettigere, South Bangalore</li>
              <li>Karnataka, India</li>
              <li>
                <a 
                  href="https://wa.me/919900808691?text=Hi..i%20have%20an%20enquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary-foreground transition-colors"
                >
                  +91 99008 08691
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@7colorbowretreat.in"
                  className="hover:text-secondary-foreground transition-colors"
                >
                  info@7colorbowretreat.in
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary-foreground/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary-foreground/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary-foreground/20 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/919900808691?text=Hi..i%20have%20an%20enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary-foreground/20 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8 text-center text-secondary-foreground/60">
          <p>
            Built by{" "}
            <a
              href="https://tantravruksha.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-foreground hover:text-secondary-foreground/80 transition-colors underline"
            >
              Tantravruksha.dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
