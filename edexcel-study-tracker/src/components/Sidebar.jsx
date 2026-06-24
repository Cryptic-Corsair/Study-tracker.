import React from 'react';
import { X, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = ({ isOpen, mobileOpen, currentView, setCurrentView, navItems, onCloseMobile }) => {
  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <GraduationCap size={32} className="logo-icon" />
            {isOpen && <span className="logo-text">EDEXCEL Tracker</span>}
          </div>
          <button 
            className="toggle-sidebar desktop-only"
            onClick={() => onCloseMobile()}
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
          <button 
            className="close-mobile mobile-only"
            onClick={onCloseMobile}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setCurrentView(item.id);
                  onCloseMobile();
                }}
              >
                <Icon size={20} />
                {isOpen && <span>{item.label}</span>}
                {isActive && <div className="nav-indicator" />}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="exam-countdown">
            {isOpen && (
              <>
                <p className="countdown-label">Next Exam</p>
                <p className="countdown-value">30 days</p>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
