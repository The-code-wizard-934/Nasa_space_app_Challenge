import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const CorrelationMatrix = () => {
  const [selectedCell, setSelectedCell] = useState(null);
  const [viewMode, setViewMode] = useState("correlation");

  const correlationData = [
    {
      topic1: "Cardiovascular",
      topic2: "Musculoskeletal",
      correlation: 0.78,
      strength: "strong",
      studies: 45,
      description:
        "Strong correlation due to shared physiological responses to microgravity",
    },
    {
      topic1: "Cardiovascular",
      topic2: "Neurological",
      correlation: 0.65,
      strength: "moderate",
      studies: 32,
      description:
        "Moderate correlation through cardiovascular-brain health connections",
    },
    {
      topic1: "Cardiovascular",
      topic2: "Plant Biology",
      correlation: 0.23,
      strength: "weak",
      studies: 12,
      description: "Weak correlation, limited shared research methodologies",
    },
    {
      topic1: "Cardiovascular",
      topic2: "Microbiology",
      correlation: 0.41,
      strength: "moderate",
      studies: 28,
      description:
        "Moderate correlation through microbiome-heart health research",
    },
    {
      topic1: "Musculoskeletal",
      topic2: "Neurological",
      correlation: 0.72,
      strength: "strong",
      studies: 38,
      description:
        "Strong correlation via neuromuscular control and motor function studies",
    },
    {
      topic1: "Musculoskeletal",
      topic2: "Plant Biology",
      correlation: 0.18,
      strength: "weak",
      studies: 8,
      description: "Weak correlation, minimal research overlap",
    },
    {
      topic1: "Musculoskeletal",
      topic2: "Microbiology",
      correlation: 0.35,
      strength: "weak",
      studies: 19,
      description: "Weak correlation through bone microbiome research",
    },
    {
      topic1: "Neurological",
      topic2: "Plant Biology",
      correlation: 0.29,
      strength: "weak",
      studies: 15,
      description:
        "Weak correlation via plant neurobiology and behavior studies",
    },
    {
      topic1: "Neurological",
      topic2: "Microbiology",
      correlation: 0.58,
      strength: "moderate",
      studies: 34,
      description: "Moderate correlation through gut-brain axis research",
    },
    {
      topic1: "Plant Biology",
      topic2: "Microbiology",
      correlation: 0.84,
      strength: "strong",
      studies: 67,
      description:
        "Strong correlation via plant-microbe interactions and symbiosis",
    },
  ];

  const topics = [
    "Cardiovascular",
    "Musculoskeletal",
    "Neurological",
    "Plant Biology",
    "Microbiology",
  ];

  const getCorrelation = (topic1, topic2) => {
    if (topic1 === topic2)
      return { correlation: 1.0, strength: "perfect", studies: 0 };

    const found = correlationData?.find(
      (item) =>
        (item?.topic1 === topic1 && item?.topic2 === topic2) ||
        (item?.topic1 === topic2 && item?.topic2 === topic1)
    );

    return found || { correlation: 0, strength: "none", studies: 0 };
  };

  const getCorrelationColor = (correlation, strength) => {
    if (correlation === 1.0) return "bg-primary text-primary-foreground";
    if (strength === "strong") return "bg-success/80 text-success-foreground";
    if (strength === "moderate") return "bg-warning/80 text-warning-foreground";
    if (strength === "weak") return "bg-muted/60 text-muted-foreground";
    return "bg-background text-foreground";
  };

  const getStrengthIcon = (strength) => {
    switch (strength) {
      case "perfect":
        return "Target";
      case "strong":
        return "TrendingUp";
      case "moderate":
        return "Minus";
      case "weak":
        return "TrendingDown";
      default:
        return "Circle";
    }
  };

  const handleCellClick = (topic1, topic2) => {
    if (topic1 === topic2) return;
    const key = `${topic1}-${topic2}`;
    setSelectedCell(selectedCell === key ? null : key);
  };

  const getSelectedCorrelation = () => {
    if (!selectedCell) return null;
    const [topic1, topic2] = selectedCell?.split("-");
    return correlationData?.find(
      (item) =>
        (item?.topic1 === topic1 && item?.topic2 === topic2) ||
        (item?.topic1 === topic2 && item?.topic2 === topic1)
    );
  };

  return (
    <div className="glass-card p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            Research Topic Correlation Matrix
          </h3>
          <p className="text-sm text-muted-foreground">
            Correlation strength between different biological research areas
          </p>
        </div>

        <div className="flex gap-3 mt-4 lg:mt-0">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={14}
          >
            Export Matrix
          </Button>
        </div>
      </div>
      {/* Matrix Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header Row */}
          <div className="grid grid-cols-6 gap-1 mb-1">
            <div className="p-3"></div>
            {topics?.map((topic) => (
              <div key={topic} className="p-3 text-center">
                <div className="text-xs font-medium text-foreground transform -rotate-45 origin-center">
                  {topic}
                </div>
              </div>
            ))}
          </div>

          {/* Matrix Rows */}
          {topics?.map((rowTopic, rowIndex) => (
            <div key={rowTopic} className="grid grid-cols-6 gap-1 mb-1">
              {/* Row Header */}
              <div className="p-3 flex items-center">
                <div className="text-xs font-medium text-foreground">
                  {rowTopic}
                </div>
              </div>

              {/* Correlation Cells */}
              {topics?.map((colTopic, colIndex) => {
                const correlation = getCorrelation(rowTopic, colTopic);
                const cellKey = `${rowTopic}-${colTopic}`;
                const isSelected = selectedCell === cellKey;

                return (
                  <div
                    key={colTopic}
                    className={`
                      p-3 rounded-lg border-2 cursor-pointer transition-cosmic
                      ${getCorrelationColor(
                        correlation?.correlation,
                        correlation?.strength
                      )}
                      ${
                        isSelected
                          ? "border-primary scale-105"
                          : "border-transparent hover:border-muted-foreground/50"
                      }
                      ${rowTopic === colTopic ? "cursor-default" : ""}
                    `}
                    onClick={() => handleCellClick(rowTopic, colTopic)}
                  >
                    <div className="text-center">
                      <div className="text-sm font-bold mb-1">
                        {correlation?.correlation?.toFixed(2)}
                      </div>
                      <Icon
                        name={getStrengthIcon(correlation?.strength)}
                        size={12}
                        className="mx-auto"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-6 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded bg-success/80"></div>
          <span className="text-xs text-muted-foreground">Strong (0.7+)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded bg-warning/80"></div>
          <span className="text-xs text-muted-foreground">
            Moderate (0.4-0.7)
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded bg-muted/60"></div>
          <span className="text-xs text-muted-foreground">Weak (0.1-0.4)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded bg-primary"></div>
          <span className="text-xs text-muted-foreground">Perfect (1.0)</span>
        </div>
      </div>
      {/* Selected Correlation Details */}
      {selectedCell && getSelectedCorrelation() && (
        <div className="mt-6 p-4 bg-muted/20 border border-border rounded-lg">
          <div className="flex items-start justify-between mb-3">
            <h4 className="text-sm font-medium text-foreground">
              Correlation Details
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCell(null)}
              iconName="X"
              iconSize={14}
            />
          </div>

          {(() => {
            const correlation = getSelectedCorrelation();
            return (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {correlation?.topic1} ↔ {correlation?.topic2}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">
                      {correlation?.correlation?.toFixed(2)}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        correlation?.strength === "strong"
                          ? "bg-success/20 text-success"
                          : correlation?.strength === "moderate"
                          ? "bg-warning/20 text-warning"
                          : "bg-muted/40 text-muted-foreground"
                      }`}
                    >
                      {correlation?.strength}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {correlation?.description}
                </p>
                <div className="text-xs text-muted-foreground">
                  Based on {correlation?.studies} shared studies
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default CorrelationMatrix;
