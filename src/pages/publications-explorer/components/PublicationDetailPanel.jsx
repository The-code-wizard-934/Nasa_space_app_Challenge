import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const PublicationDetailPanel = ({
  publication,
  onClose,
  onAISummary,
  onKnowledgeGraph,
  onExport,
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!publication) return null;

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getEnvironmentInfo = (environment) => {
    const environments = {
      iss: {
        name: "International Space Station",
        description: "Microgravity environment aboard the ISS",
        icon: "Rocket",
      },
      shuttle: {
        name: "Space Shuttle",
        description: "Experiments conducted during shuttle missions",
        icon: "Plane",
      },
      lunar: {
        name: "Lunar Surface",
        description: "Moon-based or lunar analog experiments",
        icon: "Moon",
      },
      "mars-analog": {
        name: "Mars Analog",
        description: "Earth-based Mars simulation environments",
        icon: "Globe",
      },
      "ground-control": {
        name: "Ground Control",
        description: "Earth-based control experiments",
        icon: "Home",
      },
    };

    return (
      environments?.[environment] || {
        name: environment,
        description: "Experimental environment",
        icon: "MapPin",
      }
    );
  };

  const relatedStudies = [
    {
      id: "rel-1",
      title: "Microgravity Effects on Plant Cell Wall Development",
      authors: ["Johnson, M.", "Chen, L."],
      similarity: 0.89,
      year: 2023,
    },
    {
      id: "rel-2",
      title: "Root Growth Patterns in Space-Based Agriculture",
      authors: ["Williams, R.", "Davis, K."],
      similarity: 0.76,
      year: 2022,
    },
    {
      id: "rel-3",
      title: "Cellular Response to Reduced Gravity Conditions",
      authors: ["Martinez, A.", "Thompson, S."],
      similarity: 0.71,
      year: 2024,
    },
  ];

  const environmentInfo = getEnvironmentInfo(publication?.environment);

  const tabs = [
    { id: "overview", label: "Overview", icon: "FileText" },
    { id: "abstract", label: "Abstract", icon: "AlignLeft" },
    { id: "methodology", label: "Methods", icon: "Settings" },
    { id: "related", label: "Related Studies", icon: "Network" },
  ];

  return (
    <div className="fixed inset-y-0 right-0 w-full lg:w-1/2 xl:w-2/5 bg-card border-l border-border shadow-floating z-40 overflow-hidden">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="FileText" size={24} className="text-primary" />
            <h2 className="text-lg font-heading font-semibold text-foreground">
              Publication Details
            </h2>
          </div>

          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-cosmic ${
                activeTab === tab?.id
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-cosmic">
          {activeTab === "overview" && (
            <div className="p-6 space-y-6">
              {/* Title and Basic Info */}
              <div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                  {publication?.title}
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <Icon
                      name="Users"
                      size={16}
                      className="text-muted-foreground mt-0.5"
                    />
                    <div>
                      <span className="text-muted-foreground">Authors: </span>
                      <span className="text-foreground">
                        {publication?.authors?.join(", ")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Icon
                      name="Calendar"
                      size={16}
                      className="text-muted-foreground"
                    />
                    <div>
                      <span className="text-muted-foreground">Published: </span>
                      <span className="text-foreground">
                        {formatDate(publication?.publicationDate)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Icon
                      name="Link"
                      size={16}
                      className="text-muted-foreground"
                    />
                    <div>
                      <span className="text-muted-foreground">DOI: </span>
                      <span className="text-foreground font-mono text-xs">
                        {publication?.doi}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Research Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-muted/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon
                      name="Microscope"
                      size={16}
                      className="text-primary"
                    />
                    <span className="text-sm font-medium text-foreground">
                      Organism
                    </span>
                  </div>
                  <p className="text-foreground capitalize">
                    {publication?.organism?.replace("-", " ")}
                  </p>
                </div>

                <div className="bg-muted/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon
                      name={environmentInfo?.icon}
                      size={16}
                      className="text-primary"
                    />
                    <span className="text-sm font-medium text-foreground">
                      Environment
                    </span>
                  </div>
                  <p className="text-foreground">{environmentInfo?.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {environmentInfo?.description}
                  </p>
                </div>
              </div>

              {/* AI Summary Status */}
              <div className="bg-muted/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="Brain" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      AI Analysis
                    </span>
                  </div>

                  {publication?.aiSummary ? (
                    <Icon
                      name="CheckCircle"
                      size={16}
                      className="text-success"
                    />
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onAISummary(publication)}
                      iconName="Sparkles"
                      iconPosition="left"
                    >
                      Generate Summary
                    </Button>
                  )}
                </div>

                {publication?.aiSummary ? (
                  <p className="text-sm text-muted-foreground">
                    AI summary and insights are available for this publication.
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Generate an AI-powered summary to extract key findings and
                    insights.
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === "abstract" && (
            <div className="p-6">
              <div className="prose prose-sm max-w-none text-foreground">
                <h4 className="text-lg font-heading font-semibold mb-4">
                  Abstract
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {publication?.abstract ||
                    `This study investigates the effects of microgravity on ${publication?.organism?.replace(
                      "-",
                      " "
                    )} development and cellular processes. The research was conducted in a ${environmentInfo?.name?.toLowerCase()} environment to understand fundamental biological responses to space conditions.\n\nKey findings include significant alterations in cellular structure, gene expression patterns, and metabolic pathways. These results contribute to our understanding of biological adaptation mechanisms and have implications for long-duration space missions and astrobiology research.\n\nThe methodology employed advanced imaging techniques and molecular analysis to characterize the observed changes. Statistical analysis revealed significant differences compared to ground-based controls, providing valuable insights for future space biology research.`}
                </p>
              </div>
            </div>
          )}

          {activeTab === "methodology" && (
            <div className="p-6 space-y-4">
              <h4 className="text-lg font-heading font-semibold text-foreground">
                Methodology
              </h4>

              <div className="space-y-4">
                <div className="bg-muted/20 rounded-lg p-4">
                  <h5 className="font-medium text-foreground mb-2">
                    Experimental Design
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    Controlled experiment comparing{" "}
                    {publication?.organism?.replace("-", " ")} samples in{" "}
                    {environmentInfo?.name?.toLowerCase()} conditions versus
                    ground-based controls.
                  </p>
                </div>

                <div className="bg-muted/20 rounded-lg p-4">
                  <h5 className="font-medium text-foreground mb-2">
                    Sample Preparation
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    Standardized protocols for organism cultivation,
                    environmental conditioning, and sample collection at
                    predetermined time points.
                  </p>
                </div>

                <div className="bg-muted/20 rounded-lg p-4">
                  <h5 className="font-medium text-foreground mb-2">
                    Analysis Methods
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    Multi-modal analysis including microscopy, molecular biology
                    techniques, and statistical evaluation of observed changes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "related" && (
            <div className="p-6">
              <h4 className="text-lg font-heading font-semibold text-foreground mb-4">
                Related Studies
              </h4>

              <div className="space-y-4">
                {relatedStudies?.map((study) => (
                  <div
                    key={study?.id}
                    className="border border-border rounded-lg p-4 hover:bg-muted/10 transition-cosmic"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-medium text-foreground line-clamp-2">
                        {study?.title}
                      </h5>
                      <span className="text-xs text-muted-foreground ml-2">
                        {Math.round(study?.similarity * 100)}% match
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">
                      {study?.authors?.join(", ")} • {study?.year}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{ width: `${study?.similarity * 100}%` }}
                        />
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-3"
                        iconName="ExternalLink"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="border-t border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onKnowledgeGraph(publication)}
                iconName="Network"
                iconPosition="left"
              >
                Knowledge Graph
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onExport(publication)}
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
            </div>

            <Button
              variant="default"
              size="sm"
              onClick={() => onAISummary(publication)}
              iconName="Brain"
              iconPosition="left"
            >
              AI Analysis
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationDetailPanel;
