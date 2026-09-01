import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ChevronRight, ShieldCheck, Heart } from 'lucide-react';

const Footer = ({ onOpenModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-lux">
      <div className="container">
        <div className="row g-5 pb-5">
          {/* Column 1: Brand Info */}
          <div className="col-lg-4 col-md-6">
            <Link to="/" onClick={scrollToTop} className="d-inline-block mb-3">
              <img
                src="/assets/grow-logo-DZ4ZPe6W.png"
                alt="Grow Infinity Realtors"
                style={{ height: '52px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
              />
            </Link>
            <p className="small text-light opacity-75 mb-4" style={{ lineHeight: '1.75' }}>
              Grow Infinity Realtors is Noida's premier luxury real estate consultancy, offering unbiased market analysis, exclusive developer allocations, and end-to-end investment advisory services.
            </p>
            <div className="d-flex align-items-center gap-2 p-2 rounded" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <ShieldCheck size={20} className="text-gold flex-shrink-0" />
              <small className="text-light opacity-90" style={{ fontSize: '0.78rem' }}>
                UP RERA Authorized Real Estate Consultancy
              </small>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5 className="h6 fw-bold text-white text-uppercase tracking-wider mb-3 pb-2 border-bottom border-secondary">
              Quick Links
            </h5>
            <ul className="list-unstyled">
              {['Home', 'About Us', 'Projects', 'Why Us?', 'Amenities', 'Pricing', 'Contact Us'].map((item) => (
                <li key={item} className="mb-2">
                  <a
                    href={`#${item.toLowerCase().replace(' ', '-').replace('?', '')}`}
                    className="footer-link d-inline-flex align-items-center gap-1"
                  >
                    <ChevronRight size={14} className="text-gold" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured Developers */}
          <div className="col-lg-3 col-md-6 col-6">
            <h5 className="h6 fw-bold text-white text-uppercase tracking-wider mb-3 pb-2 border-bottom border-secondary">
              Key Partners
            </h5>
            <ul className="list-unstyled">
              {['ACE Group', 'ATS Infrastructure', 'Max Estates', 'Godrej Properties', 'L&T Realty', 'Smartworld Developers', 'CRC Group'].map((partner) => (
                <li key={partner} className="mb-2">
                  <span className="small text-light opacity-75 d-inline-flex align-items-center gap-1">
                    <ChevronRight size={14} className="text-gold" />
                    {partner}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact info */}
          <div className="col-lg-3 col-md-6">
            <h5 className="h6 fw-bold text-white text-uppercase tracking-wider mb-3 pb-2 border-bottom border-secondary">
              Let's Connect
            </h5>
            <div className="d-flex flex-column gap-3 small text-light opacity-85">
              <div className="d-flex align-items-start gap-2">
                <MapPin size={18} className="text-gold flex-shrink-0 mt-1" />
                <span>Sector 132, Noida-Greater Noida Expressway, UP - 201304</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Phone size={18} className="text-gold flex-shrink-0" />
                <a href="tel:+919899958739" className="text-light text-decoration-none hover-white">
                  +91 98999 58739
                </a>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Mail size={18} className="text-gold flex-shrink-0" />
                <a href="mailto:info@growinfinityrealtors.in" className="text-light text-decoration-none hover-white">
                  info@growinfinityrealtors.in
                </a>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={() => onOpenModal('Footer Callback')}
                className="btn btn-gold-lux btn-sm w-100 py-2"
              >
                Schedule Site Visit
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer section */}
        <div className="pt-4 border-top border-secondary border-opacity-25">
          <p className="small text-muted" style={{ fontSize: '0.74rem', lineHeight: '1.6' }}>
            <strong>Disclaimer:</strong> The contents provided on this website are for informational purposes only and do not constitute an offer to buy or sell any property. All project plans, specifications, dimensions, amenities, images, and prices are indicative and subject to change by respective developers as per RERA regulations. Grow Infinity Realtors acts solely as an authorized real estate channel partner.
          </p>
        </div>

        {/* Copyright */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pt-3 mt-3 border-top border-secondary border-opacity-25 small text-muted">
          <div>
            © {new Date().getFullYear()} Grow Infinity Realtors. All rights reserved.
          </div>
          <div className="mt-2 mt-md-0">
            <span>Crafted with Luxury & Precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
