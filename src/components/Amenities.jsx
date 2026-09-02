import React from 'react';
import { Activity, Waves, Sparkles, Footprints, Tv, Trophy, Smile, Target } from 'lucide-react';
import { amenitiesList } from '../data/amenitiesData';
import Reveal from './common/Reveal';

const iconMap = {
  Activity,
  Waves,
  Sparkles,
  Footprints,
  Tv,
  Trophy,
  Smile,
  Target
};

const Amenities = () => {
  return (
    <section id="amenities" className="py-5" style={{ background: '#FFFDF1', padding: '95px 0' }}>
      <div className="container">
        <Reveal animation="fade-up" duration={700}>
          <div className="text-center max-w-2xl mx-auto mb-5">
            <span className="section-tag">OUR AMENITIES</span>
            <h2 className="section-heading">Amenities that Define Excellence</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '650px', fontSize: '1.05rem' }}>
              Immerse yourself in resort-style recreation, cutting-edge fitness pavilions, and lush green open expanses designed for all generations.
            </p>
          </div>
        </Reveal>

        <div className="row g-3 g-md-4">
          {amenitiesList.map((item, index) => {
            const IconComponent = iconMap[item.iconName] || Sparkles;
            const staggerDelay = (index % 4) * 110 + Math.floor(index / 4) * 60;
            return (
              <div key={item.id} className="col-6 col-md-4 col-lg-3">
                <Reveal animation="zoom-in" delay={staggerDelay} duration={600} className="h-100">
                  <div className="amenity-card">
                    <img
                      src={item.bgImage}
                      alt={item.title}
                      className="amenity-img"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <div className="amenity-overlay"></div>
                    <div className="amenity-content">
                      <div className="amenity-icon-box">
                        <IconComponent size={18} />
                      </div>
                      <h4 className="h6 fw-bold text-white mb-0">
                        {item.title}
                      </h4>
                      <span className="small text-light opacity-75" style={{ fontSize: '0.75rem' }}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
