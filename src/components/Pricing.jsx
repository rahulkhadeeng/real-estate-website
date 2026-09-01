import React from 'react';
import { Check, ArrowRight, Sparkles, Building, Layers } from 'lucide-react';
import { pricingPlans } from '../data/pricingData';

const Pricing = ({ onOpenModal }) => {
  return (
    <section id="pricing" className="py-5" style={{ background: '#ffffff', padding: '100px 0' }}>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="section-tag">PRICING & CONFIGURATIONS</span>
          <h2 className="section-heading">Unlock the Door to Affordable Luxury</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '650px', fontSize: '1.05rem' }}>
            Transparent pricing models, flexible payment milestones, and zero hidden costs on prime residential towers.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {pricingPlans.map((plan) => (
            <div key={plan.id} className="col-md-6 col-lg-4">
              <div className={`price-premium-card ${plan.isFeatured ? 'featured' : ''}`}>
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span
                      className="badge px-3 py-1 fw-bold text-uppercase"
                      style={{
                        background: plan.isFeatured ? 'rgba(41, 54, 129, 0.1)' : 'rgba(197, 137, 64, 0.12)',
                        color: plan.isFeatured ? 'var(--primary)' : 'var(--accent-gold)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {plan.tag}
                    </span>
                    <span className="small text-muted fw-semibold d-flex align-items-center gap-1">
                      <Layers size={14} className="text-primary-lux" />
                      {plan.size}
                    </span>
                  </div>

                  <h3 className="h4 fw-bold text-secondary mb-3">
                    {plan.type}
                  </h3>

                  <div className="mb-4 pb-3 border-bottom border-light">
                    <div className="d-flex align-items-baseline gap-2">
                      <span className="display-6 fw-bold text-primary-lux" style={{ letterSpacing: '-1px' }}>
                        {plan.price}
                      </span>
                      <span className="small text-muted fw-semibold">
                        {plan.pricingSuffix}
                      </span>
                    </div>
                    <small className="text-muted d-block mt-1" style={{ fontSize: '0.8rem' }}>
                      Super Area: <strong className="text-secondary">{plan.size}</strong>
                    </small>
                  </div>

                  <ul className="list-unstyled mb-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="d-flex align-items-start gap-2 mb-2 small text-secondary">
                        <div className="rounded-circle p-1 mt-1 flex-shrink-0" style={{ background: 'rgba(41, 54, 129, 0.08)' }}>
                          <Check size={12} className="text-primary-lux" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <button
                    onClick={() => onOpenModal(`Quote Request: ${plan.type}`)}
                    className={`btn w-100 py-3 d-flex align-items-center justify-content-center gap-2 fw-bold ${
                      plan.isFeatured ? 'btn-primary-lux' : 'btn-outline-lux'
                    }`}
                  >
                    <span>Enquire Now</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
