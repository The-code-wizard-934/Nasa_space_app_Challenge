import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../AppIcon";

const NavigationSidebar = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      label: "Overview",
      path: "/overview-dashboard",
      icon: "LayoutDashboard",
      tooltip: "Research landscape and key metrics",
    },
    {
      label: "AI Assistant",
      path: "/ai-chatbot-interface",
      icon: "Bot",
      tooltip: "Natural language querying with conversational memory",
    },
    {
      label: "Publications",
      path: "/publications-explorer",
      icon: "FileText",
      tooltip: "Comprehensive document library with advanced filtering",
    },
    {
      label: "Knowledge Graph",
      path: "/knowledge-graph-visual",
      icon: "Network",
      tooltip: "Interactive relationship visualization",
    },
    {
      label: "Analytics",
      path: "/insights-analytics",
      icon: "BarChart3",
      tooltip: "Visual insights dashboard with AI-identified trends",
    },
    {
      label: "Upload",
      path: "/document-upload",
      icon: "Upload",
      tooltip: "Document ingestion with automated processing",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const NASALogo = () => (
    <div className="flex items-center space-x-3 px-4 py-6">
      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
        <Icon name="Rocket" size={20} className="text-primary-foreground" />
      </div>
      {!isCollapsed && (
        <div className="flex flex-col">
          <span className="text-lg font-heading font-semibold text-foreground">
            NASA
          </span>
          <span className="text-xs font-caption text-muted-foreground">
            Bioscience Knowledge
          </span>
        </div>
      )}
    </div>
  );

  const NavigationItem = ({ item, isActive }) => (
    <div className="relative group">
      <button
        onClick={() => handleNavigation(item?.path)}
        className={`
          w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-cosmic
          ${
            isActive
              ? "bg-primary/20 text-primary border-l-2 border-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
          }
        `}
      >
        <Icon
          name={item?.icon}
          size={20}
          className={isActive ? "text-primary" : "text-current"}
        />
        {!isCollapsed && (
          <span className="font-body font-medium text-sm">{item?.label}</span>
        )}
      </button>

      {isCollapsed && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 bg-popover border border-border rounded-lg shadow-floating opacity-0 group-hover:opacity-100 transition-cosmic pointer-events-none z-50">
          <div className="text-sm font-medium text-popover-foreground">
            {item?.label}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {item?.tooltip}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card border border-border rounded-lg shadow-cosmic"
      >
        <Icon name="Menu" size={20} className="text-foreground" />
      </button>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={toggleMobile}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-full bg-card border-r border-border shadow-cosmic z-40
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-16" : "w-60"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="border-b border-border">
            <NASALogo />
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 py-6 space-y-2 px-3 scrollbar-cosmic overflow-y-auto">
            {navigationItems?.map((item) => (
              <NavigationItem
                key={item?.path}
                item={item}
                isActive={location?.pathname === item?.path}
              />
            ))}
          </nav>

          {/* Footer Section */}
          <div className="border-t border-border p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center">
                <Icon
                  name="User"
                  size={16}
                  className="text-accent-foreground"
                />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    Research Team
                  </span>
                  <span className="text-xs text-muted-foreground">
                    NASA Bioscience
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
      {/* Desktop Toggle Button */}
      {onToggle && (
        <button
          onClick={onToggle}
          className={`
            hidden lg:block fixed top-6 z-30 p-2 bg-card border border-border rounded-lg shadow-cosmic transition-cosmic hover:bg-muted/20
            ${isCollapsed ? "left-20" : "left-64"}
          `}
        >
          <Icon
            name={isCollapsed ? "ChevronRight" : "ChevronLeft"}
            size={16}
            className="text-muted-foreground"
          />
        </button>
      )}
    </>
  );
};

export default NavigationSidebar;
