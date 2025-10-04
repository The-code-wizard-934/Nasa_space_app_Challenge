import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";

const BulkActionsBar = ({
  selectedCount,
  onClearSelection,
  onBulkAISummary,
  onBulkExport,
  onBulkKnowledgeGraph,
  isProcessing = false,
}) => {
  const [exportFormat, setExportFormat] = useState("csv");
  const [showExportOptions, setShowExportOptions] = useState(false);

  const exportOptions = [
    { value: "csv", label: "CSV Spreadsheet" },
    { value: "json", label: "JSON Data" },
    { value: "pdf", label: "PDF Report" },
    { value: "bibtex", label: "BibTeX Citations" },
  ];

  const handleBulkExport = () => {
    onBulkExport(exportFormat);
    setShowExportOptions(false);
  };

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
      <div className="bg-card border border-border rounded-lg shadow-floating p-4 min-w-96">
        <div className="flex items-center justify-between">
          {/* Selection Info */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Icon name="CheckSquare" size={20} className="text-primary" />
              <span className="font-medium text-foreground">
                {selectedCount} publication{selectedCount !== 1 ? "s" : ""}{" "}
                selected
              </span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              iconName="X"
              className="text-muted-foreground hover:text-foreground"
            >
              Clear
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* AI Summary */}
            <Button
              variant="outline"
              size="sm"
              onClick={onBulkAISummary}
              disabled={isProcessing}
              iconName={isProcessing ? "Loader2" : "Brain"}
              iconPosition="left"
              className={isProcessing ? "animate-spin" : ""}
            >
              {isProcessing ? "Processing..." : "AI Summary"}
            </Button>

            {/* Knowledge Graph */}
            <Button
              variant="outline"
              size="sm"
              onClick={onBulkKnowledgeGraph}
              iconName="Network"
              iconPosition="left"
            >
              Graph View
            </Button>

            {/* Export with Dropdown */}
            <div className="relative">
              {showExportOptions && (
                <>
                  {/* Overlay */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowExportOptions(false)}
                  />

                  {/* Export Options Panel */}
                  <div className="absolute bottom-full right-0 mb-2 bg-popover border border-border rounded-lg shadow-floating p-4 min-w-64 z-20">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-popover-foreground">
                          Export Options
                        </h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowExportOptions(false)}
                          className="w-6 h-6"
                        >
                          <Icon name="X" size={14} />
                        </Button>
                      </div>

                      <Select
                        label="Format"
                        options={exportOptions}
                        value={exportFormat}
                        onChange={setExportFormat}
                      />

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm text-muted-foreground">
                          {selectedCount} publications
                        </span>

                        <Button
                          variant="default"
                          size="sm"
                          onClick={handleBulkExport}
                          iconName="Download"
                          iconPosition="left"
                        >
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <Button
                variant="default"
                size="sm"
                onClick={() => setShowExportOptions(!showExportOptions)}
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        {isProcessing && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center space-x-3">
              <div className="flex-1 bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full animate-pulse w-1/3" />
              </div>
              <span className="text-xs text-muted-foreground">
                Processing AI summaries...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkActionsBar;
