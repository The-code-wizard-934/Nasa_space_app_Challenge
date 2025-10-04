import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const KnowledgeGapsPanel = ({ onExportGaps }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedGap, setExpandedGap] = useState(null);

  const knowledgeGaps = [
    {
      id: 1,
      title: "Long-term Microgravity Effects on Bone Density",
      category: "musculoskeletal",
      priority: "high",
      confidence: 92,
      description: `Limited research on bone density changes during missions exceeding 12 months. Current studies focus primarily on 6-month ISS missions, leaving significant gaps in understanding long-term skeletal health impacts for Mars missions.`,
      recommendations: [
        "Initiate longitudinal studies tracking bone density over 18+ month periods",
        "Develop advanced countermeasures for extended microgravity exposure",
        "Investigate genetic factors influencing bone loss susceptibility",
      ],
      fundingPotential: "High",
      researchOpportunity:
        "Mars mission preparation requires comprehensive bone health protocols",
      relatedStudies: 23,
      lastUpdated: "2024-09-15",
    },
    {
      id: 2,
      title: "Plant Reproduction in Reduced Gravity Environments",
      category: "plant-biology",
      priority: "high",
      confidence: 88,
      description: `Insufficient data on plant reproductive cycles, pollination, and seed development in microgravity conditions. Critical for sustainable food production during long-duration space missions.`,
      recommendations: [
        "Study complete plant life cycles from seed to seed in microgravity",
        "Investigate artificial pollination techniques for space agriculture",
        "Develop closed-loop plant breeding systems for space habitats",
      ],
      fundingPotential: "Very High",
      researchOpportunity:
        "Essential for Mars colonization and lunar base sustainability",
      relatedStudies: 18,
      lastUpdated: "2024-09-28",
    },
    {
      id: 3,
      title: "Microbial Resistance Evolution in Space",
      category: "microbiology",
      priority: "medium",
      confidence: 85,
      description: `Limited understanding of how pathogenic microorganisms evolve and develop resistance in the unique space environment. Potential implications for crew health and contamination protocols.`,
      recommendations: [
        "Monitor microbial evolution patterns during extended missions",
        "Develop rapid resistance detection protocols for space environments",
        "Study microbiome interactions in closed space habitats",
      ],
      fundingPotential: "Medium",
      researchOpportunity:
        "Critical for crew health management and planetary protection",
      relatedStudies: 31,
      lastUpdated: "2024-10-02",
    },
    {
      id: 4,
      title: "Neuroplasticity Changes in Prolonged Isolation",
      category: "neurological",
      priority: "medium",
      confidence: 79,
      description: `Insufficient research on brain adaptation and cognitive changes during extended isolation periods typical of deep space missions. Current studies limited to Earth-based analogs.`,
      recommendations: [
        "Conduct longitudinal neuroimaging studies during ISS missions",
        "Develop cognitive assessment protocols for space environments",
        "Investigate neuroprotective interventions for long-duration missions",
      ],
      fundingPotential: "High",
      researchOpportunity:
        "Essential for crew psychological health and mission success",
      relatedStudies: 15,
      lastUpdated: "2024-09-20",
    },
    {
      id: 5,
      title: "Cellular Repair Mechanisms in Radiation Environment",
      category: "cell-biology",
      priority: "high",
      confidence: 91,
      description: `Gap in understanding how cellular DNA repair mechanisms function under combined microgravity and radiation stress typical of deep space environments.`,
      recommendations: [
        "Study cellular repair pathways in simulated deep space conditions",
        "Investigate radioprotective compounds for space applications",
        "Develop real-time cellular health monitoring systems",
      ],
      fundingPotential: "Very High",
      researchOpportunity:
        "Critical for Mars mission crew safety and health protocols",
      relatedStudies: 27,
      lastUpdated: "2024-10-01",
    },
  ];

  const categories = [
    { value: "all", label: "All Categories", count: knowledgeGaps?.length },
    { value: "musculoskeletal", label: "Musculoskeletal", count: 1 },
    { value: "plant-biology", label: "Plant Biology", count: 1 },
    { value: "microbiology", label: "Microbiology", count: 1 },
    { value: "neurological", label: "Neurological", count: 1 },
    { value: "cell-biology", label: "Cell Biology", count: 1 },
  ];

  const priorityColors = {
    high: "text-error",
    medium: "text-warning",
    low: "text-success",
  };

  const priorityBgColors = {
    high: "bg-error/10 border-error/20",
    medium: "bg-warning/10 border-warning/20",
    low: "bg-success/10 border-success/20",
  };

  const getFilteredGaps = () => {
    if (selectedCategory === "all") return knowledgeGaps;
    return knowledgeGaps?.filter((gap) => gap?.category === selectedCategory);
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return "AlertTriangle";
      case "medium":
        return "AlertCircle";
      case "low":
        return "Info";
      default:
        return "Info";
    }
  };

  const toggleExpanded = (gapId) => {
    setExpandedGap(expandedGap === gapId ? null : gapId);
  };

  return (
    <div className="glass-card p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            AI-Identified Knowledge Gaps
          </h3>
          <p className="text-sm text-muted-foreground">
            Underresearched areas with high potential impact for space missions
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e?.target?.value)}
            className="bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {categories?.map((category) => (
              <option key={category?.value} value={category?.value}>
                {category?.label} ({category?.count})
              </option>
            ))}
          </select>

          <Button
            variant="outline"
            size="sm"
            onClick={onExportGaps}
            iconName="Download"
            iconPosition="left"
            iconSize={14}
          >
            Export Gaps
          </Button>
        </div>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-cosmic">
        {getFilteredGaps()?.map((gap) => (
          <div
            key={gap?.id}
            className={`border rounded-lg p-4 transition-cosmic ${
              priorityBgColors?.[gap?.priority]
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3 flex-1">
                <Icon
                  name={getPriorityIcon(gap?.priority)}
                  size={20}
                  className={`mt-0.5 ${priorityColors?.[gap?.priority]}`}
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    {gap?.title}
                  </h4>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span
                      className={`font-medium ${
                        priorityColors?.[gap?.priority]
                      }`}
                    >
                      {gap?.priority?.toUpperCase()} PRIORITY
                    </span>
                    <span>Confidence: {gap?.confidence}%</span>
                    <span>{gap?.relatedStudies} related studies</span>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleExpanded(gap?.id)}
                iconName={expandedGap === gap?.id ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
                iconSize={16}
                className="text-xs"
              >
                {expandedGap === gap?.id ? "Less" : "More"}
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              {gap?.description}
            </p>

            {expandedGap === gap?.id && (
              <div className="space-y-4 pt-4 border-t border-border/50">
                <div>
                  <h5 className="text-sm font-medium text-foreground mb-2">
                    Research Recommendations
                  </h5>
                  <ul className="space-y-1">
                    {gap?.recommendations?.map((rec, index) => (
                      <li
                        key={index}
                        className="text-sm text-muted-foreground flex items-start space-x-2"
                      >
                        <Icon
                          name="ArrowRight"
                          size={14}
                          className="mt-0.5 text-primary flex-shrink-0"
                        />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-1">
                      Funding Potential
                    </h5>
                    <p className="text-sm text-success">
                      {gap?.fundingPotential}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-1">
                      Last Updated
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      {new Date(gap.lastUpdated)?.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-foreground mb-1">
                    Research Opportunity
                  </h5>
                  <p className="text-sm text-muted-foreground italic">
                    {gap?.researchOpportunity}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {getFilteredGaps()?.length === 0 && (
        <div className="text-center py-8">
          <Icon
            name="Search"
            size={48}
            className="text-muted-foreground mx-auto mb-4"
          />
          <p className="text-muted-foreground">
            No knowledge gaps found for the selected category.
          </p>
        </div>
      )}
    </div>
  );
};

export default KnowledgeGapsPanel;
