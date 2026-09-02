import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight, MapPin, ArrowRight, Sparkles, Building } from 'lucide-react';
import { projects } from '../data/projectsData';
import Reveal from './common/Reveal';

const FeaturedProjects = ({ onOpenModal }) => {
  return (
    <section id="projects" className="py-5" style={{ background: '#FFFDF1', padding: '90px 0' }}>
      <div className="container">
        {/* Header with Navigation Controls */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 gap-3">
          <Reveal animation="fade-right" duration={700}>
            <div>
              <span className="section-tag">Curated Portfolio</span>
              <h2 className="section-heading mb-0">Featured Developments</h2>
              <p className="text-muted mt-2 mb-0" style={{ maxWidth: '540px' }}>
                Iconic residential towers, golf residences, and premium commercial plazas crafted by India's top developers.
              </p>
            </div>
          </Reveal>

          <Reveal animation="fade-left" delay={150} duration={700}>
            <div className="d-flex align-items-center gap-3">
              <button className="proj-nav-btn custom-proj-prev" aria-label="Previous Slide">
                <ChevronLeft size={22} />
              </button>
              <button className="proj-nav-btn custom-proj-next" aria-label="Next Slide">
                <ChevronRight size={22} />
              </button>
            </div>
          </Reveal>
        </div>

        {/* Swiper Slider */}
        <Reveal animation="fade-up" delay={200} duration={800}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation={{
              prevEl: '.custom-proj-prev',
              nextEl: '.custom-proj-next'
            }}
            pagination={{
              clickable: true,
              el: '.custom-proj-pagination'
            }}
            breakpoints={{
              576: { slidesPerView: 1.4 },
              768: { slidesPerView: 2.2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 3.4 }
            }}
            className="pb-5"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id} className="h-auto">
                <div className="project-card">
                  <img
                    src={project.bgImage}
                    alt={project.title}
                    className="project-card-bg"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="project-card-overlay"></div>

                  <div className="project-card-content">
                    {/* Top Badge */}
                    <div className="mb-auto">
                      <span className="badge-lux">
                        <Sparkles size={12} className="text-gold" />
                        {project.status || project.badge}
                      </span>
                    </div>

                    {/* Bottom Info */}
                    <div>
                      <h3 className="h5 fw-bold text-white mb-1">
                        {project.title}
                      </h3>

                      <div className="d-flex align-items-center gap-1 text-light opacity-90 small mb-2">
                        <MapPin size={14} className="text-gold flex-shrink-0" />
                        <span className="text-truncate">{project.location}</span>
                      </div>

                      <p className="small text-light opacity-75 mb-3 line-clamp-2" style={{ fontSize: '0.82rem', lineHeight: '1.4' }}>
                        {project.spec}
                      </p>

                      <div className="d-flex align-items-center justify-content-between pt-2 border-top border-white border-opacity-25">
                        <div>
                          <span className="d-block text-uppercase" style={{ fontSize: '0.68rem', color: '#E2BD78', letterSpacing: '0.5px' }}>
                            Pricing
                          </span>
                          <strong className="text-white" style={{ fontSize: '0.95rem' }}>
                            {project.price}
                          </strong>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                          <button
                            onClick={() => onOpenModal(`Enquiry: ${project.title}`)}
                            className="btn btn-sm text-white px-2 py-1"
                            style={{ fontSize: '0.8rem', background: 'rgba(197, 137, 64, 0.85)', borderRadius: '4px' }}
                          >
                            Enquire
                          </button>
                          <Link
                            to={`/projects/${project.slug}`}
                            className="card-explore-btn"
                          >
                            Details
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination Bullet Bar */}
          <div className="custom-proj-pagination d-flex justify-content-center mt-3 gap-2"></div>
        </Reveal>
      </div>
    </section>
  );
};

export default FeaturedProjects;
