import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Building2 } from 'lucide-react';
import Reveal from './common/Reveal';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.phone || formData.phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', phone: '', email: '', message: '' });
      }, 4000);
    }, 700);
  };

  return (
    <section id="contact" className="py-5" style={{ background: '#ffffff', padding: '100px 0' }}>
      <div className="container">
        <Reveal animation="fade-up" duration={700}>
          <div className="text-center max-w-2xl mx-auto mb-5">
            <span className="section-tag">LET'S CONNECT</span>
            <h2 className="section-heading">Get in Touch with Our Advisors</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '650px', fontSize: '1.05rem' }}>
              Schedule an executive consultation or request an on-ground site tour with our senior luxury property consultants.
            </p>
          </div>
        </Reveal>

        <div className="row g-5 align-items-center">
          {/* Left Column: Contact Cards */}
          <div className="col-lg-5">
            <div className="d-flex flex-column gap-4">
              <Reveal animation="fade-right" delay={100} duration={650}>
                <div className="d-flex align-items-start gap-3 p-4 rounded-3 border" style={{ background: '#FFFDF1', borderColor: 'rgba(41, 54, 129, 0.1)' }}>
                  <div className="rounded-circle p-3 text-white flex-shrink-0" style={{ background: 'var(--primary)' }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="h6 fw-bold text-secondary mb-1">Corporate Office</h4>
                    <p className="small text-muted mb-0" style={{ lineHeight: '1.6' }}>
                      Keylo, Sector 132, Noida-Greater Noida Expressway, Uttar Pradesh – 201304
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal animation="fade-right" delay={200} duration={650}>
                <div className="d-flex align-items-start gap-3 p-4 rounded-3 border" style={{ background: '#FFFDF1', borderColor: 'rgba(41, 54, 129, 0.1)' }}>
                  <div className="rounded-circle p-3 text-white flex-shrink-0" style={{ background: 'var(--accent-gold)' }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 className="h6 fw-bold text-secondary mb-1">Direct Helpline</h4>
                    <a href="tel:+919899958739" className="text-decoration-none fw-semibold text-secondary d-block">
                      +91 98999 58739
                    </a>
                    <small className="text-muted">Mon - Sun : 9:00 AM – 8:00 PM</small>
                  </div>
                </div>
              </Reveal>

              <Reveal animation="fade-right" delay={300} duration={650}>
                <div className="d-flex align-items-start gap-3 p-4 rounded-3 border" style={{ background: '#FFFDF1', borderColor: 'rgba(41, 54, 129, 0.1)' }}>
                  <div className="rounded-circle p-3 text-white flex-shrink-0" style={{ background: 'var(--primary)' }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 className="h6 fw-bold text-secondary mb-1">Official Email</h4>
                    <a href="mailto:info@keylo.in" className="text-decoration-none fw-semibold text-secondary d-block">
                      info@keylo.in
                    </a>
                    <small className="text-muted">Replies within 2 business hours</small>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="col-lg-7">
            <Reveal animation="fade-left" delay={200} duration={750}>
              <div className="p-4 p-md-5 rounded-4 shadow-sm border" style={{ background: '#FFFDF1', borderColor: 'rgba(41, 54, 129, 0.12)' }}>
                <div className="mb-4">
                  <span className="badge-lux mb-2">Instant Response</span>
                  <h3 className="h4 fw-bold text-secondary mb-1">Send a Message</h3>
                  <p className="small text-muted mb-0">Fill out your details to receive customized brochures and project portfolios.</p>
                </div>

                {submitted ? (
                  <div className="text-center py-5">
                    <CheckCircle2 size={54} className="text-success mx-auto mb-3" />
                    <h4 className="h5 fw-bold text-secondary">Thank you!</h4>
                    <p className="small text-muted mb-0">Our executive has received your message and will reach out shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-secondary">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="form-control input-lux"
                          placeholder="e.g. Aditi Rao"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-secondary">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          maxLength="10"
                          className="form-control input-lux"
                          placeholder="98XXXXXXXX"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-secondary">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="form-control input-lux"
                        placeholder="aditi@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label small fw-semibold text-secondary">Your Requirements / Question</label>
                      <textarea
                        name="message"
                        rows="3"
                        className="form-control input-lux"
                        placeholder="Tell us about the project, budget, or preferred location you are interested in..."
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary-lux w-100 py-3 justify-content-center fw-bold"
                    >
                      {loading ? 'Submitting...' : 'Submit Message'}
                      <Send size={18} />
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

export default ContactSection;
