import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, BarChart3, FileText, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import ProgressBar from "@/components/ProgressBar";
import { useScan } from "@/context/ScanContext";
import { simulateAIAnalysis, getRandomFact } from "@/lib/mock-ai";

const phases = [
  { icon: Search, label: "Searching marketplace listings...", duration: 1200 },
  { icon: BarChart3, label: "Grading device condition...", duration: 1200 },
  { icon: FileText, label: "Building your valuation...", duration: 1200 },
  { icon: CheckCircle, label: "Finalizing results...", duration: 400 },
];

const LoadingPage = () => {
  const navigate = useNavigate();
  const { diagnostics, setResult } = useScan();
  const [fact] = useState(getRandomFact);
  const [phase, setPhase] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);

  // Phase progression
  useEffect(() => {
    let elapsed = 0;
    for (let i = 0; i < phase; i++) elapsed += phases[i].duration;
    const next = phase < phases.length - 1
      ? setTimeout(() => setPhase(p => p + 1), phases[phase].duration)
      : undefined;
    return () => clearTimeout(next);
  }, [phase]);

  // Smooth progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress(p => {
        if (p >= 100) return 100;
        return Math.min(p + 1.2, 100);
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Navigate when done
  useEffect(() => {
    const timer = setTimeout(() => {
      const result = simulateAIAnalysis(diagnostics);
      setResult(result);
      navigate("/listings-preview");
    }, 4200);
    return () => clearTimeout(timer);
  }, [diagnostics, setResult, navigate]);

  const PhaseIcon = phases[phase].icon;

  return (
    <div className="min-h-screen relative">
      <BackgroundOrbs />
      <Navbar />
      <main className="container mx-auto px-4 max-w-lg relative z-10 pt-20 pb-20 text-center">
        <ProgressBar percent={55} />

        <div className="mt-12 animate-fade-in-up">
          {/* Animated scan visualization */}
          <div className="relative w-40 h-40 mx-auto mb-8">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
            {/* Spinning arc */}
            <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: "3s" }} viewBox="0 0 160 160">
              <circle
                cx="80" cy="80" r="78"
                fill="none"
                stroke="hsl(153 80% 30%)"
                strokeWidth="2"
                strokeDasharray="120 380"
                strokeLinecap="round"
              />
            </svg>
            {/* Inner pulsing circle */}
            <div className="absolute inset-6 rounded-full bg-primary/5 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-primary/5 animate-ping" style={{ animationDuration: "2s" }} />
              <PhaseIcon className="w-10 h-10 text-primary relative z-10 transition-all duration-300" />
            </div>
            {/* Progress ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80" cy="80" r="70"
                fill="none"
                stroke="hsl(153 80% 30% / 0.15)"
                strokeWidth="4"
              />
              <circle
                cx="80" cy="80" r="70"
                fill="none"
                stroke="url(#progressGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${scanProgress * 4.4} 440`}
                className="transition-all duration-100 ease-linear"
              />
              <defs>
                <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0F8A5F" />
                  <stop offset="100%" stopColor="#C9A227" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Analyzing Marketplace</h2>
          
          {/* Phase indicator */}
          <p className="text-sm text-primary font-medium mb-1 h-5 transition-all duration-300">
            {phases[phase].label}
          </p>
          <p className="text-xs text-faintest mb-8">{Math.round(scanProgress)}% complete</p>

          {/* Phase steps */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {phases.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i <= phase ? "w-8 bg-primary" : "w-4 bg-secondary"
                }`}
              />
            ))}
          </div>

          {/* Fact card */}
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
