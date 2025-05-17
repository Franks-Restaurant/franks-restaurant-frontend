// src/App.tsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";
import { CartProvider } from "./contexts/CartContext";
import AOS from "aos";
import "aos/dist/aos.css";


import { AuthProvider } from "./providers/AuthProvider";
import AppContent from "./AppContent";

const queryClient = new QueryClient();

const App = () => {
  React.useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease" });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <AuthProvider>
                <AppContent />
              </AuthProvider>
            </BrowserRouter>
          </PersistGate>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
