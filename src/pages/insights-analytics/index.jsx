import React, { useState } from "react";
import NavigationSidebar from "../../components/ui/NavigationSidebar";
import BreadcrumbTrail from "../../components/ui/BreadcrumbTrail";
import QuickActionPanel from "../../components/ui/QuickactionPanel";
import StudiesTimelineChart from "./components/StudiesTimelineChart";
import BiologicalSystemsChart from "./components/BiologicalSystemsChart";
import EnvironmentDistributionChart from "./components/EnvironmentDistributionChart";
import KnowledgeGapsPanel from "./components/KnowledgeGapsPanel";
import TrendAnalysisPanel from "./components/TrendAnalysisPanel";
import CorrelationMatrix from "./components/CorrelationMatrix";
import ExportManager from "./components/ExportManager";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const InsightsAnalytics = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedFilters, setSelectedFilters] = useState({
    dateRange: "all",
    organism: "all",
    environment: "all",
    topic: "all",
  });

  const tabs = [
    { id: "overview", label: "Overview", icon: "BarChart3" },
    { id: "trends", label: "Trends", icon: "TrendingUp" },
    { id: "correlations", label: "Correlations", icon: "Network" },
    { id: "export", label: "Export", icon: "Download" },
  ];

  const filterOptions = {
    dateRange: [
      { value: "all", label: "All Time" },
      { value: "5years", label: "Last 5 Years" },
      { value: "3years", label: "Last 3 Years" },
      { value: "recent", label: "Recent (2023-2024)" },
    ],
    organism: [
      { value: "all", label: "All Organisms" },
      { value: "human", label: "Human" },
      { value: "mouse", label: "Mouse" },
      { value: "plant", label: "Plants" },
      { value: "microbe", label: "Microorganisms" },
    ],
    environment: [
      { value: "all", label: "All Environments" },
      { value: "iss", label: "ISS" },
      { value: "shuttle", label: "Space Shuttle" },
      { value: "ground", label: "Ground Control" },
      { value: "simulation", label: "Simulations" },
    ],
    topic: [
      { value: "all", label: "All Topics" },
      { value: "cardiovascular", label: "Cardiovascular" },
      { value: "musculoskeletal", label: "Musculoskeletal" },
      { value: "neurological", label: "Neurological" },
      { value: "plant-biology", label: "Plant Biology" },
      { value: "microbiology", label: "Microbiology" },
    ],
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleExport = (type = "general") => {
    console.log(`Exporting ${type} data...`);
    // Simulate export functionality
  };

  const handleDrillDown = (category, data) => {
    console.log(`Drilling down into ${category}:`, data);
    // Handle drill-down navigation
  };

  const resetFilters = () => {
    setSelectedFilters({
      dateRange: "all",
      organism: "all",
      environment: "all",
      topic: "all",
    });
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      <StudiesTimelineChart onExport={() => handleExport("timeline")} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <BiologicalSystemsChart onDrillDown={handleDrillDown} />
        <EnvironmentDistributionChart onDrillDown={handleDrillDown} />
      </div>

      <KnowledgeGapsPanel onExportGaps={() => handleExport("knowledge-gaps")} />
    </div>
  );

  const renderTrendsTab = () => <TrendAnalysisPanel />;

  const renderCorrelationsTab = () => <CorrelationMatrix />;

  const renderExportTab = () => <ExportManager />;

  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return renderOverviewTab();
      case "trends":
        return renderTrendsTab();
      case "correlations":
        return renderCorrelationsTab();
      case "export":
        return renderExportTab();
      default:
        return renderOverviewTab();
    }
  };

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
          <BreadcrumbTrail />

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                Insights & Analytics
              </h1>
              <p className="text-muted-foreground">
                Visual data analysis and AI-identified knowledge gaps for
                strategic research oversight
              </p>
            </div>

            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                iconName="RotateCcw"
                iconPosition="left"
                iconSize={14}
              >
                Reset Filters
              </Button>

              <Button
                variant="default"
                size="sm"
                onClick={() => handleExport("dashboard")}
                iconName="Download"
                iconPosition="left"
                iconSize={14}
              >
                Export Dashboard
              </Button>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="glass-card p-4 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center space-x-2">
                <Icon
                  name="Filter"
                  size={16}
                  className="text-muted-foreground"
                />
                <span className="text-sm font-medium text-foreground">
                  Filters:
                </span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 flex-1 lg:max-w-4xl">
                {Object.entries(filterOptions)?.map(([filterType, options]) => (
                  <select
                    key={filterType}
                    value={selectedFilters?.[filterType]}
                    onChange={(e) =>
                      handleFilterChange(filterType, e?.target?.value)
                    }
                    className="bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {options?.map((option) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                  </select>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-muted/20 rounded-lg p-1">
            {tabs?.map((tab) => (
              <Button
                key={tab?.id}
                variant={activeTab === tab?.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab?.id)}
                iconName={tab?.icon}
                iconPosition="left"
                iconSize={16}
                className="flex-1 lg:flex-none"
              >
                <span className="hidden sm:inline">{tab?.label}</span>
                <span className="sm:hidden">{tab?.label?.slice(0, 4)}</span>
              </Button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="transition-all duration-300 ease-in-out">
            {renderActiveTab()}
          </div>
        </div>
      </main>
      <QuickActionPanel
        onExport={() => handleExport("quick")}
        onSave={() => console.log("Save current view")}
        onShare={() => console.log("Share analytics")}
        onHelp={() => console.log("Show help")}
      />
    </div>
  );
};

export default InsightsAnalytics;
