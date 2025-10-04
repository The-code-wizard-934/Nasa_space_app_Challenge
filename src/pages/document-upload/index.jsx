import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationSidebar from "../../components/ui/NavigationSidebar";
import BreadcrumbTrail from "../../components/ui/BreadcrumbTrail";
import QuickActionPanel from "../../components/ui/QuickactionPanel";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import UploadZone from "./components/UploadZone";
import MetadataExtraction from "./components/MetadataExtraction";
import ProcessingStatus from "./components/ProcessingStatus";
import UploadHistory from "./components/UploadHistory";
import ProcessingOptions from "./components/ProcessingOptions";

const DocumentUpload = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [processingFiles, setProcessingFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingOptions, setProcessingOptions] = useState({});

  // Mock extracted metadata for demonstration
  const mockExtractedData = {
    title:
      "Microgravity Effects on Plant Growth in International Space Station Environment",
    authors: "Dr. Sarah Chen, Dr. Michael Rodriguez, Dr. Emily Watson",
    publicationDate: "2024-09-15",
    doi: "10.1038/space.2024.001",
    abstract: `This study investigates the effects of microgravity on plant growth patterns during a 6-month experiment aboard the International Space Station. We observed significant changes in root development, leaf morphology, and cellular structure compared to ground controls.\n\nOur findings suggest that plants adapt to microgravity through altered gene expression patterns, particularly in genes related to gravitropism and cell wall formation. These results have important implications for future long-duration space missions and sustainable food production in space environments.`,
    organismType: "plants",
    experimentEnvironment: "iss",
    researchTopics: ["microgravity-effects", "plant-growth"],
    status: "completed",
  };

  const tabs = [
    { id: "upload", label: "Upload Documents", icon: "Upload" },
    { id: "processing", label: "Processing Status", icon: "Settings" },
    { id: "history", label: "Upload History", icon: "History" },
  ];

  const handleFilesSelected = (files) => {
    const newFiles = files?.map((file) => ({
      file,
      id: Date.now() + Math.random(),
      extractedData: mockExtractedData,
      processing: {
        upload: "completed",
        extraction: "processing",
        summarization: "pending",
        indexing: "pending",
        graph: "pending",
      },
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);
    setProcessingFiles((prev) => [...prev, ...newFiles]);

    // Simulate processing progression
    setTimeout(() => {
      setProcessingFiles((prev) =>
        prev?.map((item) => ({
          ...item,
          processing: {
            ...item?.processing,
            extraction: "completed",
            summarization: "processing",
          },
        }))
      );
    }, 2000);
  };

  const handleMetadataUpdate = (fileId, metadata) => {
    setUploadedFiles((prev) =>
      prev?.map((item) =>
        item?.id === fileId
          ? { ...item, extractedData: { ...item?.extractedData, ...metadata } }
          : item
      )
    );
  };

  const handleStartProcessing = (options) => {
    setProcessingOptions(options);
    setIsProcessing(true);

    // Simulate processing completion
    setTimeout(() => {
      setIsProcessing(false);
      setProcessingFiles((prev) =>
        prev?.map((item) => ({
          ...item,
          processing: {
            upload: "completed",
            extraction: "completed",
            summarization: "completed",
            indexing: "completed",
            graph: "completed",
          },
        }))
      );
    }, 5000);
  };

  const handleRetryProcessing = (item) => {
    console.log("Retrying processing for:", item?.fileName);
    // Implement retry logic
  };

  const handleViewDocument = (item) => {
    navigate("/publications-explorer", { state: { selectedDocument: item } });
  };

  const handleExport = () => {
    console.log("Exporting upload data...");
  };

  const handleQuickUpload = () => {
    document.querySelector('input[type="file"]')?.click();
  };

  const customActions = [
    {
      id: "quick-upload",
      icon: "Upload",
      label: "Quick Upload",
      action: handleQuickUpload,
    },
    {
      id: "view-publications",
      icon: "FileText",
      label: "View Publications",
      action: () => navigate("/publications-explorer"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main
        className={`
        transition-all duration-300 ease-in-out
        ${sidebarCollapsed ? "lg:ml-16" : "lg:ml-60"}
      `}
      >
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          <BreadcrumbTrail />

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center">
                <Icon
                  name="Upload"
                  size={24}
                  className="text-primary-foreground"
                />
              </div>
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Document Upload
                </h1>
                <p className="text-muted-foreground">
                  Upload research documents for AI processing and knowledge
                  integration
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="glass-card p-4">
                <div className="flex items-center space-x-3">
                  <Icon name="FileText" size={20} className="text-accent" />
                  <div>
                    <div className="text-lg font-semibold text-foreground">
                      {uploadedFiles?.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Documents Uploaded
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Settings" size={20} className="text-primary" />
                  <div>
                    <div className="text-lg font-semibold text-foreground">
                      {
                        processingFiles?.filter((f) =>
                          Object.values(f?.processing || {})?.includes(
                            "processing"
                          )
                        )?.length
                      }
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Currently Processing
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-4">
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                  <div>
                    <div className="text-lg font-semibold text-foreground">
                      {
                        processingFiles?.filter((f) =>
                          Object.values(f?.processing || {})?.every(
                            (status) => status === "completed"
                          )
                        )?.length
                      }
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Completed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-muted/20 p-1 rounded-lg w-fit">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-cosmic
                    ${
                      activeTab === tab?.id
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                    }
                  `}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === "upload" && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Upload Zone */}
                <div className="xl:col-span-2 space-y-8">
                  <UploadZone
                    onFilesSelected={handleFilesSelected}
                    isProcessing={isProcessing}
                    acceptedFiles={uploadedFiles?.map((item) => item?.file)}
                  />

                  {/* Processing Options */}
                  {uploadedFiles?.length > 0 && (
                    <ProcessingOptions
                      onOptionsChange={setProcessingOptions}
                      onStartProcessing={handleStartProcessing}
                      isProcessing={isProcessing}
                    />
                  )}
                </div>

                {/* Metadata Extraction */}
                <div className="space-y-6">
                  {uploadedFiles?.length > 0 ? (
                    uploadedFiles?.map((item) => (
                      <MetadataExtraction
                        key={item?.id}
                        file={item?.file}
                        extractedData={item?.extractedData}
                        onMetadataUpdate={(metadata) =>
                          handleMetadataUpdate(item?.id, metadata)
                        }
                        onSave={(metadata) =>
                          console.log("Saving metadata:", metadata)
                        }
                      />
                    ))
                  ) : (
                    <div className="glass-card p-8 text-center">
                      <Icon
                        name="FileSearch"
                        size={48}
                        className="text-muted-foreground mx-auto mb-4"
                      />
                      <h3 className="font-heading font-semibold text-foreground mb-2">
                        Metadata Extraction
                      </h3>
                      <p className="text-muted-foreground">
                        Upload documents to see extracted metadata and editing
                        options
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "processing" && (
              <ProcessingStatus
                files={processingFiles}
                processingSteps={[
                  { id: "upload", label: "File Upload", icon: "Upload" },
                  {
                    id: "extraction",
                    label: "Metadata Extraction",
                    icon: "FileSearch",
                  },
                  {
                    id: "summarization",
                    label: "AI Summarization",
                    icon: "Brain",
                  },
                  {
                    id: "indexing",
                    label: "Semantic Indexing",
                    icon: "Database",
                  },
                  {
                    id: "graph",
                    label: "Knowledge Graph Integration",
                    icon: "Network",
                  },
                ]}
              />
            )}

            {activeTab === "history" && (
              <UploadHistory
                onRetry={handleRetryProcessing}
                onViewDocument={handleViewDocument}
              />
            )}
          </div>

          {/* Help Section */}
          <div className="mt-12 glass-card p-6">
            <div className="flex items-start space-x-4">
              <Icon name="HelpCircle" size={24} className="text-accent mt-1" />
              <div className="space-y-3">
                <h3 className="font-heading font-semibold text-foreground">
                  Need Help?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">
                      Supported Formats
                    </h4>
                    <ul className="space-y-1">
                      <li>• PDF documents (text-based preferred)</li>
                      <li>• Maximum file size: 50MB</li>
                      <li>• Batch upload up to 10 files</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">
                      Processing Features
                    </h4>
                    <ul className="space-y-1">
                      <li>• Automatic metadata extraction</li>
                      <li>• AI-powered summarization</li>
                      <li>• Knowledge graph integration</li>
                      <li>• Semantic search indexing</li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/ai-chatbot-interface")}
                    iconName="MessageCircle"
                    iconPosition="left"
                  >
                    Ask AI Assistant
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/publications-explorer")}
                    iconName="FileText"
                    iconPosition="left"
                  >
                    Browse Publications
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <QuickActionPanel onExport={handleExport} customActions={customActions} />
    </div>
  );
};

export default DocumentUpload;
