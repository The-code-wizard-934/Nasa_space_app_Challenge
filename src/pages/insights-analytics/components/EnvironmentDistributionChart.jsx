import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const EnvironmentDistributionChart = ({ onDrillDown }) => {
  const [viewType, setViewType] = useState("pie");
  const [selectedEnvironment, setSelectedEnvironment] = useState(null);

  const environmentData = [
    {
      environment: "International Space Station",
      shortName: "ISS",
      studies: 245,
      experiments: 456,
      duration: "1998-Present",
      color: "#3B82F6",
      description: "Microgravity research platform in low Earth orbit",
    },
    {
      environment: "Space Shuttle",
      shortName: "Shuttle",
      studies: 89,
      experiments: 167,
      duration: "1981-2011",
      color: "#06B6D4",
      description: "Short-duration microgravity experiments",
    },
    {
      environment: "Ground Control",
      shortName: "Ground",
      studies: 156,
      experiments: 298,
      duration: "Ongoing",
      color: "#10B981",
      description: "Earth-based control experiments and studies",
    },
    {
      environment: "Parabolic Flight",
      shortName: "Parabolic",
      studies: 34,
      experiments: 78,
      duration: "1990-Present",
      color: "#F59E0B",
      description: "Brief microgravity simulation flights",
    },
    {
      environment: "Lunar Simulation",
      shortName: "Lunar",
      studies: 12,
      experiments: 28,
      duration: "2019-Present",
      color: "#EF4444",
      description: "Moon-like environment simulation chambers",
    },
    {
      environment: "Mars Simulation",
      shortName: "Mars",
      studies: 8,
      experiments: 19,
      duration: "2020-Present",
      color: "#8B5CF6",
      description: "Mars-analog environment research",
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      const total = environmentData?.reduce(
        (sum, item) => sum + item?.studies,
        0
      );
      const percentage = ((data?.studies / total) * 100)?.toFixed(1);

      return (
        <div className="bg-popover border border-border rounded-lg p-4 shadow-floating max-w-xs">
          <p className="text-sm font-medium text-popover-foreground mb-2">
            {data?.environment}
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            {data?.description}
          </p>
          <div className="space-y-1">
            <p className="text-sm" style={{ color: data?.color }}>
              Studies: {data?.studies} ({percentage}%)
            </p>
            <p className="text-sm text-muted-foreground">
              Experiments: {data?.experiments}
            </p>
            <p className="text-sm text-muted-foreground">
              Duration: {data?.duration}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const BarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = environmentData?.find((item) => item?.shortName === label);
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-floating">
          <p className="text-sm font-medium text-popover-foreground mb-2">
            {data?.environment}
          </p>
          <div className="space-y-1">
            {payload?.map((entry, index) => (
              <p
                key={index}
                className="text-sm"
                style={{ color: entry?.color }}
              >
                {entry?.name}: {entry?.value}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const handlePieClick = (data) => {
    setSelectedEnvironment(
      selectedEnvironment === data?.environment ? null : data?.environment
    );
    if (onDrillDown) {
      onDrillDown(data?.environment, data);
    }
  };

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    shortName,
  }) => {
    if (percent < 0.05) return null; // Don't show labels for slices smaller than 5%

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={11}
        fontWeight="500"
      >
        {`${shortName} ${(percent * 100)?.toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="glass-card p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            Experiment Environment Distribution
          </h3>
          <p className="text-sm text-muted-foreground">
            Research distribution across different experimental environments
          </p>
        </div>

        <div className="flex bg-muted/20 rounded-lg p-1 mt-4 lg:mt-0">
          <Button
            variant={viewType === "pie" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewType("pie")}
            className="text-xs"
          >
            <Icon name="PieChart" size={14} className="mr-1" />
            Pie
          </Button>
          <Button
            variant={viewType === "bar" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewType("bar")}
            className="text-xs"
          >
            <Icon name="BarChart3" size={14} className="mr-1" />
            Bar
          </Button>
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {viewType === "pie" ? (
            <PieChart>
              <Pie
                data={environmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="studies"
                onClick={handlePieClick}
                cursor="pointer"
              >
                {environmentData?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry?.color}
                    stroke={
                      selectedEnvironment === entry?.environment
                        ? "#F8FAFC"
                        : "none"
                    }
                    strokeWidth={
                      selectedEnvironment === entry?.environment ? 2 : 0
                    }
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          ) : (
            <BarChart
              data={environmentData}
              margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148, 163, 184, 0.2)"
              />
              <XAxis
                dataKey="shortName"
                stroke="#94A3B8"
                fontSize={11}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#94A3B8" fontSize={12} />
              <Tooltip content={<BarTooltip />} />
              <Bar
                dataKey="studies"
                fill="#3B82F6"
                name="Studies"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="experiments"
                fill="#06B6D4"
                name="Experiments"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      {/* Environment Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6 pt-6 border-t border-border">
        {environmentData?.map((env) => (
          <div
            key={env.environment}
            className={`flex items-center space-x-3 p-3 rounded-lg border transition-cosmic cursor-pointer ${
              selectedEnvironment === env.environment
                ? "border-primary bg-primary/10"
                : "border-border hover:border-muted-foreground/50"
            }`}
            onClick={() => handlePieClick(env)}
          >
            <div
              className="w-4 h-4 rounded-full flex-shrink-0"
              style={{ backgroundColor: env.color }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">
                {env.shortName}
              </div>
              <div className="text-xs text-muted-foreground">
                {env.studies} studies
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnvironmentDistributionChart;
