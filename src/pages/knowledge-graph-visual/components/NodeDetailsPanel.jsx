import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const NodeDetailsPanel = ({
  selectedNode,
  onClose,
  onNavigateToPublication,
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!selectedNode) return null;

  const mockNodeData = {
    publication: {
      id: "pub-001",
      title:
        "Microgravity Effects on Plant Cell Wall Development in Arabidopsis thaliana",
      type: "Publication",
      authors: ["Dr. Sarah Chen", "Dr. Michael Rodriguez", "Dr. Lisa Park"],
      publishedDate: "2023-08-15",
      doi: "10.1038/s41526-023-00289-4",
      abstract: `This study investigates the impact of microgravity conditions on plant cell wall development using Arabidopsis thaliana as a model organism. Our findings reveal significant alterations in cellulose synthesis and lignification patterns under space conditions.\n\nKey findings include reduced cell wall thickness, altered pectin distribution, and modified gene expression patterns related to cell wall biosynthesis. These results have important implications for future space agriculture missions.`,
      citations: 47,
      relatedStudies: 12,
      keywords: [
        "microgravity",
        "plant biology",
        "cell wall",
        "space agriculture",
      ],
      connections: [
        {
          id: "org-001",
          type: "organism",
          label: "Arabidopsis thaliana",
          strength: "strong",
        },
        {
          id: "exp-001",
          type: "experiment",
          label: "ISS Plant Growth Study",
          strength: "strong",
        },
        {
          id: "topic-001",
          type: "topic",
          label: "Space Agriculture",
          strength: "moderate",
        },
      ],
    },
    organism: {
      id: "org-001",
      title: "Arabidopsis thaliana",
      type: "Organism",
      commonName: "Thale Cress",
      taxonomy: "Kingdom: Plantae, Family: Brassicaceae",
      description: `Arabidopsis thaliana is a small flowering plant native to Eurasia and Africa. It is widely used as a model organism in plant biology and genetics research due to its small genome, short life cycle, and ease of cultivation.\n\nIn space research, A. thaliana serves as an excellent model for studying plant responses to microgravity, radiation, and other space-related stressors.`,
      studyCount: 89,
      firstStudied: "1998-03-12",
      lastStudied: "2024-01-20",
      spaceExperiments: 23,
      connections: [
        {
          id: "pub-001",
          type: "publication",
          label: "Microgravity Effects Study",
          strength: "strong",
        },
        {
          id: "pub-002",
          type: "publication",
          label: "Radiation Response Analysis",
          strength: "strong",
        },
        {
          id: "exp-001",
          type: "experiment",
          label: "ISS Plant Growth Study",
          strength: "strong",
        },
      ],
    },
  };

  const currentData =
    mockNodeData?.[selectedNode?.type] || mockNodeData?.publication;

  const tabs = [
    { id: "overview", label: "Overview", icon: "Info" },
    { id: "connections", label: "Connections", icon: "Network" },
    { id: "related", label: "Related Studies", icon: "FileText" },
    { id: "insights", label: "AI Insights", icon: "Brain" },
  ];

  const renderOverview = () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-foreground mb-2">Details</h4>
        {currentData?.authors && (
          <div className="mb-3">
            <span className="text-xs text-muted-foreground">Authors:</span>
            <p className="text-sm text-foreground">
              {currentData?.authors?.join(", ")}
            </p>
          </div>
        )}
        {currentData?.publishedDate && (
          <div className="mb-3">
            <span className="text-xs text-muted-foreground">Published:</span>
            <p className="text-sm text-foreground">
              {new Date(currentData.publishedDate)?.toLocaleDateString()}
            </p>
          </div>
        )}
        {currentData?.doi && (
          <div className="mb-3">
            <span className="text-xs text-muted-foreground">DOI:</span>
            <p className="text-sm text-primary font-mono">{currentData?.doi}</p>
          </div>
        )}
        {currentData?.taxonomy && (
          <div className="mb-3">
            <span className="text-xs text-muted-foreground">Taxonomy:</span>
            <p className="text-sm text-foreground">{currentData?.taxonomy}</p>
          </div>
        )}
      </div>

      <div>
        <h4 className="text-sm font-medium text-foreground mb-2">
          Description
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {currentData?.abstract || currentData?.description}
        </p>
      </div>

      {currentData?.keywords && (
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {currentData?.keywords?.map((keyword, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">
            {currentData?.citations || currentData?.studyCount || 0}
          </div>
          <div className="text-xs text-muted-foreground">
            {currentData?.citations ? "Citations" : "Studies"}
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">
            {currentData?.relatedStudies || currentData?.spaceExperiments || 0}
          </div>
          <div className="text-xs text-muted-foreground">
            {currentData?.relatedStudies ? "Related" : "Space Experiments"}
          </div>
        </div>
      </div>
    </div>
  );

  const renderConnections = () => (
    <div className="space-y-3">
      {currentData?.connections?.map((connection, index) => (
        <div
          key={index}
          className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-cosmic cursor-pointer"
          onClick={() => console.log("Navigate to connection:", connection?.id)}
        >
          <div
            className={`w-3 h-3 rounded-full ${
              connection?.type === "publication"
                ? "bg-blue-500"
                : connection?.type === "organism"
                ? "bg-green-500"
                : connection?.type === "experiment"
                ? "bg-purple-500"
                : "bg-orange-500"
            }`}
          />
          <div className="flex-1">
            <div className="text-sm font-medium text-foreground">
              {connection?.label}
            </div>
            <div className="text-xs text-muted-foreground capitalize">
              {connection?.type} • {connection?.strength} connection
            </div>
          </div>
          <Icon
            name="ChevronRight"
            size={16}
            className="text-muted-foreground"
          />
        </div>
      ))}
    </div>
  );

  const renderRelatedStudies = () => (
    <div className="space-y-3">
      {[
        {
          title: "Gravitational Effects on Root Development",
          authors: "Dr. James Wilson et al.",
          year: "2023",
          relevance: "High",
        },
        {
          title: "Space-Induced Gene Expression Changes",
          authors: "Dr. Maria Garcia et al.",
          year: "2022",
          relevance: "Medium",
        },
        {
          title: "Cellular Responses to Microgravity",
          authors: "Dr. Robert Kim et al.",
          year: "2024",
          relevance: "High",
        },
      ]?.map((study, index) => (
        <div
          key={index}
          className="p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-cosmic cursor-pointer"
          onClick={() =>
            onNavigateToPublication && onNavigateToPublication(study)
          }
        >
          <div className="text-sm font-medium text-foreground mb-1">
            {study?.title}
          </div>
          <div className="text-xs text-muted-foreground mb-2">
            {study?.authors} • {study?.year}
          </div>
          <div className="flex items-center justify-between">
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                study?.relevance === "High"
                  ? "bg-green-500/20 text-green-400"
                  : study?.relevance === "Medium"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {study?.relevance} Relevance
            </span>
            <Icon
              name="ExternalLink"
              size={14}
              className="text-muted-foreground"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderInsights = () => (
    <div className="space-y-4">
      <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Brain" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">AI Summary</span>
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          This research represents a significant contribution to understanding
          plant adaptation mechanisms in space environments. The findings
          suggest potential applications for sustainable food production during
          long-duration space missions.
        </p>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Key Insights</h4>
        {[
          "Strong correlation with ISS experimental data",
          "Novel findings in cell wall modification patterns",
          "Potential applications for Mars agriculture",
          "Methodology applicable to other plant species",
        ]?.map((insight, index) => (
          <div key={index} className="flex items-start space-x-2">
            <Icon
              name="CheckCircle"
              size={14}
              className="text-green-400 mt-0.5 flex-shrink-0"
            />
            <span className="text-sm text-muted-foreground">{insight}</span>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-2">
          Research Gaps
        </h4>
        <div className="space-y-2">
          {[
            "Long-term effects beyond 6 months",
            "Comparative studies with other plant families",
          ]?.map((gap, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Icon
                name="AlertCircle"
                size={14}
                className="text-orange-400 mt-0.5 flex-shrink-0"
              />
              <span className="text-sm text-muted-foreground">{gap}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-full lg:w-96 bg-card border-l border-border shadow-floating z-50 lg:z-30 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  selectedNode?.type === "publication"
                    ? "bg-blue-500"
                    : selectedNode?.type === "organism"
                    ? "bg-green-500"
                    : selectedNode?.type === "experiment"
                    ? "bg-purple-500"
                    : "bg-orange-500"
                }`}
              />
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground line-clamp-1">
                  {currentData?.title}
                </h3>
                <p className="text-sm text-muted-foreground capitalize">
                  {currentData?.type}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted/20 rounded transition-cosmic"
            >
              <Icon name="X" size={20} className="text-muted-foreground" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 text-sm font-medium transition-cosmic ${
                  activeTab === tab?.id
                    ? "text-primary border-b-2 border-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span className="hidden sm:inline">{tab?.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto scrollbar-cosmic p-4">
            {activeTab === "overview" && renderOverview()}
            {activeTab === "connections" && renderConnections()}
            {activeTab === "related" && renderRelatedStudies()}
            {activeTab === "insights" && renderInsights()}
          </div>

          {/* Actions */}
          <div className="border-t border-border p-4">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => console.log("View full details")}
              >
                <Icon name="ExternalLink" size={14} className="mr-2" />
                View Full
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => console.log("Add to collection")}
              >
                <Icon name="Bookmark" size={14} className="mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NodeDetailsPanel;
