import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";

const MetadataExtraction = ({
  file,
  extractedData,
  onMetadataUpdate,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [metadata, setMetadata] = useState({
    title: extractedData?.title || "",
    authors: extractedData?.authors || "",
    publicationDate: extractedData?.publicationDate || "",
    doi: extractedData?.doi || "",
    abstract: extractedData?.abstract || "",
    organismType: extractedData?.organismType || "",
    experimentEnvironment: extractedData?.experimentEnvironment || "",
    researchTopics: extractedData?.researchTopics || [],
  });

  const organismOptions = [
    { value: "bacteria", label: "Bacteria" },
    { value: "yeast", label: "Yeast" },
    { value: "plants", label: "Plants" },
    { value: "mice", label: "Mice" },
    { value: "fruit-flies", label: "Fruit Flies" },
    { value: "nematodes", label: "Nematodes" },
    { value: "human-cells", label: "Human Cells" },
    { value: "other", label: "Other" },
  ];

  const environmentOptions = [
    { value: "iss", label: "International Space Station (ISS)" },
    { value: "shuttle", label: "Space Shuttle" },
    { value: "lunar", label: "Lunar Environment" },
    { value: "mars-analog", label: "Mars Analog" },
    { value: "ground-control", label: "Ground Control" },
    { value: "parabolic-flight", label: "Parabolic Flight" },
  ];

  const topicOptions = [
    { value: "microgravity-effects", label: "Microgravity Effects" },
    { value: "radiation-biology", label: "Radiation Biology" },
    { value: "plant-growth", label: "Plant Growth" },
    { value: "bone-muscle-health", label: "Bone & Muscle Health" },
    { value: "cardiovascular", label: "Cardiovascular Research" },
    { value: "immunology", label: "Immunology" },
    { value: "neuroscience", label: "Neuroscience" },
    { value: "astrobiology", label: "Astrobiology" },
  ];

  const handleInputChange = (field, value) => {
    const updatedMetadata = { ...metadata, [field]: value };
    setMetadata(updatedMetadata);
    onMetadataUpdate(updatedMetadata);
  };

  const handleSave = () => {
    onSave(metadata);
    setIsEditing(false);
  };

  const extractionStatus = extractedData?.status || "pending";

  return (
    <div className="space-y-6">
      {/* File Preview Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon name="FileText" size={24} className="text-accent" />
          <div>
            <h3 className="font-heading font-semibold text-foreground">
              {file?.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {(file?.size / (1024 * 1024))?.toFixed(2)} MB • PDF Document
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div
            className={`
            px-3 py-1 rounded-full text-xs font-medium
            ${
              extractionStatus === "completed"
                ? "bg-success/20 text-success"
                : extractionStatus === "processing"
                ? "bg-warning/20 text-warning"
                : "bg-muted/20 text-muted-foreground"
            }
          `}
          >
            {extractionStatus === "completed"
              ? "Extracted"
              : extractionStatus === "processing"
              ? "Processing"
              : "Pending"}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            iconName={isEditing ? "X" : "Edit"}
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>
      </div>
      {/* Metadata Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Basic Information</h4>

          <Input
            label="Document Title"
            value={metadata?.title}
            onChange={(e) => handleInputChange("title", e?.target?.value)}
            disabled={!isEditing}
            placeholder="Enter document title"
          />

          <Input
            label="Authors"
            value={metadata?.authors}
            onChange={(e) => handleInputChange("authors", e?.target?.value)}
            disabled={!isEditing}
            placeholder="Author names (comma separated)"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Publication Date"
              type="date"
              value={metadata?.publicationDate}
              onChange={(e) =>
                handleInputChange("publicationDate", e?.target?.value)
              }
              disabled={!isEditing}
            />

            <Input
              label="DOI"
              value={metadata?.doi}
              onChange={(e) => handleInputChange("doi", e?.target?.value)}
              disabled={!isEditing}
              placeholder="10.xxxx/xxxxx"
            />
          </div>
        </div>

        {/* Research Classification */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">
            Research Classification
          </h4>

          <Select
            label="Organism Type"
            options={organismOptions}
            value={metadata?.organismType}
            onChange={(value) => handleInputChange("organismType", value)}
            disabled={!isEditing}
            placeholder="Select organism type"
          />

          <Select
            label="Experiment Environment"
            options={environmentOptions}
            value={metadata?.experimentEnvironment}
            onChange={(value) =>
              handleInputChange("experimentEnvironment", value)
            }
            disabled={!isEditing}
            placeholder="Select environment"
          />

          <Select
            label="Research Topics"
            options={topicOptions}
            value={metadata?.researchTopics}
            onChange={(value) => handleInputChange("researchTopics", value)}
            disabled={!isEditing}
            multiple
            searchable
            placeholder="Select research topics"
          />
        </div>
      </div>
      {/* Abstract Section */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Abstract</h4>
        <div className="relative">
          <textarea
            value={metadata?.abstract}
            onChange={(e) => handleInputChange("abstract", e?.target?.value)}
            disabled={!isEditing}
            placeholder="Document abstract will be extracted automatically..."
            className={`
              w-full h-32 p-3 rounded-lg border transition-cosmic resize-none
              ${
                isEditing
                  ? "bg-input border-border text-foreground focus:border-ring focus:ring-1 focus:ring-ring"
                  : "bg-muted/20 border-border text-muted-foreground"
              }
            `}
          />
          {extractionStatus === "processing" && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <div className="animate-spin">
                  <Icon name="Loader2" size={20} className="text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Extracting abstract...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Action Buttons */}
      {isEditing && (
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} iconName="Save" iconPosition="left">
            Save Metadata
          </Button>
        </div>
      )}
    </div>
  );
};

export default MetadataExtraction;
