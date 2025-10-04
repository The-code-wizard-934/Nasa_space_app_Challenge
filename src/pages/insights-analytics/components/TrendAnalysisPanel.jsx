import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const TrendAnalysisPanel = () => {
  const [selectedMetric, setSelectedMetric] = useState("research-focus");
  const [timeRange, setTimeRange] = useState("5years");

  const researchFocusTrends = [
    {
      year: 2020,
      cardiovascular: 15,
      musculoskeletal: 12,
      neurological: 8,
      plantBiology: 18,
      microbiology: 22,
    },
    {
      year: 2021,
      cardiovascular: 18,
      musculoskeletal: 15,
      neurological: 12,
      plantBiology: 24,
      microbiology: 28,
    },
    {
      year: 2022,
      cardiovascular: 22,
      musculoskeletal: 18,
      neurological: 15,
      plantBiology: 28,
      microbiology: 32,
    },
    {
      year: 2023,
      cardiovascular: 25,
      musculoskeletal: 22,
      neurological: 18,
      plantBiology: 35,
      microbiology: 38,
    },
    {
      year: 2024,
      cardiovascular: 28,
      musculoskeletal: 25,
      neurological: 22,
      plantBiology: 42,
      microbiology: 45,
    },
  ];

  const fundingTrends = [
    {
      year: 2020,
      total: 125.5,
      bioscience: 45.2,
      technology: 38.8,
      operations: 41.5,
    },
    {
      year: 2021,
      total: 142.8,
      bioscience: 52.1,
      technology: 44.2,
      operations: 46.5,
    },
    {
      year: 2022,
      total: 158.3,
      bioscience: 58.7,
      technology: 49.8,
      operations: 49.8,
    },
    {
      year: 2023,
      total: 171.2,
      bioscience: 64.3,
      technology: 54.2,
      operations: 52.7,
    },
    {
      year: 2024,
      total: 185.6,
      bioscience: 71.8,
      technology: 58.9,
      operations: 54.9,
    },
  ];

  const collaborationTrends = [
    {
      year: 2020,
      international: 28,
      academic: 45,
      commercial: 12,
      government: 35,
    },
    {
      year: 2021,
      international: 32,
      academic: 52,
      commercial: 18,
      government: 38,
    },
    {
      year: 2022,
      international: 38,
      academic: 58,
      commercial: 25,
      government: 42,
    },
    {
      year: 2023,
      international: 45,
      academic: 65,
      commercial: 34,
      government: 48,
    },
    {
      year: 2024,
      international: 52,
      academic: 72,
      commercial: 42,
      government: 55,
    },
  ];

  const predictiveData = [
    { year: 2024, actual: 185.6, predicted: null, confidence: null },
    { year: 2025, actual: null, predicted: 198.4, confidence: 85 },
    { year: 2026, actual: null, predicted: 212.8, confidence: 78 },
    { year: 2027, actual: null, predicted: 228.5, confidence: 72 },
    { year: 2028, actual: null, predicted: 245.2, confidence: 65 },
  ];

  const metrics = [
    {
      value: "research-focus",
      label: "Research Focus Areas",
      data: researchFocusTrends,
    },
    { value: "funding", label: "Funding Allocation", data: fundingTrends },
    {
      value: "collaboration",
      label: "Collaboration Patterns",
      data: collaborationTrends,
    },
    { value: "predictive", label: "Predictive Analysis", data: predictiveData },
  ];

  const getCurrentData = () => {
    const metric = metrics?.find((m) => m?.value === selectedMetric);
    return metric ? metric?.data : [];
  };

  const getDataKeys = () => {
    switch (selectedMetric) {
      case "research-focus":
        return [
          { key: "cardiovascular", color: "#3B82F6", name: "Cardiovascular" },
          { key: "musculoskeletal", color: "#06B6D4", name: "Musculoskeletal" },
          { key: "neurological", color: "#10B981", name: "Neurological" },
          { key: "plantBiology", color: "#F59E0B", name: "Plant Biology" },
          { key: "microbiology", color: "#EF4444", name: "Microbiology" },
        ];
      case "funding":
        return [
          { key: "bioscience", color: "#3B82F6", name: "Bioscience ($M)" },
          { key: "technology", color: "#06B6D4", name: "Technology ($M)" },
          { key: "operations", color: "#10B981", name: "Operations ($M)" },
        ];
      case "collaboration":
        return [
          { key: "international", color: "#3B82F6", name: "International" },
          { key: "academic", color: "#06B6D4", name: "Academic" },
          { key: "commercial", color: "#10B981", name: "Commercial" },
          { key: "government", color: "#F59E0B", name: "Government" },
        ];
      case "predictive":
        return [
          { key: "actual", color: "#3B82F6", name: "Actual Funding" },
          { key: "predicted", color: "#06B6D4", name: "Predicted Funding" },
        ];
      default:
        return [];
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-floating">
          <p className="text-sm font-medium text-popover-foreground mb-2">{`Year: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value}${
                selectedMetric === "funding" ? "M" : ""
              }`}
              {selectedMetric === "predictive" &&
                entry?.dataKey === "predicted" &&
                entry?.payload?.confidence &&
                ` (${entry?.payload?.confidence}% confidence)`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const insights = [
    {
      icon: "TrendingUp",
      title: "Growing Plant Biology Focus",
      description:
        "Plant biology research has increased 133% over the past 4 years, driven by Mars mission requirements.",
      trend: "+133%",
      color: "text-success",
    },
    {
      icon: "Users",
      title: "Increased International Collaboration",
      description:
        "International partnerships have grown 86% since 2020, enhancing global research capabilities.",
      trend: "+86%",
      color: "text-primary",
    },
    {
      icon: "DollarSign",
      title: "Bioscience Funding Growth",
      description:
        "Bioscience funding is projected to reach $245M by 2028, representing 15% annual growth.",
      trend: "+15%/year",
      color: "text-accent",
    },
    {
      icon: "AlertTriangle",
      title: "Neurological Research Gap",
      description:
        "Neurological studies lag behind other areas, presenting opportunities for increased focus.",
      trend: "Gap Identified",
      color: "text-warning",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Chart */}
      <div className="glass-card p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
              Trend Analysis & Predictions
            </h3>
            <p className="text-sm text-muted-foreground">
              Historical trends and predictive modeling for strategic planning
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e?.target?.value)}
              className="bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {metrics?.map((metric) => (
                <option key={metric?.value} value={metric?.value}>
                  {metric?.label}
                </option>
              ))}
            </select>

            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              iconSize={14}
            >
              Export
            </Button>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {selectedMetric === "predictive" ? (
              <AreaChart
                data={getCurrentData()}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(148, 163, 184, 0.2)"
                />
                <XAxis dataKey="year" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stackId="1"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="predicted"
                  stackId="2"
                  stroke="#06B6D4"
                  fill="#06B6D4"
                  fillOpacity={0.4}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            ) : (
              <LineChart
                data={getCurrentData()}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(148, 163, 184, 0.2)"
                />
                <XAxis dataKey="year" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                {getDataKeys()?.map((dataKey) => (
                  <Line
                    key={dataKey?.key}
                    type="monotone"
                    dataKey={dataKey?.key}
                    stroke={dataKey?.color}
                    strokeWidth={2}
                    dot={{ fill: dataKey?.color, strokeWidth: 2, r: 4 }}
                    name={dataKey?.name}
                  />
                ))}
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
      {/* Key Insights */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Key Insights & Trends
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights?.map((insight, index) => (
            <div
              key={index}
              className="border border-border rounded-lg p-4 hover:border-primary/50 transition-cosmic"
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-muted/20 ${insight?.color}`}>
                  <Icon name={insight?.icon} size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-foreground">
                      {insight?.title}
                    </h4>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full bg-muted/20 ${insight?.color}`}
                    >
                      {insight?.trend}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {insight?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysisPanel;
