import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, User, Phone, Mail, Home, IndianRupee, Send, 
  CheckCircle2, ArrowRight, Sparkles, MapPin, Building, Search, 
  ChevronRight, Compass, Award, Star
} from 'lucide-react';
import Reveal from './common/Reveal';

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
    title: 'Signature Golf Enclaves',
    tag: 'Sector 128 & 150'
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    title: 'Ultra-Luxe Sky Penthouses',
    tag: 'Expressway Corridors'
  },
  {
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85',
    title: 'Grade-A Commercial Landmarks',
    tag: 'Central Business District'
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85',
    title: 'Resort-Style Waterfront Estates',
    tag: 'Exclusive Pre-Launch'
  }
];

const Hero = ({ onOpenModal }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    lookingFor: 'Luxury Apartments',
    budget: '₹ 1.5 Cr - ₹ 3.0 Cr',
    authorized: true
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auto-rotate hero background slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.phone || formData.phone.length < 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          lookingFor: 'Luxury Apartments',
          budget: '₹ 1.5 Cr - ₹ 3.0 Cr',
          authorized: true
        });
      }, 4500);
    }, 800);
  };

  return (
    <section id="home" className="hero-wrapper">
      {/* Background Slides with smooth crossfade and zoom */}
      <div className="hero-slides-container">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`hero-slide-item ${idx === currentSlide ? 'active' : ''}`}
          >
            <img src={slide.image} alt={slide.title} />
          </div>
        ))}
      </div>
      <div className="hero-bg-overlay"></div>

      <div className="container hero-content py-2">
        <div className="row align-items-center g-4 g-lg-5">
          {/* Left Column: Editorial Luxury Headline & Trust */}
          <div className="col-lg-7 text-white">
            <Reveal animation="fade-down" delay={100}>
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-3 hero-trust-pill hero-trust-pill-gold">
                <Sparkles size={15} className="text-gold" />
                <span className="small fw-semibold text-uppercase tracking-wider text-white" style={{ letterSpacing: '0.8px', fontSize: '0.75rem' }}>
                  Authorized Channel Partner • Noida Expressway & NCR
                </span>
              </div>
            </Reveal>

            <Reveal animation="fade-up" delay={180}>
              <h1 className="hero-display-title mb-2">
                Crafting Exceptional <br />
                <span className="text-gold-gradient font-serif fst-italic">Living Spaces & Landmarks</span>
              </h1>
            </Reveal>

            <Reveal animation="fade-up" delay={260}>
              <p className="hero-lead-text mb-3" style={{ fontSize: '1.02rem', maxWidth: '540px' }}>
                Explore handpicked, ultra-luxury residential enclaves, golf-facing sky residences, and Grade-A commercial landmarks curated across Noida & Delhi NCR.
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal animation="fade-up" delay={340}>
              <div className="d-flex flex-wrap align-items-center gap-3 mb-3 pb-1">
                <a
                  href="#projects"
                  className="btn btn-gold-lux py-2.5 px-4 fw-bold d-inline-flex align-items-center gap-2 shadow-lg"
                  style={{ fontSize: '0.92rem' }}
                >
                  <span>Explore Portfolio</span>
                  <ArrowRight size={17} />
                </a>

                <button
                  onClick={() => onOpenModal('Hero Consultation')}
                  className="btn btn-outline-lux text-white py-2.5 px-4 fw-bold d-inline-flex align-items-center gap-2"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(10px)',
                    fontSize: '0.92rem'
                  }}
                >
                  <Compass size={17} className="text-gold" />
                  <span className="text-white">Schedule Private Tour</span>
                </button>
              </div>
            </Reveal>

            {/* Stats Row */}
            <Reveal animation="fade-up" delay={420}>
              <div className="hero-stats-row py-2">
                <div className="hero-stat-item">
                  <span className="val" style={{ fontSize: '1.25rem' }}>₹1,200+ Cr</span>
                  <span className="lbl" style={{ fontSize: '0.72rem' }}>Portfolio Transacted</span>
                </div>
                <div className="hero-stat-item">
                  <span className="val" style={{ fontSize: '1.25rem' }}>0% Brokerage</span>
                  <span className="lbl" style={{ fontSize: '0.72rem' }}>Direct Allotment</span>
                </div>
                <div className="hero-stat-item">
                  <span className="val" style={{ fontSize: '1.25rem' }}>1,500+</span>
                  <span className="lbl" style={{ fontSize: '0.72rem' }}>Discerning Buyers</span>
                </div>
                <div className="hero-stat-item">
                  <span className="val" style={{ fontSize: '1.25rem' }}>100%</span>
                  <span className="lbl" style={{ fontSize: '0.72rem' }}>RERA Verified</span>
                </div>
              </div>
            </Reveal>

            {/* Slide Navigation Pills */}
            <div className="hero-slide-nav-bar mt-3 pt-1">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`hero-slide-dot ${idx === currentSlide ? 'active' : ''}`}
                  aria-label={`View slide ${idx + 1}`}
                >
                  <span>0{idx + 1}.</span>
                  <span className="d-none d-sm-inline">{slide.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Lead Tour Card */}
          <div className="col-lg-5">
            <Reveal animation="fade-left" delay={250} duration={850}>
              <div className="hero-form-card py-4 px-3 px-sm-4">
                <div className="text-center mb-3">
                  <span className="badge-lux mb-1.5" style={{ fontSize: '0.68rem', padding: '0.25rem 0.6rem' }}>
                    <Sparkles size={12} className="text-gold" />
                    Priority Access
                  </span>
                  <h3 className="h5 fw-bold text-secondary mb-1">Book a Private Site Tour</h3>
                  <p className="small text-muted mb-0" style={{ fontSize: '0.8rem' }}>
                    Receive personalized floor layouts, payment milestones & cost sheets.
                  </p>
                </div>

                {submitted ? (
                  <div className="text-center py-4">
                    <CheckCircle2 size={50} className="text-success mx-auto mb-2 animate-soft-float" />
                    <h5 className="h6 fw-bold text-secondary mb-1">Inquiry Received!</h5>
                    <p className="small text-muted mb-0">
                      Our Senior Portfolio Specialist will connect with you within 15 minutes.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-2.5">
                      <label className="form-label small fw-semibold text-secondary mb-1" style={{ fontSize: '0.8rem' }}>Your Full Name</label>
                      <div className="input-group">
                        <span className="input-group-text bg-white border-end-0 text-muted py-1.5">
                          <User size={15} />
                        </span>
                        <input
                          type="text"
                          name="name"
                          required
                          className="form-control input-lux border-start-0 ps-0 py-1.5"
                          placeholder="e.g. Rahul Sharma"
                          value={formData.name}
                          onChange={handleChange}
                          style={{ fontSize: '0.88rem' }}
                        />
                      </div>
                    </div>

                    <div className="mb-2.5">
                      <label className="form-label small fw-semibold text-secondary mb-1" style={{ fontSize: '0.8rem' }}>Mobile Number</label>
                      <div className="input-group">
                        <span className="input-group-text bg-white border-end-0 text-muted py-1.5">
                          <Phone size={15} />
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          required
                          maxLength="10"
                          className="form-control input-lux border-start-0 ps-0 py-1.5"
                          placeholder="98XXXXXXXX"
                          value={formData.phone}
                          onChange={handleChange}
                          style={{ fontSize: '0.88rem' }}
                        />
                      </div>
                    </div>

                    <div className="row g-2 mb-2.5">
                      <div className="col-6">
                        <label className="form-label small fw-semibold text-secondary mb-1" style={{ fontSize: '0.8rem' }}>Configuration</label>
                        <select
                          name="lookingFor"
                          className="form-select input-lux py-1.5"
                          value={formData.lookingFor}
                          onChange={handleChange}
                          style={{ fontSize: '0.85rem' }}
                        >
                          <option value="3 BHK Luxury">3 BHK Luxury</option>
                          <option value="4 BHK Luxury">4 BHK Luxury</option>
                          <option value="4 BHK + Servant">4 BHK + Servant</option>
                          <option value="Penthouses / Sky Villas">Penthouses</option>
                          <option value="Grade-A Commercial">Commercial Space</option>
                        </select>
                      </div>

                      <div className="col-6">
                        <label className="form-label small fw-semibold text-secondary mb-1" style={{ fontSize: '0.8rem' }}>Budget Range</label>
                        <select
                          name="budget"
                          className="form-select input-lux py-1.5"
                          value={formData.budget}
                          onChange={handleChange}
                          style={{ fontSize: '0.85rem' }}
                        >
                          <option value="₹ 1.5 Cr - ₹ 3.0 Cr">₹ 1.5 - ₹ 3.0 Cr</option>
                          <option value="₹ 3.0 Cr - ₹ 5.0 Cr">₹ 3.0 - ₹ 5.0 Cr</option>
                          <option value="₹ 5.0 Cr - ₹ 10 Cr+">₹ 5.0 Cr+</option>
                          <option value="On Request">Custom / High Yield</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="authorized"
                        id="heroAuthCheck"
                        checked={formData.authorized}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-check-label small text-muted" htmlFor="heroAuthCheck" style={{ fontSize: '0.72rem', lineHeight: '1.35' }}>
                        I authorize Grow Infinity Realtors to contact me via Call, SMS & WhatsApp.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary-lux w-100 py-2.5 justify-content-center fw-bold shadow-sm"
                      style={{ fontSize: '0.9rem' }}
                    >
                      {loading ? 'Securing Site Tour...' : 'Request Instant VIP Tour'}
                      <ArrowRight size={17} />
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
