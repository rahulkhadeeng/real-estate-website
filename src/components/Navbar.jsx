import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PhoneCall, Menu, X, ArrowRight } from 'lucide-react';
import BrandLogo from './common/BrandLogo';

const Navbar = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (!isHomePage) {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // If not on homepage, always have solid white background
  const isTransparent = isHomePage && !scrolled;

  return (
    <nav className={`navbar navbar-expand-lg fixed-top navbar-main ${isTransparent ? 'navbar-transparent' : 'navbar-scrolled'}`}>
      <div className="container py-1">
        <Link to="/" className="navbar-brand d-flex align-items-center me-4">
          <BrandLogo height={42} isWhite={isTransparent} />
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="navbar-toggler border-0 shadow-none d-lg-none"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? (
            <X size={28} color={isTransparent ? '#ffffff' : '#293681'} />
          ) : (
            <Menu size={28} color={isTransparent ? '#ffffff' : '#293681'} />
          )}
        </button>

        {/* Desktop Links */}
        <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show d-block mt-3 mt-lg-0 mobile-nav-open' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-1">
            <li className="nav-item">
              <button
                className="nav-link nav-link-custom bg-transparent border-0"
                onClick={() => handleNavClick('home')}
              >
                Home
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link nav-link-custom bg-transparent border-0"
                onClick={() => handleNavClick('about')}
              >
                About us
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link nav-link-custom bg-transparent border-0"
                onClick={() => handleNavClick('projects')}
              >
                Projects
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link nav-link-custom bg-transparent border-0"
                onClick={() => handleNavClick('why-us')}
              >
                Why Us?
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link nav-link-custom bg-transparent border-0"
                onClick={() => handleNavClick('amenities')}
              >
                Amenities
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link nav-link-custom bg-transparent border-0"
                onClick={() => handleNavClick('pricing')}
              >
                Pricing
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link nav-link-custom bg-transparent border-0"
                onClick={() => handleNavClick('contact')}
              >
                Contact us
              </button>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            {/* <a
              href="tel:+919899958739"
              className="text-decoration-none d-none d-xl-flex align-items-center gap-2 fw-semibold nav-phone-link"
              style={{ fontSize: '0.9rem' }}
            >
              <PhoneCall size={16} className="nav-phone-icon" />
              <span>+91 98999 58739</span>
            </a> */}
            <button
              onClick={() => onOpenModal('Request Callback')}
              className={`btn ${isTransparent ? 'btn-gold-lux' : 'btn-primary-lux'} w-100 w-lg-auto`}
            >
              Request Callback
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
