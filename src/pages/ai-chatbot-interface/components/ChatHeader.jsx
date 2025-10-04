import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ChatHeader = ({
  conversationTitle,
  onExportChat,
  onClearChat,
  onToggleSidebar,
  messageCount = 0,
}) => {
  const [showActions, setShowActions] = useState(false);

  const handleExport = () => {
    onExportChat();
    setShowActions(false);
  };

  const handleClear = () => {
    if (
      window.confirm(
        "Are you sure you want to clear this conversation? This action cannot be undone."
      )
    ) {
      onClearChat();
      setShowActions(false);
    }
  };

  return (
    <div className="bg-card border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <Icon name="Menu" size={20} />
          </Button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center">
              <Icon name="Bot" size={16} className="text-accent-foreground" />
            </div>

            <div>
              <h1 className="text-lg font-heading font-semibold text-foreground">
                {conversationTitle || "NASA Bioscience AI Assistant"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {messageCount > 0
                  ? `${messageCount} messages`
                  : "Ready to help with your research"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Status Indicator */}
          <div className="flex items-center space-x-2 px-3 py-1 bg-success/20 text-success rounded-full">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs font-medium">Online</span>
          </div>

          {/* Actions Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowActions(!showActions)}
            >
              <Icon name="MoreVertical" size={20} />
            </Button>

            {showActions && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowActions(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-floating z-20">
                  <div className="py-2">
                    <button
                      onClick={handleExport}
                      className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted/20 flex items-center space-x-2"
                    >
                      <Icon name="Download" size={16} />
                      <span>Export Conversation</span>
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(window.location?.href);
                        setShowActions(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted/20 flex items-center space-x-2"
                    >
                      <Icon name="Share2" size={16} />
                      <span>Share Conversation</span>
                    </button>

                    <div className="border-t border-border my-2"></div>

                    <button
                      onClick={handleClear}
                      className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-destructive/20 flex items-center space-x-2"
                    >
                      <Icon name="Trash2" size={16} />
                      <span>Clear Conversation</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
