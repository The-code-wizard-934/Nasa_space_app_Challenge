import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const BiologicalSystemsChart = ({ onDrillDown }) => {
  const [viewType, setViewType] = useState("bar");
  const [sortBy, setSortBy] = useState("studies");

  const systemsData = [
    {
      system: "Cardiovascular",
      studies: 89,
      experiments: 156,
      organisms: 12,
      color: "#3B82F6",
      description: "Heart, blood vessels, circulation studies",
    },
    {
      system: "Musculoskeletal",
      studies: 76,
      experiments: 142,
      organisms: 8,
      color: "#06B6D4",
      description: "Bones, muscles, joints research",
    },
    {
      system: "Neurological",
      studies: 68,
      experiments: 128,
      organisms: 15,
      color: "#10B981",
      description: "Brain, nervous system, behavior",
    },
    {
      system: "Plant Biology",
      studies: 92,
      experiments: 178,
      organisms: 24,
      color: "#F59E0B",
      description: "Plant growth, photosynthesis, adaptation",
    },
    {
      system: "Microbiology",
      studies: 134,
      experiments: 245,
      organisms: 45,
      color: "#EF4444",
      description: "Bacteria, fungi, microorganisms",
    },
    {
      system: "Cell Biology",
      studies: 58,
      experiments: 98,
      organisms: 18,
      color: "#8B5CF6",
      description: "Cellular processes, division, metabolism",
    },
    {
      system: "Immunology",
      studies: 42,
      experiments: 78,
      organisms: 9,
      color: "#EC4899",
      description: "Immune response, antibodies, defense",
    },
  ];

  const getSortedData = () => {
    return [...systemsData]?.sort((a, b) => b?.[sortBy] - a?.[sortBy]);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-4 shadow-floating max-w-xs">
          <p className="text-sm font-medium text-popover-foreground mb-2">
            {label}
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            {data?.description}
          </p>
          <div className="space-y-1">
            <p className="text-sm" style={{ color: payload?.[0]?.color }}>
              Studies: {data?.studies}
            </p>
            <p className="text-sm text-muted-foreground">
              Experiments: {data?.experiments}
            </p>
            <p className="text-sm text-muted-foreground">
              Organisms: {data?.organisms}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      const total = systemsData?.reduce((sum, item) => sum + item?.[sortBy], 0);
      const percentage = ((data?.[sortBy] / total) * 100)?.toFixed(1);

      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-floating">
          <p className="text-sm font-medium text-popover-foreground mb-1">
            {data?.system}
          </p>
          <p className="text-sm" style={{ color: data?.color }}>
            {data?.[sortBy]} ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const handleBarClick = (data) => {
    if (onDrillDown) {
      onDrillDown(data?.system, data);
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            Most-Researched Biological Systems
          </h3>
          <p className="text-sm text-muted-foreground">
            Distribution of research focus across biological domains
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          <div className="flex bg-muted/20 rounded-lg p-1">
            <Button
              variant={viewType === "bar" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewType("bar")}
              className="text-xs"
            >
              <Icon name="BarChart3" size={14} className="mr-1" />
              Bar
            </Button>
            <Button
              variant={viewType === "pie" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewType("pie")}
              className="text-xs"
            >
              <Icon name="PieChart" size={14} className="mr-1" />
              Pie
            </Button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="studies">Sort by Studies</option>
            <option value="experiments">Sort by Experiments</option>
            <option value="organisms">Sort by Organisms</option>
          </select>
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {viewType === "bar" ? (
            <BarChart
              data={getSortedData()}
              margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
              onClick={handleBarClick}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148, 163, 184, 0.2)"
              />
              <XAxis
                dataKey="system"
                stroke="#94A3B8"
                fontSize={11}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#94A3B8" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey={sortBy}
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
                cursor="pointer"
              />
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={getSortedData()}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey={sortBy}
                label={({ system, percent }) =>
                  `${system} ${(percent * 100)?.toFixed(0)}%`
                }
                labelLine={false}
                fontSize={11}
              >
                {getSortedData()?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-xl font-heading font-bold text-primary mb-1">
            {systemsData?.length}
          </div>
          <div className="text-xs text-muted-foreground">Systems Studied</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-heading font-bold text-accent mb-1">
            {systemsData?.reduce((sum, item) => sum + item?.studies, 0)}
          </div>
          <div className="text-xs text-muted-foreground">Total Studies</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-heading font-bold text-success mb-1">
            {systemsData?.reduce((sum, item) => sum + item?.experiments, 0)}
          </div>
          <div className="text-xs text-muted-foreground">Total Experiments</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-heading font-bold text-warning mb-1">
            {systemsData?.reduce((sum, item) => sum + item?.organisms, 0)}
          </div>
          <div className="text-xs text-muted-foreground">Organisms</div>
        </div>
      </div>
    </div>
  );
};

export default BiologicalSystemsChart;
