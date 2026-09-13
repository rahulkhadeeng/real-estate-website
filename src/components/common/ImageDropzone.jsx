import React, { useState, useRef } from 'react';
import { UploadCloud, Upload, X, Link as LinkIcon, Loader2, Trash2, Edit3, Image as ImageIcon } from 'lucide-react';
import '../../styles/upload.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const ImageDropzone = ({ value, onChange, label = 'Image' }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = async (file) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WebP, AVIF, SVG).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be 5MB or smaller.');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const storedSession = localStorage.getItem('keylo-auth-session');
      const token = storedSession ? JSON.parse(storedSession)?.token : '';

      const formData = new FormData();
      formData.append('files', file);

      // Attempt to upload to Spring Boot / UploadThing backend
      const res = await fetch(`${API_BASE_URL}/admin/uploads/images`, {
        method: 'POST',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.urls && data.urls.length > 0) {
          onChange(data.urls[0]);
          return;
        }
      }

      // Fallback: Read local file as Data URL
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange(event.target.result);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.warn('Backend upload failed, reading locally as data URL', err);
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange(event.target.result);
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (urlInputValue.trim()) {
      onChange(urlInputValue.trim());
      setUrlInputValue('');
      setShowUrlInput(false);
      setError('');
    }
  };

  return (
    <div className="dropzone-container">
      {/* Hidden file input used for both empty state and replace state */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleChange}
      />

      {value ? (
        <div 
          className={`dropzone-preview-box ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <img src={value} alt="Uploaded preview" className="dropzone-preview-img" />
          
          {/* Overlay Action Toolbar */}
          <div className="dropzone-preview-overlay">
            <div className="dropzone-preview-actions">
              <button
                type="button"
                className="btn-dropzone-action btn-dropzone-change"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                title="Upload new image"
              >
                {uploading ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <Upload size={13} />
                )}
                <span>Change Image</span>
              </button>

              <button
                type="button"
                className="btn-dropzone-action btn-dropzone-edit-url"
                onClick={() => {
                  setUrlInputValue(value.startsWith('data:') ? '' : value);
                  setShowUrlInput(!showUrlInput);
                }}
                title="Edit URL"
              >
                <LinkIcon size={13} />
                <span>URL</span>
              </button>

              <button
                type="button"
                className="btn-dropzone-action btn-dropzone-remove"
                onClick={() => {
                  onChange('');
                  setUrlInputValue('');
                  setShowUrlInput(false);
                }}
                title="Remove image"
              >
                <Trash2 size={13} />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`dropzone-box ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <div className="d-flex flex-column align-items-center gap-2 py-3">
              <Loader2 size={32} className="dropzone-icon animate-spin text-primary-lux" />
              <span className="dropzone-text">Uploading & processing image…</span>
            </div>
          ) : (
            <>
              <div className="dropzone-icon-circle">
                <UploadCloud size={24} className="dropzone-icon" />
              </div>
              <div className="dropzone-text">Click to browse or drag & drop</div>
              <div className="dropzone-subtext">SVG, PNG, JPG, WebP or AVIF (max 5MB)</div>
              
              <button
                type="button"
                className="btn-dropzone-browse mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
              >
                <Upload size={14} />
                Browse & Upload Image
              </button>
            </>
          )}
        </div>
      )}

      {/* URL Input Toggle / Bar */}
      <div className="dropzone-footer-bar">
        <button
          type="button"
          className="dropzone-url-toggle"
          onClick={() => setShowUrlInput(!showUrlInput)}
        >
          <LinkIcon size={13} />
          {showUrlInput ? 'Hide URL input' : value ? 'Replace via Image URL' : 'Or enter image URL'}
        </button>
      </div>

      {showUrlInput && (
        <div className="dropzone-url-form animate-fade-in">
          <input
            type="url"
            className="dropzone-url-input"
            placeholder="https://images.unsplash.com/photo-..."
            value={urlInputValue}
            onChange={(e) => setUrlInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleUrlSubmit(e);
              }
            }}
          />
          <button
            type="button"
            className="btn-dropzone-url-submit"
            onClick={handleUrlSubmit}
          >
            Apply URL
          </button>
        </div>
      )}

      {error && (
        <div className="dropzone-error-msg">
          <span>{error}</span>
          <button type="button" className="btn-close btn-close-white btn-sm" onClick={() => setError('')} aria-label="Dismiss"></button>
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
