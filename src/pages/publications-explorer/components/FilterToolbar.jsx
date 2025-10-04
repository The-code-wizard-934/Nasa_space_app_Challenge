import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

const FilterToolbar = ({
  filters,
  onFiltersChange,
  onClearFilters,
  totalResults = 0,
  isLoading = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const organismOptions = [
    { value: "all", label: "All Organisms" },
    { value: "arabidopsis", label: "Arabidopsis thaliana" },
    { value: "mice", label: "Laboratory Mice" },
    { value: "drosophila", label: "Drosophila melanogaster" },
    { value: "yeast", label: "Saccharomyces cerevisiae" },
    { value: "bacteria", label: "E. coli & Bacteria" },
    { value: "human-cells", label: "Human Cell Cultures" },
    { value: "nematodes", label: "C. elegans" },
    { value: "plants", label: "Various Plants" },
  ];

  const environmentOptions = [
    { value: "all", label: "All Environments" },
    { value: "iss", label: "International Space Station" },
    { value: "shuttle", label: "Space Shuttle" },
    { value: "lunar", label: "Lunar Surface" },
    { value: "mars-analog", label: "Mars Analog" },
    { value: "ground-control", label: "Ground Control" },
    { value: "parabolic-flight", label: "Parabolic Flight" },
  ];

  const topicOptions = [
    { value: "all", label: "All Topics" },
    { value: "microgravity", label: "Microgravity Effects" },
    { value: "radiation", label: "Radiation Biology" },
    { value: "plant-growth", label: "Plant Growth & Development" },
    { value: "bone-muscle", label: "Bone & Muscle Health" },
    { value: "cardiovascular", label: "Cardiovascular System" },
    { value: "immune-system", label: "Immune System" },
    { value: "cellular-biology", label: "Cellular Biology" },
    { value: "genetics", label: "Genetics & Genomics" },
    { value: "astrobiology", label: "Astrobiology" },
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const handleYearRangeChange = (type, value) => {
    const numValue =
      parseInt(value) || (type === "start" ? 1990 : new Date()?.getFullYear());
    onFiltersChange({
      ...filters,
      yearRange: {
        ...filters?.yearRange,
        [type]: numValue,
      },
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters?.searchQuery) count++;
    if (filters?.organism !== "all") count++;
    if (filters?.environment !== "all") count++;
    if (filters?.topic !== "all") count++;
    if (
      filters?.yearRange?.start > 1990 ||
      filters?.yearRange?.end < new Date()?.getFullYear()
    )
      count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 space-y-4">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Filter Publications
          </h2>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="FileText" size={16} />
            <span>{totalResults?.toLocaleString()} publications found</span>
            {isLoading && (
              <Icon name="Loader2" size={16} className="animate-spin" />
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {activeFilterCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear Filters ({activeFilterCount})
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            className="lg:hidden"
          >
            {isExpanded ? "Hide" : "Show"} Filters
          </Button>
        </div>
      </div>
      {/* Filter Controls */}
      <div className={`space-y-4 ${isExpanded ? "block" : "hidden lg:block"}`}>
        {/* Search Bar */}
        <div className="w-full">
          <Input
            type="search"
            placeholder="Search publications by title, authors, or keywords..."
            value={filters?.searchQuery}
            onChange={(e) =>
              handleFilterChange("searchQuery", e?.target?.value)
            }
            className="w-full"
          />
        </div>

        {/* Filter Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Organism Filter */}
          <Select
            label="Organism Type"
            options={organismOptions}
            value={filters?.organism}
            onChange={(value) => handleFilterChange("organism", value)}
            searchable
          />

          {/* Environment Filter */}
          <Select
            label="Experiment Environment"
            options={environmentOptions}
            value={filters?.environment}
            onChange={(value) => handleFilterChange("environment", value)}
          />

          {/* Research Topic Filter */}
          <Select
            label="Research Topic"
            options={topicOptions}
            value={filters?.topic}
            onChange={(value) => handleFilterChange("topic", value)}
            searchable
          />

          {/* Year Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Publication Year
            </label>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="From"
                value={filters?.yearRange?.start}
                onChange={(e) =>
                  handleYearRangeChange("start", e?.target?.value)
                }
                min="1990"
                max={new Date()?.getFullYear()}
                className="w-20"
              />
              <span className="text-muted-foreground">to</span>
              <Input
                type="number"
                placeholder="To"
                value={filters?.yearRange?.end}
                onChange={(e) => handleYearRangeChange("end", e?.target?.value)}
                min="1990"
                max={new Date()?.getFullYear()}
                className="w-20"
              />
            </div>
          </div>
        </div>

        {/* Quick Filter Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Quick filters:
          </span>
          {[
            {
              label: "Recent (2020+)",
              action: () => handleYearRangeChange("start", "2020"),
            },
            {
              label: "ISS Studies",
              action: () => handleFilterChange("environment", "iss"),
            },
            {
              label: "Plant Research",
              action: () => handleFilterChange("topic", "plant-growth"),
            },
            {
              label: "Microgravity",
              action: () => handleFilterChange("topic", "microgravity"),
            },
          ]?.map((tag) => (
            <Button
              key={tag?.label}
              variant="outline"
              size="xs"
              onClick={tag?.action}
              className="text-xs"
            >
              {tag?.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterToolbar;
