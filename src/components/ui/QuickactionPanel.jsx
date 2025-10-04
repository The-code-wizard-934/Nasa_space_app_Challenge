import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const QuickActionPanel = ({
  onExport = null,
  onSave = null,
  onShare = null,
  onHelp = null,
  customActions = [],
}) => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);

  const getContextualActions = () => {
    const baseActions = [];

    switch (location?.pathname) {
      case "/overview-dashboard":
        baseActions?.push(
          {
            id: "export",
            icon: "Download",
            label: "Export Dashboard",
            action: onExport,
          },
          {
            id: "refresh",
            icon: "RefreshCw",
            label: "Refresh Data",
            action: () => window.location?.reload(),
          }
        );
        break;

      case "/ai-chatbot-interface":
        baseActions?.push(
          {
            id: "save",
            icon: "Save",
            label: "Save Conversation",
            action: onSave,
          },
          { id: "share", icon: "Share2", label: "Share Chat", action: onShare },
          {
            id: "clear",
            icon: "Trash2",
            label: "Clear History",
            action: () => console.log("Clear chat"),
          }
        );
        break;

      case "/publications-explorer":
        baseActions?.push(
          {
            id: "export",
            icon: "Download",
            label: "Export Results",
            action: onExport,
          },
          {
            id: "bookmark",
            icon: "Bookmark",
            label: "Save Search",
            action: onSave,
          },
          {
            id: "filter",
            icon: "Filter",
            label: "Advanced Filters",
            action: () => console.log("Open filters"),
          }
        );
        break;

      case "/knowledge-graph-visual":
        baseActions?.push(
          {
            id: "export",
            icon: "Download",
            label: "Export Graph",
            action: onExport,
          },
          {
            id: "fullscreen",
            icon: "Maximize2",
            label: "Fullscreen",
            action: () => console.log("Toggle fullscreen"),
          },
          {
            id: "reset",
            icon: "RotateCcw",
            label: "Reset View",
            action: () => console.log("Reset graph"),
          }
        );
        break;

      case "/insights-analytics":
        baseActions?.push(
          {
            id: "export",
            icon: "Download",
            label: "Export Report",
            action: onExport,
          },
          {
            id: "schedule",
            icon: "Calendar",
            label: "Schedule Report",
            action: () => console.log("Schedule report"),
          },
          {
            id: "alert",
            icon: "Bell",
            label: "Set Alerts",
            action: () => console.log("Set alerts"),
          }
        );
        break;

      case "/document-upload":
        baseActions?.push(
          {
            id: "upload",
            icon: "Upload",
            label: "Quick Upload",
            action: () => console.log("Quick upload"),
          },
          {
            id: "history",
            icon: "History",
            label: "Upload History",
            action: () => console.log("Upload history"),
          }
        );
        break;

      default:
        baseActions?.push({
          id: "help",
          icon: "HelpCircle",
          label: "Help",
          action: onHelp,
        });
    }

    // Always add help action if not already present
    if (!baseActions?.find((action) => action?.id === "help")) {
      baseActions?.push({
        id: "help",
        icon: "HelpCircle",
        label: "Help",
        action: onHelp,
      });
    }

    return [...baseActions, ...customActions];
  };

  const actions = getContextualActions();
  const primaryAction = actions?.[0];
  const secondaryActions = actions?.slice(1);

  const handleActionClick = (action) => {
    if (action?.action) {
      action?.action();
    }
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-30">
      {/* Mobile Bottom Sheet */}
      <div className="lg:hidden">
        {isExpanded && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm -z-10"
              onClick={() => setIsExpanded(false)}
            />

            {/* Bottom Sheet */}
            <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-xl p-6 shadow-floating animate-slide-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  Quick Actions
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {actions?.map((action) => (
                  <Button
                    key={action?.id}
                    variant="outline"
                    className="flex flex-col items-center space-y-2 h-auto py-4"
                    onClick={() => handleActionClick(action)}
                  >
                    <Icon name={action?.icon} size={24} />
                    <span className="text-xs">{action?.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Mobile FAB */}
        <Button
          size="icon"
          className="w-14 h-14 rounded-full shadow-floating bg-primary hover:bg-primary/90"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Icon name={isExpanded ? "X" : "Plus"} size={24} />
        </Button>
      </div>
      {/* Desktop Floating Actions */}
      <div className="hidden lg:flex flex-col items-end space-y-3">
        {/* Secondary Actions */}
        {isExpanded &&
          secondaryActions?.map((action) => (
            <div key={action?.id} className="relative">
              <Button
                size="icon"
                variant="secondary"
                className="w-12 h-12 rounded-full shadow-cosmic animate-fade-in"
                onClick={() => handleActionClick(action)}
                onMouseEnter={() => setShowTooltip(action?.id)}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <Icon name={action?.icon} size={20} />
              </Button>

              {/* Tooltip */}
              {showTooltip === action?.id && (
                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-2 bg-popover border border-border rounded-lg shadow-floating whitespace-nowrap">
                  <span className="text-sm text-popover-foreground">
                    {action?.label}
                  </span>
                </div>
              )}
            </div>
          ))}

        {/* Primary Action */}
        <Button
          size="icon"
          className="w-14 h-14 rounded-full shadow-floating bg-primary hover:bg-primary/90"
          onClick={() => {
            if (primaryAction) {
              handleActionClick(primaryAction);
            } else {
              setIsExpanded(!isExpanded);
            }
          }}
          onMouseEnter={() => primaryAction && setShowTooltip("primary")}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <Icon name={primaryAction?.icon || "Plus"} size={24} />
        </Button>

        {/* Primary Action Tooltip */}
        {showTooltip === "primary" && primaryAction && (
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-2 bg-popover border border-border rounded-lg shadow-floating whitespace-nowrap">
            <span className="text-sm text-popover-foreground">
              {primaryAction?.label}
            </span>
          </div>
        )}

        {/* Expand Button for Multiple Actions */}
        {secondaryActions?.length > 0 && (
          <Button
            size="icon"
            variant="outline"
            className="w-10 h-10 rounded-full shadow-cosmic"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? "ChevronDown" : "ChevronUp"} size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuickActionPanel;
