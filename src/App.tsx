import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Join from "./pages/Join";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Learn from "./pages/Learn";
import LearningContent from "./pages/LearningContent";
import Reminders from "./pages/Reminders";
import Help from "./pages/Help";
import Emergency from "./pages/Emergency";
import PeriodTracker from "./pages/PeriodTracker";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/join" element={<Join />} />
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/chat" element={<Layout><Chat /></Layout>} />
          <Route path="/learn" element={<Layout><Learn /></Layout>} />
          <Route path="/learning-content" element={<Layout><LearningContent /></Layout>} />
          <Route path="/reminders" element={<Layout><Reminders /></Layout>} />
          <Route path="/help" element={<Layout><Help /></Layout>} />
          <Route path="/period-tracker" element={<Layout><PeriodTracker /></Layout>} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
