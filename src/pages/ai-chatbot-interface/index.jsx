import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationSidebar from "../../components/ui/NavigationSidebar";
import BreadcrumbTrail from "../../components/ui/BreadcrumbTrail";
import QuickActionPanel from "../../components/ui/QuickactionPanel";
import ConversationSidebar from "./components/ConversationSidebar";
import ChatHeader from "./components/ChatHeader";
import ChatArea from "./components/ChatArea";
import ChatInput from "./components/ChatInput";

const AIChatbotInterface = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [conversationSidebarCollapsed, setConversationSidebarCollapsed] =
    useState(false);
  const [activeConversationId, setActiveConversationId] = useState("conv-1");
  const [isLoading, setIsLoading] = useState(false);

  // Mock conversations data
  const [conversations] = useState([
    {
      id: "conv-1",
      title: "ISS Plant Growth Experiments",
      preview:
        "Discussing microgravity effects on plant development and growth patterns in space environments.",
      lastActivity: new Date(Date.now() - 3600000), // 1 hour ago
      messageCount: 12,
      hasReferences: true,
    },
    {
      id: "conv-2",
      title: "Bone Density Research",
      preview:
        "Exploring astronaut bone loss studies and countermeasures for long-duration spaceflight.",
      lastActivity: new Date(Date.now() - 86400000), // 1 day ago
      messageCount: 8,
      hasReferences: true,
    },
    {
      id: "conv-3",
      title: "Mars Food Production",
      preview:
        "Analyzing feasibility studies for sustainable food production systems on Mars.",
      lastActivity: new Date(Date.now() - 172800000), // 2 days ago
      messageCount: 15,
      hasReferences: true,
    },
    {
      id: "conv-4",
      title: "Radiation Effects Study",
      preview:
        "Investigating biological impacts of cosmic radiation on various organisms.",
      lastActivity: new Date(Date.now() - 259200000), // 3 days ago
      messageCount: 6,
      hasReferences: false,
    },
  ]);

  // Mock messages for active conversation
  const [messages, setMessages] = useState([
    {
      id: "msg-1",
      sender: "user",
      content: "What are the key findings from ISS plant growth experiments?",
      timestamp: new Date(Date.now() - 1800000),
    },
    {
      id: "msg-2",
      sender: "ai",
      content: `Based on NASA's extensive research aboard the International Space Station, several key findings have emerged from plant growth experiments:\n\n**Microgravity Effects on Growth Patterns:**\nPlants exhibit altered growth patterns in microgravity, with roots showing random directional growth rather than gravitropic responses. The Advanced Plant Habitat (APH) experiments have demonstrated that plants can complete full life cycles in space, though with modified morphology.\n\n**Water and Nutrient Uptake:**\nResearch shows that water distribution around root systems behaves differently in microgravity, requiring specialized delivery systems. Plants have adapted by developing more extensive root systems to compensate for altered fluid dynamics.\n\n**Gene Expression Changes:**\nMolecular studies reveal significant changes in gene expression related to cell wall formation, stress responses, and metabolic pathways. These adaptations appear to be reversible upon return to Earth gravity.`,
      timestamp: new Date(Date.now() - 1740000),
      sources: [
        {
          id: "src-1",
          title:
            "Advanced Plant Habitat: Enabling Plant Growth Research on the International Space Station",
          authors: "Massa, G.D., Wheeler, R.M., Morrow, R.C., Levine, H.G.",
          publicationDate: "2023-03-15",
          doi: "10.1016/j.lssr.2023.02.001",
        },
        {
          id: "src-2",
          title: "Microgravity Effects on Plant Growth and Development",
          authors: "Paul, A.L., Ferl, R.J., Meisel, M.W.",
          publicationDate: "2022-11-20",
          doi: "10.1038/s41526-022-00234-8",
        },
        {
          id: "src-3",
          title:
            "Root System Architecture in Microgravity: Insights from ISS Experiments",
          authors: "Johnson, C.M., Subramanian, A., Pattinson, S.N.",
          publicationDate: "2023-01-10",
          doi: "10.1007/s11104-023-05234-1",
        },
      ],
      followUpSuggestions: [
        "How do these findings apply to Mars missions?",
        "What specific crops show the most promise?",
        "Are there any nutritional differences in space-grown plants?",
      ],
    },
    {
      id: "msg-3",
      sender: "user",
      content: "How do these findings apply to Mars missions?",
      timestamp: new Date(Date.now() - 900000),
    },
    {
      id: "msg-4",
      sender: "ai",
      content: `The ISS plant growth findings have significant implications for Mars missions, particularly for establishing sustainable food production systems:\n\n**Reduced Gravity Considerations:**\nMars gravity (38% of Earth's) presents a middle ground between Earth and microgravity conditions. Research suggests that partial gravity may actually benefit plant growth compared to microgravity, as some gravitropic responses would be maintained while reducing mechanical stress on plant structures.\n\n**Closed-Loop Life Support:**\nISS experiments have validated the feasibility of integrating plant growth systems with atmospheric revitalization. For Mars missions, this becomes critical for oxygen production, CO2 scrubbing, and psychological benefits for crew members during long-duration missions.\n\n**Resource Utilization:**\nStudies on nutrient cycling and waste processing from ISS experiments inform Mars In-Situ Resource Utilization (ISRU) strategies. The ability to grow plants using recycled waste products and potentially Martian regolith becomes essential for mission sustainability.`,
      timestamp: new Date(Date.now() - 840000),
      sources: [
        {
          id: "src-4",
          title: "Mars Food Production: Lessons from ISS Agricultural Systems",
          authors: "Anderson, M.S., Ewert, M.K., Keener, J.F.",
          publicationDate: "2023-05-22",
          doi: "10.1016/j.actaastro.2023.04.012",
        },
        {
          id: "src-5",
          title:
            "Partial Gravity Effects on Plant Development: Implications for Mars Exploration",
          authors: "Stutte, G.W., Monje, O., Hatfield, R.D.",
          publicationDate: "2022-09-18",
          doi: "10.1016/j.lssr.2022.08.003",
        },
      ],
      followUpSuggestions: [
        "What challenges exist for Mars greenhouse design?",
        "How would Martian soil affect plant growth?",
        "What backup food systems are being considered?",
      ],
    },
  ]);

  const activeConversation = conversations?.find(
    (conv) => conv?.id === activeConversationId
  );

  const handleSendMessage = async (messageContent) => {
    // Add user message
    const userMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      content: messageContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "ai",
        content: `Thank you for your question about "${messageContent}". I'm analyzing NASA's bioscience research database to provide you with comprehensive information and relevant source citations. This is a simulated response demonstrating the AI assistant's capabilities for natural language processing and research assistance.`,
        timestamp: new Date(),
        sources: [
          {
            id: `src-${Date.now()}`,
            title: "Simulated Research Paper Title",
            authors: "NASA Research Team",
            publicationDate: "2023-10-04",
            doi: "10.1000/example.doi",
          },
        ],
        followUpSuggestions: [
          "Can you provide more details?",
          "What are the practical applications?",
          "Are there any recent developments?",
        ],
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleSourceClick = (source) => {
    // Navigate to publications explorer with source details
    navigate("/publications-explorer", {
      state: {
        searchQuery: source?.title,
        selectedPublication: source,
      },
    });
  };

  const handleFollowUpClick = (question) => {
    handleSendMessage(question);
  };

  const handleNewConversation = () => {
    const newConvId = `conv-${Date.now()}`;
    setActiveConversationId(newConvId);
    setMessages([]);
  };

  const handleConversationSelect = (conversationId) => {
    setActiveConversationId(conversationId);
    // In a real app, load messages for this conversation
    setConversationSidebarCollapsed(true); // Auto-collapse on mobile
  };

  const handleExportChat = () => {
    const chatData = {
      conversation: activeConversation?.title || "Untitled Conversation",
      messages: messages,
      exportDate: new Date()?.toISOString(),
      totalMessages: messages?.length,
    };

    const blob = new Blob([JSON.stringify(chatData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nasa-chat-${activeConversationId}.json`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleExampleClick = (example) => {
    handleSendMessage(example);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Navigation Sidebar */}
      <NavigationSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      {/* Main Content Area */}
      <div
        className={`flex-1 flex transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-60"
        }`}
      >
        {/* Conversation Sidebar */}
        <ConversationSidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onConversationSelect={handleConversationSelect}
          onNewConversation={handleNewConversation}
          isCollapsed={conversationSidebarCollapsed}
          onToggle={() =>
            setConversationSidebarCollapsed(!conversationSidebarCollapsed)
          }
        />

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Chat Header */}
          <ChatHeader
            conversationTitle={activeConversation?.title}
            messageCount={messages?.length}
            onExportChat={handleExportChat}
            onClearChat={handleClearChat}
            onToggleSidebar={() =>
              setConversationSidebarCollapsed(!conversationSidebarCollapsed)
            }
          />

          {/* Breadcrumb */}
          <div className="px-4 pt-4">
            <BreadcrumbTrail />
          </div>

          {/* Chat Area */}
          <ChatArea
            messages={messages}
            isLoading={isLoading}
            onSourceClick={handleSourceClick}
            onFollowUpClick={handleFollowUpClick}
            conversationId={activeConversationId}
          />

          {/* Chat Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            onExampleClick={handleExampleClick}
          />
        </div>
      </div>
      {/* Quick Action Panel */}
      <QuickActionPanel
        onSave={handleExportChat}
        onShare={() => navigator.clipboard?.writeText(window.location?.href)}
        customActions={[
          {
            id: "new-chat",
            icon: "Plus",
            label: "New Chat",
            action: handleNewConversation,
          },
        ]}
      />
      {/* Mobile Conversation Sidebar Overlay */}
      {!conversationSidebarCollapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
          onClick={() => setConversationSidebarCollapsed(true)}
        />
      )}
    </div>
  );
};

export default AIChatbotInterface;
