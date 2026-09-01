import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Building, ShieldCheck, CheckCircle2, FileText, Download, Phone, Calendar, ArrowLeft, ArrowRight, Sparkles, Layers } from 'lucide-react';
import { projects } from '../data/projectsData';

const ProjectDetailPage = ({ onOpenModal }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug) || projects[0];

  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    message: `I would like more information and brochure for ${project.title}.`
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.phone || formState.phone.length < 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormState({
          name: '',
          phone: '',
          email: '',
          message: `I would like more information and brochure for ${project.title}.`
        });
      }, 4000);
    }, 700);
  };

  return (
    <div className="pt-5 mt-4" style={{ background: '#FFFDF1', minHeight: '100vh' }}>
      {/* Top Project Banner */}
      <section className="position-relative py-5 text-white" style={{ minHeight: '380px', display: 'flex', alignItems: 'center', background: '#131730' }}>
        <img
          src={project.bgImage}
          alt={project.title}
          className="position-absolute w-100 h-100 top-0 start-0"
          style={{ objectFit: 'cover', opacity: 0.35 }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80';
          }}
        />
        <div className="position-absolute w-100 h-100 top-0 start-0" style={{ background: 'linear-gradient(180deg, rgba(19, 23, 48, 0.4) 0%, rgba(19, 23, 48, 0.95) 100%)' }}></div>

        <div className="container position-relative z-2 py-4">
          <Link to="/" className="text-white opacity-75 text-decoration-none d-inline-flex align-items-center gap-1 small mb-3 hover-white">
            <ArrowLeft size={16} /> Back to All Developments
          </Link>

          <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
            <span className="badge-lux">
              <Sparkles size={12} className="text-gold" />
              {project.status || 'Verified Property'}
            </span>
            <span className="badge bg-white text-dark small fw-semibold px-2 py-1">
              By {project.developer}
            </span>
          </div>

          <h1 className="display-5 fw-bold text-white mb-2" style={{ letterSpacing: '-0.5px' }}>
            {project.title}
          </h1>

          <div className="d-flex flex-wrap align-items-center gap-3 text-light opacity-90 mb-4">
            <div className="d-flex align-items-center gap-1">
              <MapPin size={16} className="text-gold" />
              <span>{project.location}</span>
            </div>
            <div className="d-flex align-items-center gap-1">
              <Building size={16} className="text-gold" />
              <span>{project.spec}</span>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-3">
            <button
              onClick={() => onOpenModal(`Download Brochure: ${project.title}`)}
              className="btn btn-gold-lux"
            >
              <Download size={16} /> Download Brochure
            </button>
            <button
              onClick={() => onOpenModal(`Private Tour: ${project.title}`)}
              className="btn btn-outline-light"
            >
              <Calendar size={16} /> Schedule Site Visit
            </button>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            {/* Left Main Content */}
            <div className="col-lg-8">
              {/* Project Overview */}
              <div className="p-4 p-md-5 rounded-4 bg-white border mb-4 shadow-sm" style={{ borderColor: 'rgba(41, 54, 129, 0.08)' }}>
                <span className="section-tag">Overview</span>
                <h2 className="h4 fw-bold text-secondary mb-3">About {project.title}</h2>
                <p className="text-secondary mb-4" style={{ fontSize: '1.02rem', lineHeight: '1.75' }}>
                  {project.overview}
                </p>

                <div className="row g-3 pt-3 border-top">
                  <div className="col-sm-6 col-md-4">
                    <small className="text-muted d-block">Developer</small>
                    <strong className="text-secondary">{project.developer}</strong>
                  </div>
                  <div className="col-sm-6 col-md-4">
                    <small className="text-muted d-block">Location</small>
                    <strong className="text-secondary">{project.location}</strong>
                  </div>
                  <div className="col-sm-6 col-md-4">
                    <small className="text-muted d-block">Pricing</small>
                    <strong className="text-primary-lux">{project.price}</strong>
                  </div>
                </div>
              </div>

              {/* Configurations & Typologies */}
              <div className="p-4 p-md-5 rounded-4 bg-white border mb-4 shadow-sm" style={{ borderColor: 'rgba(41, 54, 129, 0.08)' }}>
                <span className="section-tag">Typologies & Units</span>
                <h3 className="h4 fw-bold text-secondary mb-4">Available Configurations</h3>

                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead style={{ background: '#FFFDF1' }}>
                      <tr>
                        <th className="py-3 text-secondary">Unit Type</th>
                        <th className="py-3 text-secondary">Super Area</th>
                        <th className="py-3 text-secondary">Starting Price</th>
                        <th className="py-3 text-end text-secondary">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.configurations.map((cfg, i) => (
                        <tr key={i}>
                          <td className="py-3 fw-semibold text-secondary">
                            <Layers size={14} className="text-primary-lux me-2" />
                            {cfg.type}
                          </td>
                          <td className="py-3 text-muted">{cfg.size}</td>
                          <td className="py-3 fw-bold text-primary-lux">{cfg.price}</td>
                          <td className="py-3 text-end">
                            <button
                              onClick={() => onOpenModal(`Enquiry: ${project.title} - ${cfg.type}`)}
                              className="btn btn-sm btn-primary-lux"
                            >
                              Price Breakup
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="p-4 p-md-5 rounded-4 bg-white border mb-4 shadow-sm" style={{ borderColor: 'rgba(41, 54, 129, 0.08)' }}>
                <span className="section-tag">Key Highlights</span>
                <h3 className="h4 fw-bold text-secondary mb-4">Why Invest in {project.title}?</h3>

                <div className="row g-3">
                  {project.highlights.map((highlight, idx) => (
                    <div key={idx} className="col-md-6">
                      <div className="d-flex align-items-start gap-2 p-3 rounded-3" style={{ background: '#FFFDF1', border: '1px solid rgba(41, 54, 129, 0.08)' }}>
                        <CheckCircle2 size={18} className="text-gold flex-shrink-0 mt-1" />
                        <span className="small fw-semibold text-secondary">{highlight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="p-4 p-md-5 rounded-4 bg-white border mb-4 shadow-sm" style={{ borderColor: 'rgba(41, 54, 129, 0.08)' }}>
                <span className="section-tag">Lifestyle Features</span>
                <h3 className="h4 fw-bold text-secondary mb-4">Curated Amenities</h3>

                <div className="d-flex flex-wrap gap-2">
                  {project.amenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-2 rounded-pill small fw-semibold text-secondary border"
                      style={{ background: '#FFFDF1', borderColor: 'rgba(41, 54, 129, 0.12)' }}
                    >
                      ✨ {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar: Sticky Callback & Tour Request Form */}
            <div className="col-lg-4">
              <div className="p-4 rounded-4 bg-white border shadow-sm sticky-top" style={{ top: '100px', borderColor: 'rgba(41, 54, 129, 0.12)' }}>
                <div className="text-center mb-4">
                  <span className="badge-lux mb-2">Priority Allotment</span>
                  <h4 className="h5 fw-bold text-secondary mb-1">Request Price Sheet</h4>
                  <p className="small text-muted mb-0">Direct developer inventory check & instant unit allotment consultation.</p>
                </div>

                {submitted ? (
                  <div className="text-center py-4">
                    <CheckCircle2 size={46} className="text-success mx-auto mb-2" />
                    <h5 className="h6 fw-bold text-secondary">Thank You!</h5>
                    <p className="small text-muted mb-0">Our dedicated {project.developer} specialist will connect with you in 15 minutes.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-secondary">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="form-control input-lux"
                        placeholder="Full Name"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-secondary">Contact Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        maxLength="10"
                        className="form-control input-lux"
                        placeholder="10-digit mobile number"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-secondary">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="form-control input-lux"
                        placeholder="Email ID"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label small fw-semibold text-secondary">Message / Query</label>
                      <textarea
                        rows="3"
                        className="form-control input-lux"
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary-lux w-100 py-3 justify-content-center fw-bold mb-3"
                    >
                      {loading ? 'Submitting...' : 'Instant Callback'}
                      <ArrowRight size={16} />
                    </button>

                    <div className="text-center">
                      <a href="tel:+919899958739" className="text-decoration-none small fw-semibold text-secondary d-inline-flex align-items-center gap-1">
                        <Phone size={14} className="text-primary-lux" /> Call Helpline: +91 98999 58739
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
