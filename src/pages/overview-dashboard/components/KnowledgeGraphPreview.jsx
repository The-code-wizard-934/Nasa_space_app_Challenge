import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";
import Button from "../../../components/ui/Button";

const KnowledgeGraphPreview = ({ nodes, links, className = "" }) => {
  const svgRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!nodes || !links) return;

    const svg = d3?.select(svgRef?.current);
    svg?.selectAll("*")?.remove();

    const width = 300;
    const height = 200;

    const simulation = d3
      ?.forceSimulation(nodes)
      ?.force(
        "link",
        d3
          ?.forceLink(links)
          ?.id((d) => d?.id)
          ?.distance(30)
      )
      ?.force("charge", d3?.forceManyBody()?.strength(-100))
      ?.force("center", d3?.forceCenter(width / 2, height / 2));

    const link = svg
      ?.append("g")
      ?.selectAll("line")
      ?.data(links)
      ?.join("line")
      ?.attr("stroke", "#94A3B8")
      ?.attr("stroke-opacity", 0.6)
      ?.attr("stroke-width", 1);

    const node = svg
      ?.append("g")
      ?.selectAll("circle")
      ?.data(nodes)
      ?.join("circle")
      ?.attr("r", (d) => (d?.type === "organism" ? 8 : 6))
      ?.attr("fill", (d) => {
        switch (d?.type) {
          case "organism":
            return "#3B82F6";
          case "experiment":
            return "#06B6D4";
          case "result":
            return "#10B981";
          default:
            return "#94A3B8";
        }
      })
      ?.attr("stroke", "#F8FAFC")
      ?.attr("stroke-width", 1.5)
      ?.style("cursor", "pointer");

    const label = svg
      ?.append("g")
      ?.selectAll("text")
      ?.data(nodes)
      ?.join("text")
      ?.text((d) =>
        d?.name?.length > 10 ? d?.name?.substring(0, 10) + "..." : d?.name
      )
      ?.attr("font-size", "10px")
      ?.attr("fill", "#F8FAFC")
      ?.attr("text-anchor", "middle")
      ?.attr("dy", "0.3em")
      ?.style("pointer-events", "none");

    simulation?.on("tick", () => {
      link
        ?.attr("x1", (d) => d?.source?.x)
        ?.attr("y1", (d) => d?.source?.y)
        ?.attr("x2", (d) => d?.target?.x)
        ?.attr("y2", (d) => d?.target?.y);

      node?.attr("cx", (d) => d?.x)?.attr("cy", (d) => d?.y);

      label?.attr("x", (d) => d?.x)?.attr("y", (d) => d?.y);
    });

    node?.on("click", (event, d) => {
      navigate("/knowledge-graph-visual", { state: { selectedNode: d?.id } });
    });

    return () => {
      simulation?.stop();
    };
  }, [nodes, links, navigate]);

  const handleViewFull = () => {
    navigate("/knowledge-graph-visual");
  };

  return (
    <div className={`glass-card p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Knowledge Graph
          </h3>
          <p className="text-sm text-muted-foreground">
            Research relationships
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleViewFull}
          iconName="Maximize2"
          iconPosition="right"
        >
          Explore
        </Button>
      </div>

      <div className="relative">
        <svg
          ref={svgRef}
          width="100%"
          height="200"
          viewBox="0 0 300 200"
          className="border border-border rounded-lg bg-muted/5"
        />

        {/* Legend */}
        <div className="flex items-center justify-center space-x-4 mt-4">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-xs text-muted-foreground">Organisms</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-xs text-muted-foreground">Experiments</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-xs text-muted-foreground">Results</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGraphPreview;
