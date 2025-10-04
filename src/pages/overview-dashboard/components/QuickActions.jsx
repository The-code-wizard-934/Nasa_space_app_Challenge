import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";

const QuickActions = ({ className = "" }) => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Start AI Chat",
      description: "Ask questions about research",
      icon: "Bot",
      variant: "default",
      onClick: () => navigate("/ai-chatbot-interface"),
    },
    {
      title: "Upload Publication",
      description: "Add new research document",
      icon: "Upload",
      variant: "outline",
      onClick: () => navigate("/document-upload"),
    },
    {
      title: "Generate Report",
      description: "Create insights analysis",
      icon: "FileText",
      variant: "secondary",
      onClick: () => navigate("/insights-analytics"),
    },
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-heading font-semibold text-foreground">
        Quick Actions
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions?.map((action, index) => (
          <Button
            key={index}
            variant={action?.variant}
            onClick={action?.onClick}
            className="h-auto p-4 flex flex-col items-center space-y-2 text-center"
            iconName={action?.icon}
          >
            <div className="flex flex-col items-center space-y-1">
              <span className="font-medium">{action?.title}</span>
              <span className="text-xs opacity-80">{action?.description}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
