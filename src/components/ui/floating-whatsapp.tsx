import React from "react";
import { Phone } from "lucide-react";

// Floating WhatsApp button. Reads `VITE_WHATSAPP_NUMBER` from env.
// Set `VITE_WHATSAPP_NUMBER` to a full international number (with or without leading +),
// e.g. `919876543210` or `+919876543210`.

export const FloatingWhatsApp: React.FC<{ message?: string }> = ({ message }) => {
  // Use the fixed WhatsApp link as requested
  const FIXED_WA_LINK = "https://wa.me/919900808691?text=Hi..i%20have%20an%20enquiry";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(FIXED_WA_LINK, "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      {/* Call button above WhatsApp */}
      <a
        href="tel:+919900808691"
        aria-label="Call +91 99008 08691"
        className="fixed z-50 right-5 bottom-20 md:right-8 md:bottom-24 w-14 h-14 rounded-full shadow-lg flex items-center justify-center bg-blue-600 hover:scale-105 transition-transform text-white"
      >
        <Phone className="w-6 h-6" />
      </a>

      <a
        href={FIXED_WA_LINK}
        onClick={handleClick}
        aria-label="Chat on WhatsApp"
        className="fixed z-50 right-5 bottom-5 md:right-8 md:bottom-8 w-14 h-14 rounded-full shadow-lg flex items-center justify-center bg-[#25D366] hover:scale-105 transition-transform"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-7 h-7"
          aria-hidden
        >
          <path d="M20.52 3.48A11.94 11.94 0 0012.03.02 11.92 11.92 0 003.5 8.6c-.4 1.92.05 3.96 1.24 5.6L3 21l6.96-1.8a11.9 11.9 0 006.07 1.6h.01c6.62 0 11.98-5.35 11.98-11.97 0-3.2-1.25-6.2-3.5-8.45zM12.03 20.5c-1.88 0-3.72-.5-5.32-1.45l-.38-.23L4 19l1.57-2.57-.25-.41A8.02 8.02 0 013.03 8.6C3.03 5.1 5.53 2.6 9.03 2.6c1.98 0 3.85.78 5.25 2.2 1.4 1.4 2.18 3.26 2.18 5.24 0 4.5-3.5 8-8.43 8z" />
          <path d="M17.2 14.1c-.3-.15-1.78-.88-2.05-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.18.2-.35.22-.65.07-.3-.15-1.26-.47-2.4-1.48-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2 0-.37-.03-.52-.03-.15-.67-1.6-.92-2.2-.24-.58-.48-.5-.66-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.06 2.9 1.21 3.1.15.2 2.09 3.34 5.07 4.68 2.98 1.34 2.98.9 3.52.84.54-.07 1.78-.72 2.03-1.42.24-.7.24-1.3.17-1.42-.07-.12-.27-.18-.57-.33z" />
        </svg>
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
