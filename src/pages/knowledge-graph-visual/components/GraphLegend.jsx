import React from "react";
import Icon from "../../../components/AppIcon";

const GraphLegend = ({ isVisible, onToggle }) => {
  const nodeTypes = [
    {
      type: "publication",
      color: "bg-blue-500",
      label: "Publications",
      description: "Research papers and studies",
      count: 156,
    },
    {
      type: "organism",
      color: "bg-green-500",
      label: "Organisms",
      description: "Biological subjects studied",
      count: 89,
    },
    {
      type: "experiment",
      color: "bg-purple-500",
      label: "Experiments",
      description: "Research methodologies",
      count: 234,
    },
    {
      type: "topic",
      color: "bg-orange-500",
      label: "Research Topics",
      description: "Subject areas and themes",
      count: 67,
    },
  ];

  const connectionTypes = [
    {
      type: "strong",
      style: "border-t-2 border-primary",
      label: "Strong Relationship",
      description: "Direct experimental connection",
    },
    {
      type: "moderate",
      style: "border-t border-secondary",
      label: "Moderate Relationship",
      description: "Shared methodology or subject",
    },
    {
      type: "weak",
      style: "border-t border-dashed border-muted-foreground",
      label: "Weak Relationship",
      description: "Tangential or cited connection",
    },
  ];

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="fixed top-20 left-4 z-20 p-2 bg-card border border-border rounded-lg shadow-cosmic hover:bg-muted/20 transition-cosmic"
      >
        <Icon name="Info" size={20} className="text-muted-foreground" />
      </button>
    );
  }

  return (
    <div className="fixed top-20 left-4 z-20 w-72 bg-card border border-border rounded-lg shadow-floating">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Graph Legend
        </h3>
        <button
          onClick={onToggle}
          className="p-1 hover:bg-muted/20 rounded transition-cosmic"
        >
          <Icon name="X" size={16} className="text-muted-foreground" />
        </button>
      </div>
      <div className="p-4 space-y-6">
        {/* Node Types */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">
            Node Types
          </h4>
          <div className="space-y-3">
            {nodeTypes?.map((node) => (
              <div key={node?.type} className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${node?.color}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {node?.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {node?.count}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {node?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connection Types */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">
            Connections
          </h4>
          <div className="space-y-3">
            {connectionTypes?.map((connection) => (
              <div key={connection?.type} className="space-y-1">
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-0 ${connection?.style}`} />
                  <span className="text-sm font-medium text-foreground">
                    {connection?.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground ml-9">
                  {connection?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Graph Stats */}
        <div className="pt-3 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-2">
            Graph Statistics
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-center p-2 bg-muted/20 rounded">
              <div className="font-medium text-foreground">546</div>
              <div className="text-muted-foreground">Total Nodes</div>
            </div>
            <div className="text-center p-2 bg-muted/20 rounded">
              <div className="font-medium text-foreground">1,234</div>
              <div className="text-muted-foreground">Connections</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphLegend;
