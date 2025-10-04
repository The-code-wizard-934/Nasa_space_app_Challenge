import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";

const UploadHistory = ({ onRetry, onViewDocument }) => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // Mock upload history data
  const uploadHistory = [
    {
      id: 1,
      fileName: "Microgravity Effects on Plant Growth - ISS Study 2024.pdf",
      uploadDate: new Date(Date.now() - 86400000), // 1 day ago
      status: "completed",
      fileSize: "2.4 MB",
      processingTime: "4m 32s",
      metadata: {
        title: "Microgravity Effects on Plant Growth in ISS Environment",
        authors: "Dr. Sarah Chen, Dr. Michael Rodriguez",
        doi: "10.1038/space.2024.001",
      },
      errors: [],
    },
    {
      id: 2,
      fileName: "Radiation Biology Research - Mars Mission Prep.pdf",
      uploadDate: new Date(Date.now() - 172800000), // 2 days ago
      status: "processing",
      fileSize: "5.1 MB",
      processingTime: "2m 15s",
      currentStep: "AI Summarization",
      progress: 65,
      errors: [],
    },
    {
      id: 3,
      fileName: "Bone Density Changes in Microgravity.pdf",
      uploadDate: new Date(Date.now() - 259200000), // 3 days ago
      status: "failed",
      fileSize: "3.8 MB",
      processingTime: "1m 45s",
      errors: [
        "Failed to extract metadata from PDF",
        "Document may be image-based or corrupted",
      ],
    },
    {
      id: 4,
      fileName: "Cardiovascular Adaptations - Long Duration Flight.pdf",
      uploadDate: new Date(Date.now() - 345600000), // 4 days ago
      status: "completed",
      fileSize: "4.2 MB",
      processingTime: "6m 18s",
      metadata: {
        title: "Cardiovascular Adaptations During Long-Duration Spaceflight",
        authors: "Dr. Emily Watson, Dr. James Park, Dr. Lisa Thompson",
        doi: "10.1016/j.space.2024.002",
      },
      errors: [],
    },
    {
      id: 5,
      fileName: "Immunology Changes in Space Environment.pdf",
      uploadDate: new Date(Date.now() - 432000000), // 5 days ago
      status: "completed",
      fileSize: "3.1 MB",
      processingTime: "3m 52s",
      metadata: {
        title: "Immune System Changes in Space Environment",
        authors: "Dr. Robert Kim, Dr. Maria Gonzalez",
        doi: "10.1038/immunity.2024.003",
      },
      errors: [],
    },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "completed", label: "Completed" },
    { value: "processing", label: "Processing" },
    { value: "failed", label: "Failed" },
  ];

  const sortOptions = [
    { value: "date", label: "Upload Date" },
    { value: "name", label: "File Name" },
    { value: "size", label: "File Size" },
    { value: "status", label: "Status" },
  ];

  const filteredHistory = uploadHistory?.filter(
    (item) => filterStatus === "all" || item?.status === filterStatus
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <Icon name="CheckCircle" size={20} className="text-success" />;
      case "processing":
        return (
          <div className="animate-spin">
            <Icon name="Loader2" size={20} className="text-primary" />
          </div>
        );
      case "failed":
        return <Icon name="XCircle" size={20} className="text-error" />;
      default:
        return (
          <Icon name="Clock" size={20} className="text-muted-foreground" />
        );
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      completed: "bg-success/20 text-success",
      processing: "bg-primary/20 text-primary",
      failed: "bg-error/20 text-error",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${badges?.[status]}`}
      >
        {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="font-heading font-semibold text-foreground">
          Upload History
        </h3>

        <div className="flex flex-col sm:flex-row gap-3">
          <Select
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
            placeholder="Filter by status"
            className="w-full sm:w-40"
          />

          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort by"
            className="w-full sm:w-40"
          />
        </div>
      </div>
      {/* History List */}
      <div className="space-y-4">
        {filteredHistory?.length === 0 ? (
          <div className="text-center py-12">
            <Icon
              name="FileX"
              size={48}
              className="text-muted-foreground mx-auto mb-4"
            />
            <h4 className="font-medium text-foreground mb-2">
              No uploads found
            </h4>
            <p className="text-muted-foreground">
              No documents match your current filter criteria
            </p>
          </div>
        ) : (
          filteredHistory?.map((item) => (
            <div key={item?.id} className="glass-card p-6 space-y-4">
              {/* File Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(item?.status)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">
                      {item?.fileName}
                    </h4>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                      <span>{formatDate(item?.uploadDate)}</span>
                      <span>{item?.fileSize}</span>
                      {item?.processingTime && (
                        <span>Processed in {item?.processingTime}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {getStatusBadge(item?.status)}
                </div>
              </div>

              {/* Processing Progress */}
              {item?.status === "processing" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Current: {item?.currentStep}
                    </span>
                    <span className="text-primary font-medium">
                      {item?.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item?.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Metadata Preview */}
              {item?.metadata && (
                <div className="bg-muted/10 rounded-lg p-4 space-y-2">
                  <h5 className="font-medium text-foreground text-sm">
                    {item?.metadata?.title}
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    Authors: {item?.metadata?.authors}
                  </p>
                  {item?.metadata?.doi && (
                    <p className="text-sm text-muted-foreground">
                      DOI: {item?.metadata?.doi}
                    </p>
                  )}
                </div>
              )}

              {/* Error Messages */}
              {item?.errors?.length > 0 && (
                <div className="bg-error/10 border border-error/20 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Icon
                      name="AlertTriangle"
                      size={16}
                      className="text-error mt-0.5"
                    />
                    <div className="space-y-1">
                      {item?.errors?.map((error, index) => (
                        <p key={index} className="text-sm text-error">
                          {error}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-3">
                  {item?.status === "completed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDocument?.(item)}
                      iconName="Eye"
                      iconPosition="left"
                    >
                      View Document
                    </Button>
                  )}

                  {item?.status === "failed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRetry?.(item)}
                      iconName="RefreshCw"
                      iconPosition="left"
                    >
                      Retry Processing
                    </Button>
                  )}
                </div>

                <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
              </div>
            </div>
          ))
        )}
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-success mb-1">
            {
              uploadHistory?.filter((item) => item?.status === "completed")
                ?.length
            }
          </div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </div>

        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {
              uploadHistory?.filter((item) => item?.status === "processing")
                ?.length
            }
          </div>
          <div className="text-sm text-muted-foreground">Processing</div>
        </div>

        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-error mb-1">
            {uploadHistory?.filter((item) => item?.status === "failed")?.length}
          </div>
          <div className="text-sm text-muted-foreground">Failed</div>
        </div>
      </div>
    </div>
  );
};

export default UploadHistory;
