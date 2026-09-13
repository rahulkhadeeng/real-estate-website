import React, { createContext, useContext, useState, useEffect } from 'react';
import { projects as defaultProjects } from '../data/projectsData';
import { amenitiesList as defaultAmenities } from '../data/amenitiesData';
import { testimonials as defaultTestimonials } from '../data/testimonialsData';
import { useAuth } from './AuthContext';

const ContentContext = createContext(undefined);
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export function ContentProvider({ children }) {
  const { session, isAuthenticated } = useAuth();
  const token = session?.token;

  // Initialize state with localStorage cache or default datasets
  const [projectsList, setProjectsList] = useState(() => {
    try {
      const stored = localStorage.getItem('keylo-content-projects');
      return stored ? JSON.parse(stored) : defaultProjects;
    } catch {
      return defaultProjects;
    }
  });

  const [amenities, setAmenities] = useState(() => {
    try {
      const stored = localStorage.getItem('keylo-content-amenities');
      return stored ? JSON.parse(stored) : defaultAmenities;
    } catch {
      return defaultAmenities;
    }
  });

  const [testimonialsList, setTestimonialsList] = useState(() => {
    try {
      const stored = localStorage.getItem('keylo-content-testimonials');
      return stored ? JSON.parse(stored) : defaultTestimonials;
    } catch {
      return defaultTestimonials;
    }
  });

  // Fetch from Spring Boot backend on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, amenRes, testRes] = await Promise.allSettled([
          fetch(`${API_BASE_URL}/projects`),
          fetch(`${API_BASE_URL}/amenities`),
          fetch(`${API_BASE_URL}/testimonials`),
        ]);

        if (projRes.status === 'fulfilled' && projRes.value.ok) {
          const pData = await projRes.value.json();
          if (Array.isArray(pData) && pData.length > 0) {
            setProjectsList(pData);
            localStorage.setItem('keylo-content-projects', JSON.stringify(pData));
          }
        }

        if (amenRes.status === 'fulfilled' && amenRes.value.ok) {
          const aData = await amenRes.value.json();
          if (Array.isArray(aData) && aData.length > 0) {
            setAmenities(aData);
            localStorage.setItem('keylo-content-amenities', JSON.stringify(aData));
          }
        }

        if (testRes.status === 'fulfilled' && testRes.value.ok) {
          const tData = await testRes.value.json();
          if (Array.isArray(tData) && tData.length > 0) {
            setTestimonialsList(tData);
            localStorage.setItem('keylo-content-testimonials', JSON.stringify(tData));
          }
        }
      } catch (err) {
        console.warn('Using local content storage due to backend fetch failure:', err);
      }
    };

    fetchData();
  }, []);

  // Sync to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('keylo-content-projects', JSON.stringify(projectsList));
  }, [projectsList]);

  useEffect(() => {
    localStorage.setItem('keylo-content-amenities', JSON.stringify(amenities));
  }, [amenities]);

  useEffect(() => {
    localStorage.setItem('keylo-content-testimonials', JSON.stringify(testimonialsList));
  }, [testimonialsList]);

  // Auth headers helper
  const authHeaders = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // --- PROJECT CRUD ---
  const addProject = async (newProject) => {
    setProjectsList((prev) => [newProject, ...prev]);
    try {
      await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(newProject),
      });
    } catch (e) {
      console.warn('Backend add project failed, saved locally', e);
    }
  };

  const updateProject = async (updatedProject) => {
    setProjectsList((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
    try {
      await fetch(`${API_BASE_URL}/projects/${updatedProject.id}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(updatedProject),
      });
    } catch (e) {
      console.warn('Backend update project failed, saved locally', e);
    }
  };

  const deleteProject = async (id) => {
    setProjectsList((prev) => prev.filter((p) => p.id !== id));
    try {
      await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
      });
    } catch (e) {
      console.warn('Backend delete project failed, deleted locally', e);
    }
  };

  // --- AMENITIES CRUD ---
  const addAmenity = async (newAmenity) => {
    setAmenities((prev) => [...prev, newAmenity]);
    try {
      await fetch(`${API_BASE_URL}/amenities`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(newAmenity),
      });
    } catch (e) {
      console.warn('Backend add amenity failed, saved locally', e);
    }
  };

  const updateAmenity = async (updatedAmenity) => {
    setAmenities((prev) =>
      prev.map((a) => (a.id === updatedAmenity.id ? updatedAmenity : a))
    );
    try {
      await fetch(`${API_BASE_URL}/amenities/${updatedAmenity.id}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(updatedAmenity),
      });
    } catch (e) {
      console.warn('Backend update amenity failed, saved locally', e);
    }
  };

  const deleteAmenity = async (id) => {
    setAmenities((prev) => prev.filter((a) => a.id !== id));
    try {
      await fetch(`${API_BASE_URL}/amenities/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
      });
    } catch (e) {
      console.warn('Backend delete amenity failed, deleted locally', e);
    }
  };

  // --- TESTIMONIALS CRUD ---
  const addTestimonial = async (newTestimonial) => {
    setTestimonialsList((prev) => [newTestimonial, ...prev]);
    try {
      await fetch(`${API_BASE_URL}/testimonials`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(newTestimonial),
      });
    } catch (e) {
      console.warn('Backend add testimonial failed, saved locally', e);
    }
  };

  const updateTestimonial = async (updatedTestimonial) => {
    setTestimonialsList((prev) =>
      prev.map((t) => (t.id === updatedTestimonial.id ? updatedTestimonial : t))
    );
    try {
      await fetch(`${API_BASE_URL}/testimonials/${updatedTestimonial.id}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(updatedTestimonial),
      });
    } catch (e) {
      console.warn('Backend update testimonial failed, saved locally', e);
    }
  };

  const deleteTestimonial = async (id) => {
    setTestimonialsList((prev) => prev.filter((t) => t.id !== id));
    try {
      await fetch(`${API_BASE_URL}/testimonials/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
      });
    } catch (e) {
      console.warn('Backend delete testimonial failed, deleted locally', e);
    }
  };

  const isEditable = isAuthenticated;

  return (
    <ContentContext.Provider
      value={{
        isEditable,
        projects: projectsList,
        addProject,
        updateProject,
        deleteProject,
        amenities,
        addAmenity,
        updateAmenity,
        deleteAmenity,
        testimonials: testimonialsList,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
