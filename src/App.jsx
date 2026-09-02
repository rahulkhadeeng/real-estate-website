import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import FloatingCTAs from './components/FloatingCTAs';
import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Exclusive Showcase');

  const handleOpenModal = (title = 'Exclusive Showcase') => {
    setModalTitle(title);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Router>
      <div className="app-wrapper position-relative">
        <Navbar onOpenModal={handleOpenModal} />
        
        <div className="main-content flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage onOpenModal={handleOpenModal} />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage onOpenModal={handleOpenModal} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <Footer onOpenModal={handleOpenModal} />
        <FloatingCTAs onOpenModal={handleOpenModal} />
        <EnquiryModal isOpen={modalOpen} onClose={handleCloseModal} title={modalTitle} />
      </div>
    </Router>
  );
}

export default App;
