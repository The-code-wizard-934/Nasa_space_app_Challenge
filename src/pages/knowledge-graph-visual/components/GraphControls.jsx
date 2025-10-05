import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

const GraphControls = ({
  onLayoutChange,
  onFilterChange,
  onSearch,
  onExport,
  currentLayout = "force",
  isVisible = true,
  onToggle,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    nodeTypes: [],
    dateRange: "all",
    connectionStrength: "all",
  });

  const layoutOptions = [
    { value: "force", label: "Force-Directed" },
    { value: "hierarchical", label: "Hierarchical" },
    { value: "circular", label: "Circular" },
    { value: "grid", label: "Grid Layout" },
  ];

  const nodeTypeOptions = [
    { value: "publication", label: "Publications" },
    { value: "organism", label: "Organisms" },
    { value: "experiment", label: "Experiments" },
    { value: "topic", label: "Research Topics" },
  ];

  const dateRangeOptions = [
    { value: "all", label: "All Time" },
    { value: "2020-2024", label: "2020-2024" },
    { value: "2015-2019", label: "2015-2019" },
    { value: "2010-2014", label: "2010-2014" },
    { value: "before-2010", label: "Before 2010" },
  ];

  const connectionStrengthOptions = [
    { value: "all", label: "All Connections" },
    { value: "strong", label: "Strong Only" },
    { value: "moderate-strong", label: "Moderate & Strong" },
    { value: "weak", label: "Weak Only" },
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...selectedFilters, [filterType]: value };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleExport = (format) => {
    onExport(format);
  };

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="fixed top-20 right-4 z-20 p-2 bg-card border border-border rounded-lg shadow-cosmic hover:bg-muted/20 transition-cosmic"
      >
        <Icon name="Settings" size={20} className="text-muted-foreground" />
      </button>
    );
  }

  return (
    <div className="fixed top-20 right-4 z-20 w-80 bg-black border border-border rounded-lg shadow-floating max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-cosmic">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Graph Controls
        </h3>
        <button
          onClick={onToggle}
          className="p-1 hover:bg-muted/20 rounded transition-cosmic"
        >
          <Icon name="X" size={16} className="text-muted-foreground" />
        </button>
      </div>
      <div className="p-4 space-y-6">
        {/* Search */}
        <div>
          <form onSubmit={handleSearch} className="space-y-2">
            <Input
              label="Search Graph"
              type="search"
              placeholder="Search nodes, connections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
            />
            <Button type="submit" variant="outline" className="w-full">
              <Icon name="Search" size={16} className="mr-2" />
              Search
            </Button>
          </form>
        </div>

        {/* Layout Options */}
        <div>
          <Select
            label="Graph Layout"
            options={layoutOptions}
            value={currentLayout}
            onChange={onLayoutChange}
          />
        </div>

        {/* Node Type Filter */}
        <div>
          <Select
            label="Node Types"
            description="Filter by node categories"
            options={nodeTypeOptions}
            value={selectedFilters?.nodeTypes}
            onChange={(value) => handleFilterChange("nodeTypes", value)}
            multiple
            searchable
          />
        </div>

        {/* Date Range Filter */}
        <div>
          <Select
            label="Date Range"
            description="Filter by publication period"
            options={dateRangeOptions}
            value={selectedFilters?.dateRange}
            onChange={(value) => handleFilterChange("dateRange", value)}
          />
        </div>

        {/* Connection Strength */}
        <div>
          <Select
            label="Connection Strength"
            description="Filter by relationship strength"
            options={connectionStrengthOptions}
            value={selectedFilters?.connectionStrength}
            onChange={(value) =>
              handleFilterChange("connectionStrength", value)
            }
          />
        </div>

        {/* Graph Actions */}
        <div className="space-y-3 pt-3 border-t border-border">
          <h4 className="text-sm font-medium text-foreground">Graph Actions</h4>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log("Reset zoom")}
            >
              <Icon name="ZoomIn" size={14} className="mr-1" />
              Reset Zoom
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log("Center graph")}
            >
              <Icon name="Target" size={14} className="mr-1" />
              Center
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log("Cluster nodes")}
            >
              <Icon name="GitBranch" size={14} className="mr-1" />
              Cluster
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log("Expand all")}
            >
              <Icon name="Maximize2" size={14} className="mr-1" />
              Expand
            </Button>
          </div>
        </div>

        {/* Export Options */}
        <div className="space-y-3 pt-3 border-t border-border">
          <h4 className="text-sm font-medium text-foreground">Export Graph</h4>

          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleExport("png")}
            >
              <Icon name="Image" size={14} className="mr-2" />
              Export as PNG
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleExport("svg")}
            >
              <Icon name="FileImage" size={14} className="mr-2" />
              Export as SVG
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleExport("html")}
            >
              <Icon name="Globe" size={14} className="mr-2" />
              Interactive HTML
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphControls;
