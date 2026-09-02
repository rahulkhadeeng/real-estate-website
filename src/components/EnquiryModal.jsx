import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const EnquiryModal = ({ isOpen, onClose, title = 'Exclusive Showcase' }) => {
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

  if (!isOpen) return null;

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
        onClose();
        setFormData({
          name: '',
          phone: '',
          email: '',
          lookingFor: 'Luxury Apartments',
          budget: '₹ 1.5 Cr - ₹ 3.0 Cr',
          authorized: true
        });
      }, 3000);
    }, 700);
  };

  return (
    <div className="modal-backdrop-custom" onClick={onClose}>
      <div className="modal-dialog-lux p-4 p-md-5" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn-close position-absolute top-0 end-0 m-4 shadow-none popup-close-hover"
          aria-label="Close"
        ></button>

        {submitted ? (
          <div className="text-center py-5">
            <div className="rounded-circle p-3 d-inline-flex mb-3" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
              <CheckCircle2 size={48} className="text-success" />
            </div>
            <h3 className="h4 fw-bold text-secondary mb-2">Request Confirmed!</h3>
            <p className="text-muted small mb-0">
              Thank you, {formData.name}. Our luxury relationship manager is assigning your priority booking details right now.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <span className="badge-lux mb-2">
                <Sparkles size={12} className="text-gold" />
                Priority Access
              </span>
              <h3 className="h4 fw-bold text-secondary mb-2">{title}</h3>
              <p className="small text-muted mb-0" style={{ lineHeight: '1.5' }}>
                Leave your requirements below to receive instant strategic callbacks, private portfolios, and executive pricing sheets.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  required
                  className="form-control input-lux"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="row g-2 mb-3">
                <div className="col-12 col-md-6">
                  <input
                    type="tel"
                    name="phone"
                    required
                    maxLength="10"
                    className="form-control input-lux"
                    placeholder="Mobile Number (10 digits)"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <input
                    type="email"
                    name="email"
                    required
                    className="form-control input-lux"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
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
                    <option value="Penthouses / Sky Villas">Penthouses / Sky Villas</option>
                    <option value="High-Street Retail">High-Street Retail</option>
                    <option value="Corporate Suites">Corporate Suites</option>
                    <option value="Plots / Green Reserves">Plots / Green Reserves</option>
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
                    <option value="Below ₹ 1.5 Crore">Below ₹ 1.5 Crore</option>
                    <option value="₹ 1.5 Cr - ₹ 3.0 Cr">₹ 1.5 Cr - ₹ 3.0 Cr</option>
                    <option value="₹ 3.0 Cr - ₹ 5.0 Cr">₹ 3.0 Cr - ₹ 5.0 Cr</option>
                    <option value="Above ₹ 5.0 Crore">Above ₹ 5.0 Crore</option>
                    <option value="On Request">On Request</option>
                  </select>
                </div>
              </div>

              <div className="form-check mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="authorized"
                  id="modalAuthCheck"
                  checked={formData.authorized}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label small text-muted" htmlFor="modalAuthCheck" style={{ fontSize: '0.76rem' }}>
                  I authorize Keylo Representatives to share strategic updates via Call, SMS & WhatsApp channels.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary-lux w-100 py-3 justify-content-center fw-bold"
              >
                {loading ? 'Submitting...' : 'Book Private Tour'}
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnquiryModal;
