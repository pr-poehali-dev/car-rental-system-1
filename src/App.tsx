
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Booking from "./pages/Booking";
import History from "./pages/History";
import Branches from "./pages/Branches";
import Cards from "./pages/Cards";
import Cars from "./pages/Cars";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/profile" element={<Account />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/history" element={<History />} />
          <Route path="/booking-history" element={<History />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/cars" element={<Cars />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;