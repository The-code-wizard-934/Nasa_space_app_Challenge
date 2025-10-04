import React, { useState } from "react";
import NavigationSidebar from "../../components/ui/NavigationSidebar";
import BreadcrumbTrail from "../../components/ui/BreadcrumbTrail";
import QuickActionPanel from "../../components/ui/QuickactionPanel";
import GraphVisualization from "./components/GraphVisualization";
import GraphLegend from "./components/GraphLegend";
import GraphControls from "./components/GraphControls";
import NodeDetailsPanel from "./components/NodeDetailsPanel";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const KnowledgeGraphVisual = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [graphLayout, setGraphLayout] = useState("force");
  const [graphFilters, setGraphFilters] = useState({
    nodeTypes: [],
    dateRange: "all",
    connectionStrength: "all",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [legendVisible, setLegendVisible] = useState(true);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
  };

  const handleNodeHover = (node, event) => {
    setHoveredNode(node);
  };

  const handleLayoutChange = (layout) => {
    setGraphLayout(layout);
  };

  const handleFilterChange = (filters) => {
    setGraphFilters(filters);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleExport = (format) => {
    console.log(`Exporting graph as ${format}`);
    // Mock export functionality
    const exportData = {
      format,
      timestamp: new Date()?.toISOString(),
      nodes: 546,
      connections: 1234,
      layout: graphLayout,
      filters: graphFilters,
    };

    // Simulate download
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `knowledge-graph-${format}-${Date.now()}.json`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleNavigateToPublication = (publication) => {
    console.log("Navigate to publication:", publication);
    // This would typically navigate to the publications explorer with the specific publication
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const quickActions = [
    {
      id: "export",
      icon: "Download",
      label: "Export Graph",
      action: () => handleExport("png"),
    },
    {
      id: "fullscreen",
      icon: "Maximize2",
      label: "Fullscreen",
      action: toggleFullscreen,
    },
    {
      id: "reset",
      icon: "RotateCcw",
      label: "Reset View",
      action: () => {
        setGraphLayout("force");
        setGraphFilters({
          nodeTypes: [],
          dateRange: "all",
          connectionStrength: "all",
        });
        setSearchQuery("");
      },
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-60"
        }`}
      >
        <div className="p-6 lg:p-8">
          <div className="max-w-full">
            <BreadcrumbTrail />

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Knowledge Graph Visualization
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                  Explore interactive relationships between experiments,
                  organisms, results, and publications through node-based
                  mapping and visual analytics.
                </p>
              </div>

              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLegendVisible(!legendVisible)}
                >
                  <Icon name="Info" size={16} className="mr-2" />
                  Legend
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setControlsVisible(!controlsVisible)}
                >
                  <Icon name="Settings" size={16} className="mr-2" />
                  Controls
                </Button>
                <Button variant="outline" size="sm" onClick={toggleFullscreen}>
                  <Icon name="Maximize2" size={16} className="mr-2" />
                  Fullscreen
                </Button>
              </div>
            </div>

            {/* Graph Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Icon name="FileText" size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      156
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Publications
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Icon name="Leaf" size={20} className="text-green-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">89</div>
                    <div className="text-sm text-muted-foreground">
                      Organisms
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Icon name="Flask" size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      234
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Experiments
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Icon
                      name="Network"
                      size={20}
                      className="text-orange-400"
                    />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      1,234
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Connections
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Graph Container */}
            <div className="relative">
              <div
                className="bg-card border border-border rounded-lg overflow-hidden"
                style={{ height: "70vh" }}
              >
                <GraphVisualization
                  layout={graphLayout}
                  filters={graphFilters}
                  searchQuery={searchQuery}
                  onNodeSelect={handleNodeSelect}
                  onNodeHover={handleNodeHover}
                  className="w-full h-full"
                />
              </div>

              {/* Hover Tooltip */}
              {hoveredNode && (
                <div className="fixed z-50 pointer-events-none bg-popover border border-border rounded-lg p-3 shadow-floating max-w-xs">
                  <div className="flex items-center space-x-2 mb-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        hoveredNode?.type === "publication"
                          ? "bg-blue-500"
                          : hoveredNode?.type === "organism"
                          ? "bg-green-500"
                          : hoveredNode?.type === "experiment"
                          ? "bg-purple-500"
                          : "bg-orange-500"
                      }`}
                    />
                    <span className="text-sm font-medium text-popover-foreground capitalize">
                      {hoveredNode?.type}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-popover-foreground mb-1">
                    {hoveredNode?.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {hoveredNode?.citations &&
                      `${hoveredNode?.citations} citations`}
                    {hoveredNode?.studies && `${hoveredNode?.studies} studies`}
                    {hoveredNode?.papers && `${hoveredNode?.papers} papers`}
                    {hoveredNode?.duration &&
                      `Duration: ${hoveredNode?.duration}`}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Graph Info */}
            <div className="lg:hidden mt-6 bg-card border border-border rounded-lg p-4">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                Graph Navigation
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-foreground mb-1">
                    Touch Controls
                  </div>
                  <div className="text-muted-foreground space-y-1">
                    <div>• Tap nodes for details</div>
                    <div>• Pinch to zoom</div>
                    <div>• Drag to pan</div>
                  </div>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-1">
                    Current View
                  </div>
                  <div className="text-muted-foreground space-y-1">
                    <div>Layout: {graphLayout}</div>
                    <div>Nodes: {graphFilters?.nodeTypes?.length || "All"}</div>
                    <div>Search: {searchQuery || "None"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Graph Legend */}
      <GraphLegend
        isVisible={legendVisible}
        onToggle={() => setLegendVisible(!legendVisible)}
      />
      {/* Graph Controls */}
      <GraphControls
        onLayoutChange={handleLayoutChange}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onExport={handleExport}
        currentLayout={graphLayout}
        isVisible={controlsVisible}
        onToggle={() => setControlsVisible(!controlsVisible)}
      />
      {/* Node Details Panel */}
      {selectedNode && (
        <NodeDetailsPanel
          selectedNode={selectedNode}
          onClose={() => setSelectedNode(null)}
          onNavigateToPublication={handleNavigateToPublication}
        />
      )}
      {/* Quick Action Panel */}
      <QuickActionPanel
        onExport={() => handleExport("png")}
        customActions={quickActions}
      />
    </div>
  );
};

export default KnowledgeGraphVisual;
