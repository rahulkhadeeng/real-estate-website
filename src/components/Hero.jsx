import React, { useState } from 'react';
import { ShieldCheck, User, Phone, Mail, Home, IndianRupee, Send, CheckCircle2, ArrowRight } from 'lucide-react';

const Hero = ({ onOpenModal }) => {
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
      }, 4000);
    }, 800);
  };

  return (
    <section id="home" className="hero-wrapper">
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
        alt="Grow Infinity Luxury Real Estate"
        className="hero-slider-img"
      />
      <div className="hero-bg-overlay"></div>

      <div className="container hero-content py-5">
        <div className="row align-items-center g-5">
          {/* Left Column: Hero Text */}
          <div className="col-lg-7 text-white">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill mb-4" style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <ShieldCheck size={18} className="text-gold" />
              <span className="small fw-semibold text-uppercase tracking-wider">Authorized Channel Partner • Noida Expressway</span>
            </div>

            <h1 className="display-4 fw-bold mb-3 text-white" style={{ letterSpacing: '-1px', lineHeight: 1.15 }}>
              Crafting Exceptional <br />
              <span style={{ color: '#E2BD78' }}>Living Spaces</span>
            </h1>

            <p className="lead text-light mb-4" style={{ opacity: 0.9, maxWidth: '560px', fontSize: '1.15rem' }}>
              Explore handpicked, ultra-luxury residential enclaves and Grade-A commercial landmarks across Noida, Greater Noida Expressway & Delhi NCR.
            </p>

            <div className="d-flex flex-wrap gap-4 pt-2">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-circle p-2" style={{ background: 'rgba(226, 189, 120, 0.2)' }}>
                  <CheckCircle2 size={24} color="#E2BD78" />
                </div>
                <div>
                  <h6 className="mb-0 fw-bold text-white">Zero Brokerage</h6>
                  <small className="text-light opacity-75">Direct Developer Allotment</small>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="rounded-circle p-2" style={{ background: 'rgba(226, 189, 120, 0.2)' }}>
                  <CheckCircle2 size={24} color="#E2BD78" />
                </div>
                <div>
                  <h6 className="mb-0 fw-bold text-white">Priority Pricing</h6>
                  <small className="text-light opacity-75">Exclusive Pre-Launch Access</small>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Strategic Enquiry Form */}
          <div className="col-lg-5">
            <div className="hero-form-card">
              <div className="text-center mb-4">
                <span className="badge-lux mb-2">Exclusive Access</span>
                <h3 className="h4 fw-bold text-secondary mb-1">Book a Private Site Tour</h3>
                <p className="small text-muted mb-0">
                  Receive personalized brochures, floor layouts & pricing sheets instantly.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-5">
                  <CheckCircle2 size={56} className="text-success mx-auto mb-3" />
                  <h5 className="fw-bold text-secondary">Inquiry Received!</h5>
                  <p className="small text-muted">
                    Our Senior Portfolio Specialist will contact you within 15 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary mb-1">Your Full Name</label>
                    <div className="input-group">
                      <input
                        type="text"
                        name="name"
                        required
                        className="form-control input-lux"
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary mb-1">Phone Number</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0 text-muted" style={{ border: '1px solid rgba(41, 54, 129, 0.15)', borderRadius: '6px 0 0 6px' }}>+91</span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        maxLength="10"
                        className="form-control input-lux border-start-0"
                        style={{ borderRadius: '0 6px 6px 0' }}
                        placeholder="98XXXXXXXX"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="form-control input-lux"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold text-secondary mb-1">Looking For</label>
                      <select
                        name="lookingFor"
                        className="form-select input-lux"
                        value={formData.lookingFor}
                        onChange={handleChange}
                      >
                        <option value="Luxury Apartments">Luxury Apartments</option>
                        <option value="Penthouses / Sky Villas">Penthouses / Villas</option>
                        <option value="High-Street Retail">High-Street Retail</option>
                        <option value="Corporate Suites">Corporate Suites</option>
                        <option value="Plots / Green Reserves">Plots / Land</option>
                      </select>
                    </div>

                    <div className="col-6">
                      <label className="form-label small fw-semibold text-secondary mb-1">Budget Range</label>
                      <select
                        name="budget"
                        className="form-select input-lux"
                        value={formData.budget}
                        onChange={handleChange}
                      >
                        <option value="Below ₹ 1.5 Crore">Below ₹ 1.5 Cr</option>
                        <option value="₹ 1.5 Cr - ₹ 3.0 Cr">₹ 1.5 - 3.0 Cr</option>
                        <option value="₹ 3.0 Cr - ₹ 5.0 Cr">₹ 3.0 - 5.0 Cr</option>
                        <option value="Above ₹ 5.0 Crore">Above ₹ 5.0 Cr</option>
                        <option value="On Request">On Request</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="authorized"
                      id="heroAuthCheck"
                      checked={formData.authorized}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label small text-muted" htmlFor="heroAuthCheck" style={{ fontSize: '0.78rem' }}>
                      I authorize Grow Infinity Realtors to contact me via Call, SMS & WhatsApp.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary-lux w-100 py-3 justify-content-center fw-bold"
                  >
                    {loading ? 'Processing...' : 'Book Private Tour'}
                    <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
