import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ConversationSidebar = ({
  conversations,
  activeConversationId,
  onConversationSelect,
  onNewConversation,
  isCollapsed,
  onToggle,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations?.filter(
    (conv) =>
      conv?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      conv?.preview?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date?.toLocaleDateString();
  };

  return (
    <div
      className={`
      bg-card border-r border-border h-full flex flex-col transition-all duration-300
      ${isCollapsed ? "w-0 overflow-hidden" : "w-80"}
    `}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Conversations
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="lg:hidden"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <Button
          onClick={onNewConversation}
          className="w-full mb-4"
          iconName="Plus"
          iconPosition="left"
        >
          New Conversation
        </Button>

        <div className="relative">
          <Icon
            name="Search"
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto scrollbar-cosmic">
        {filteredConversations?.length === 0 ? (
          <div className="p-4 text-center">
            <Icon
              name="MessageCircle"
              size={48}
              className="mx-auto mb-3 text-muted-foreground"
            />
            <p className="text-sm text-muted-foreground">
              {searchQuery ? "No conversations found" : "No conversations yet"}
            </p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {filteredConversations?.map((conversation) => (
              <button
                key={conversation?.id}
                onClick={() => onConversationSelect(conversation?.id)}
                className={`
                  w-full p-3 rounded-lg text-left transition-cosmic
                  ${
                    activeConversationId === conversation?.id
                      ? "bg-primary/20 border border-primary/30"
                      : "hover:bg-muted/20"
                  }
                `}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-sm text-foreground line-clamp-1">
                    {conversation?.title}
                  </h3>
                  <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                    {formatDate(conversation?.lastActivity)}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {conversation?.preview}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {conversation?.messageCount} messages
                  </span>
                  {conversation?.hasReferences && (
                    <Icon name="FileText" size={12} className="text-accent" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationSidebar;
