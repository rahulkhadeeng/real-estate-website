import React, { useState, useRef } from 'react';
import { UploadCloud, X, Link as LinkIcon, Image as ImageIcon, Loader2 } from 'lucide-react';
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
      setError('Please select a valid image file (PNG, JPG, WebP, AVIF).');
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
    }
  };

  return (
    <div className="dropzone-container">
      {value ? (
        <div className="dropzone-preview-box">
          <img src={value} alt="Uploaded preview" className="dropzone-preview-img" />
          <button
            type="button"
            className="dropzone-remove-btn"
            onClick={() => onChange('')}
            title="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <>
          <div
            className={`dropzone-box ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleChange}
            />

            {uploading ? (
              <div className="d-flex flex-column align-items-center gap-2 py-2">
                <Loader2 size={28} className="dropzone-icon animate-spin" />
                <span className="dropzone-text">Uploading image…</span>
              </div>
            ) : (
              <>
                <UploadCloud size={28} className="dropzone-icon" />
                <div className="dropzone-text">Click to upload or drag and drop</div>
                <div className="dropzone-subtext">SVG, PNG, JPG, WebP or AVIF (max 5MB)</div>
              </>
            )}
          </div>

          <div className="d-flex align-items-center justify-content-between mt-1">
            <button
              type="button"
              className="dropzone-url-toggle"
              onClick={() => setShowUrlInput(!showUrlInput)}
            >
              <LinkIcon size={13} />
              {showUrlInput ? 'Hide URL input' : 'Or enter image URL'}
            </button>
          </div>

          {showUrlInput && (
            <div className="d-flex gap-2 mt-2">
              <input
                type="url"
                className="dropzone-url-input"
                placeholder="https://example.com/image.jpg"
                value={urlInputValue}
                onChange={(e) => setUrlInputValue(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-sm btn-dark px-3"
                onClick={handleUrlSubmit}
              >
                Set
              </button>
            </div>
          )}

          {error && <p className="text-danger small mt-1 mb-0">{error}</p>}
        </>
      )}
    </div>
  );
};

export default ImageDropzone;
