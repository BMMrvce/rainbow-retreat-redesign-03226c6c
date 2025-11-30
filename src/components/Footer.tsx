import { Facebook, Instagram, Mail, MessageCircle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-indigo-600 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">7colorbow</h3>
            <p className="text-white/90">
              Your perfect escape to luxury, nature, and adventure in South Bangalore.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#accommodations"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Accommodations
                </a>
              </li>
              <li>
                <a
                  href="#activities"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Activities
                </a>
              </li>
              <li>
                <a
                  href="#packages"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Packages
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-white/90">
              <li>Kanakpura Main Road,Nettigere, South Bangalore-560116</li>
              <li>Karnataka, India</li>
              <li>
                <a 
                  href="https://wa.me/919900808691?text=Hi..i%20have%20an%20enquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  +91 99008 08691
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@7colorbowretreat.in"
                  className="hover:text-white transition-colors"
                >
                  Colorsbowresort@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/share/1GC5vRipZ4/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.instagram.com/colorbowresort?igsh=MW11cGRqbTNpZ3RoMg=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="mailto:Colorsbowresort@gmail.com"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://wa.me/919900808691?text=Hi..i%20have%20an%20enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 pt-6 text-center text-white/80">
          <p className="flex items-center justify-center gap-3 text-sm">
            <span className="text-white font-medium">Built by</span>
            <a
              href="https://tantravruksha.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 px-3 py-1 rounded-full font-semibold text-white hover:bg-white/20 transition-colors"
            >
              <i>Tantravruksha.dev</i>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
