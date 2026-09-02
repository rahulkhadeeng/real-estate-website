import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ChevronRight, ShieldCheck } from 'lucide-react';
import Reveal from './common/Reveal';
import BrandLogo from './common/BrandLogo';

const Footer = ({ onOpenModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-lux">
      <div className="container">
        <Reveal animation="fade-up" duration={700}>
          <div className="row g-4 g-lg-5 pb-4">
            {/* Column 1: Brand Info */}
            <div className="col-lg-4 col-md-6">
              <Link to="/" onClick={scrollToTop} className="d-inline-block mb-3">
                <BrandLogo height={46} isWhite={true} />
              </Link>
              <p className="small text-light opacity-75 mb-4" style={{ lineHeight: '1.75' }}>
                Noida's premier luxury real estate consultancy, offering unbiased market analysis, exclusive developer allocations, and end-to-end investment advisory services.
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
                  <a href="mailto:info@keylo.in" className="text-light text-decoration-none hover-white">
                    info@keylo.in
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
        </Reveal>

        {/* Disclaimer section with high contrast text */}
        <div className="pt-3 border-top border-secondary border-opacity-50">
          <p className="small mb-0" style={{ fontSize: '0.74rem', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.65)' }}>
            <strong className="text-light">Disclaimer:</strong> The contents provided on this website are for informational purposes only and do not constitute an offer to buy or sell any property. All project plans, specifications, dimensions, amenities, images, and prices are indicative and subject to change by respective developers as per RERA regulations.
          </p>
        </div>

        {/* Copyright & Author with high-visibility bright styling */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pt-3 mt-3 border-top border-secondary border-opacity-50 small" style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.85rem' }}>
          <div>
            © {new Date().getFullYear()} <span className="fw-bold text-gold" style={{ color: '#E2BD78' }}>Rahul khade</span>. All rights reserved.
          </div>
          <div className="mt-2 mt-md-0" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
            <span>Designed &amp; Developed with Luxury &amp; Precision by <strong className="text-white">Rahul khade</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
