import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ChatMessage = ({ message, onSourceClick, onFollowUpClick }) => {
  const [expandedSources, setExpandedSources] = useState(new Set());
  const [showAllSources, setShowAllSources] = useState(false);

  const toggleSourceExpansion = (sourceId) => {
    const newExpanded = new Set(expandedSources);
    if (newExpanded?.has(sourceId)) {
      newExpanded?.delete(sourceId);
    } else {
      newExpanded?.add(sourceId);
    }
    setExpandedSources(newExpanded);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderUserMessage = () => (
    <div className="flex justify-end mb-6">
      <div className="max-w-3xl">
        <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-3">
          <p className="text-sm">{message?.content}</p>
        </div>
        <div className="flex justify-end mt-1">
          <span className="text-xs text-muted-foreground">
            {formatTimestamp(message?.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );

  const renderAIMessage = () => {
    const visibleSources = showAllSources
      ? message?.sources
      : message?.sources?.slice(0, 3);
    const hasMoreSources = message?.sources && message?.sources?.length > 3;

    return (
      <div className="flex items-start space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Bot" size={16} className="text-accent-foreground" />
        </div>
        <div className="flex-1 max-w-4xl">
          <div className="bg-card border border-border rounded-2xl rounded-tl-md p-4">
            <div className="prose prose-sm max-w-none text-foreground">
              <p className="mb-0 leading-relaxed">{message?.content}</p>
            </div>

            {/* Sources Section */}
            {message?.sources && message?.sources?.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-foreground flex items-center">
                    <Icon name="FileText" size={16} className="mr-2" />
                    Sources ({message?.sources?.length})
                  </h4>
                  {hasMoreSources && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAllSources(!showAllSources)}
                    >
                      {showAllSources
                        ? "Show Less"
                        : `Show All (${message?.sources?.length})`}
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  {visibleSources?.map((source, index) => (
                    <div
                      key={source?.id}
                      className="border border-border rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleSourceExpansion(source?.id)}
                        className="w-full p-3 text-left hover:bg-muted/20 transition-cosmic"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-mono bg-primary/20 text-primary px-2 py-1 rounded">
                              [{index + 1}]
                            </span>
                            <span className="text-sm font-medium text-foreground line-clamp-1">
                              {source?.title}
                            </span>
                          </div>
                          <Icon
                            name={
                              expandedSources?.has(source?.id)
                                ? "ChevronUp"
                                : "ChevronDown"
                            }
                            size={16}
                            className="text-muted-foreground"
                          />
                        </div>
                      </button>

                      {expandedSources?.has(source?.id) && (
                        <div className="px-3 pb-3 border-t border-border bg-muted/10">
                          <div className="pt-3 space-y-2">
                            <div className="text-sm text-muted-foreground">
                              <strong>Authors:</strong> {source?.authors}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              <strong>Published:</strong>{" "}
                              {source?.publicationDate}
                            </div>
                            {source?.doi && (
                              <div className="text-sm text-muted-foreground">
                                <strong>DOI:</strong> {source?.doi}
                              </div>
                            )}
                            <div className="flex space-x-2 pt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onSourceClick(source)}
                                iconName="ExternalLink"
                                iconPosition="right"
                              >
                                View Full Paper
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Follow-up Suggestions */}
            {message?.followUpSuggestions &&
              message?.followUpSuggestions?.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <h4 className="text-sm font-medium text-foreground mb-3">
                    Suggested follow-up questions:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {message?.followUpSuggestions?.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => onFollowUpClick(suggestion)}
                        className="text-xs"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
          </div>

          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-muted-foreground">
              {formatTimestamp(message?.timestamp)}
            </span>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="w-6 h-6">
                <Icon name="Copy" size={12} />
              </Button>
              <Button variant="ghost" size="icon" className="w-6 h-6">
                <Icon name="ThumbsUp" size={12} />
              </Button>
              <Button variant="ghost" size="icon" className="w-6 h-6">
                <Icon name="ThumbsDown" size={12} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTypingIndicator = () => (
    <div className="flex items-start space-x-3 mb-6">
      <div className="w-8 h-8 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center flex-shrink-0">
        <Icon name="Bot" size={16} className="text-accent-foreground" />
      </div>

      <div className="bg-card border border-border rounded-2xl rounded-tl-md p-4">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
          <span className="text-sm text-muted-foreground">
            AI is thinking...
          </span>
        </div>
      </div>
    </div>
  );

  if (message?.type === "typing") {
    return renderTypingIndicator();
  }

  return message?.sender === "user" ? renderUserMessage() : renderAIMessage();
};

export default ChatMessage;
