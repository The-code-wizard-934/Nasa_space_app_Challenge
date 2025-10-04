import React, { useState, useRef } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const UploadZone = ({
  onFilesSelected,
  isProcessing = false,
  acceptedFiles = [],
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e?.dataTransfer?.files);
    const pdfFiles = files?.filter((file) => file?.type === "application/pdf");

    if (pdfFiles?.length > 0) {
      onFilesSelected(pdfFiles);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    if (files?.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef?.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + " " + sizes?.[i];
  };

  return (
    <div className="space-y-6">
      {/* Main Upload Zone */}
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-cosmic
          ${
            isDragOver
              ? "border-primary bg-primary/10 scale-105"
              : "border-border hover:border-primary/50 hover:bg-muted/20"
          }
          ${isProcessing ? "pointer-events-none opacity-60" : ""}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="space-y-4">
          <div className="flex justify-center">
            <div
              className={`
              w-16 h-16 rounded-full flex items-center justify-center transition-cosmic
              ${
                isDragOver
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }
            `}
            >
              <Icon name={isDragOver ? "Upload" : "FileText"} size={32} />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              {isDragOver ? "Drop files here" : "Upload Research Documents"}
            </h3>
            <p className="text-muted-foreground">
              Drag and drop PDF files here, or click to browse
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={handleBrowseClick}
              disabled={isProcessing}
              iconName="FolderOpen"
              iconPosition="left"
            >
              Browse Files
            </Button>

            <div className="text-sm text-muted-foreground">
              PDF files only • Max 50MB per file
            </div>
          </div>
        </div>

        {isProcessing && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="animate-spin">
                <Icon name="Loader2" size={24} className="text-primary" />
              </div>
              <span className="text-foreground font-medium">
                Processing uploads...
              </span>
            </div>
          </div>
        )}
      </div>
      {/* File Format Guidelines */}
      <div className="glass-card p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent mt-0.5" />
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Upload Guidelines</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• PDF format only for research papers and documents</li>
              <li>• Maximum file size: 50MB per document</li>
              <li>• Batch upload supported (up to 10 files at once)</li>
              <li>• Text-based PDFs preferred for better AI processing</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Accepted Files Preview */}
      {acceptedFiles?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">
            Selected Files ({acceptedFiles?.length})
          </h4>
          <div className="space-y-2">
            {acceptedFiles?.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Icon name="FileText" size={20} className="text-accent" />
                  <div>
                    <div className="font-medium text-foreground text-sm">
                      {file?.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatFileSize(file?.size)}
                    </div>
                  </div>
                </div>
                <Icon name="Check" size={16} className="text-success" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadZone;
