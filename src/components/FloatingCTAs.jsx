import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';

const FloatingCTAs = ({ onOpenModal }) => {
  return (
    <>
      {/* Vertical Sidebar Tab Button */}
      <button
        onClick={() => onOpenModal('Private Tour Request')}
        className="vertical-sidebar-btn d-none d-md-flex align-items-center gap-2"
        aria-label="Book Private Tour"
      >
        <Calendar size={16} />
        <span>Book Private Tour</span>
      </button>

      {/* Floating Bottom-Right Action Buttons */}
      <div className="floating-actions-container">
        <a
          href="https://wa.me/919899958739?text=Hi%2C%20I%20am%20interested%20in%20luxury%20properties%20with%20Grow%20Infinity%20Realtors."
          target="_blank"
          rel="noopener noreferrer"
          className="floating-circle-btn whatsapp"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={24} />
        </a>

        <a
          href="tel:+919899958739"
          className="floating-circle-btn call"
          aria-label="Call Helpline"
        >
          <Phone size={22} />
        </a>
      </div>
    </>
  );
};

export default FloatingCTAs;
