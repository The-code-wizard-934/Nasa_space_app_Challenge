import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import { Checkbox } from "../../../components/ui/Checkbox";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";

const ProcessingOptions = ({
  onOptionsChange,
  onStartProcessing,
  isProcessing = false,
}) => {
  const [options, setOptions] = useState({
    summaryDepth: "detailed",
    extractCitations: true,
    generateKeywords: true,
    detectRelationships: true,
    createKnowledgeGraph: true,
    enableSemanticSearch: true,
    extractFigures: false,
    ocrScannedText: true,
    languageDetection: true,
    duplicateDetection: true,
  });

  const summaryDepthOptions = [
    {
      value: "brief",
      label: "Brief Summary",
      description: "Key findings and conclusions only",
    },
    {
      value: "detailed",
      label: "Detailed Summary",
      description: "Comprehensive analysis with methodology",
    },
    {
      value: "comprehensive",
      label: "Comprehensive",
      description: "Full document analysis with insights",
    },
  ];

  const handleOptionChange = (key, value) => {
    const updatedOptions = { ...options, [key]: value };
    setOptions(updatedOptions);
    onOptionsChange?.(updatedOptions);
  };

  const handleStartProcessing = () => {
    onStartProcessing?.(options);
  };

  const getEstimatedTime = () => {
    let baseTime = 3; // Base 3 minutes

    if (options?.summaryDepth === "comprehensive") baseTime += 2;
    if (options?.extractFigures) baseTime += 1;
    if (options?.ocrScannedText) baseTime += 2;
    if (options?.createKnowledgeGraph) baseTime += 1;

    return `${baseTime}-${baseTime + 2} minutes`;
  };

  const getProcessingComplexity = () => {
    let complexity = 0;

    Object.entries(options)?.forEach(([key, value]) => {
      if (value === true || (key === "summaryDepth" && value !== "brief")) {
        complexity++;
      }
    });

    if (complexity <= 4) return { level: "Basic", color: "text-success" };
    if (complexity <= 7) return { level: "Advanced", color: "text-warning" };
    return { level: "Comprehensive", color: "text-primary" };
  };

  let complexity = getProcessingComplexity();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-semibold text-foreground">
            Processing Options
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Configure AI processing preferences for uploaded documents
          </p>
        </div>

        <div className="text-right">
          <div className={`text-sm font-medium ${complexity?.color}`}>
            {complexity?.level} Processing
          </div>
          <div className="text-xs text-muted-foreground">
            Est. {getEstimatedTime()}
          </div>
        </div>
      </div>
      {/* Core Processing Options */}
      <div className="glass-card p-6 space-y-6">
        <h4 className="font-medium text-foreground flex items-center">
          <Icon name="Brain" size={20} className="text-accent mr-2" />
          AI Analysis Options
        </h4>

        <div className="space-y-4">
          <Select
            label="Summary Depth"
            description="Choose the level of detail for AI-generated summaries"
            options={summaryDepthOptions}
            value={options?.summaryDepth}
            onChange={(value) => handleOptionChange("summaryDepth", value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Checkbox
              label="Extract Citations"
              description="Identify and extract all referenced papers"
              checked={options?.extractCitations}
              onChange={(e) =>
                handleOptionChange("extractCitations", e?.target?.checked)
              }
            />

            <Checkbox
              label="Generate Keywords"
              description="Auto-generate relevant research keywords"
              checked={options?.generateKeywords}
              onChange={(e) =>
                handleOptionChange("generateKeywords", e?.target?.checked)
              }
            />

            <Checkbox
              label="Detect Relationships"
              description="Identify connections to existing research"
              checked={options?.detectRelationships}
              onChange={(e) =>
                handleOptionChange("detectRelationships", e?.target?.checked)
              }
            />

            <Checkbox
              label="Knowledge Graph Integration"
              description="Add document to interactive knowledge graph"
              checked={options?.createKnowledgeGraph}
              onChange={(e) =>
                handleOptionChange("createKnowledgeGraph", e?.target?.checked)
              }
            />
          </div>
        </div>
      </div>
      {/* Advanced Processing Options */}
      <div className="glass-card p-6 space-y-6">
        <h4 className="font-medium text-foreground flex items-center">
          <Icon name="Settings" size={20} className="text-accent mr-2" />
          Advanced Options
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Checkbox
            label="Enable Semantic Search"
            description="Make document searchable by meaning, not just keywords"
            checked={options?.enableSemanticSearch}
            onChange={(e) =>
              handleOptionChange("enableSemanticSearch", e?.target?.checked)
            }
          />

          <Checkbox
            label="Extract Figures & Tables"
            description="Process and catalog visual elements (slower)"
            checked={options?.extractFigures}
            onChange={(e) =>
              handleOptionChange("extractFigures", e?.target?.checked)
            }
          />

          <Checkbox
            label="OCR Scanned Text"
            description="Extract text from image-based PDFs"
            checked={options?.ocrScannedText}
            onChange={(e) =>
              handleOptionChange("ocrScannedText", e?.target?.checked)
            }
          />

          <Checkbox
            label="Language Detection"
            description="Automatically detect document language"
            checked={options?.languageDetection}
            onChange={(e) =>
              handleOptionChange("languageDetection", e?.target?.checked)
            }
          />

          <Checkbox
            label="Duplicate Detection"
            description="Check for similar documents in database"
            checked={options?.duplicateDetection}
            onChange={(e) =>
              handleOptionChange("duplicateDetection", e?.target?.checked)
            }
          />
        </div>
      </div>
      {/* Processing Preview */}
      <div className="glass-card p-6">
        <h4 className="font-medium text-foreground mb-4 flex items-center">
          <Icon name="Eye" size={20} className="text-accent mr-2" />
          Processing Preview
        </h4>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Summary Generation:</span>
            <span className="text-foreground capitalize">
              {options?.summaryDepth}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Citation Extraction:</span>
            <span
              className={
                options?.extractCitations
                  ? "text-success"
                  : "text-muted-foreground"
              }
            >
              {options?.extractCitations ? "Enabled" : "Disabled"}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Knowledge Graph:</span>
            <span
              className={
                options?.createKnowledgeGraph
                  ? "text-success"
                  : "text-muted-foreground"
              }
            >
              {options?.createKnowledgeGraph ? "Enabled" : "Disabled"}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Semantic Search:</span>
            <span
              className={
                options?.enableSemanticSearch
                  ? "text-success"
                  : "text-muted-foreground"
              }
            >
              {options?.enableSemanticSearch ? "Enabled" : "Disabled"}
            </span>
          </div>

          <div className="border-t border-border pt-3 mt-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">
                Estimated Processing Time:
              </span>
              <span className="text-primary font-medium">
                {getEstimatedTime()}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={() => {
            // Reset to default options
            const defaultOptions = {
              summaryDepth: "detailed",
              extractCitations: true,
              generateKeywords: true,
              detectRelationships: true,
              createKnowledgeGraph: true,
              enableSemanticSearch: true,
              extractFigures: false,
              ocrScannedText: true,
              languageDetection: true,
              duplicateDetection: true,
            };
            setOptions(defaultOptions);
            onOptionsChange?.(defaultOptions);
          }}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset to Defaults
        </Button>

        <Button
          onClick={handleStartProcessing}
          disabled={isProcessing}
          loading={isProcessing}
          iconName="Play"
          iconPosition="left"
          className="flex-1"
        >
          {isProcessing ? "Processing Documents..." : "Start Processing"}
        </Button>
      </div>
    </div>
  );
};

export default ProcessingOptions;
