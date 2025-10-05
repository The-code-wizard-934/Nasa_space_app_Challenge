import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const SearchBar = ({ onSearch, className = "" }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (query?.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        // Navigate to AI chatbot with query
        navigate("/ai-chatbot-interface", { state: { initialQuery: query } });
      }
    }
  };

  const handleAIChat = () => {
    window.open("https://nasa-hackathon-rag.vercel.app/", "_blank", "noopener,noreferrer");
  };

  const suggestedQueries = [
    "What are the effects of microgravity on plant growth?",
    "Show me studies about bone density in space",
    "Find research on radiation exposure during Mars missions",
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Icon
            name="Search"
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e?.target?.value)}
            placeholder="Ask anything about NASA bioscience research..."
            className="w-full pl-12 pr-32 py-4 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-cosmic"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleAIChat}
              className="text-primary hover:text-primary/80"
            >
              <Icon name="Bot" size={16} className="mr-1" />
              AI Chat
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={!query?.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              <Icon name="ArrowRight" size={16} />
            </Button>
          </div>
        </div>
      </form>
      {/* Suggested Queries */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-muted-foreground font-caption">
          Try asking:
        </span>
        {suggestedQueries?.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => setQuery(suggestion)}
            className="text-xs bg-muted/20 hover:bg-muted/30 text-muted-foreground hover:text-foreground px-3 py-1 rounded-full transition-cosmic"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
