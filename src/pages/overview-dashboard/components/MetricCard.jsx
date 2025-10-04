import React from "react";
import Icon from "../../../components/AppIcon";

const MetricCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  onClick,
  className = "",
}) => {
  const getTrendColor = () => {
    if (!trend) return "text-muted-foreground";
    return trend === "up"
      ? "text-success"
      : trend === "down"
      ? "text-error"
      : "text-muted-foreground";
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    return trend === "up"
      ? "TrendingUp"
      : trend === "down"
      ? "TrendingDown"
      : "Minus";
  };

  return (
    <div
      className={`glass-card p-6 transition-cosmic hover:bg-white/15 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-caption text-muted-foreground mb-2">
            {title}
          </p>
          <p className="text-3xl font-heading font-bold text-foreground mb-1">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={24} className="text-primary" />
          </div>
          {trend && trendValue && (
            <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
              <Icon name={getTrendIcon()} size={14} />
              <span className="text-xs font-medium">{trendValue}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
