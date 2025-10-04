import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import Icon from "../../../components/AppIcon";

const ChatArea = ({
  messages,
  isLoading,
  onSourceClick,
  onFollowUpClick,
  conversationId,
}) => {
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderEmptyState = () => (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Bot" size={32} className="text-accent-foreground" />
        </div>

        <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
          Welcome to NASA Bioscience AI
        </h2>

        <p className="text-muted-foreground mb-6">
          I'm here to help you explore NASA's bioscience research. Ask me about
          experiments, publications, organisms studied in space, or any research
          topic you're curious about.
        </p>

        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg">
            <Icon
              name="Search"
              size={16}
              className="text-accent flex-shrink-0"
            />
            <span className="text-foreground">
              Search through 600+ publications
            </span>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg">
            <Icon
              name="FileText"
              size={16}
              className="text-accent flex-shrink-0"
            />
            <span className="text-foreground">
              Get detailed source citations
            </span>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg">
            <Icon
              name="MessageCircle"
              size={16}
              className="text-accent flex-shrink-0"
            />
            <span className="text-foreground">Ask follow-up questions</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (messages?.length === 0) {
    return renderEmptyState();
  }

  return (
    <div
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto scrollbar-cosmic p-4 space-y-4"
    >
      {messages?.map((message) => (
        <ChatMessage
          key={message?.id}
          message={message}
          onSourceClick={onSourceClick}
          onFollowUpClick={onFollowUpClick}
        />
      ))}
      {isLoading && (
        <ChatMessage
          message={{ type: "typing", timestamp: new Date() }}
          onSourceClick={onSourceClick}
          onFollowUpClick={onFollowUpClick}
        />
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatArea;
