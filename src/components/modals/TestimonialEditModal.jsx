import React, { useState, useEffect } from 'react';
import { Save, Quote, Star } from 'lucide-react';
import ImageDropzone from '../common/ImageDropzone';
import '../../styles/upload.css';

const TestimonialEditModal = ({ isOpen, onClose, onSave, testimonial = null }) => {
  const isEditing = Boolean(testimonial?.id);

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    role: '',
    unit: '',
    avatar: '',
    rating: 5,
    quote: '',
  });

  useEffect(() => {
    if (testimonial) {
      setFormData({
        id: testimonial.id,
        name: testimonial.name || '',
        role: testimonial.role || '',
        unit: testimonial.unit || '',
        avatar: testimonial.avatar || '',
        rating: testimonial.rating || 5,
        quote: testimonial.quote || '',
      });
    } else {
      setFormData({
        id: null,
        name: '',
        role: 'Verified Resident / Investor',
        unit: 'Purchased at Keylo Luxury Enclave',
        avatar: '',
        rating: 5,
        quote: '',
      });
    }
  }, [testimonial, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.quote.trim()) return;

    const finalTestimonial = {
      ...testimonial,
      ...formData,
      id: formData.id || Date.now(),
      avatar: formData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    };

    onSave(finalTestimonial);
    onClose();
  };

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h3 className="admin-modal-title d-flex align-items-center gap-2">
            <Quote size={20} className="text-primary-lux" />
            {isEditing ? 'Edit Client Review' : 'Add New Client Voice'}
          </h3>
          <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-modal-body">
            <label className="admin-modal-label">
              Client Name *
              <input
                type="text"
                className="admin-modal-input"
                required
                placeholder="e.g. Vikramaditya Singhania"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </label>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="admin-modal-label">
                  Role / Title
                  <input
                    type="text"
                    className="admin-modal-input"
                    placeholder="e.g. Managing Director, Tech Ventures"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                </label>
              </div>

              <div className="col-md-6">
                <label className="admin-modal-label">
                  Unit / Property Description
                  <input
                    type="text"
                    className="admin-modal-input"
                    placeholder="e.g. Invested in ACE New Launch 2.0"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  />
                </label>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="admin-modal-label">
                  Rating (Stars)
                  <select
                    className="admin-modal-select"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  >
                    <option value={5}>5 Stars - Exceptional</option>
                    <option value={4}>4 Stars - Great</option>
                    <option value={3}>3 Stars - Good</option>
                  </select>
                </label>
              </div>
            </div>

            <label className="admin-modal-label">
              Client Avatar (Upload or URL)
              <ImageDropzone
                value={formData.avatar}
                onChange={(url) => setFormData({ ...formData, avatar: url })}
              />
            </label>

            <label className="admin-modal-label">
              Testimonial Quote *
              <textarea
                className="admin-modal-textarea"
                required
                placeholder="Write the homeowner or investor review quote here..."
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
              />
            </label>
          </div>

          <div className="admin-modal-footer">
            <button type="button" className="btn-modal-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-modal-save">
              <Save size={16} />
              {isEditing ? 'Save Review' : 'Add Testimonial'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestimonialEditModal;
