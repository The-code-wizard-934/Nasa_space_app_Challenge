import React, { useState, useMemo } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { Checkbox } from "../../../components/ui/Checkbox";

const PublicationTable = ({
  publications,
  selectedIds,
  onSelectionChange,
  onPublicationClick,
  onAISummary,
  onKnowledgeGraph,
  sortConfig,
  onSort,
  isLoading = false,
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const sortedPublications = useMemo(() => {
    if (!sortConfig?.key) return publications;

    return [...publications]?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];

      if (sortConfig?.key === "publicationDate") {
        return sortConfig?.direction === "asc"
          ? new Date(aValue) - new Date(bValue)
          : new Date(bValue) - new Date(aValue);
      }

      if (typeof aValue === "string") {
        return sortConfig?.direction === "asc"
          ? aValue?.localeCompare(bValue)
          : bValue?.localeCompare(aValue);
      }

      return sortConfig?.direction === "asc"
        ? aValue - bValue
        : bValue - aValue;
    });
  }, [publications, sortConfig]);

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(publications?.map((pub) => pub?.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleRowSelect = (id, checked) => {
    if (checked) {
      onSelectionChange([...selectedIds, id]);
    } else {
      onSelectionChange(selectedIds?.filter((selectedId) => selectedId !== id));
    }
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) return "ArrowUpDown";
    return sortConfig?.direction === "asc" ? "ArrowUp" : "ArrowDown";
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getEnvironmentBadge = (environment) => {
    const badges = {
      iss: {
        label: "ISS",
        className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      },
      shuttle: {
        label: "Shuttle",
        className: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      },
      lunar: {
        label: "Lunar",
        className: "bg-gray-500/20 text-gray-400 border-gray-500/30",
      },
      "mars-analog": {
        label: "Mars",
        className: "bg-red-500/20 text-red-400 border-red-500/30",
      },
      "ground-control": {
        label: "Ground",
        className: "bg-green-500/20 text-green-400 border-green-500/30",
      },
    };

    const badge = badges?.[environment] || {
      label: environment,
      className: "bg-muted text-muted-foreground",
    };

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${badge?.className}`}
      >
        {badge?.label}
      </span>
    );
  };

  const isAllSelected =
    selectedIds?.length === publications?.length && publications?.length > 0;
  const isIndeterminate =
    selectedIds?.length > 0 && selectedIds?.length < publications?.length;

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-8">
        <div className="flex items-center justify-center space-x-3">
          <Icon
            name="Loader2"
            size={24}
            className="animate-spin text-primary"
          />
          <span className="text-muted-foreground">Loading publications...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/20 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>

              {[
                { key: "title", label: "Title", width: "w-1/3" },
                { key: "authors", label: "Authors", width: "w-1/4" },
                { key: "publicationDate", label: "Date", width: "w-24" },
                { key: "organism", label: "Organism", width: "w-32" },
                { key: "environment", label: "Environment", width: "w-28" },
                { key: "aiSummary", label: "AI Summary", width: "w-24" },
              ]?.map((column) => (
                <th
                  key={column?.key}
                  className={`${column?.width} px-4 py-3 text-left text-sm font-medium text-foreground`}
                >
                  <button
                    onClick={() => onSort(column?.key)}
                    className="flex items-center space-x-1 hover:text-primary transition-cosmic"
                  >
                    <span>{column?.label}</span>
                    <Icon name={getSortIcon(column?.key)} size={14} />
                  </button>
                </th>
              ))}

              <th className="w-32 px-4 py-3 text-center text-sm font-medium text-foreground">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {sortedPublications?.map((publication) => (
              <tr
                key={publication?.id}
                className={`hover:bg-muted/10 transition-cosmic ${
                  selectedIds?.includes(publication?.id) ? "bg-primary/5" : ""
                }`}
                onMouseEnter={() => setHoveredRow(publication?.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedIds?.includes(publication?.id)}
                    onChange={(e) =>
                      handleRowSelect(publication?.id, e?.target?.checked)
                    }
                  />
                </td>

                <td className="px-4 py-3">
                  <button
                    onClick={() => onPublicationClick(publication)}
                    className="text-left hover:text-primary transition-cosmic"
                  >
                    <div className="font-medium text-foreground line-clamp-2">
                      {publication?.title}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      DOI: {publication?.doi}
                    </div>
                  </button>
                </td>

                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {publication?.authors?.slice(0, 2)?.join(", ")}
                  {publication?.authors?.length > 2 &&
                    ` +${publication?.authors?.length - 2} more`}
                </td>

                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {formatDate(publication?.publicationDate)}
                </td>

                <td className="px-4 py-3 text-sm">
                  <span className="text-foreground capitalize">
                    {publication?.organism?.replace("-", " ")}
                  </span>
                </td>

                <td className="px-4 py-3">
                  {getEnvironmentBadge(publication?.environment)}
                </td>

                <td className="px-4 py-3 text-center">
                  {publication?.aiSummary ? (
                    <Icon
                      name="CheckCircle"
                      size={16}
                      className="text-success mx-auto"
                    />
                  ) : (
                    <Icon
                      name="Clock"
                      size={16}
                      className="text-muted-foreground mx-auto"
                    />
                  )}
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onAISummary(publication)}
                      className="w-8 h-8"
                    >
                      <Icon name="Brain" size={14} />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onKnowledgeGraph(publication)}
                      className="w-8 h-8"
                    >
                      <Icon name="Network" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card Layout */}
      <div className="lg:hidden space-y-4 p-4">
        {sortedPublications?.map((publication) => (
          <div
            key={publication?.id}
            className={`border border-border rounded-lg p-4 space-y-3 ${
              selectedIds?.includes(publication?.id)
                ? "border-primary bg-primary/5"
                : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <Checkbox
                checked={selectedIds?.includes(publication?.id)}
                onChange={(e) =>
                  handleRowSelect(publication?.id, e?.target?.checked)
                }
              />

              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onAISummary(publication)}
                  className="w-8 h-8"
                >
                  <Icon name="Brain" size={14} />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onKnowledgeGraph(publication)}
                  className="w-8 h-8"
                >
                  <Icon name="Network" size={14} />
                </Button>
              </div>
            </div>

            <button
              onClick={() => onPublicationClick(publication)}
              className="text-left w-full"
            >
              <h3 className="font-medium text-foreground line-clamp-2 mb-2">
                {publication?.title}
              </h3>
            </button>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Authors:</span>
                <span className="text-foreground">
                  {publication?.authors?.slice(0, 1)?.join(", ")}
                  {publication?.authors?.length > 1 &&
                    ` +${publication?.authors?.length - 1}`}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="text-foreground">
                  {formatDate(publication?.publicationDate)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Organism:</span>
                <span className="text-foreground capitalize">
                  {publication?.organism?.replace("-", " ")}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Environment:</span>
                {getEnvironmentBadge(publication?.environment)}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">AI Summary:</span>
                {publication?.aiSummary ? (
                  <Icon name="CheckCircle" size={16} className="text-success" />
                ) : (
                  <Icon
                    name="Clock"
                    size={16}
                    className="text-muted-foreground"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicationTable;
