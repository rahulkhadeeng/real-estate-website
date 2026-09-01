import React from 'react';
import { Compass, Percent, Award, CheckCircle } from 'lucide-react';
import { whyUsFeatures } from '../data/testimonialsData';

const icons = [Compass, Percent, Award, CheckCircle];

const WhyUs = () => {
  return (
    <section id="why-us" className="py-5" style={{ background: '#ffffff', padding: '100px 0' }}>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="section-tag">Value Proposition</span>
          <h2 className="section-heading">Why Grow Infinity Realtors?</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '650px', fontSize: '1.05rem' }}>
            We bridge the gap between discerning investors and premier real estate developers with transparency, privileged access, and decades of collective market expertise.
          </p>
        </div>

        <div className="row g-4">
          {whyUsFeatures.map((item, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <div key={item.number} className="col-md-6 col-lg-3">
                <div className="feature-block">
                  <span className="feature-watermark-number">{item.number}</span>
                  <div className="feature-icon-box">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="h5 fw-bold text-secondary mb-2" style={{ letterSpacing: '-0.3px' }}>
                    {item.title}
                  </h3>
                  <p className="small text-muted mb-0" style={{ lineHeight: '1.65' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
