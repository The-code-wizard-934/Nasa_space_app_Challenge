import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import InsightsAnalytics from "./pages/insights-analytics";
import KnowledgeGraphVisual from "./pages/knowledge-graph-visual";
import PublicationsExplorer from "./pages/publications-explorer";
import AIChatbotInterface from "./pages/ai-chatbot-interface";
import DocumentUpload from "./pages/document-upload";
import OverviewDashboard from "./pages/overview-dashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<OverviewDashboard />} />
          <Route path="/insights-analytics" element={<InsightsAnalytics />} />
          <Route
            path="/knowledge-graph-visual"
            element={<KnowledgeGraphVisual />}
          />
          <Route
            path="/publications-explorer"
            element={<PublicationsExplorer />}
          />
          <Route
            path="/ai-chatbot-interface"
            element={<AIChatbotInterface />}
          />
          <Route path="/document-upload" element={<DocumentUpload />} />
          <Route path="/overview-dashboard" element={<OverviewDashboard />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default AppRoutes;
