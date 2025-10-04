import React from "react";
import Icon from "../../../components/AppIcon";

const ProcessingStatus = ({ files = [], processingSteps = [] }) => {
  const defaultSteps = [
    { id: "upload", label: "File Upload", icon: "Upload" },
    { id: "extraction", label: "Metadata Extraction", icon: "FileSearch" },
    { id: "summarization", label: "AI Summarization", icon: "Brain" },
    { id: "indexing", label: "Semantic Indexing", icon: "Database" },
    { id: "graph", label: "Knowledge Graph Integration", icon: "Network" },
  ];

  const steps = processingSteps?.length > 0 ? processingSteps : defaultSteps;

  const getStepStatus = (stepId, fileIndex = 0) => {
    if (files?.length === 0) return "pending";

    const file = files?.[fileIndex];
    if (!file?.processing) return "pending";

    const stepStatus = file?.processing?.[stepId];
    return stepStatus || "pending";
  };

  const getOverallProgress = () => {
    if (files?.length === 0) return 0;

    let totalSteps = files?.length * steps?.length;
    let completedSteps = 0;

    files?.forEach((file) => {
      if (file?.processing) {
        steps?.forEach((step) => {
          if (file?.processing?.[step?.id] === "completed") {
            completedSteps++;
          }
        });
      }
    });

    return Math.round((completedSteps / totalSteps) * 100);
  };

  const StatusIcon = ({ status }) => {
    switch (status) {
      case "completed":
        return <Icon name="CheckCircle" size={20} className="text-success" />;
      case "processing":
        return (
          <div className="animate-spin">
            <Icon name="Loader2" size={20} className="text-primary" />
          </div>
        );
      case "error":
        return <Icon name="XCircle" size={20} className="text-error" />;
      default:
        return (
          <Icon name="Circle" size={20} className="text-muted-foreground" />
        );
    }
  };

  const getEstimatedTime = (stepId) => {
    const timeEstimates = {
      upload: "30s",
      extraction: "2-3 min",
      summarization: "3-5 min",
      indexing: "1-2 min",
      graph: "2-4 min",
    };
    return timeEstimates?.[stepId] || "1-2 min";
  };

  if (files?.length === 0) {
    return (
      <div className="glass-card p-6 text-center">
        <Icon
          name="Clock"
          size={48}
          className="text-muted-foreground mx-auto mb-4"
        />
        <h3 className="font-heading font-semibold text-foreground mb-2">
          Ready to Process
        </h3>
        <p className="text-muted-foreground">
          Upload documents to begin AI processing and integration
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-foreground">
            Processing Progress
          </h3>
          <span className="text-sm font-medium text-primary">
            {getOverallProgress()}%
          </span>
        </div>

        <div className="w-full bg-muted/20 rounded-full h-2 mb-4">
          <div
            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
            style={{ width: `${getOverallProgress()}%` }}
          />
        </div>

        <div className="text-sm text-muted-foreground">
          Processing {files?.length} document{files?.length > 1 ? "s" : ""}{" "}
          through AI pipeline
        </div>
      </div>
      {/* Processing Steps */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Processing Pipeline</h4>

        <div className="space-y-3">
          {steps?.map((step, index) => {
            const status = getStepStatus(step?.id);
            const isActive = status === "processing";
            const isCompleted = status === "completed";
            const hasError = status === "error";

            return (
              <div
                key={step?.id}
                className={`
                flex items-center space-x-4 p-4 rounded-lg transition-cosmic
                ${
                  isActive
                    ? "bg-primary/10 border border-primary/20"
                    : isCompleted
                    ? "bg-success/10 border border-success/20"
                    : hasError
                    ? "bg-error/10 border border-error/20"
                    : "bg-muted/10 border border-border"
                }
              `}
              >
                <div className="flex-shrink-0">
                  <StatusIcon status={status} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-foreground">
                      {step?.label}
                    </h5>
                    {isActive && (
                      <span className="text-xs text-muted-foreground">
                        Est. {getEstimatedTime(step?.id)}
                      </span>
                    )}
                  </div>

                  {isActive && (
                    <div className="mt-2">
                      <div className="w-full bg-muted/20 rounded-full h-1">
                        <div
                          className="bg-primary h-1 rounded-full animate-pulse"
                          style={{ width: "60%" }}
                        />
                      </div>
                    </div>
                  )}

                  {hasError && (
                    <p className="text-sm text-error mt-1">
                      Processing failed. Click to retry.
                    </p>
                  )}
                </div>
                <Icon
                  name={step?.icon}
                  size={20}
                  className={`
                  ${
                    isCompleted
                      ? "text-success"
                      : isActive
                      ? "text-primary"
                      : hasError
                      ? "text-error"
                      : "text-muted-foreground"
                  }
                `}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* File-specific Status */}
      {files?.length > 1 && (
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">
            Individual File Status
          </h4>

          <div className="space-y-3">
            {files?.map((file, index) => {
              let completedSteps = steps?.filter(
                (step) => getStepStatus(step?.id, index) === "completed"
              )?.length;
              const progress = Math.round(
                (completedSteps / steps?.length) * 100
              );

              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/10 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="FileText" size={20} className="text-accent" />
                    <div>
                      <div className="font-medium text-foreground text-sm">
                        {file?.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {completedSteps}/{steps?.length} steps completed
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted/20 rounded-full h-1">
                      <div
                        className="bg-primary h-1 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8">
                      {progress}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessingStatus;
