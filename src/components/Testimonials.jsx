import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { testimonials } from '../data/testimonialsData';

const Testimonials = () => {
  return (
    <section className="py-5" style={{ background: '#FFFDF1', padding: '95px 0' }}>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="section-tag">CLIENT VOICES</span>
          <h2 className="section-heading">Trusted by Homeowners & Investors</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '650px', fontSize: '1.05rem' }}>
            Hear firsthand from families and institutional buyers who found their dream residences through Grow Infinity Realtors.
          </p>
        </div>

        <div className="row g-4">
          {testimonials.map((item) => (
            <div key={item.id} className="col-md-6 col-lg-6">
              <div className="testimonial-card">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center gap-1 text-warning">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="#F59E0B" stroke="#F59E0B" />
                      ))}
                    </div>
                    <Quote size={28} className="text-primary-lux opacity-25" />
                  </div>

                  <p className="text-secondary mb-4 fst-italic" style={{ fontSize: '0.96rem', lineHeight: '1.7' }}>
                    "{item.quote}"
                  </p>
                </div>

                <div className="d-flex align-items-center gap-3 pt-3 border-top border-light">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="testimonial-avatar"
                  />
                  <div>
                    <h5 className="h6 fw-bold text-secondary mb-0 d-flex align-items-center gap-1">
                      {item.name}
                      <CheckCircle2 size={14} className="text-success" />
                    </h5>
                    <small className="text-muted d-block" style={{ fontSize: '0.78rem' }}>
                      {item.role}
                    </small>
                    <span className="small text-primary-lux fw-semibold" style={{ fontSize: '0.75rem' }}>
                      {item.unit}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
