import React, { useState, useEffect } from 'react';
import { X, Save, Building, MapPin, Tag, Sparkles } from 'lucide-react';
import ImageDropzone from '../common/ImageDropzone';
import '../../styles/upload.css';

const ProjectEditModal = ({ isOpen, onClose, onSave, project = null }) => {
  const isEditing = Boolean(project?.id);

  const [formData, setFormData] = useState({
    id: '',
    slug: '',
    title: '',
    developer: '',
    location: '',
    spec: '',
    status: '',
    price: '',
    bgImage: '',
    badge: '',
    overview: '',
  });

  useEffect(() => {
    if (project) {
      setFormData({
        id: project.id || '',
        slug: project.slug || project.id || '',
        title: project.title || '',
        developer: project.developer || '',
        location: project.location || '',
        spec: project.spec || '',
        status: project.status || '',
        price: project.price || '',
        bgImage: project.bgImage || '',
        badge: project.badge || '',
        overview: project.overview || '',
      });
    } else {
      setFormData({
        id: '',
        slug: '',
        title: '',
        developer: '',
        location: '',
        spec: '',
        status: 'New Launch',
        price: 'On Request',
        bgImage: '',
        badge: 'Featured',
        overview: '',
      });
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const finalProject = {
      ...project,
      ...formData,
      id: formData.id || formData.title.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-'),
      slug: formData.slug || formData.title.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-'),
      bgImage: formData.bgImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    };

    onSave(finalProject);
    onClose();
  };

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h3 className="admin-modal-title d-flex align-items-center gap-2">
            <Building size={20} className="text-primary-lux" />
            {isEditing ? 'Edit Project Development' : 'Add New Development'}
          </h3>
          <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-modal-body">
            <label className="admin-modal-label">
              Project Title *
              <input
                type="text"
                className="admin-modal-input"
                required
                placeholder="e.g. ACE New Launch 2.0"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </label>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="admin-modal-label">
                  Developer / Builder
                  <input
                    type="text"
                    className="admin-modal-input"
                    placeholder="e.g. ACE Group"
                    value={formData.developer}
                    onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
                  />
                </label>
              </div>

              <div className="col-md-6">
                <label className="admin-modal-label">
                  Location
                  <input
                    type="text"
                    className="admin-modal-input"
                    placeholder="e.g. Sector 150, Noida Expressway"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </label>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="admin-modal-label">
                  Specifications
                  <input
                    type="text"
                    className="admin-modal-input"
                    placeholder="e.g. Ultra-Luxury 3 & 4 BHK Iconic Residences"
                    value={formData.spec}
                    onChange={(e) => setFormData({ ...formData, spec: e.target.value })}
                  />
                </label>
              </div>

              <div className="col-md-6">
                <label className="admin-modal-label">
                  Pricing
                  <input
                    type="text"
                    className="admin-modal-input"
                    placeholder="e.g. ₹ 3.20 Cr* or On Request"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </label>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="admin-modal-label">
                  Status
                  <input
                    type="text"
                    className="admin-modal-input"
                    placeholder="e.g. New Launch Opportunity"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  />
                </label>
              </div>

              <div className="col-md-6">
                <label className="admin-modal-label">
                  Badge Tag
                  <input
                    type="text"
                    className="admin-modal-input"
                    placeholder="e.g. New Launch / Golf Facing"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  />
                </label>
              </div>
            </div>

            <label className="admin-modal-label">
              Project Cover Image (Upload or URL)
              <ImageDropzone
                value={formData.bgImage}
                onChange={(url) => setFormData({ ...formData, bgImage: url })}
              />
            </label>

            <label className="admin-modal-label">
              Overview Description
              <textarea
                className="admin-modal-textarea"
                placeholder="Detailed overview about the property, master layout, and architecture..."
                value={formData.overview}
                onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
              />
            </label>
          </div>

          <div className="admin-modal-footer">
            <button type="button" className="btn-modal-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-modal-save">
              <Save size={16} />
              {isEditing ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectEditModal;
