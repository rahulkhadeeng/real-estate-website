import React, { useState, useEffect } from 'react';
import { Save, Sparkles } from 'lucide-react';
import ImageDropzone from '../common/ImageDropzone';
import '../../styles/upload.css';

const ICON_OPTIONS = [
  { name: 'Activity', label: 'Activity / Fitness' },
  { name: 'Waves', label: 'Waves / Swimming' },
  { name: 'Sparkles', label: 'Sparkles / Luxury' },
  { name: 'Footprints', label: 'Footprints / Track' },
  { name: 'Tv', label: 'Theatre / TV' },
  { name: 'Trophy', label: 'Trophy / Sports' },
  { name: 'Smile', label: 'Smile / Kids Area' },
  { name: 'Target', label: 'Target / Games' },
];

const AmenityEditModal = ({ isOpen, onClose, onSave, amenity = null }) => {
  const isEditing = Boolean(amenity?.id);

  const [formData, setFormData] = useState({
    id: null,
    title: '',
    category: '',
    iconName: 'Sparkles',
    bgImage: '',
    isFeatured: false,
  });

  useEffect(() => {
    if (amenity) {
      setFormData({
        id: amenity.id,
        title: amenity.title || '',
        category: amenity.category || 'Sports & Fitness',
        iconName: amenity.iconName || 'Sparkles',
        bgImage: amenity.bgImage || '',
        isFeatured: Boolean(amenity.isFeatured),
      });
    } else {
      setFormData({
        id: null,
        title: '',
        category: 'Sports & Fitness',
        iconName: 'Activity',
        bgImage: '',
        isFeatured: false,
      });
    }
  }, [amenity, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const finalAmenity = {
      ...amenity,
      ...formData,
      id: formData.id || Date.now(),
      bgImage: formData.bgImage || 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=600&q=80',
    };

    onSave(finalAmenity);
    onClose();
  };

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h3 className="admin-modal-title d-flex align-items-center gap-2">
            <Sparkles size={20} className="text-primary-lux" />
            {isEditing ? 'Edit Amenity' : 'Add New Amenity'}
          </h3>
          <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-modal-body">
            <label className="admin-modal-label">
              Amenity Title *
              <input
                type="text"
                className="admin-modal-input"
                required
                placeholder="e.g. Infinity Swimming Pools"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </label>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="admin-modal-label">
                  Category
                  <input
                    type="text"
                    className="admin-modal-input"
                    placeholder="e.g. Sports & Fitness / Recreation"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </label>
              </div>

              <div className="col-md-6">
                <label className="admin-modal-label">
                  Icon Style
                  <select
                    className="admin-modal-select"
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                  >
                    {ICON_OPTIONS.map((opt) => (
                      <option key={opt.name} value={opt.name}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <label className="admin-modal-label">
              Amenity Image (Upload or URL)
              <ImageDropzone
                value={formData.bgImage}
                onChange={(url) => setFormData({ ...formData, bgImage: url })}
              />
            </label>

            <div className="form-check mt-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="amenityFeatured"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              />
              <label className="form-check-label small fw-semibold" htmlFor="amenityFeatured">
                Mark as Featured Amenity
              </label>
            </div>
          </div>

          <div className="admin-modal-footer">
            <button type="button" className="btn-modal-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-modal-save">
              <Save size={16} />
              {isEditing ? 'Save Amenity' : 'Create Amenity'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AmenityEditModal;
