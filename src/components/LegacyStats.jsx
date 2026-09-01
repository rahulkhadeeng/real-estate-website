import React from 'react';
import { TrendingUp, Building2, Users, Award, Briefcase } from 'lucide-react';
import { statsData } from '../data/pricingData';

const iconMap = {
  TrendingUp: TrendingUp,
  Building2: Building2,
  Users: Users,
  Award: Award,
  Briefcase: Briefcase
};

const LegacyStats = () => {
  return (
    <section id="about" className="stats-section">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="section-tag">Our Legacy</span>
          <h2 className="section-heading">
            More than <span className="text-primary-lux">10 Years</span> of Experience
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '720px', fontSize: '1.05rem', lineHeight: '1.75' }}>
            Over the years, Grow Infinity Realtors has built an unparalleled reputation for providing a seamless, transparent experience to customers looking to secure their dream luxury spaces in Noida and Delhi NCR.
          </p>
        </div>

        <div className="row g-3 g-md-4 justify-content-center">
          {statsData.map((stat, index) => {
            const IconComponent = iconMap[stat.iconName] || TrendingUp;
            return (
              <div key={index} className="col-6 col-md-4 col-lg">
                <div className="stat-box">
                  <div className="icon-wrap">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="h4 fw-bold mb-1 text-secondary" style={{ letterSpacing: '-0.5px' }}>
                    {stat.count}
                  </h3>
                  <p className="small text-muted mb-0 fw-medium">
                    {stat.label}
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

export default LegacyStats;
