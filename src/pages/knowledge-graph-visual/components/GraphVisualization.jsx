import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Icon from "../../../components/AppIcon";

const GraphVisualization = ({
  layout = "force",
  filters = {},
  searchQuery = "",
  onNodeSelect,
  onNodeHover,
  className = "",
}) => {
  const svgRef = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [isLoading, setIsLoading] = useState(true);

  // Mock graph data
  const mockGraphData = {
    nodes: [
      // Publications
      {
        id: "pub-001",
        type: "publication",
        label: "Microgravity Effects on Plant Cell Wall Development",
        size: 8,
        citations: 47,
      },
      {
        id: "pub-002",
        type: "publication",
        label: "Radiation Response in Arabidopsis",
        size: 6,
        citations: 23,
      },
      {
        id: "pub-003",
        type: "publication",
        label: "Space Agriculture Feasibility Study",
        size: 10,
        citations: 89,
      },
      {
        id: "pub-004",
        type: "publication",
        label: "ISS Plant Growth Experiments",
        size: 7,
        citations: 34,
      },
      {
        id: "pub-005",
        type: "publication",
        label: "Cellular Adaptation to Microgravity",
        size: 5,
        citations: 18,
      },

      // Organisms
      {
        id: "org-001",
        type: "organism",
        label: "Arabidopsis thaliana",
        size: 12,
        studies: 89,
      },
      {
        id: "org-002",
        type: "organism",
        label: "Oryza sativa (Rice)",
        size: 8,
        studies: 45,
      },
      {
        id: "org-003",
        type: "organism",
        label: "Glycine max (Soybean)",
        size: 6,
        studies: 23,
      },
      {
        id: "org-004",
        type: "organism",
        label: "Solanum lycopersicum (Tomato)",
        size: 7,
        studies: 31,
      },

      // Experiments
      {
        id: "exp-001",
        type: "experiment",
        label: "ISS Plant Growth Study",
        size: 9,
        duration: "6 months",
      },
      {
        id: "exp-002",
        type: "experiment",
        label: "Radiation Exposure Test",
        size: 7,
        duration: "3 months",
      },
      {
        id: "exp-003",
        type: "experiment",
        label: "Microgravity Simulation",
        size: 8,
        duration: "4 months",
      },
      {
        id: "exp-004",
        type: "experiment",
        label: "Space Agriculture Protocol",
        size: 6,
        duration: "8 months",
      },

      // Topics
      {
        id: "topic-001",
        type: "topic",
        label: "Space Agriculture",
        size: 11,
        papers: 67,
      },
      {
        id: "topic-002",
        type: "topic",
        label: "Plant Biology",
        size: 9,
        papers: 45,
      },
      {
        id: "topic-003",
        type: "topic",
        label: "Microgravity Effects",
        size: 8,
        papers: 38,
      },
      {
        id: "topic-004",
        type: "topic",
        label: "Cellular Response",
        size: 7,
        papers: 29,
      },
    ],
    links: [
      // Publication connections
      {
        source: "pub-001",
        target: "org-001",
        strength: "strong",
        type: "studies",
      },
      {
        source: "pub-001",
        target: "exp-001",
        strength: "strong",
        type: "uses",
      },
      {
        source: "pub-001",
        target: "topic-003",
        strength: "moderate",
        type: "relates",
      },
      {
        source: "pub-002",
        target: "org-001",
        strength: "strong",
        type: "studies",
      },
      {
        source: "pub-002",
        target: "exp-002",
        strength: "strong",
        type: "uses",
      },
      {
        source: "pub-003",
        target: "topic-001",
        strength: "strong",
        type: "relates",
      },
      {
        source: "pub-004",
        target: "exp-001",
        strength: "strong",
        type: "uses",
      },
      {
        source: "pub-005",
        target: "topic-004",
        strength: "moderate",
        type: "relates",
      },

      // Organism connections
      {
        source: "org-001",
        target: "exp-001",
        strength: "strong",
        type: "subject",
      },
      {
        source: "org-001",
        target: "exp-002",
        strength: "moderate",
        type: "subject",
      },
      {
        source: "org-002",
        target: "exp-004",
        strength: "strong",
        type: "subject",
      },
      {
        source: "org-003",
        target: "topic-001",
        strength: "moderate",
        type: "relates",
      },
      {
        source: "org-004",
        target: "topic-001",
        strength: "strong",
        type: "relates",
      },

      // Experiment connections
      {
        source: "exp-001",
        target: "topic-002",
        strength: "moderate",
        type: "relates",
      },
      {
        source: "exp-002",
        target: "topic-004",
        strength: "strong",
        type: "relates",
      },
      {
        source: "exp-003",
        target: "topic-003",
        strength: "strong",
        type: "relates",
      },
      {
        source: "exp-004",
        target: "topic-001",
        strength: "strong",
        type: "relates",
      },

      // Topic interconnections
      {
        source: "topic-001",
        target: "topic-002",
        strength: "moderate",
        type: "overlaps",
      },
      {
        source: "topic-002",
        target: "topic-004",
        strength: "weak",
        type: "overlaps",
      },
      {
        source: "topic-003",
        target: "topic-004",
        strength: "moderate",
        type: "overlaps",
      },
    ],
  };

  const nodeColors = {
    publication: "#3B82F6", // blue-500
    organism: "#10B981", // emerald-500
    experiment: "#8B5CF6", // violet-500
    topic: "#F59E0B", // amber-500
  };

  const linkStrengthValues = {
    strong: 1,
    moderate: 0.6,
    weak: 0.3,
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef?.current) {
        const { width, height } =
          containerRef?.current?.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!dimensions?.width || !dimensions?.height) return;

    setIsLoading(true);

    // Clear previous visualization
    d3?.select(svgRef?.current)?.selectAll("*")?.remove();

    const svg = d3
      ?.select(svgRef?.current)
      ?.attr("width", dimensions?.width)
      ?.attr("height", dimensions?.height);

    // Create container for zoomable content
    const container = svg?.append("g");

    // Create zoom behavior
    const zoom = d3
      ?.zoom()
      ?.scaleExtent([0.1, 4])
      ?.on("zoom", (event) => {
        container?.attr("transform", event?.transform);
      });

    svg?.call(zoom);

    // Filter data based on current filters and search
    let filteredNodes = mockGraphData?.nodes;
    let filteredLinks = mockGraphData?.links;

    if (filters?.nodeTypes && filters?.nodeTypes?.length > 0) {
      filteredNodes = filteredNodes?.filter((node) =>
        filters?.nodeTypes?.includes(node?.type)
      );
    }

    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      filteredNodes = filteredNodes?.filter((node) =>
        node?.label?.toLowerCase()?.includes(query)
      );
    }

    // Filter links to only include those between remaining nodes
    const nodeIds = new Set(filteredNodes.map((d) => d.id));
    filteredLinks = filteredLinks?.filter(
      (link) => nodeIds?.has(link?.source) && nodeIds?.has(link?.target)
    );

    // Create simulation based on layout
    let simulation;

    if (layout === "force") {
      simulation = d3
        ?.forceSimulation(filteredNodes)
        ?.force(
          "link",
          d3
            ?.forceLink(filteredLinks)
            ?.id((d) => d?.id)
            ?.strength((d) => linkStrengthValues?.[d?.strength])
        )
        ?.force("charge", d3?.forceManyBody()?.strength(-300))
        ?.force(
          "center",
          d3?.forceCenter(dimensions?.width / 2, dimensions?.height / 2)
        )
        ?.force(
          "collision",
          d3?.forceCollide()?.radius((d) => d?.size + 5)
        );
    } else if (layout === "hierarchical") {
      // Simple hierarchical layout
      filteredNodes?.forEach((node, i) => {
        const level =
          node?.type === "topic"
            ? 0
            : node?.type === "publication"
            ? 1
            : node?.type === "experiment"
            ? 2
            : 3;
        node.fx = (i % 5) * (dimensions?.width / 5) + dimensions?.width / 10;
        node.fy = level * (dimensions?.height / 4) + dimensions?.height / 8;
      });

      simulation = d3
        ?.forceSimulation(filteredNodes)
        ?.force(
          "link",
          d3
            ?.forceLink(filteredLinks)
            ?.id((d) => d?.id)
            ?.strength(0.1)
        )
        ?.alphaDecay(0.1);
    } else if (layout === "circular") {
      // Circular layout
      const radius = Math.min(dimensions?.width, dimensions?.height) / 3;
      filteredNodes?.forEach((node, i) => {
        const angle = (i / filteredNodes?.length) * 2 * Math.PI;
        node.fx = dimensions?.width / 2 + radius * Math.cos(angle);
        node.fy = dimensions?.height / 2 + radius * Math.sin(angle);
      });

      simulation = d3
        ?.forceSimulation(filteredNodes)
        ?.force(
          "link",
          d3
            ?.forceLink(filteredLinks)
            ?.id((d) => d?.id)
            ?.strength(0.1)
        )
        ?.alphaDecay(0.1);
    }

    // Create links
    const link = container
      ?.append("g")
      ?.selectAll("line")
      ?.data(filteredLinks)
      ?.enter()
      ?.append("line")
      ?.attr("stroke", "#64748B")
      ?.attr("stroke-opacity", (d) => linkStrengthValues?.[d?.strength])
      ?.attr("stroke-width", (d) => linkStrengthValues?.[d?.strength] * 3)
      ?.attr("stroke-dasharray", (d) =>
        d?.strength === "weak" ? "5,5" : null
      );

    // Create nodes
    const node = container
      ?.append("g")
      ?.selectAll("circle")
      ?.data(filteredNodes)
      ?.enter()
      ?.append("circle")
      ?.attr("r", (d) => d?.size)
      ?.attr("fill", (d) => nodeColors?.[d?.type])
      ?.attr("stroke", "#1E293B")
      ?.attr("stroke-width", 2)
      ?.style("cursor", "pointer")
      ?.call(
        d3
          ?.drag()
          ?.on("start", dragstarted)
          ?.on("drag", dragged)
          ?.on("end", dragended)
      );

    // Create labels
    const label = container
      ?.append("g")
      ?.selectAll("text")
      ?.data(filteredNodes)
      ?.enter()
      ?.append("text")
      ?.text((d) =>
        d?.label?.length > 20 ? d?.label?.substring(0, 20) + "..." : d?.label
      )
      ?.attr("font-size", "12px")
      ?.attr("font-family", "Inter, sans-serif")
      ?.attr("fill", "#F8FAFC")
      ?.attr("text-anchor", "middle")
      ?.attr("dy", (d) => d?.size + 20)
      ?.style("pointer-events", "none");

    // Add hover and click interactions
    node
      ?.on("mouseover", function (event, d) {
        d3?.select(this)
          ?.attr("stroke-width", 4)
          ?.attr("r", d?.size + 2);

        if (onNodeHover) {
          onNodeHover(d, event);
        }
      })
      ?.on("mouseout", function (event, d) {
        d3?.select(this)?.attr("stroke-width", 2)?.attr("r", d?.size);
      })
      ?.on("click", function (event, d) {
        if (onNodeSelect) {
          onNodeSelect(d);
        }
      });

    // Update positions on simulation tick
    if (simulation) {
      simulation?.on("tick", () => {
        link
          ?.attr("x1", (d) => d?.source?.x)
          ?.attr("y1", (d) => d?.source?.y)
          ?.attr("x2", (d) => d?.target?.x)
          ?.attr("y2", (d) => d?.target?.y);

        node?.attr("cx", (d) => d?.x)?.attr("cy", (d) => d?.y);

        label?.attr("x", (d) => d?.x)?.attr("y", (d) => d?.y);
      });

      // Stop loading when simulation settles
      simulation?.on("end", () => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }

    function dragstarted(event, d) {
      if (!event?.active && simulation) simulation?.alphaTarget(0.3)?.restart();
      d.fx = d?.x;
      d.fy = d?.y;
    }

    function dragged(event, d) {
      d.fx = event?.x;
      d.fy = event?.y;
    }

    function dragended(event, d) {
      if (!event?.active && simulation) simulation?.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }, [dimensions, layout, filters, searchQuery]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full bg-slate-900 ${className}`}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
          <div className="flex items-center space-x-3">
            <Icon
              name="Loader2"
              size={24}
              className="text-primary animate-spin"
            />
            <span className="text-foreground font-medium">
              Generating graph visualization...
            </span>
          </div>
        </div>
      )}

      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%)",
        }}
      />

      {/* Graph Instructions */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 max-w-xs">
        <h4 className="text-sm font-medium text-foreground mb-2">
          Graph Controls
        </h4>
        <div className="space-y-1 text-xs text-muted-foreground">
          <div>• Drag nodes to reposition</div>
          <div>• Scroll to zoom in/out</div>
          <div>• Click nodes for details</div>
          <div>• Hover for quick info</div>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualization;
