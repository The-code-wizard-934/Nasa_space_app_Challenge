import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const StudiesTimelineChart = ({ onExport }) => {
  const [viewType, setViewType] = useState("line");
  const [selectedPeriod, setSelectedPeriod] = useState("all");

  const timelineData = [
    { year: 2015, studies: 12, experiments: 28, publications: 15 },
    { year: 2016, studies: 18, experiments: 42, publications: 22 },
    { year: 2017, studies: 25, experiments: 58, publications: 31 },
    { year: 2018, studies: 32, experiments: 74, publications: 45 },
    { year: 2019, studies: 28, experiments: 68, publications: 38 },
    { year: 2020, studies: 35, experiments: 82, publications: 52 },
    { year: 2021, studies: 41, experiments: 95, publications: 63 },
    { year: 2022, studies: 48, experiments: 112, publications: 71 },
    { year: 2023, studies: 52, experiments: 128, publications: 84 },
    { year: 2024, studies: 38, experiments: 89, publications: 58 },
  ];

  const periodFilters = [
    { value: "all", label: "All Years" },
    { value: "5years", label: "Last 5 Years" },
    { value: "3years", label: "Last 3 Years" },
    { value: "recent", label: "Recent (2023-2024)" },
  ];

  const getFilteredData = () => {
    const currentYear = 2024;
    switch (selectedPeriod) {
      case "5years":
        return timelineData?.filter((item) => item?.year >= currentYear - 4);
      case "3years":
        return timelineData?.filter((item) => item?.year >= currentYear - 2);
      case "recent":
        return timelineData?.filter((item) => item?.year >= 2023);
      default:
        return timelineData;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-floating">
          <p className="text-sm font-medium text-popover-foreground mb-2">{`Year: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            Research Timeline Analysis
          </h3>
          <p className="text-sm text-muted-foreground">
            Historical trends in NASA bioscience research activities
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          <div className="flex bg-muted/20 rounded-lg p-1">
            <Button
              variant={viewType === "line" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewType("line")}
              className="text-xs"
            >
              <Icon name="TrendingUp" size={14} className="mr-1" />
              Line
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

          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e?.target?.value)}
            className="bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {periodFilters?.map((filter) => (
              <option key={filter?.value} value={filter?.value}>
                {filter?.label}
              </option>
            ))}
          </select>

          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
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
          {viewType === "line" ? (
            <LineChart
              data={getFilteredData()}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148, 163, 184, 0.2)"
              />
              <XAxis dataKey="year" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="studies"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                name="Studies"
              />
              <Line
                type="monotone"
                dataKey="experiments"
                stroke="#06B6D4"
                strokeWidth={2}
                dot={{ fill: "#06B6D4", strokeWidth: 2, r: 4 }}
                name="Experiments"
              />
              <Line
                type="monotone"
                dataKey="publications"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                name="Publications"
              />
            </LineChart>
          ) : (
            <BarChart
              data={getFilteredData()}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148, 163, 184, 0.2)"
              />
              <XAxis dataKey="year" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="studies" fill="#3B82F6" name="Studies" />
              <Bar dataKey="experiments" fill="#06B6D4" name="Experiments" />
              <Bar dataKey="publications" fill="#10B981" name="Publications" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-heading font-bold text-primary mb-1">
            {getFilteredData()?.reduce((sum, item) => sum + item?.studies, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Studies</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-heading font-bold text-accent mb-1">
            {getFilteredData()?.reduce(
              (sum, item) => sum + item?.experiments,
              0
            )}
          </div>
          <div className="text-sm text-muted-foreground">Total Experiments</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-heading font-bold text-success mb-1">
            {getFilteredData()?.reduce(
              (sum, item) => sum + item?.publications,
              0
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            Total Publications
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudiesTimelineChart;
