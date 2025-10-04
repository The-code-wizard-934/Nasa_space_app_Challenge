import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationSidebar from "../../components/ui/NavigationSidebar";
import BreadcrumbTrail from "../../components/ui/BreadcrumbTrail";
import QuickActionPanel from "../../components/ui/QuickactionPanel";
import MetricCard from "./components/MetricCard";
import SearchBar from "./components/Searchbar";
import TimelineChart from "./components/TimelineChart";
import RecentPublications from "./components/RecentPublications";
import KnowledgeGraphPreview from "./components/KnowledgeGraphPreview";
import QuickActions from "./components/QuickActions";

const OverviewDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock data for metrics
  const metrics = [
    {
      title: "Total Publications",
      value: "642",
      subtitle: "Research documents",
      icon: "FileText",
      trend: "up",
      trendValue: "+12 this month",
      onClick: () => navigate("/publications-explorer"),
    },
    {
      title: "AI Interactions",
      value: "1,247",
      subtitle: "Queries processed",
      icon: "Bot",
      trend: "up",
      trendValue: "+23% this week",
      onClick: () => navigate("/ai-chatbot-interface"),
    },
    {
      title: "Research Topics",
      value: "89",
      subtitle: "Active areas",
      icon: "Network",
      trend: "stable",
      trendValue: "No change",
      onClick: () => navigate("/knowledge-graph-visual"),
    },
    {
      title: "Knowledge Gaps",
      value: "15",
      subtitle: "Identified areas",
      icon: "AlertTriangle",
      trend: "down",
      trendValue: "-3 resolved",
      onClick: () => navigate("/insights-analytics"),
    },
  ];

  // Mock data for timeline chart
  const timelineData = [
    { year: "2018", studies: 45 },
    { year: "2019", studies: 52 },
    { year: "2020", studies: 38 },
    { year: "2021", studies: 67 },
    { year: "2022", studies: 89 },
    { year: "2023", studies: 124 },
    { year: "2024", studies: 227 },
  ];

  // Mock data for recent publications
  const recentPublications = [
    {
      id: 1,
      title:
        "Effects of Microgravity on Arabidopsis Root Development and Gene Expression",
      authors: "Johnson, M.K., Chen, L., Rodriguez, A.",
      year: "2024",
      organism: "Arabidopsis",
      environment: "ISS",
      abstract: `This study investigates the molecular mechanisms underlying root development in Arabidopsis thaliana under microgravity conditions aboard the International Space Station. Our findings reveal significant alterations in gravitropic responses and gene expression patterns that could impact future space agriculture initiatives.`,
    },
    {
      id: 2,
      title:
        "Bone Density Changes in Mice During Extended Spaceflight Simulation",
      authors: "Williams, S.R., Thompson, K.L., Davis, P.J.",
      year: "2024",
      organism: "Mice",
      environment: "Ground Simulation",
      abstract: `Long-duration spaceflight poses significant challenges to bone health. This research examines bone density changes in laboratory mice subjected to simulated microgravity conditions over 90 days, providing insights for countermeasure development.`,
    },
    {
      id: 3,
      title:
        "Radiation Effects on Cellular DNA Repair Mechanisms in Extremophile Bacteria",
      authors: "Kumar, R., Anderson, T.M., Lee, H.S.",
      year: "2024",
      organism: "Bacteria",
      environment: "Lunar Simulation",
      abstract: `Understanding how extremophile bacteria respond to space radiation is crucial for astrobiology research. This study characterizes DNA repair pathways in radiation-resistant bacterial strains under conditions simulating lunar surface exposure.`,
    },
  ];

  // Mock data for knowledge graph preview
  const graphNodes = [
    { id: "arabidopsis", name: "Arabidopsis", type: "organism" },
    { id: "mice", name: "Mice", type: "organism" },
    { id: "bacteria", name: "Bacteria", type: "organism" },
    { id: "microgravity", name: "Microgravity", type: "experiment" },
    { id: "radiation", name: "Radiation", type: "experiment" },
    { id: "bone-loss", name: "Bone Loss", type: "result" },
    { id: "gene-expression", name: "Gene Expression", type: "result" },
  ];

  const graphLinks = [
    { source: "arabidopsis", target: "microgravity" },
    { source: "mice", target: "microgravity" },
    { source: "bacteria", target: "radiation" },
    { source: "microgravity", target: "gene-expression" },
    { source: "microgravity", target: "bone-loss" },
    { source: "radiation", target: "gene-expression" },
  ];

  const handleTimelineClick = (year) => {
    navigate("/publications-explorer", { state: { filterYear: year } });
  };

  const handleSearch = (query) => {
    navigate("/ai-chatbot-interface", { state: { initialQuery: query } });
  };

  const handleExport = () => {
    console.log("Exporting dashboard data...");
    // Mock export functionality
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
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          <BreadcrumbTrail />

          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              NASA Bioscience Knowledge Dashboard
            </h1>
            <p className="text-muted-foreground">
              Explore 600+ research publications with AI-powered insights and
              interactive visualizations
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics?.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                subtitle={metric?.subtitle}
                icon={metric?.icon}
                trend={metric?.trend}
                trendValue={metric?.trendValue}
                onClick={metric?.onClick}
              />
            ))}
          </div>

          {/* Search Section */}
          <SearchBar onSearch={handleSearch} className="mb-8" />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Timeline Chart - Spans 2 columns on large screens */}
            <div className="lg:col-span-2">
              <TimelineChart
                data={timelineData}
                onDataPointClick={handleTimelineClick}
              />
            </div>

            {/* Knowledge Graph Preview */}
            <div className="lg:col-span-1">
              <KnowledgeGraphPreview nodes={graphNodes} links={graphLinks} />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Publications - Spans 2 columns */}
            <div className="lg:col-span-2">
              <RecentPublications publications={recentPublications} />
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <QuickActions />
            </div>
          </div>
        </div>
      </main>
      <QuickActionPanel onExport={handleExport} />
    </div>
  );
};

export default OverviewDashboard;
