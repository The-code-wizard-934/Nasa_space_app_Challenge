import React, { useState, useRef, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ChatInput = ({ onSendMessage, isLoading, onExampleClick }) => {
  const [message, setMessage] = useState("");
  const [showExamples, setShowExamples] = useState(true);
  const textareaRef = useRef(null);

  const exampleQueries = [
    "What are the key findings from ISS plant growth experiments?",
    "How does microgravity affect bone density in astronauts?",
    "What organisms have been studied in space environments?",
    "Summarize recent research on radiation effects on biological systems",
    "What are the main challenges for growing food on Mars?",
  ];

  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef?.current?.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !isLoading) {
      onSendMessage(message?.trim());
      setMessage("");
      setShowExamples(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e?.key === "Enter" && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleExampleClick = (example) => {
    setMessage(example);
    setShowExamples(false);
    onExampleClick(example);
  };

  return (
    <div className="border-t border-border bg-background">
      {/* Example Queries */}
      {showExamples && (
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-medium text-foreground mb-3">
            Try asking about:
          </h3>
          <div className="flex flex-wrap gap-2">
            {exampleQueries?.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleExampleClick(example)}
                className="text-xs text-left h-auto py-2 px-3 whitespace-normal"
              >
                {example}
              </Button>
            ))}
          </div>
        </div>
      )}
      {/* Input Area */}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e?.target?.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about NASA bioscience research..."
                disabled={isLoading}
                className="w-full min-h-[44px] max-h-32 px-4 py-3 pr-12 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                rows={1}
              />

              {/* Character Count */}
              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                {message?.length}/1000
              </div>
            </div>

            <Button
              type="submit"
              disabled={!message?.trim() || isLoading}
              size="icon"
              className="w-11 h-11 rounded-xl"
            >
              {isLoading ? (
                <Icon name="Loader2" size={20} className="animate-spin" />
              ) : (
                <Icon name="Send" size={20} />
              )}
            </Button>
          </div>

          {/* Input Actions */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="Paperclip"
                iconPosition="left"
              >
                Attach
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Mic"
                iconPosition="left"
              >
                Voice
              </Button>
            </div>

            <div className="text-xs text-muted-foreground">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
