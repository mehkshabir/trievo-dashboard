import React from 'react';
import { Home, Activity, Building2, MessageSquare, Settings } from 'lucide-react';

interface FloatingNavDockProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const FloatingNavDock: React.FC<FloatingNavDockProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'home', icon: Home, title: 'Overview & Triage Queue' },
    { id: 'vitals', icon: Activity, title: 'Live Patient Vitals' },
    { id: 'ward', icon: Building2, title: 'Ward Bed Allocation' },
    { id: 'chat', icon: MessageSquare, title: 'Trievo Assistant' },
    { id: 'settings', icon: Settings, title: 'System & Verify Rules' },
  ];

  return (
    <nav className="floating-nav-dock" aria-label="Staff Navigation Dock">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            id={`nav-btn-${item.id}`}
            onClick={() => onTabChange(item.id)}
            className={`dock-btn ${isActive ? 'active' : ''}`}
            title={item.title}
            aria-label={item.title}
          >
            <IconComponent size={20} strokeWidth={isActive ? 2.4 : 1.8} />
          </button>
        );
      })}
    </nav>
  );
};
