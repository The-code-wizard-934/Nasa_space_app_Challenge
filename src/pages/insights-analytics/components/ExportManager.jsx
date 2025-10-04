import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ExportManager = () => {
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [selectedSections, setSelectedSections] = useState({
    timeline: true,
    biologicalSystems: true,
    environment: true,
    knowledgeGaps: true,
    trends: true,
    correlations: false,
    rawData: false,
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportHistory, setExportHistory] = useState([
    {
      id: 1,
      name: "Q3 2024 Analytics Report",
      format: "PDF",
      size: "2.4 MB",
      date: "2024-10-01",
      sections: ["Timeline", "Knowledge Gaps", "Trends"],
      status: "completed",
    },
    {
      id: 2,
      name: "Biological Systems Data Export",
      format: "CSV",
      size: "856 KB",
      date: "2024-09-28",
      sections: ["Biological Systems", "Raw Data"],
      status: "completed",
    },
    {
      id: 3,
      name: "Correlation Matrix Analysis",
      format: "Excel",
      size: "1.2 MB",
      date: "2024-09-25",
      sections: ["Correlations", "Raw Data"],
      status: "completed",
    },
  ]);

  const exportFormats = [
    {
      value: "pdf",
      label: "PDF Report",
      icon: "FileText",
      description: "Comprehensive formatted report",
    },
    {
      value: "csv",
      label: "CSV Data",
      icon: "Database",
      description: "Raw data for analysis",
    },
    {
      value: "excel",
      label: "Excel Workbook",
      icon: "Table",
      description: "Multiple sheets with charts",
    },
    {
      value: "json",
      label: "JSON Data",
      icon: "Code",
      description: "Structured data format",
    },
  ];

  const sectionOptions = [
    {
      key: "timeline",
      label: "Studies Timeline Chart",
      description: "Historical research trends",
    },
    {
      key: "biologicalSystems",
      label: "Biological Systems Analysis",
      description: "Research distribution by system",
    },
    {
      key: "environment",
      label: "Environment Distribution",
      description: "Experiment environment breakdown",
    },
    {
      key: "knowledgeGaps",
      label: "Knowledge Gaps Report",
      description: "AI-identified research opportunities",
    },
    {
      key: "trends",
      label: "Trend Analysis",
      description: "Predictive modeling and insights",
    },
    {
      key: "correlations",
      label: "Correlation Matrix",
      description: "Topic relationship analysis",
    },
    {
      key: "rawData",
      label: "Raw Dataset",
      description: "Complete underlying data",
    },
  ];

  const handleSectionToggle = (sectionKey) => {
    setSelectedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev?.[sectionKey],
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const selectedSectionNames = sectionOptions
      ?.filter((section) => selectedSections?.[section?.key])
      ?.map((section) => section?.label?.split(" ")?.[0]);

    const newExport = {
      id: exportHistory?.length + 1,
      name: `Analytics Export ${new Date()?.toLocaleDateString()}`,
      format: selectedFormat?.toUpperCase(),
      size: `${(Math.random() * 3 + 0.5)?.toFixed(1)} MB`,
      date: new Date()?.toISOString()?.split("T")?.[0],
      sections: selectedSectionNames,
      status: "completed",
    };

    setExportHistory((prev) => [newExport, ...prev]);
    setIsExporting(false);
  };

  const getSelectedCount = () => {
    return Object.values(selectedSections)?.filter(Boolean)?.length;
  };

  const getEstimatedSize = () => {
    const baseSize = getSelectedCount() * 0.3;
    const formatMultiplier =
      selectedFormat === "pdf" ? 1.5 : selectedFormat === "excel" ? 1.2 : 0.8;
    return (baseSize * formatMultiplier)?.toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Export Configuration */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
              Export Analytics Report
            </h3>
            <p className="text-sm text-muted-foreground">
              Generate comprehensive reports and datasets for external analysis
            </p>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="HardDrive" size={16} />
            <span>Est. {getEstimatedSize()} MB</span>
          </div>
        </div>

        {/* Format Selection */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3">
            Export Format
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {exportFormats?.map((format) => (
              <div
                key={format?.value}
                className={`
                  border rounded-lg p-4 cursor-pointer transition-cosmic
                  ${
                    selectedFormat === format?.value
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-muted-foreground/50"
                  }
                `}
                onClick={() => setSelectedFormat(format?.value)}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Icon
                    name={format?.icon}
                    size={20}
                    className={
                      selectedFormat === format?.value
                        ? "text-primary"
                        : "text-muted-foreground"
                    }
                  />
                  <span className="text-sm font-medium text-foreground">
                    {format?.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {format?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section Selection */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-foreground">
              Include Sections
            </h4>
            <span className="text-xs text-muted-foreground">
              {getSelectedCount()} of {sectionOptions?.length} selected
            </span>
          </div>

          <div className="space-y-2">
            {sectionOptions?.map((section) => (
              <div
                key={section?.key}
                className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/20 transition-cosmic"
              >
                <input
                  type="checkbox"
                  id={section?.key}
                  checked={selectedSections?.[section?.key]}
                  onChange={() => handleSectionToggle(section?.key)}
                  className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
                />
                <div className="flex-1">
                  <label
                    htmlFor={section?.key}
                    className="text-sm font-medium text-foreground cursor-pointer"
                  >
                    {section?.label}
                  </label>
                  <p className="text-xs text-muted-foreground">
                    {section?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleExport}
            disabled={getSelectedCount() === 0 || isExporting}
            loading={isExporting}
            iconName="Download"
            iconPosition="left"
            className="min-w-32"
          >
            {isExporting ? "Exporting..." : "Export Report"}
          </Button>
        </div>
      </div>
      {/* Export History */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Recent Exports
        </h3>

        <div className="space-y-3">
          {exportHistory?.map((export_item) => (
            <div
              key={export_item?.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/20 transition-cosmic"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon
                    name={
                      export_item?.format === "PDF"
                        ? "FileText"
                        : export_item?.format === "CSV"
                        ? "Database"
                        : export_item?.format === "EXCEL"
                        ? "Table"
                        : "Code"
                    }
                    size={20}
                    className="text-primary"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground">
                    {export_item?.name}
                  </h4>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                    <span>
                      {export_item?.format} • {export_item?.size}
                    </span>
                    <span>
                      {new Date(export_item.date)?.toLocaleDateString()}
                    </span>
                    <span>{export_item?.sections?.join(", ")}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 text-xs text-success">
                  <Icon name="CheckCircle" size={14} />
                  <span>Completed</span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  iconSize={14}
                >
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>

        {exportHistory?.length === 0 && (
          <div className="text-center py-8">
            <Icon
              name="Archive"
              size={48}
              className="text-muted-foreground mx-auto mb-4"
            />
            <p className="text-muted-foreground">
              No exports yet. Create your first report above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportManager;
