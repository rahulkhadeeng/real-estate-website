import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import LegacyStats from '../components/LegacyStats';
import FeaturedProjects from '../components/FeaturedProjects';
import WhyUs from '../components/WhyUs';
import Amenities from '../components/Amenities';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import ContactSection from '../components/ContactSection';

const HomePage = ({ onOpenModal }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <main>
      <Hero onOpenModal={onOpenModal} />
      <LegacyStats />
      <FeaturedProjects onOpenModal={onOpenModal} />
      <WhyUs />
      <Amenities />
      <Pricing onOpenModal={onOpenModal} />
      <Testimonials />
      <ContactSection />
    </main>
  );
};

export default HomePage;
