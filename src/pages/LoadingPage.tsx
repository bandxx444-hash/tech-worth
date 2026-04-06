import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import ProgressBar from "@/components/ProgressBar";
import { useScan } from "@/context/ScanContext";
import { simulateAIAnalysis, getRandomFact } from "@/lib/mock-ai";

const LoadingPage = () => {
  const navigate = useNavigate();
  const { diagnostics, setResult } = useScan();
  const [fact] = useState(getRandomFact);

  useEffect(() => {
    const timer = setTimeout(() => {
      const result = simulateAIAnalysis(diagnostics);
      setResult(result);
      navigate("/listings-preview");
    }, 4000);
    return () => clearTimeout(timer);
  }, [diagnostics, setResult, navigate]);

  return (
    <div className="min-h-screen relative">
      <BackgroundOrbs />
      <Navbar />
      <main className="container mx-auto px-4 max-w-lg relative z-10 pt-20 pb-20 text-center">
        <ProgressBar percent={55} />

        <div className="mt-16 animate-fade-in-up">
          <Loader2 className="w-16 h-16 text-primary mx-auto mb-6 animate-spin" />
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Analyzing Marketplace...</h2>
          <p className="text-subtle text-sm mb-10">
            Searching live eBay sold listings · Grading condition · Building valuation
          </p>

          <div className="glass-card text-left">
            <span className="text-[11px] font-bold uppercase tracking-[2px] text-primary mb-2 block">Did you know?</span>
            <p className="text-sm text-body leading-relaxed">{fact}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoadingPage;
