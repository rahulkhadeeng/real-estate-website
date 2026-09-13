import React, { useState } from 'react';
import { Star, Quote, CheckCircle2, Plus, Edit2, Trash2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import TestimonialEditModal from './modals/TestimonialEditModal';
import Reveal from './common/Reveal';
import '../styles/upload.css';

const Testimonials = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial, isEditable } = useContent();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const handleCreateNew = () => {
    setSelectedTestimonial(null);
    setModalOpen(true);
  };

  const handleEdit = (testimonial, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedTestimonial(testimonial);
    setModalOpen(true);
  };

  const handleDelete = (id, name, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete review from "${name}"?`)) {
      deleteTestimonial(id);
    }
  };

  const handleSave = (testimonialData) => {
    if (selectedTestimonial?.id) {
      updateTestimonial(testimonialData);
    } else {
      addTestimonial(testimonialData);
    }
  };

  return (
    <section className="py-5" style={{ background: '#FFFDF1', padding: '95px 0' }}>
      <div className="container">
        <Reveal animation="fade-up" duration={700}>
          <div className="text-center max-w-2xl mx-auto mb-5">
            <span className="section-tag">CLIENT VOICES</span>
            <h2 className="section-heading">Trusted by Homeowners & Investors</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '650px', fontSize: '1.05rem' }}>
              Hear firsthand from families and institutional buyers who found their dream residences through Keylo.
            </p>

            {/* Add Testimonial Button for Authenticated Client/Admin */}
            {isEditable && (
              <div className="mt-3">
                <button
                  type="button"
                  className="btn-section-add"
                  onClick={handleCreateNew}
                >
                  <Plus size={16} />
                  <span>Add Client Voice</span>
                </button>
              </div>
            )}
          </div>
        </Reveal>

        <div className="row g-4">
          {testimonials.map((item, index) => (
            <div key={item.id} className="col-md-6 col-lg-6">
              <Reveal
                animation={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                delay={index * 150}
                duration={750}
                className="h-100"
              >
                <div className="testimonial-card position-relative">
                  {/* Floating Edit & Delete Controls for Authenticated Client/Admin */}
                  {isEditable && (
                    <div className="admin-card-actions">
                      <button
                        type="button"
                        className="btn-card-action btn-card-edit"
                        title="Edit Testimonial"
                        onClick={(e) => handleEdit(item, e)}
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        type="button"
                        className="btn-card-action btn-card-delete"
                        title="Delete Testimonial"
                        onClick={(e) => handleDelete(item.id, item.name, e)}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  )}

                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex align-items-center gap-1 text-warning">
                        {[...Array(item.rating || 5)].map((_, i) => (
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
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                      }}
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
              </Reveal>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Edit Modal */}
      <TestimonialEditModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        testimonial={selectedTestimonial}
      />
    </section>
  );
};

export default Testimonials;
