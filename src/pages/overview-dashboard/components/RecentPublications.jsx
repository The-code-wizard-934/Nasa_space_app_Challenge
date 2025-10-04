import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const RecentPublications = ({ publications, className = "" }) => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/publications-explorer");
  };

  const handleAISummary = (publication) => {
    navigate("/ai-chatbot-interface", {
      state: {
        initialQuery: `Summarize the publication "${publication?.title}" by ${publication?.authors}`,
      },
    });
  };

  const truncateText = (text, maxLength) => {
    if (text?.length <= maxLength) return text;
    return text?.substring(0, maxLength) + "...";
  };

  return (
    <div className={`glass-card p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Recent Publications
          </h3>
          <p className="text-sm text-muted-foreground">
            Latest research documents
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleViewAll}
          iconName="ExternalLink"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {publications?.map((publication) => (
          <div
            key={publication?.id}
            className="border border-border rounded-lg p-4 hover:bg-muted/10 transition-cosmic"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground mb-1 leading-tight">
                  {truncateText(publication?.title, 80)}
                </h4>
                <p className="text-xs text-muted-foreground mb-2">
                  {publication?.authors} • {publication?.year}
                </p>
                <div className="flex items-center space-x-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/20 text-primary">
                    <Icon name="Microscope" size={12} className="mr-1" />
                    {publication?.organism}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-accent/20 text-accent">
                    <Icon name="Rocket" size={12} className="mr-1" />
                    {publication?.environment}
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAISummary(publication)}
                  className="text-xs"
                >
                  <Icon name="Bot" size={14} className="mr-1" />
                  AI Summary
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  <Icon name="ExternalLink" size={14} className="mr-1" />
                  View
                </Button>
              </div>
            </div>

            {publication?.abstract && (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {truncateText(publication?.abstract, 150)}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPublications;
