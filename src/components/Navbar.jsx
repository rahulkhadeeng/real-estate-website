import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, User, LogOut, ChevronDown } from 'lucide-react';
import BrandLogo from './common/BrandLogo';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

const Navbar = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const { session, isAuthenticated, logout } = useAuth();
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

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
            {/* Auth Button or User Menu */}
            {isAuthenticated ? (
              <div className="nav-user-dropdown" ref={dropdownRef}>
                <button
                  type="button"
                  className="nav-user-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                >
                  <div className="nav-avatar-circle">
                    {session?.name ? session.name.charAt(0).toUpperCase() : session?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span>{session?.name || session?.email?.split('@')[0]}</span>
                  <ChevronDown size={14} />
                </button>

                {userDropdownOpen && (
                  <div className="nav-user-menu">
                    <div className="nav-user-menu-header">
                      <div className="nav-user-menu-name">{session?.name || 'Valued Client'}</div>
                      <div className="nav-user-menu-email">{session?.email}</div>
                    </div>
                    <button
                      type="button"
                      className="nav-user-menu-item logout-item"
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                    >
                      <LogOut size={15} />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className={`btn-auth-nav ${isTransparent ? 'btn-auth-nav-transparent' : 'btn-auth-nav-scrolled'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <User size={15} />
                <span>Sign In</span>
              </Link>
            )}

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
