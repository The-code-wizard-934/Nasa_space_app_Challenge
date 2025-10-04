import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "../AppIcon";

const BreadcrumbTrail = ({ customPath = null, onPathClick = null }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMapping = {
    "/overview-dashboard": "Overview",
    "/ai-chatbot-interface": "AI Assistant",
    "/publications-explorer": "Publications",
    "/knowledge-graph-visual": "Knowledge Graph",
    "/insights-analytics": "Analytics",
    "/document-upload": "Upload",
  };

  const generateBreadcrumbs = () => {
    if (customPath) {
      return customPath;
    }

    const pathSegments = location?.pathname?.split("/")?.filter(Boolean);
    const breadcrumbs = [];

    // Always start with home
    breadcrumbs?.push({
      label: "Home",
      path: "/overview-dashboard",
      isActive: false,
    });

    // Build path progressively
    let currentPath = "";
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments?.length - 1;

      breadcrumbs?.push({
        label:
          pathMapping?.[currentPath] ||
          segment
            ?.replace(/-/g, " ")
            ?.replace(/\b\w/g, (l) => l?.toUpperCase()),
        path: currentPath,
        isActive: isLast,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleBreadcrumbClick = (path, index) => {
    if (onPathClick) {
      onPathClick(path, index);
    } else {
      navigate(path);
    }
  };

  // Don't render if only home breadcrumb or on main dashboard
  if (
    breadcrumbs?.length <= 1 ||
    location?.pathname === "/overview-dashboard"
  ) {
    return null;
  }

  return (
    <nav
      className="flex items-center space-x-2 text-sm font-caption mb-6"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((crumb, index) => (
          <li key={crumb?.path} className="flex items-center">
            {index > 0 && (
              <Icon
                name="ChevronRight"
                size={14}
                className="text-muted-foreground mx-2"
              />
            )}

            {crumb?.isActive ? (
              <span className="text-foreground font-medium">
                {crumb?.label}
              </span>
            ) : (
              <button
                onClick={() => handleBreadcrumbClick(crumb?.path, index)}
                className="text-muted-foreground hover:text-foreground transition-cosmic"
              >
                {crumb?.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbTrail;
