import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import NavigationSidebar from "../../components/ui/NavigationSidebar";
import BreadcrumbTrail from "../../components/ui/BreadcrumbTrail";
import QuickActionPanel from "../../components/ui/QuickactionPanel";
import FilterToolbar from "./components/FilterToolbar";
import PublicationTable from "./components/PublicationTable";
import PublicationDetailPanel from "./components/PublicationDetailPanel";
import BulkActionsBar from "./components/BulkActionsBar";
import PaginationControls from "./components/PaginationControls";

import Button from "../../components/ui/Button";

const PublicationsExplorer = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Sorting state
  const [sortConfig, setSortConfig] = useState({
    key: "publicationDate",
    direction: "desc",
  });

  // Filter state
  const [filters, setFilters] = useState({
    searchQuery: "",
    organism: "all",
    environment: "all",
    topic: "all",
    yearRange: {
      start: 1990,
      end: new Date()?.getFullYear(),
    },
  });

  // Mock publications data
  const mockPublications = [
    {
      id: "pub-001",
      title:
        "Microgravity Effects on Arabidopsis Root Development and Gene Expression",
      authors: [
        "Johnson, M.K.",
        "Chen, L.",
        "Rodriguez, A.M.",
        "Williams, S.J.",
      ],
      publicationDate: "2024-03-15",
      doi: "10.1038/s41526-024-00123-4",
      organism: "arabidopsis",
      environment: "iss",
      topic: "plant-growth",
      aiSummary: true,
      abstract: `This comprehensive study examines the molecular and physiological responses of Arabidopsis thaliana to microgravity conditions aboard the International Space Station. Through advanced RNA sequencing and microscopic analysis, we identified significant alterations in root development patterns and gene expression profiles.\n\nKey findings reveal upregulation of stress-response genes and downregulation of gravitropic response pathways. Root architecture showed increased lateral branching and altered cell wall composition. These results provide crucial insights for developing sustainable plant growth systems for long-duration space missions.`,
    },
    {
      id: "pub-002",
      title:
        "Bone Density Changes in Mice During Extended Spaceflight Missions",
      authors: ["Davis, K.R.", "Thompson, P.L.", "Martinez, C.E."],
      publicationDate: "2024-01-22",
      doi: "10.1016/j.bone.2024.01.008",
      organism: "mice",
      environment: "iss",
      topic: "bone-muscle",
      aiSummary: false,
      abstract: `Investigation of bone density alterations in laboratory mice exposed to microgravity conditions for 90 days aboard the ISS. Comprehensive analysis using micro-CT scanning and histological examination revealed significant bone loss patterns consistent with human spaceflight data.`,
    },
    {
      id: "pub-003",
      title:
        "Cellular Response Mechanisms in Drosophila Under Simulated Mars Gravity",
      authors: [
        "Wilson, R.T.",
        "Brown, J.A.",
        "Lee, H.S.",
        "Garcia, M.V.",
        "Anderson, K.L.",
      ],
      publicationDate: "2023-11-08",
      doi: "10.1371/journal.pone.0289456",
      organism: "drosophila",
      environment: "mars-analog",
      topic: "cellular-biology",
      aiSummary: true,
      abstract: `Comprehensive analysis of Drosophila melanogaster cellular responses under simulated Martian gravity conditions (0.38g). This study utilized advanced imaging techniques and molecular biology methods to characterize adaptation mechanisms at the cellular level.`,
    },
    {
      id: "pub-004",
      title:
        "Yeast Fermentation Processes in Microgravity: Implications for Space Food Production",
      authors: ["Taylor, S.M.", "Jackson, R.W.", "White, L.K."],
      publicationDate: "2023-09-14",
      doi: "10.1128/AEM.01234-23",
      organism: "yeast",
      environment: "iss",
      topic: "astrobiology",
      aiSummary: true,
      abstract: `Investigation of Saccharomyces cerevisiae fermentation efficiency and metabolic pathways under microgravity conditions. Results demonstrate altered fermentation kinetics with potential applications for sustainable food production during long-duration space missions.`,
    },
    {
      id: "pub-005",
      title: "Bacterial Biofilm Formation on the International Space Station",
      authors: ["Miller, A.J.", "Clark, D.B.", "Evans, N.R.", "Hall, T.C."],
      publicationDate: "2023-07-03",
      doi: "10.1128/mBio.02145-23",
      organism: "bacteria",
      environment: "iss",
      topic: "microbiology",
      aiSummary: false,
      abstract: `Study of bacterial biofilm formation patterns in the unique environment of the International Space Station. Analysis of multiple bacterial species and their adaptation strategies in microgravity conditions.`,
    },
    {
      id: "pub-006",
      title: "Human Cell Culture Responses to Lunar Gravity Simulation",
      authors: [
        "Roberts, M.E.",
        "Phillips, J.K.",
        "Turner, B.L.",
        "Cooper, S.A.",
        "Morgan, R.D.",
        "Parker, L.M.",
      ],
      publicationDate: "2023-05-18",
      doi: "10.1038/s41598-023-12345-6",
      organism: "human-cells",
      environment: "lunar",
      topic: "cellular-biology",
      aiSummary: true,
      abstract: `Comprehensive analysis of human cell culture responses under simulated lunar gravity conditions (1/6g). Investigation includes multiple cell types and their adaptation mechanisms for future lunar habitat planning.`,
    },
    {
      id: "pub-007",
      title: "Nematode Development and Aging in Space Environment",
      authors: ["Green, K.S.", "Adams, P.R.", "Nelson, C.T."],
      publicationDate: "2023-03-25",
      doi: "10.1371/journal.pgen.1010567",
      organism: "nematodes",
      environment: "shuttle",
      topic: "genetics",
      aiSummary: false,
      abstract: `Study of Caenorhabditis elegans development and aging processes during space shuttle missions. Analysis of genetic expression changes and lifespan alterations in microgravity conditions.`,
    },
    {
      id: "pub-008",
      title: "Plant Photosynthesis Efficiency in Controlled Space Environments",
      authors: ["Young, D.M.", "King, A.L.", "Wright, S.J.", "Hill, M.K."],
      publicationDate: "2023-01-12",
      doi: "10.1104/pp.22.01234",
      organism: "plants",
      environment: "iss",
      topic: "plant-growth",
      aiSummary: true,
      abstract: `Investigation of photosynthetic efficiency in various plant species under controlled space environment conditions. Analysis of light utilization, CO2 fixation, and biomass production rates.`,
    },
    {
      id: "pub-009",
      title:
        "Radiation Effects on Arabidopsis Seed Germination During Deep Space Transit",
      authors: [
        "Scott, R.A.",
        "Baker, L.E.",
        "Campbell, J.M.",
        "Fisher, K.R.",
        "Gray, N.S.",
      ],
      publicationDate: "2022-12-08",
      doi: "10.1016/j.lssr.2022.11.003",
      organism: "arabidopsis",
      environment: "lunar",
      topic: "radiation",
      aiSummary: false,
      abstract: `Comprehensive study of cosmic radiation effects on Arabidopsis thaliana seed germination and early development during simulated deep space conditions. Analysis of DNA damage and repair mechanisms.`,
    },
    {
      id: "pub-010",
      title:
        "Cardiovascular Adaptations in Mice During Long-Duration Spaceflight",
      authors: [
        "Lewis, T.J.",
        "Harris, M.R.",
        "Collins, B.K.",
        "Stewart, A.N.",
      ],
      publicationDate: "2022-10-15",
      doi: "10.1152/japplphysiol.00456.2022",
      organism: "mice",
      environment: "iss",
      topic: "cardiovascular",
      aiSummary: true,
      abstract: `Investigation of cardiovascular system adaptations in laboratory mice during extended exposure to microgravity conditions. Analysis of heart function, blood pressure regulation, and vascular changes.`,
    },
    {
      id: "pub-011",
      title:
        "Immune System Function in Drosophila Under Space Radiation Exposure",
      authors: [
        "Mitchell, C.L.",
        "Rogers, D.A.",
        "Peterson, S.M.",
        "Hughes, R.K.",
        "Ward, L.J.",
        "Foster, M.T.",
      ],
      publicationDate: "2022-08-22",
      doi: "10.1016/j.ibmb.2022.103789",
      organism: "drosophila",
      environment: "shuttle",
      topic: "immune-system",
      aiSummary: false,
      abstract: `Study of immune system responses in Drosophila melanogaster exposed to space radiation during shuttle missions. Analysis of immune gene expression and pathogen resistance mechanisms.`,
    },
    {
      id: "pub-012",
      title: "Metabolic Pathways in Yeast Under Martian Atmospheric Conditions",
      authors: ["Bell, A.K.", "Murphy, J.L.", "Rivera, C.S."],
      publicationDate: "2022-06-30",
      doi: "10.1128/AEM.00789-22",
      organism: "yeast",
      environment: "mars-analog",
      topic: "astrobiology",
      aiSummary: true,
      abstract: `Investigation of Saccharomyces cerevisiae metabolic adaptations under simulated Martian atmospheric conditions. Analysis of survival mechanisms and potential for biotechnology applications.`,
    },
  ];

  // Filter and sort publications
  const filteredAndSortedPublications = useMemo(() => {
    let filtered = mockPublications?.filter((pub) => {
      // Search query filter
      if (filters?.searchQuery) {
        const query = filters?.searchQuery?.toLowerCase();
        const searchableText = `${pub?.title} ${pub?.authors?.join(" ")} ${
          pub?.abstract || ""
        }`?.toLowerCase();
        if (!searchableText?.includes(query)) return false;
      }

      // Organism filter
      if (filters?.organism !== "all" && pub?.organism !== filters?.organism)
        return false;

      // Environment filter
      if (
        filters?.environment !== "all" &&
        pub?.environment !== filters?.environment
      )
        return false;

      // Topic filter
      if (filters?.topic !== "all" && pub?.topic !== filters?.topic)
        return false;

      // Year range filter
      const pubYear = new Date(pub.publicationDate)?.getFullYear();
      if (
        pubYear < filters?.yearRange?.start ||
        pubYear > filters?.yearRange?.end
      )
        return false;

      return true;
    });

    // Sort publications
    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        const aValue = a?.[sortConfig?.key];
        const bValue = b?.[sortConfig?.key];

        if (sortConfig?.key === "publicationDate") {
          const comparison = new Date(aValue) - new Date(bValue);
          return sortConfig?.direction === "asc" ? comparison : -comparison;
        }

        if (typeof aValue === "string") {
          const comparison = aValue?.localeCompare(bValue);
          return sortConfig?.direction === "asc" ? comparison : -comparison;
        }

        return sortConfig?.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      });
    }

    return filtered;
  }, [mockPublications, filters, sortConfig]);

  // Paginated publications
  const paginatedPublications = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedPublications?.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [filteredAndSortedPublications, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(
    filteredAndSortedPublications?.length / itemsPerPage
  );

  // Handlers
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev?.key === key && prev?.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleClearFilters = () => {
    setFilters({
      searchQuery: "",
      organism: "all",
      environment: "all",
      topic: "all",
      yearRange: {
        start: 1990,
        end: new Date()?.getFullYear(),
      },
    });
    setCurrentPage(1);
  };

  const handlePublicationClick = (publication) => {
    setSelectedPublication(publication);
  };

  const handleCloseDetail = () => {
    setSelectedPublication(null);
  };

  const handleAISummary = (publication) => {
    console.log("Generate AI summary for:", publication?.title);
    // Simulate AI processing
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Update publication with AI summary
    }, 2000);
  };

  const handleKnowledgeGraph = (publication) => {
    navigate("/knowledge-graph-visual", {
      state: { focusPublication: publication?.id },
    });
  };

  const handleBulkAISummary = () => {
    console.log(
      "Generate AI summaries for selected publications:",
      selectedIds
    );
    setIsBulkProcessing(true);
    setTimeout(() => {
      setIsBulkProcessing(false);
      setSelectedIds([]);
    }, 3000);
  };

  const handleBulkExport = (format) => {
    console.log(
      "Export selected publications:",
      selectedIds,
      "Format:",
      format
    );
    // Simulate export process
  };

  const handleBulkKnowledgeGraph = () => {
    navigate("/knowledge-graph-visual", {
      state: { focusPublications: selectedIds },
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleExport = () => {
    console.log("Export all filtered publications");
  };

  const handleSave = () => {
    console.log("Save current search and filters");
  };

  const handleShare = () => {
    console.log("Share current view");
  };

  const handleHelp = () => {
    console.log("Show help for Publications Explorer");
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-60"
        } pt-6 lg:pt-0`}
      >
        <div className="container mx-auto px-4 lg:px-6 py-6">
          {/* Header */}
          <div className="mb-6">
            <BreadcrumbTrail />

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Publications Explorer
                </h1>
                <p className="text-muted-foreground">
                  Comprehensive document library with advanced filtering and
                  AI-powered insights
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={handleSave}
                  iconName="Bookmark"
                  iconPosition="left"
                >
                  Save Search
                </Button>

                <Button
                  variant="default"
                  onClick={() => navigate("/document-upload")}
                  iconName="Upload"
                  iconPosition="left"
                >
                  Upload Document
                </Button>
              </div>
            </div>
          </div>

          {/* Filter Toolbar */}
          <FilterToolbar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            totalResults={filteredAndSortedPublications?.length}
            isLoading={isLoading}
          />

          {/* Publications Table */}
          <PublicationTable
            publications={paginatedPublications}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            onPublicationClick={handlePublicationClick}
            onAISummary={handleAISummary}
            onKnowledgeGraph={handleKnowledgeGraph}
            sortConfig={sortConfig}
            onSort={handleSort}
            isLoading={isLoading}
          />

          {/* Pagination */}
          <div className="mt-6">
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredAndSortedPublications?.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
      {/* Publication Detail Panel */}
      {selectedPublication && (
        <PublicationDetailPanel
          publication={selectedPublication}
          onClose={handleCloseDetail}
          onAISummary={handleAISummary}
          onKnowledgeGraph={handleKnowledgeGraph}
          onExport={(pub) => handleBulkExport("pdf")}
        />
      )}
      {/* Bulk Actions Bar */}
      <BulkActionsBar
        selectedCount={selectedIds?.length}
        onClearSelection={() => setSelectedIds([])}
        onBulkAISummary={handleBulkAISummary}
        onBulkExport={handleBulkExport}
        onBulkKnowledgeGraph={handleBulkKnowledgeGraph}
        isProcessing={isBulkProcessing}
      />
      {/* Quick Action Panel */}
      <QuickActionPanel
        onExport={handleExport}
        onSave={handleSave}
        onShare={handleShare}
        onHelp={handleHelp}
      />
    </div>
  );
};

export default PublicationsExplorer;
